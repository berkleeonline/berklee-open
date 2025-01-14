// components/account/PasswordChangeForm.jsx
import { AccountSettings } from '@aws-amplify/ui-react';
import { useState } from 'react';

const PasswordChangeForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
    // Optionally hide the success message after a few seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div>
      <AccountSettings.ChangePassword 
        onSuccess={handleSuccess}
      />
      
      {showSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg mt-4">
          <p className="text-green-600">
            Password updated successfully!
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordChangeForm;