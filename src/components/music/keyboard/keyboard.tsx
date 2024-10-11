import React, { useEffect, useRef, useState } from 'react';
import Piano from './piano';
import './piano.css';

interface KeyboardProps {
  isVisible: boolean;
}

export const Keyboard: React.FC<KeyboardProps> = ({ isVisible }) => {
  const pianoRef = useRef<HTMLDivElement>(null);
  const pianoInstanceRef = useRef<Piano | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const config = {
      'placementId': 'piano-container',
      'keyWidth': 30,
      'noteLabels': 'true',
      'middleC': 'true',
      'hideKey': false,
      'hotKeys': true,
      'keyDirs': {} as { [key: string]: string },
    };

    for (let i = 0; i < 85; i++) {
      config['keyDirs']['key_' + i] = 'https://intro.online.berklee.edu/audio/piano/key_' + i + '.mp3';
    }

    if (isVisible) {
      // If a previous piano exists, destroy it and clear the DOM
      if (pianoInstanceRef.current) {
        pianoInstanceRef.current.destroy();
        pianoInstanceRef.current = null;
      }

      // Clear the piano-container to avoid stacking new pianos
      if (pianoRef.current) {
        pianoRef.current.innerHTML = ''; // Clear previous piano DOM elements
      }

      // Initialize the piano
      if (!pianoInstanceRef.current && pianoRef.current) {
        pianoInstanceRef.current = new Piano(config);
        pianoInstanceRef.current.run();
        setIsInitialized(true);
      }
    }

    return () => {
      if (pianoInstanceRef.current) {
        pianoInstanceRef.current.destroy();
        pianoInstanceRef.current = null;
      }
    };
  }, [isVisible]); // Only run this effect when isVisible changes

  return (
    <div className={`piano-outer-container ${isVisible ? 'open' : ''}`}>
      <div className="piano-scroll-wrapper">
        <div id="piano-container" ref={pianoRef}>
          {/* Piano is rendered here by Piano.js */}
        </div>
      </div>
    </div>
  );
}
