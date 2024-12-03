import React, { useCallback, useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';
import { Authenticator } from '@aws-amplify/ui-react';

import awsconfig from '../amplifyconfiguration.json';
Amplify.configure(awsconfig);

const AppContext = (props: any) => {
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  useEffect(() => {
    const cancelListener = Hub.listen('BerkleeAuth', ({ payload }) => {
      const { event, data } = payload;
      if (event === 'showModal') {
        setShowAuthModal(!!data);
      }
    });

    return () => {
      cancelListener();
    };
  }, []);

  const Wrapper = useCallback(({ children }) => {
    return showAuthModal ? (
      <Authenticator variation="modal">
        { children }
      </Authenticator>
    ) : (
      <>
        { children }
      </>
    );
  }, [showAuthModal]);

  return (
    <Wrapper>
      {props.children}
    </Wrapper>
  );
};

const App = (props: any) => (
  <Authenticator.Provider>
    <AppContext>
      {props.children}
    </AppContext>
  </Authenticator.Provider>
);

export default App;
