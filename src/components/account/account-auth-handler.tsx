// components/AuthHandler.jsx
import { useEffect } from 'react';
import { Hub } from 'aws-amplify/utils';

const AuthHandler = () => {
  useEffect(() => {
    const subscription = Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      if (event === 'signedOut' || event === 'signOut') {
        window.location.href = "/";
      }
    });

    return () => {
      subscription();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AuthHandler;