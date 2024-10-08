import { useAuthenticator } from '@aws-amplify/ui-react';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { Button, Link } from "@nextui-org/react";

const AnonHeader = () => (
  <>
    <Link color="background" href="/account#sign-in" className="font-bold">
      <span>Log in</span>
    </Link>
    &nbsp;
    <Link color="foreground" href="/account#sign-up" className="font-bold">
      <span>Sign up</span>
    </Link>
  </>
);

const AuthHeader = ({ user, signOut }: WithAuthenticatorProps) => (
  <>
    <Link color="foreground" onClick={signOut} className="font-bold">
      <span>{user.username}</span>
    </Link>
  </>
);

const Loading = () => (
  <>
    <span>Loading ...</span>
  </>
);

const AccountHeader = () => {
  const { authStatus, user, signOut } = useAuthenticator(context => [context.authStatus, context.user]);

  //console.log('authStatus', authStatus);
  //console.log('user', user);
  //console.log('signOut', signOut);

  if (authStatus === 'authenticated' && typeof user !== 'undefined') {
    return (
      <AuthHeader user={user} signOut={signOut} />
    );
  }

  if (authStatus === 'configuring' || authStatus === 'authenticated') {
    return (
      <Loading />
    );
  }

  return (
    <AnonHeader />
  );
};

export default AccountHeader;
