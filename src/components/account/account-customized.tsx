import { Authenticator, useTheme, useAuthenticator, Heading, View, Text, Button } from '@aws-amplify/ui-react';
import { Link } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth'; 
import { Hub } from 'aws-amplify/utils'; 

const AccountCustomized = () => {
  const { tokens } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const listener = async (state) => {
      if (state === "signedin") {
        setIsLoading(true);
        window.location.href = "/dashboard";
      }
    };

    // Check current auth state
    getCurrentUser()
      .then((user) => {
        // If user is already signed in, redirect
        window.location.href = "/dashboard";
      })
      .catch(() => {
        // User is not signed in, stay on page
      });

    // Subscribe to auth changes
    const subscription = Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      if (event === 'signedIn') {
        window.location.href = "/dashboard";
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
               <Heading
                 textAlign="center"
                 paddingTop="2rem"
                 level={3}
               >
                 Sign In
               </Heading>
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
               <Heading
                 textAlign="center"
                 paddingTop="2rem"
                 level={3}
               >
                 Sign Up
               </Heading>
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