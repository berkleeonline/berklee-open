import { useAuthenticator } from '@aws-amplify/ui-react';
import { Button, Link, NavbarItem, Dropdown, DropdownTrigger, DropdownSection, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faGauge } from '@fortawesome/pro-light-svg-icons';

const AccountHeader = ({ isDashboard = false, isAccountPage = false }) => {
  const { authStatus, user, signOut } = useAuthenticator(context => [
    context.authStatus,
    context.user,
    context.signOut,
    context.toSignUp,
    context.toSignIn
  ]);

  const AnonHeader = () => (
    <>  
      <NavbarItem className="border-l pl-4">
        <Link color="foreground" href="/account#sign-in" className="font-bold">
          <span>Log in</span>
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Button
          href="/account#sign-up"
          color="primary"
          as={Link}
          variant="solid"
          className="font-bold"
        >
          Sign up
        </Button>
      </NavbarItem>
    </>
  );

  const DashProfileHeader = () => (
    <>  
      <div className="flex items-start">
        <Avatar
          isBordered
          as="button"
          className="transition-transform mr-4 w-20 h-20"
          src="/images/berklee_open_avatar.svg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4 text-left">{user?.username}</h1>
          <Button 
            href={isAccountPage ? "/dashboard" : "/account/email"}
            as={Link}
            radius="full"
            isExternal 
            className="font-bold w-41 hover:bg-slate-100 mb-2" 
            variant="bordered" 
            aria-label={isAccountPage ? "Back to Dashboard" : "Edit Account Settings"}
          >
            {isAccountPage ? "Dashboard" : "Edit Account Settings"}
          </Button>
        </div>
      </div>
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
                Signed in as <span className="bold">{user?.username}</span>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem key="settings" startContent={<FontAwesomeIcon icon={faGauge} />}>
                <Link href="/dashboard" color="foreground" className="font-bold">Dashboard</Link>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem key="logout" startContent={<FontAwesomeIcon icon={faRightFromBracket} />}>
                <Link color="foreground" onPress={signOut} className="font-bold">Log Out</Link>
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

  // Handle loading states
  if (authStatus === 'configuring' || (authStatus === 'authenticated' && typeof user === 'undefined')) {
    return <Loading />;
  }

  // Handle authenticated user
  if (authStatus === 'authenticated' && typeof user !== 'undefined') {
    return isDashboard ? <DashProfileHeader /> : <AuthHeader />;
  }

  // Default to anon header
  return <AnonHeader />;
};

export default AccountHeader;

// Usage:
// Regular header: <AccountHeader />
// Dashboard header: <AccountHeader isDashboard={true} />