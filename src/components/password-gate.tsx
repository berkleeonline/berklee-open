// components/PasswordGate.tsx
import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from "@nextui-org/react";
import { inviteCodes } from '../utils/inviteCodes';
import { checkPasswordGate, setPasswordGate, clearPasswordGate } from '../utils/inviteAuth';
import Logo from "./logo";

const PasswordGate = ({ children, skip = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Changed to null initially
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [welcomeName, setWelcomeName] = useState('');

  useEffect(() => {
    // If skip is true, don't check authentication
    if (skip) {
      setIsAuthenticated(true);
      return;
    }
    
    const { isAuthenticated, visitorName } = checkPasswordGate();
    setIsAuthenticated(isAuthenticated);
    setWelcomeName(visitorName || '');
  }, [skip]);

  const clearPasswordAccess = () => {
    clearPasswordGate();
    setIsAuthenticated(false);
    setWelcomeName('');
  };

  // Don't render anything while checking authentication
  if (isAuthenticated === null) {
    return null;
  }

  // If skip is true, render children directly
  if (skip) {
    return <>{children}</>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const matchedInvite = inviteCodes.find(invite => invite.code === password);

    if (matchedInvite) {
      setPasswordGate(matchedInvite.name);
      setIsAuthenticated(true);
      setWelcomeName(matchedInvite.name);
      setError('');
    } else {
      setError('Invalid invite code');
    }
  };
  

  if (isAuthenticated) {
    return (
      <>
        {welcomeName && (
        <div className="bg-primary/10 py-2 px-4 text-center relative">
          {welcomeName === 'global' ? (
            'Welcome to your exclusive Berklee Online preview!'
          ) : (
            `Welcome to your exclusive preview, ${welcomeName}!`
          )}
          <button 
            onClick={clearPasswordAccess}
            className="font-bold pl-2"
            aria-label="Clear access"
          >
            <span className="bg-white px-5 py-1 rounded-full hover:bg-red">
              End Session
            </span>
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