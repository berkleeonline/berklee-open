import React from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

type AuthConditionalDisplayWrapperProps = {
  showWhenAuth?: boolean; // true = show when authenticated, false = show when not authenticated
  children: React.ReactNode;
};

const AuthContent = ({ showWhenAuth = true, children }: AuthConditionalDisplayWrapperProps) => {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const isAuthenticated = authStatus === 'authenticated';
  
  if (showWhenAuth !== isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

const AuthConditionalDisplayWrapper = (props: AuthConditionalDisplayWrapperProps) => (
  <Authenticator.Provider>
    <AuthContent {...props} />
  </Authenticator.Provider>
);

export default AuthConditionalDisplayWrapper;