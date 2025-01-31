import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
  environment: import.meta.env.branch || 'dev',
});

export const loadEntries = async (contentType, contentIds) => {
  const result = await client.getEntries({
    content_type: contentType,
    'sys.id[in]': (contentIds || []).join(','),
  });
  return result.items;
};
