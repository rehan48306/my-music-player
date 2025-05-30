import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useRef, useEffect } from "react";

interface Track {
  id: string;
  name: string;
  url: string;
  duration?: number;
  artist?: string;
}

interface AudioContextType {
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>>;
  currentTrack: Track | undefined;
  currentTrackIndex: number;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  play: (index: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  togglePlayPause: () => void;
  progress: number;
  duration: number;
  seek: (time: number) => void;
  volume: number;
  setVolume: (level: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentIndex];

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setProgress(audioRef.current.currentTime);
      }
    };

    const handleDurationChange = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    const handleEnded = () => {
      nextTrack();
    };

    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('durationchange', handleDurationChange);
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('durationchange', handleDurationChange);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.url;
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const nextTrack = () => {
    if (tracks.length === 0) return;
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  };

  const previousTrack = () => {
    if (tracks.length === 0) return;
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const setAudioVolume = (level: number) => {
    const clampedLevel = Math.max(0, Math.min(1, level));
    setVolume(clampedLevel);
  };

  return (
    <AudioContext.Provider value={{
      tracks,
      setTracks,
      currentTrack,
      currentTrackIndex: currentIndex,
      isPlaying,
      setIsPlaying,
      play,
      nextTrack,          // Renamed from playNext
      previousTrack,      // Renamed from playPrevious
      togglePlayPause,
      progress,
      duration,
      seek,
      volume,
      setVolume: setAudioVolume
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};