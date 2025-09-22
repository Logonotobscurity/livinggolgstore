
'use client';

import { useState, useRef, useEffect } from 'react';
import { Icons } from './icons';
import { cn } from '@/lib/utils';

interface AmbientPlayerProps {
  src: string | null;
  isLoading?: boolean;
}

export function AmbientPlayer({ src, isLoading }: AmbientPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (audioRef.current) {
        audioRef.current.volume = 0.5;
    }
  }, []);

  useEffect(() => {
    if (src && audioRef.current) {
      audioRef.current.src = src;
    }
  }, [src]);

  const togglePlayPause = () => {
    if (audioRef.current && src) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Reset and play from the beginning
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => console.error("Audio play failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  if (!isMounted) {
    return null;
  }
  
  if (isLoading) {
      return (
          <div className="ambient-player-button justify-center items-center flex">
              <Icons.loader className="w-5 h-5 animate-spin text-primary" />
          </div>
      )
  }

  if (!src) return null;

  return (
    <>
      <audio ref={audioRef} preload="auto" onEnded={() => setIsPlaying(false)} />
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
