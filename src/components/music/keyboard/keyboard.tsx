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

    if (!pianoInstanceRef.current && pianoRef.current) {
      pianoInstanceRef.current = new Piano(config);
      pianoInstanceRef.current.run();
      setIsInitialized(true);
    }

    return () => {
      if (pianoInstanceRef.current) {
        pianoInstanceRef.current.destroy();
        pianoInstanceRef.current = null;
      }
    };
  }, []);

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