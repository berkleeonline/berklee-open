import { useState, useRef, useEffect } from 'react';
import { ListPlayer, ListPlayerContext } from 'react-list-player';
import styles from './_BoListPlayer.module.scss';

// This is just a sample listInfo object
const testListInfo: listInfo = {
  type: 'playlist',
  name: 'Royalty Free Playlist',
  creationDate: "1/16/2024",
  numTracks: 10,
  duration: "24 min"
}

// This is just a sample track array
const testTracks: track[] = [
  {
    title: [
        {
            type: 'text',
            content: 'Berklee HAPPY test',
            className: 'title'
        }
    ],
    artist: [
        {
            type: 'text',
            content: 'Berklee HAPPY test',
            className: 'artist',
            link: 'https://music.youtube.com/channel/UCmGqnW6VmhOV4KW67vhzPCA'
        }
    ],
    album: [
        {
            type: 'text',
            content: 'SoulProdMusic',
            className: 'album'
        }
    ],
    duration: "0:32",
    imageSrc: "https://cdn.pixabay.com/audio/2023/03/19/12-27-22-207_200x200.jpg"
  },
  {
      title: [
          {
              type: 'text',
              content: 'My Universe',
              className: 'title'
          },
          {
              type: 'badge',
              content: 'New',
              className: 'new'
          }
      ],
      artist: [
          {
              type: 'text',
              content: 'Peter Nesterouk',
              className: 'artist',
              link: 'https://pixabay.com/users/nesterouk-34392616/'
          }
      ],
      album: [
          {
              type: 'text',
              content: 'Nesterouk',
              className: 'album'
          }
      ],
      duration: "2:27",
      imageSrc: "https://cdn.pixabay.com/audio/2023/04/24/09-30-22-297_200x200.jpg"
  },
  {
      title: [
          {
              type: 'text',
              content: 'Good Night',
              className: 'title'
          },
          {
              type: 'badge',
              content: 'New',
              className: 'new'
          }
      ],
      artist: [
          {
              type: 'text',
              content: 'FASS',
              className: 'artist',
              link: 'https://pixabay.com/users/fassounds-3433550/',
              externalLink: true
          }
      ],
      album: [
          {
              type: 'text',
              content: 'FASSounds',
              className: 'album'
          }
      ],
      duration: "2:27",
      imageSrc: "https://cdn.pixabay.com/audio/2023/07/30/13-02-32-179_200x200.jpg"
  },
  {
    title: [
        {
            type: 'text',
            content: 'Tokyo Cafe',
            className: 'title'
        }
    ],
    artist: [
        {
            type: 'text',
            content: 'TVARI',
            className: 'artist'
        }
    ],
    album: [
        {
            type: 'text',
            content: 'TVARI',
            className: 'album'
        },
        {
            type: 'badge',
            content: 'E',
            className: 'explicit'
        }
    ],
    duration: "2:33",
    imageSrc: "https://cdn.pixabay.com/audio/2023/07/22/02-53-18-138_200x200.jpg"
  },
  {
      title: [
          {
              type: 'text',
              content: 'Hear Me',
              className: 'title'
          }
      ],
      artist: [
          {
              type: 'text',
              content: 'Keyframe Audio ',
              className: 'artist',
              link: 'https://pixabay.com/users/keyframe_audio-32058364/',
              externalLink: true
          }
      ],
      album: [
          {
              type: 'text',
              content: 'Seductive Chill Hip Hop Instrumental',
              className: 'album'
          }
      ],
      duration: "2:46",
      imageSrc: "https://cdn.pixabay.com/audio/2023/01/15/23-41-58-198_200x200.jpg"
  },
  {
      title: [
          {
              type: 'text',
              content: 'Baby Mandala',
              className: 'title'
          }
      ],
      artist: [
          {
              type: 'badge',
              content: 'New',
              className: 'new'
          },
          {
              type: 'text',
              content: 'Praz Khanal',
              className: 'artist',
              link: 'https://pixabay.com/users/prazkhanal-24653570/'
          }
      ],
      album: [
          {
              type: 'text',
              content: 'prazkhanal',
              className: 'album'
          }
      ],
      duration: "3:11",
      imageSrc: "https://cdn.pixabay.com/audio/2023/10/03/03-34-18-650_200x200.jpg"
  },
  {
      title: [
          {
              type: 'text',
              content: 'Midnight Forest',
              className: 'title'
          }
      ],
      artist: [
          {
              type: 'text',
              content: 'Syouki Takahashi',
              className: 'artist',
              link: 'https://pixabay.com/users/syouki_takahashi-3820204/'
          }
      ],
      album: [
          {
              type: 'text',
              content: 'Royalty Free Collection',
              className: 'album'
          }
      ],
      duration: "2:48",
      imageSrc: "https://cdn.pixabay.com/audio/2024/01/05/01-14-43-61_200x200.jpg"
  },
  {
      title: [
          {
              type: 'text',
              content: 'Separation',
              className: 'title'
          }
      ],
      artist: [
          {
              type: 'text',
              content: 'William King',
              className: 'artist',
              link: 'https://pixabay.com/users/william_king-33448498/'
          }
      ],
      album: [
          {
              type: 'text',
              content: 'Royalty Free Music',
              className: 'album'
          }
      ],
      duration: "2:19",
      imageSrc: "https://cdn.pixabay.com/audio/2024/01/10/15-04-26-897_200x200.jpg"
  },
  {
      title: [
          {
              type: 'text',
              content: 'Drive Breakbeat',
              className: 'title'
          }
      ],
      artist: [
          {
              type: 'text',
              content: 'Zakhar Dziubenko',
              className: 'artist',
              link: 'https://pixabay.com/users/rockot-1947599/'
          }
      ],
      album: [
          {
              type: 'text',
              content: "Rockot",
              className: 'album'
          }
      ],
      duration: "1:49",
      imageSrc: "https://cdn.pixabay.com/audio/2023/10/24/15-08-22-671_200x200.jpg"
  },
  {
      title: [
          {
              type: 'text',
              content: "Glossy",
              className: 'title'
          }
      ],
      artist: [
          {
              type: 'text',
              content: 'Yrii Semchyshyn',
              className: 'artist',
              link: 'https://pixabay.com/users/coma-media-24399569/'
          }
      ],
      album: [
          {
              type: 'text',
              content: 'Coma Media',
              className: 'album'
          }
      ],
      duration: "1:33",
      imageSrc: "https://cdn.pixabay.com/photo/2018/07/14/22/53/currants-3538617_1280.jpg"
  }
]

export default function BoListPlayer() {
    const [selectedTrack, setSelectedTrack] = useState(-1);   // -1 means no track is selected
    const [isPlaying, setIsPlaying] = useState(false);        // play/pause
    const [isMuted, setIsMuted] = useState(false);            // mute/unmute
    const [playerMode, setPlayerMode] = useState("large");
    const [progress, setProgress] = useState(0);              // Track progress in seconds
    const [duration, setDuration] = useState(0);              // Track total duration in seconds
  
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioSrcs = [
      "https://assets.online.berklee.edu/berklee-open-placeholder/Lesson_1_Happy_BPM+125.mp3", 
      "/free-audio/my universe.mp3", 
      // More audio sources...
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
    }, [selectedTrack]);
  
    const handleOnPlay = (index: number, resume: boolean) => {
      if (index === selectedTrack && !resume) {
        audioRef.current?.load();
        audioRef.current?.play();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(true);
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
  
    return (
      <ListPlayerContext.Provider value={{ selectedTrack, setSelectedTrack, isPlaying, setIsPlaying, isMuted, setIsMuted }}>
        <div className={`container-for-sizing-player flex justify-center w-[75%] mx-auto -mt-40 ${styles.boPlayerStyles}`}>
          <ListPlayer 
            tracks={testTracks} 
            listInfo={testListInfo} 
            playerMode={playerMode}
            playCallback={handleOnPlay} 
            pauseCallback={handleOnPause}
            loop
            kbdShortcuts
          />
          {/* Progress Bar */}
          <div className="progress-bar-container flex items-center justify-center mt-4">
            <div className="progress-time-display ml-4">
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
        </div>
        <audio
          ref={audioRef}
          src={selectedTrack < audioSrcs.length ? audioSrcs[selectedTrack % audioSrcs.length] : undefined}
          muted={isMuted}
          onEnded={() => { setSelectedTrack((prev) => (prev + 1) % audioSrcs.length); }}
        />
      </ListPlayerContext.Provider>
    );
  }