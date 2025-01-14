import React, { useCallback, useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';
import { Authenticator } from '@aws-amplify/ui-react';

import awsconfig from '../amplifyconfiguration.json';
Amplify.configure(awsconfig);

let styleLink;

const getStyleLink = () => {
  if (!styleLink) {
    styleLink = document.createElement('link');
    styleLink.id = 'amplify-styles';
    styleLink.rel = 'stylesheet';
    // Cache-busting
    styleLink.href = `https://cdn.jsdelivr.net/npm/@aws-amplify/ui-react@6.7.1/dist/styles.min.css?timestamp=${Date.now()}`;
  }
  return styleLink;
};

// Function to load Amplify styles dynamically
const loadAmplifyStyles = () => {
  const existingLink = document.querySelector('link#amplify-styles');
  if (!existingLink) {
    document.head.appendChild(getStyleLink());
  }
};

// Function to remove Amplify styles
const removeAmplifyStyles = () => {
  const existingLink = document.querySelector('link#amplify-styles');
  if (existingLink) {
    existingLink.remove();
  }
};

const AppContext = (props: any) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const listeners = [];

    listeners.push(Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      if (event === 'signedIn') {
        setShowAuthModal(false);
      }
    }));

    listeners.push(Hub.listen('berklee', ({ payload }) => {
      const { event, data } = payload;
      if (event === 'showAuthModal') {
        setShowAuthModal(!!data);
      }
    }));

    return () => {
      listeners.forEach((cancelListener) => cancelListener());
    };
  }, []);

  useEffect(() => {
    if (showAuthModal) {
      loadAmplifyStyles(); // Load Amplify styles when modal is shown
    } else {
      removeAmplifyStyles(); // Remove Amplify styles when modal is closed
    }
  }, [showAuthModal]);

  const handleClose = () => {
    setShowAuthModal(false);
    Hub.dispatch('berklee', {
      event: 'showAuthModal',
      data: false,
    });
    // maybe?
    //if (window.location.href !== '/') {
    //  window.location.href = '/';
    //}
  };

  const Wrapper = useCallback(
    ({ children }) => (
      <>
        {children}
        {showAuthModal && (
          <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleClose} />
            <div className="fixed inset-0 flex items-center justify-center z-40">
              <div className="relative bg-white rounded-lg">
                <button
                  onClick={handleClose}
                  className="absolute z-50 crazy-close -right-80 -top-80 w-8 h-8 flex items-center justify-center bg-white text-black font-bold rounded-full"
                  aria-label="Close"
                >
                  <span className="relative -top-.5">×</span>
                </button>
                {/* Render Authenticator only after styles are loaded */}
                <Authenticator variation="modal" />
              </div>
            </div>
          </div>
        )}
      </>
    ),
    [showAuthModal]
  );

  return <Wrapper>{props.children}</Wrapper>;
};

export default AppContext;
