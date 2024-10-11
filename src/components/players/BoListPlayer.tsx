import { useState, useRef, useEffect } from 'react';
import { ListPlayer, ListPlayerContext } from 'react-list-player';
import styles from './_BoListPlayer.module.scss';

// This is just a sample listInfo object
const audioListInfo = {
  type: 'playlist',
  name: '',
  creationDate: "1/16/2024",
  numTracks: 2,
  duration: "24 min"
};

// Sample track array
const audioTracks = [
  {
    title: [{ type: 'text', content: 'Berklee HAPPY test', className: 'title' }],
    artist: [{ type: 'text', content: 'Berklee HAPPY test', className: 'artist', link: 'https://music.youtube.com/channel/UCmGqnW6VmhOV4KW67vhzPCA' }],
    album: [{ type: 'text', content: 'SoulProdMusic', className: 'album' }],
    duration: "0:32",
    imageSrc: "https://cdn.pixabay.com/audio/2023/03/19/12-27-22-207_200x200.jpg"
  },
  {
    title: [{ type: 'text', content: 'My Universe', className: 'title' }],
    artist: [{ type: 'text', content: 'Peter Nesterouk', className: 'artist', link: 'https://pixabay.com/users/nesterouk-34392616/' }],
    album: [{ type: 'text', content: 'Nesterouk', className: 'album' }],
    duration: "2:27",
    imageSrc: "https://cdn.pixabay.com/audio/2023/04/24/09-30-22-297_200x200.jpg"
  }
];

export default function BoListPlayer() {
  const [selectedTrack, setSelectedTrack] = useState(-1); // -1 means no track is selected
  const [isPlaying, setIsPlaying] = useState(false); // play/pause
  const [progress, setProgress] = useState(0); // Track progress in seconds
  const [duration, setDuration] = useState(0); // Track total duration in seconds

  const audioRef = useRef<HTMLAudioElement>(null);

  const audioSrcs = [
    "https://assets.online.berklee.edu/berklee-open-placeholder/Lesson_1_Happy_BPM+125.mp3",
    "/free-audio/my universe.mp3"
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        setProgress(audio.currentTime);
        setDuration(audio.duration || 0);
      };
      audio.addEventListener('timeupdate', updateProgress);
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
      };
    }
    // DOM manipulation to rearrange buttons
    const forwardBtn = document.querySelector('.progress-jump-forward-btn');
    const backwardBtn = document.querySelector('.progress-jump-backward-btn');
    const backBtn = document.querySelector('.back-btn');  // Assuming you have a 'back-btn'
    const forwardControlBtn = document.querySelector('.forward-btn');  // Assuming you have a 'forward-btn'

    if (backBtn && backwardBtn) {
      backBtn.parentNode?.insertBefore(backwardBtn, backBtn); // Place backward button before back button
    }

    if (forwardControlBtn && forwardBtn) {
      forwardControlBtn.parentNode?.insertBefore(forwardBtn, forwardControlBtn.nextSibling); // Place forward button after forward button
    }
  }, [selectedTrack]);

  const handleOnPlay = (index: number, resume: boolean) => {
    if (index >= 0 && index < audioTracks.length) {
      const selectedTrackData = audioTracks[index];
      if (selectedTrackData && selectedTrackData.title && selectedTrackData.title[0]) {
        setSelectedTrack(index);
        if (!resume) {
          audioRef.current?.load();
        }
        audioRef.current?.play();
        setIsPlaying(true);
        const forwardBtn = document.querySelector('.progress-jump-forward-btn') as HTMLElement;
        const backwardBtn = document.querySelector('.progress-jump-backward-btn') as HTMLElement;
        const backBtn = document.querySelector('.back-btn');
        const forwardControlBtn = document.querySelector('.forward-btn');
    
        if (backBtn && backwardBtn) {
          backBtn.parentNode?.insertBefore(backwardBtn, backBtn); // Move backward button before back button
          backwardBtn.style.display = 'block'; // Show backward button
        }
    
        if (forwardControlBtn && forwardBtn) {
          const nextElement = forwardControlBtn.nextSibling; // Get the next sibling of forwardControlBtn
        
          // If next sibling exists, insert before it, otherwise append the forwardBtn at the end
          if (nextElement) {
            forwardControlBtn.parentNode?.insertBefore(forwardBtn, nextElement);
          } else {
            forwardControlBtn.parentNode?.appendChild(forwardBtn); // Append if no next sibling
          }
        
          forwardBtn.style.display = 'block'; // Show forward button
        }

        const trackTitleSpan = document.querySelector('.lt-info-title .text.pure') as HTMLElement;
        if (trackTitleSpan) {
          trackTitleSpan.textContent = selectedTrackData.title[0].content;
        }
      }
    }
  };

  const handleOnPause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    audioRef.current!.currentTime = newTime;
    setProgress(newTime);
  };

  const handleSkipTime = (timeChange: number) => {
    const audio = audioRef.current;
    if (audio) {
      let newTime = audio.currentTime + timeChange;
      if (newTime < 0) newTime = 0;
      if (newTime > duration) newTime = duration;
      audio.currentTime = newTime;
      setProgress(newTime);
    }
  };

  return (
    <ListPlayerContext.Provider value={{ selectedTrack, setSelectedTrack, isPlaying, setIsPlaying }}>
      <div className={`container-for-sizing-player flex justify-center w-[80%] mx-auto -mt-40 ${styles.boPlayerStyles}`}>
        <ListPlayer
          tracks={audioTracks}
          listInfo={audioListInfo}
          playerMode="small"
          playCallback={handleOnPlay}
          pauseCallback={handleOnPause}
          loop
          kbdShortcuts
        />

        {/* Progress Bar and Skip Buttons */}
        <div className="progress-bar-container flex items-center justify-center mt-4">
          <div className="progress-time-display mr-4">
            {Math.floor(progress / 60)}:{Math.floor(progress % 60).toString().padStart(2, '0')}
          </div>
          <input
            type="range"
            min="0"
            max={duration.toString()}
            value={progress}
            onChange={handleSeek}
            className="progress-bar w-full"
          />
          <div className="progress-time-display ml-4">
            {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
          </div>
        </div>

        <button onClick={() => handleSkipTime(-10)} className="progress-jump progress-jump-backward-btn">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Back 10 Second" id="Back_10_Second">
            <path d="M12,2.79A9.5,9.5,0,0,0,10,3l.17-.35a1,1,0,0,0-.43-1.34,1,1,0,0,0-1.35.43L7.11,4.27a.32.32,0,0,0,0,.09.83.83,0,0,0,0,.15.85.85,0,0,0,0,.23.68.68,0,0,0,0,.14.86.86,0,0,0,.06.23s0,0,0,.06a.71.71,0,0,0,.07.09,1.67,1.67,0,0,0,.12.16l.17.13s0,0,.08.06L10.06,6.9a.91.91,0,0,0,.45.11A1,1,0,0,0,11,5.12l-.38-.19A8.22,8.22,0,0,1,12,4.79a8,8,0,1,1-8,8,1,1,0,0,0-2,0,10,10,0,1,0,10-10Z"/><path d="M10,17a1,1,0,0,1-1-1V12.41H9A1,1,0,0,1,7.58,11L9.29,9.29a1,1,0,0,1,1.09-.21A1,1,0,0,1,11,10v6A1,1,0,0,1,10,17Z"/><path d="M14.5,17A2.5,2.5,0,0,1,12,14.5v-3a2.5,2.5,0,0,1,5,0v3A2.5,2.5,0,0,1,14.5,17Zm0-6a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,1,0v-3A.5.5,0,0,0,14.5,11Z"/></g>
          </svg>
        </button>
        <button onClick={() => handleSkipTime(10)} className="progress-jump progress-jump-forward-btn">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Forward 10 Second" id="Forward_10_Second">
            <path d="M21,11.79a1,1,0,0,0-1,1,8,8,0,1,1-8-8,8.22,8.22,0,0,1,1.41.14L13,5.12A1,1,0,0,0,13.49,7a.91.91,0,0,0,.45-.11l2.52-1.29s.05,0,.08-.06l.17-.13a1.67,1.67,0,0,0,.12-.16.71.71,0,0,0,.07-.09s0,0,0-.06A.86.86,0,0,0,17,4.88a.68.68,0,0,0,0-.14.85.85,0,0,0,0-.23.83.83,0,0,0,0-.15.32.32,0,0,0,0-.09L15.61,1.75a1,1,0,0,0-1.35-.43,1,1,0,0,0-.43,1.34L14,3a9.5,9.5,0,0,0-2-.22,10,10,0,1,0,10,10A1,1,0,0,0,21,11.79Z"/><path d="M10,17a1,1,0,0,1-1-1V12.41H9A1,1,0,0,1,7.58,11L9.29,9.29a1,1,0,0,1,1.09-.21A1,1,0,0,1,11,10v6A1,1,0,0,1,10,17Z"/><path d="M14.5,17A2.5,2.5,0,0,1,12,14.5v-3a2.5,2.5,0,0,1,5,0v3A2.5,2.5,0,0,1,14.5,17Zm0-6a.5.5,0,0,0-.5.5v3a.5.5,0,0,0,1,0v-3A.5.5,0,0,0,14.5,11Z"/></g>
          </svg>
        </button>

        <audio
          ref={audioRef}
          src={selectedTrack !== -1 ? audioSrcs[selectedTrack % audioSrcs.length] : undefined}
          onEnded={() => {
            setSelectedTrack((prev) => (prev !== -1 ? (prev + 1) % audioSrcs.length : 0));
          }}
        />
      </div>
    </ListPlayerContext.Provider>
  );
}