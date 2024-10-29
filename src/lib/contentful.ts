import contentful from "contentful";

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

// Function to fetch an entry with resolved linked entries (include depth 3)
export const getLessonWithPrerequisites = async (entryId) => {
  try {
    // Fetch entry with `include` to resolve linked content
    const entry = await contentfulClient.getEntry(entryId, {
      include: 3,  // Adjust include depth depending on your data structure
    });

    // Log the resolved entry for debugging
    console.log("Resolved entry:", entry);

    return entry;
  } catch (error) {
    console.error("Error fetching entry:", error);
    throw error;
  }
};