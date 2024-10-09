import React, { useEffect, useRef } from 'react';
import Piano from './piano';
import './piano.css';

interface KeyboardProps {}

export const Keyboard: React.FC<KeyboardProps> = () => {
  const pianoRef = useRef<HTMLDivElement>(null);

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

    const piano = new Piano(config);
    piano.run();

    return () => piano.destroy(); // Cleanup piano instance on component unmount
  }, []);

  return (
    <div className="piano-scroll-wrapper">
      <div id="piano-container" ref={pianoRef}></div>
    </div>
  );
}