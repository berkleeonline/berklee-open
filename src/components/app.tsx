//import { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

import awsconfig from '../amplifyconfiguration.json';
Amplify.configure(awsconfig);

const AppContext = (props: any) => {
  //const { authStatus } = useAuthenticator(context => [context.authStatus]);

  //const [lastStatus, setLastStatus] = useState<string>('configuring');

  //useEffect(() => {
  //  if (lastStatus !== authStatus) {
  //    setLastStatus(authStatus);
  //  }
  //}, [authStatus, lastStatus]);

  return (
    <>
      {props.children}
    </>
  )
};

const App = (props: any) => (
  <Authenticator.Provider>
    <AppContext>
      {props.children}
    </AppContext>
  </Authenticator.Provider>
);

export default App;
