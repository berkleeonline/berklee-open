import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MetronomeIcon } from '../../elements/MetronomeIcon';
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

interface MetronomeProps {
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
}

export const Metronome: React.FC<MetronomeProps> = ({ isExpanded, onExpandChange }) => {
  const [bpm, setBpm] = useState(60);
  const [inputBpm, setInputBpm] = useState('60'); // Raw input value
  const [error, setError] = useState<string | null>(null); // Error state for invalid BPM
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [beatCount, setBeatCount] = useState(0);
  const workerRef = useRef<Worker | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to hold the debounce timer

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

  // Stop the metronome when closing it.
  useEffect(() => {
    if (!isExpanded && isPlaying) {
      setIsPlaying(false);
    }
  }, [isExpanded, isPlaying]);

  const startMetronome = () => {
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume().then(() => {
        initializeWorker();
      });
    } else {
      initializeWorker();
    }
  };

  const initializeWorker = () => {
    if (workerRef.current) workerRef.current.terminate();
    workerRef.current = new Worker(new URL('./worker.ts', import.meta.url));
    workerRef.current.postMessage({ bpm });
    workerRef.current.onmessage = (event) => {
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

    // Clear the previous timeout if any
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set a new timeout to update the BPM after 1 second
    debounceTimeoutRef.current = setTimeout(() => {
      const newBpm = Number(event.target.value);
      if (newBpm < 35 || newBpm > 250) {
        setError("Choose a BPM between 35-250");
      } else {
        setError(null);
        setBpm(newBpm);
        if (isPlaying && workerRef.current) {
          workerRef.current.postMessage({ bpm: newBpm });
        }
      }
    }, 500); // 1-second delay
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
      {isExpanded && (
        <div id="the-metronome" className="absolute z-10 right-6 top-full mt-8 rounded-3xl border shadow-xl bg-white w-[500px]">
          {isPlaying && (
            <div className="absolute top-10 right-40">
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
          <button onClick={() => onExpandChange(false)} className={'absolute top-2 right-4 text-2xl'}>
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
