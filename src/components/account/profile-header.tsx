import { Authenticator } from '@aws-amplify/ui-react';
import AccountHeader from './header';

const ProfileHeader = ({ isAccountPage = false }) => {
  return (
    <Authenticator.Provider>
      <AccountHeader isDashboard={true} isAccountPage={isAccountPage} />
    </Authenticator.Provider>
  );
};

export default ProfileHeader;