import { Authenticator } from '@aws-amplify/ui-react';
import AccountSettingsLayout from './account-settings-layout';

const AccountSettingsWrapper = ({ children, currentPage }) => {
  return (
    <Authenticator.Provider>
      <AccountSettingsLayout currentPage={currentPage}>
        {children}
      </AccountSettingsLayout>
    </Authenticator.Provider>
  );
};

export default AccountSettingsWrapper;