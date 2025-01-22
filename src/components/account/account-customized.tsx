import { Authenticator, useTheme, useAuthenticator, Heading, View, Text } from '@aws-amplify/ui-react';
import { Link } from "@heroui/react";
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth'; 
import { Hub } from 'aws-amplify/utils'; 

const AccountCustomized = () => {
  const { tokens } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check current auth state
    getCurrentUser()
    .then((user) => {
      const redirectTo = sessionStorage.getItem('redirectPath') || '/dashboard';
      window.location.href = redirectTo;
      sessionStorage.removeItem('redirectPath');
    })
    .catch(() => {
      // User is not signed in, stay on page
    });
  
    // Subscribe to auth changes with correct event names
    const subscription = Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      
      if (event === 'signedIn' || event === 'signIn') {
        setIsLoading(true);
        const redirectTo = sessionStorage.getItem('redirectPath') || '/dashboard';
        window.location.href = redirectTo;
        sessionStorage.removeItem('redirectPath'); // Clean up after use
      }
    });
  
    return () => {
      subscription();
    };
  }, []);

 if (isLoading) {
   return <div>Redirecting to dashboard...</div>;
 }

 return (
   <>
     <Authenticator
       formFields={{
         signUp: {      // component
           username: {     // field object
             order: 2   // order key
           },
           email: {
             order: 1
           },
           password: {
             order: 3
           },
           confirm_password: {
             order: 4
           },
         },
       }}
       components={{
         SignIn: {
           Header() {
             return (
              <View>
                <Heading
                  textAlign="center"
                  paddingTop="2rem"
                  level={3}
                >
                  Sign In
                </Heading>
                <Text paddingLeft={35} paddingTop={35} paddingRight={35} color={tokens.colors.neutral[80]}>
                  Sign in with your username and password to access all resources.
                </Text>
              </View>
             );
           },
           Footer() {
             const { toSignUp, toForgotPassword } = useAuthenticator();
             return (
               <>
                 <View textAlign="center" padding={tokens.space.medium}>
                   <Text color={tokens.colors.neutral[80]}>
                     Don't have an account? <Link href="#" onClick={toSignUp}>Sign up</Link>
                   </Text>
                 </View>
                 <View textAlign="center">
                   <Link href="#" onClick={toForgotPassword}>Reset Password</Link>
                 </View>
               </>
             );
           },
         },
         SignUp: {
           Header() {
             return (
              <>
               <Heading
                 textAlign="center"
                 paddingTop="2rem"
                 level={3}
               >
                 Sign Up
               </Heading>
               <Text paddingLeft={35} paddingTop={35} paddingRight={35} color={tokens.colors.neutral[80]}>
                Sign up for free to access all Berklee Open resources.
                </Text>
              </>
             );
           },
           Footer() {
             const { toSignIn } = useAuthenticator();
             return (
               <View textAlign="center" padding={tokens.space.medium}>
                 <Text color={tokens.colors.neutral[80]}>
                   Already have an account? <Link href="#" onClick={toSignIn}>Sign in</Link>
                 </Text>
               </View>
             );
           },
         },
       }}
       services={{
         submitButtonText: {
           signIn: 'Log in'
         }
       }}
     >
     </Authenticator>
   </>
 );
};

export default AccountCustomized;