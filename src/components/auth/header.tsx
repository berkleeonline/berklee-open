import { useAuthenticator } from '@aws-amplify/ui-react';

const AuthHeader = () => {
  //const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const { user, signOut } = useAuthenticator(context => [context.user]);

  //const message = typeof user === 'undefined'
  //  ? <span>Log in | Sign up</span>
  //  : <span>Welcome, {user.username}</span>;

  const message = typeof user === 'undefined'
    ? 'Log in | Sign up'
    : `Welcome, ${user.username}`;

  //    {
  //      typeof user === 'undefined'
  //        ? <span>Log in | Sign up</span>
  //        : <span>Welcome, {user.username}</span>
  //    }
  //  </>
  return (
    <span>{message}</span>
  );
};

export default AuthHeader;
