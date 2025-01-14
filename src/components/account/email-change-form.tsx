import { useState, useEffect } from 'react';
import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import { updateUserAttributes, confirmUserAttribute, fetchUserAttributes } from 'aws-amplify/auth';
import { Button } from "@nextui-org/react";

const EmailChangeFormContent = () => {
  const [newEmail, setNewEmail] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const { user } = useAuthenticator();

  // Fetch user attributes when component mounts
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const attributes = await fetchUserAttributes();
        console.log('User attributes:', attributes);
        setCurrentEmail(attributes.email || 'No email found');
      } catch (err) {
        console.error('Error fetching email:', err);
        setCurrentEmail('Unable to fetch email');
      }
    };

    fetchEmail();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      await updateUserAttributes({
        userAttributes: {
          email: newEmail,
        }
      });
      setShowVerificationForm(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await confirmUserAttribute({
        userAttributeKey: 'email',
        confirmationCode: verificationCode
      });

      // Fetch updated attributes after successful verification
      const updatedAttributes = await fetchUserAttributes();
      setCurrentEmail(updatedAttributes.email);

      setSuccess(true);
      setShowVerificationForm(false);
      setNewEmail('');
      setVerificationCode('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (showVerificationForm) {
    return (
      <div className="max-w-xl">
        <h3 className="text-lg font-medium mb-4">Verify Your New Email</h3>
        <p className="text-gray-600 mb-6">
          We've sent a verification code to {newEmail}. Please enter it below.
        </p>

        <form onSubmit={handleVerificationSubmit} className="space-y-6">
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Enter verification code"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              className="font-bold"
            >
              Verify Email
            </Button>
            <Button
              type="button"
              color="default"
              onClick={() => setShowVerificationForm(false)}
              className="font-bold"
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Email: <span className="font-bold">{currentEmail || 'Loading...'}</span>
        </label>
        
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700 mb-2">
            New Email
          </label>
          <input
            type="email"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Enter your new email address"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600">
              Email updated successfully!
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            className="font-bold"
          >
            Update Email
          </Button>
        </div>
      </form>
    </div>
  );
};

const EmailChangeForm = () => {
  return (
    <Authenticator.Provider>
      <EmailChangeFormContent />
    </Authenticator.Provider>
  );
};

export default EmailChangeForm;