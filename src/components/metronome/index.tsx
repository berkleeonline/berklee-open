import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDrum,
  faClose
} from "@fortawesome/pro-light-svg-icons";
import {
  faPlay,
  faPause,
  faPlus,
  faMinus,
} from "@fortawesome/pro-solid-svg-icons";

export const Metronome: React.FC = () => {
  const [bpm, setBpm] = useState(60);
  const [inputBpm, setInputBpm] = useState('60'); // Raw input value
  const [error, setError] = useState<string | null>(null); // Error state for invalid BPM
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [beatCount, setBeatCount] = useState(0);
  const workerRef = useRef<Worker | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      startMetronome();
    } else {
      stopMetronome();
    }
    return () => stopMetronome();
  }, [isPlaying, bpm]);

  const startMetronome = () => {
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume().then(() => {
        console.log('AudioContext resumed');
        initializeWorker();
      });
    } else {
      initializeWorker();
    }
  };

  const initializeWorker = () => {
    if (workerRef.current) workerRef.current.terminate();
    workerRef.current = new Worker(new URL('./worker.ts', import.meta.url));
    console.log('Worker created:', workerRef.current);
    workerRef.current.postMessage({ bpm });
    workerRef.current.onmessage = (event) => {
      console.log('Worker message received:', event.data);
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 100); // Blink duration
      setBeatCount((prevCount) => (prevCount + 1) % 4);
      playTickSound();
    };
  };

  const stopMetronome = () => {
    if (workerRef.current) workerRef.current.terminate();
  };

  const playTickSound = () => {
    if (audioContextRef.current) {
      const audioContext = audioContextRef.current;
      const frequency = 1000;
      const oscillator = audioContext.createOscillator();
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05); // 50ms decay
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.05);
    }
  };

  const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputBpm(event.target.value); // Update raw input value
  };

  const handleBpmBlur = () => {
    const newBpm = Number(inputBpm);
    if (newBpm < 35 || newBpm > 250) {
      setError("Choose a BPM between 35-250"); // Set error message if out of range
    } else {
      setError(null); // Clear error if valid
      setBpm(newBpm);
      setInputBpm(String(newBpm)); // Update input field with constrained value
      if (isPlaying && workerRef.current) {
        workerRef.current.postMessage({ bpm: newBpm });
      }
    }
  };

  const handleIncrement = () => {
    if (bpm >= 250) {
      setError("Choose a BPM between 35-250"); // Set error message if already at the max
      return;
    }
    const newBpm = Math.min(250, bpm + 1);
    setBpm(newBpm);
    setInputBpm(String(newBpm)); // Sync inputBpm with bpm
    setError(null); // Clear error on valid input
    if (isPlaying && workerRef.current) {
      workerRef.current.postMessage({ bpm: newBpm });
    }
  };

  const handleDecrement = () => {
    if (bpm <= 35) {
      setError("Choose a BPM between 35-250"); // Set error message if already at the minimum
      return;
    }
    const newBpm = Math.max(35, bpm - 1);
    setBpm(newBpm);
    setInputBpm(String(newBpm)); // Sync inputBpm with bpm
    setError(null); // Clear error on valid input
    if (isPlaying && workerRef.current) {
      workerRef.current.postMessage({ bpm: newBpm });
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Button onClick={() => setIsExpanded(!isExpanded)} isIconOnly className="bg-white text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="21.503" height="18.5" viewBox="0 0 21.503 18.5">
            <path id="metronome" d="M18.833,42.425a2.17,2.17,0,1,0-2.17-2.17c0,1.2.094.718.254,1.021L15.1,43.094l-3.191-5.759a1.424,1.424,0,0,0-1.243-.734h-1.6a1.415,1.415,0,0,0-1.243.734L.176,51.117A1.435,1.435,0,0,0,0,51.806v1.37A1.427,1.427,0,0,0,1.423,54.6H18.3a1.427,1.427,0,0,0,1.423-1.423v-1.37a1.435,1.435,0,0,0-.176-.689L15.74,44.242l2.076-2.076a2.142,2.142,0,0,0,1.021.254ZM8.922,37.946a.164.164,0,0,1,.139-.082h1.6a.164.164,0,0,1,.139.082l3.368,6.079L9.816,48.377H3.142Zm9.537,13.861v1.37a.16.16,0,0,1-.16.16H1.423a.16.16,0,0,1-.16-.16v-1.37a.17.17,0,0,1,.021-.078l1.161-2.092H17.282l1.161,2.092a.17.17,0,0,1,.021.078Zm-1.879-3.433H11.6l3.2-3.2,1.772,3.2Zm2.252-9.025a.907.907,0,1,1-.907.907A.907.907,0,0,1,18.833,39.348Z" transform="translate(0.25 -36.35)" fill="#4c5960" stroke="#4c5960" stroke-width="0.5"/>
          </svg>
        </Button>
        {isPlaying && (
          <div className="absolute top-0 right-0">
            <div
              style={{
                backgroundColor: isBlinking ? 'white' : 'red',
                height: 8,
                width: 8,
                borderRadius: '50%',
                boxShadow: isBlinking
                  ? '0 0 10px 10px rgba(255, 0, 0, 0.5)' // Shadow effect for pulse
                  : 'none',
                transition: 'box-shadow 0.2s ease',
                animation: isBlinking ? 'pulse 0.5s infinite' : 'none',
              }}
            ></div>
          </div>
        )}
      </div>

      {isExpanded && (
        <div className="absolute right-0 top-full mt-8 rounded-3xl shadow-xl bg-white w-[500px]">
          <button onClick={() => setIsExpanded(false)} className={'absolute top-2 right-4 text-2xl'}>
            <FontAwesomeIcon icon={faClose} />
          </button>
          <div className="flex flex-col items-center p-6">
            <div className="mb-4 flex flex-col items-center">
              <style jsx>{`
                /* Hide the arrows from the number input field */
                input[type='number']::-webkit-outer-spin-button,
                input[type='number']::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }

                input[type='number'] {
                  -moz-appearance: textfield;
                }
              `}</style>
              <input
                type="number"
                value={inputBpm}
                onChange={handleBpmChange}
                onBlur={handleBpmBlur}
                min="35"
                max="250"
                className="appearance-none text-4xl text-center font-medium w-20 border-1 border-slate-200 rounded-sm"
              />
              <span className="text-sm">BPM</span>
              {error && <div className="text-red-500 mt-2">{error}</div>} {/* Conditionally render error message */}
            </div>
            <div className="mb-4 w-full flex gap-4">
              <div>
                <button
                  onClick={handleDecrement}
                  className="border-2 rounded-full h-10 w-10 text-xl flex items-center justify-center border-slate-200"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              </div>
              <div className="w-full flex items-center">
                <input
                  type="range"
                  value={inputBpm}
                  onChange={handleBpmChange}
                  onBlur={handleBpmBlur}
                  min="35"
                  max="250"
                  className="w-full h-[3px] bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  style={{
                    WebkitAppearance: 'none',
                    appearance: 'none',
                  }}
                />
                <style jsx>{`
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    background: black;
                    cursor: pointer;
                    border-radius: 50%;
                  }

                  input[type="range"]::-moz-range-thumb {
                    width: 16px;
                    height: 16px;
                    background: rgb(11,19,28);
                    cursor: pointer;
                    border-radius: 50%;
                  }
                `}</style>
              </div>
              <div>
                <button
                  onClick={handleIncrement}
                  className="border-2 rounded-full h-10 w-10 flex items-center justify-center border-slate-200"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            <div className="">
              <button onClick={() => setIsPlaying(!isPlaying)} className={'border-2 border-black rounded-full h-16 w-16 text-3xl'}>
                {isPlaying && (
                  <FontAwesomeIcon icon={faPause} />
                )}
                {!isPlaying && (
                  <div className="ml-[5px]">
                    <FontAwesomeIcon icon={faPlay} />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
