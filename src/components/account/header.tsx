import { useAuthenticator } from '@aws-amplify/ui-react';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import {NavbarItem, Dropdown, DropdownTrigger, DropdownSection, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { Button, Link } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faGauge } from '@fortawesome/pro-light-svg-icons';

const AccountHeader = () => {
  const { authStatus, user, signOut, toSignUp, toSignIn } = useAuthenticator(context => [
    context.authStatus,
    context.user,
    context.signOut,
    context.toSignUp,
    context.toSignIn
  ]);

  const AnonHeader = () => (
    <>  
      <NavbarItem className="border-l pl-3">
        <Link color="foreground" href="/account#sign-up" className="font-bold">
          <span>Sign up</span>
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Button
          href="/account#sign-in"
          color="primary"
          as={Link}
          variant="solid"
          className='font-bold'
        >
          Log in
        </Button>
      </NavbarItem>
    </>
  );

  const AuthHeader = () => (
    <>
      
        <div className="flex items-center gap-4">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src="/images/berklee_open_avatar.svg"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownSection showDivider>
                <DropdownItem key="profile">
                  Signed in as <span className="capitalize bold">{user?.username}</span>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection>
                <DropdownItem key="settings" startContent={<FontAwesomeIcon icon={faGauge} />}>
                <Link href="/dashboard" color="foreground" className="font-bold">Dashboard</Link>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection>
                <DropdownItem key="logout" startContent={<FontAwesomeIcon icon={faRightFromBracket} />}>
                  <Link color="foreground" onClick={signOut} className="font-bold">Log Out</Link>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      
    </>
  );

  const Loading = () => (
    <>
      <span>Loading ...</span>
    </>
  );

  if (authStatus === 'authenticated' && typeof user !== 'undefined') {
    return <AuthHeader />;
  }

  if (authStatus === 'configuring' || authStatus === 'authenticated') {
    return <Loading />;
  }

  return <AnonHeader />;
};

export default AccountHeader;