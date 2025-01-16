import { generateGradientPlaceholder } from './gradients';

interface ImageResult {
  url: string | null;
  placeholderStyle: {
    background: string;
    height?: string;
    width?: string;
    borderRadius?: string;
  };
}

export const getImageUrl = (image: any, index: number): ImageResult => {
  const url = image?.fields?.file?.url;
  const imageUrl = url?.startsWith('//') ? `https:${url}` : url || null;

  return {
    url: imageUrl,
    placeholderStyle: {
      background: generateGradientPlaceholder(index)
    }
  };
};