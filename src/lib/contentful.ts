import * as lib from 'contentful';

const OPT_PREFIX = typeof window === 'undefined' ? '' : 'PUBLIC_';

const contentfulOptions = {
  space: import.meta.env[`${OPT_PREFIX}CONTENTFUL_SPACE_ID`],
  environment: import.meta.env.branch
    ? import.meta.env.branch
    : 'dev',
  accessToken: import.meta.env.DEV
    ? import.meta.env[`${OPT_PREFIX}CONTENTFUL_PREVIEW_TOKEN`]
    : import.meta.env[`${OPT_PREFIX}CONTENTFUL_DELIVERY_TOKEN`],
  host: import.meta.env.DEV
    ? 'preview.contentful.com'
    : 'cdn.contentful.com',
};

const contentfulClient = lib.createClient
  ? lib.createClient(contentfulOptions)
  : lib.default.createClient(contentfulOptions);

export const getEntries = async (contentType, limit = 100) => {
  try {
    const result = await contentfulClient.getEntries({
      content_type: contentType,
      limit,
    });
    return result?.items || [];
  } catch (error) {
    console.error(`Failed getEntries`, error);
    return [];
  }
};

export const getEntriesByIds = async (contentType, entryIds, limit = 100) => {
  try {
    const result = await contentfulClient.getEntries({
      content_type: contentType,
      'sys.id[in]': (entryIds || []).join(','),
      limit,
    });
    return result?.items || [];
  } catch (error) {
    console.error(`Failed getEntriesByIds`, error);
    return [];
  }
};

export const getEntryById = async (entryId) => {
  try {
    return await contentfulClient.getEntry(entryId);
  } catch (error) {
    console.error(`Failed getEntryById`, error);
    return null;
  }
};
