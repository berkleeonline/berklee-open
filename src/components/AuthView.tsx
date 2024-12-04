import React, { useEffect } from 'react';
import { Hub } from 'aws-amplify/utils';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

type AuthViewProps = {
  id?: string;
  className?: string;
  style?: any;
  children?: any;
};

const AuthView: React.FC<AuthViewProps> = ({
  className,
  style,
  children,
}) => {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  useEffect(() => {
    if (authStatus !== 'authenticated') {
      Hub.dispatch('BerkleeAuth', {
        event: 'showModal',
        data: true,
        message: '',
      });
    }
  }, []);

  return (
    <div className={className} style={style}>
      { children }
    </div>
  );
};

const AuthViewWrapper: React.FC<AuthViewProps> = ({
  className,
  style,
  children,
}) => {
  return (
    <Authenticator.Provider>
      <AuthView className={className} style={style}>
        { children }
      </AuthView>
    </Authenticator.Provider>
  );
};

export default AuthViewWrapper;
