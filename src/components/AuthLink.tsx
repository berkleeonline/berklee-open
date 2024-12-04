import React, { useCallback } from 'react';
import { Hub } from 'aws-amplify/utils';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { Link } from "@nextui-org/react";

type AuthLinkProps = {
  href: string;
  className?: string;
  children?: any;
};

const AuthLink: React.FC<AuthLinkProps> = ({
  href,
  className,
  children,
}) => {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);

  const handleClick = useCallback((e) => {
    if (authStatus !== 'authenticated') {
      e.preventDefault();
      Hub.dispatch('berklee', {
        event: 'showAuthModal',
        data: true,
      });
    }
  }, [authStatus]);

  return (
    <Link href={href} className={className} onClick={handleClick}>
      { children }
    </Link>
  );
};

const AuthLinkWrapper: React.FC<AuthLinkProps> = ({
  href,
  className,
  children,
}) => {
  return (
    <Authenticator.Provider>
      <AuthLink href={href} className={className}>
        { children }
      </AuthLink>
    </Authenticator.Provider>
  );
};

export default AuthLinkWrapper;
