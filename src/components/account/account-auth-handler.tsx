// components/AuthHandler.jsx
import { useEffect } from 'react';
import { Hub } from 'aws-amplify/utils';

import { reloadFavorites } from '../../stores/favorites';

const AuthHandler = () => {
  useEffect(() => {
    const subscription = Hub.listen('auth', async ({ payload }) => {
      const { event } = payload;
      if (event === 'signedOut' || event === 'signOut') {
        window.location.href = "/";
      }
      if (event === 'signedIn' || event === 'tokenRefresh') {
        await reloadFavorites();
      }
    });

    return () => {
      subscription();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AuthHandler;
