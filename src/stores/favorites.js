import { map } from 'nanostores';
import favoritesApi from '../api/favorites';

export const favoriteStore = map({});

export const reloadFavorites = async () => {
  const response = await favoritesApi.getFavorites();
  if (response) {
    favoriteStore.set({});
    for (const item of response) {
      const { contentId, contentType, createdDate, updatedDate } = item;
      favoriteStore.setKey(
        contentId,
        { contentId, contentType, createdDate, updatedDate },
      );
    }
  }
};

export const addFavorite = async (contentId, contentType) => {
  const existingFav = favoriteStore.get()[contentId];
  if (!existingFav) {
    const response = await favoritesApi.addFavorite(contentId, contentType);
    if (response) {
      const { createdDate, updatedDate } = response;
      favoriteStore.setKey(
        contentId,
        { contentId, contentType, createdDate, updatedDate },
      );
    }
  }
};

export const removeFavorite = async (contentId) => {
  const existingFav = favoriteStore.get()[contentId];
  if (existingFav) {
    const response = await favoritesApi.removeFavorite(contentId);
    if (response) {
      favoriteStore.setKey(contentId, undefined);
    }
  }
};
