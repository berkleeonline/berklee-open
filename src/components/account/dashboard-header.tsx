import { Authenticator } from '@aws-amplify/ui-react';
import AccountHeader from './header';

const DashboardHeader = () => {
  return (
    <Authenticator.Provider>
      <AccountHeader isDashboard={true} />
    </Authenticator.Provider>
  );
};

export default DashboardHeader;