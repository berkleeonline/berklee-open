import { generateGradientPlaceholder } from './gradients';

interface ContentfulImage {
  fields?: {
    file?: {
      url?: string;
    };
  };
}

interface ImageResult {
  url: string | null;
  placeholderStyle: {
    background: string;
    height?: string;
    width?: string;
    borderRadius?: string;
  };
}

export const getImageUrl = (image: ContentfulImage | string, index: number): ImageResult => {
  // Handle string case
  if (typeof image === 'string') {
    return {
      url: image.startsWith('//') ? `https:${image}` : image,
      placeholderStyle: {
        background: generateGradientPlaceholder(index)
      }
    };
  }

  // Handle Contentful image object case
  const url = image?.fields?.file?.url;
  const imageUrl = url?.startsWith('//') ? `https:${url}` : url || null;

  return {
    url: imageUrl,
    placeholderStyle: {
      background: generateGradientPlaceholder(index)
    }
  };
};