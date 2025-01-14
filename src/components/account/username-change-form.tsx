import { useState } from 'react';
import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import { updateUserAttributes } from 'aws-amplify/auth';
import { Button } from "@nextui-org/react";

// Inner component with auth context
const UsernameChangeFormContent = () => {
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthenticator();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      await updateUserAttributes({
        userAttributes: {
          name: newUsername,
          preferred_username: newUsername
        }
      });
      setSuccess(true);
      setNewUsername(''); // Clear the form
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <label className="block font-bold text-gray-700 mb-2">
          Current Username: {user?.username || user?.attributes?.preferred_username}
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="newUsername" className="block text-sm font-medium text-gray-700 mb-2">
            New Username
          </label>
          <input
            type="text"
            id="newUsername"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Enter your new username"
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
              Username updated successfully!
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
            Update Username
          </Button>
        </div>
      </form>
    </div>
  );
};

// Wrap with provider in the main export
const UsernameChangeForm = () => {
  return (
    <Authenticator.Provider>
      <UsernameChangeFormContent />
    </Authenticator.Provider>
  );
};

export default UsernameChangeForm;