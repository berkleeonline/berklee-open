import { del, get, post } from 'aws-amplify/api';

export const addFavorite = async (contentId, contentType) => {
  try {
    const requestTime = new Date().getTime();
    const restOperation = post({
      apiName: 'favorites',
      path: '/favorite',
      options: {
        body: {
          contentId,
          contentType,
          createdDate: requestTime,
          updatedDate: requestTime,
        },
      },
    });

    const { body } = await restOperation.response;
    const response = await body.json();

    console.log('Successfully added favorite', response);

    return response;
  } catch (e) {
    console.log('Failed to add favorite', JSON.parse(e.response.body));
  }
};

export const getFavorites = async () => {
  try {
    const restOperation = get({
      apiName: 'favorites',
      path: '/favorite',
      options: {},
    });

    const { body } = await restOperation.response;
    const response = await body.json();

    console.log('Successfully loaded favorites', response);

    return response;
  } catch (e) {
    console.log('Failed to load favorites', JSON.parse(e.response.body));
  }
};

export const removeFavorite = async (contentId) => {
  try {
    const restOperation = del({
      apiName: 'favorites',
      path: `/favorite/object/${contentId}`,
      options: {},
    });

    const { body } = await restOperation.response;
    const response = await body.json();

    console.log('Successfully removed favorite', response);

    return response;
  } catch (e) {
    console.log('Failed to remove favorite', JSON.parse(e.response.body));
  }
};

export default {
  addFavorite,
  getFavorites,
  removeFavorite,
};
