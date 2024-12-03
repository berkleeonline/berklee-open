import React, { useCallback, useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';
import { Authenticator } from '@aws-amplify/ui-react';

import awsconfig from '../amplifyconfiguration.json';
Amplify.configure(awsconfig);

const AppContext = (props: any) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Function to load Amplify styles dynamically
  const loadAmplifyStyles = () => {
    const existingLink = document.querySelector('#amplify-styles');
    if (!existingLink) {
      const link = document.createElement('link');
      link.id = 'amplify-styles';
      link.rel = 'stylesheet';
      link.href = `https://cdn.jsdelivr.net/npm/@aws-amplify/ui-react@6.7.1/dist/styles.min.css?timestamp=${Date.now()}`; // Cache-busting
      document.head.appendChild(link);
    }
  };

  // Function to remove Amplify styles
  const removeAmplifyStyles = () => {
    const existingLink = document.querySelector('#amplify-styles');
    if (existingLink) {
      existingLink.remove();
    }
  };

  useEffect(() => {
    const cancelListener = Hub.listen('BerkleeAuth', ({ payload }) => {
      const { event, data } = payload;
      if (event === 'showModal') {
        setShowAuthModal(!!data);
      }
    });

    return () => {
      cancelListener();
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
    Hub.dispatch('BerkleeAuth', {
      event: 'modalClosed',
    });
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
