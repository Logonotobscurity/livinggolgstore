
'use client';

import { useState, useRef, useEffect } from 'react';
import { Icons } from './icons';
import { cn } from '@/lib/utils';

interface AmbientPlayerProps {
  src: string;
}

export function AmbientPlayer({ src }: AmbientPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (audioRef.current) {
        audioRef.current.volume = 0.3;
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error("Audio play failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        onClick={togglePlayPause}
        className={cn("ambient-player-button", isPlaying && "is-playing")}
        aria-label={isPlaying ? "Pause ambient sound" : "Play ambient sound"}
      >
        <div className="icon-wrapper">
          <div className="icon-play">
            <Icons.play className="w-5 h-5" />
          </div>
          <div className="icon-pause">
            <Icons.pause className="w-5 h-5" />
          </div>
        </div>
      </button>
    </>
  );
}
