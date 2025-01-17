// components/PasswordGate.tsx
import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from "@nextui-org/react";
import { inviteCodes } from '../utils/inviteCodes';
import Logo from "./logo";

const PasswordGate = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [welcomeName, setWelcomeName] = useState('');

  useEffect(() => {
    const hasAccess = sessionStorage.getItem('hasAccess');
    const storedName = sessionStorage.getItem('visitorName');
    if (hasAccess === 'true') {
      setIsAuthenticated(true);
      setWelcomeName(storedName || '');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const matchedInvite = inviteCodes.find(invite => invite.code === password);

    if (matchedInvite) {
      setIsAuthenticated(true);
      setWelcomeName(matchedInvite.name);
      sessionStorage.setItem('hasAccess', 'true');
      sessionStorage.setItem('visitorName', matchedInvite.name);
      setError('');
    } else {
      setError('Invalid invite code');
    }
  };

  const clearPasswordAccess = () => {
    sessionStorage.removeItem('hasAccess');
    sessionStorage.removeItem('visitorName');
    setIsAuthenticated(false);
    setWelcomeName('');
  };
  

  if (isAuthenticated) {
    return (
      <>
        {welcomeName && (
          <div className="bg-primary/10 py-2 px-4 text-center relative">
            Welcome to your exclusive preview, {welcomeName}!
            <button 
                onClick={clearPasswordAccess}
                className="font-bold pl-2"
                aria-label="Clear access"
                >
                <span class="bg-white px-5 py-1 rounded-full hover:bg-red">End Session</span>
            </button>
          </div>
        )}
        {children}
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div className="text-center w-full flex justify-center pb-12"><Logo /></div>
      <Card className="p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Exclusive Preview Access</h1>
        <p className="text-center mb-6 text-gray-600">
          Please enter your personal invite<br/>code to access the preview.
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Enter Invite Code"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button type="submit" color="primary" className="w-full">
            Access Preview
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default PasswordGate;