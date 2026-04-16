import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MUSIC_TRACKS } from '../constants';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = MUSIC_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress || 0);
    }
  };

  const handleTrackEnd = () => {
    handleNext();
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % MUSIC_TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-full grid grid-cols-[1fr_2fr_1fr] items-center gap-8">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />
      
      {/* Left: Now Playing */}
      <div className="flex items-center gap-4">
        <div className="w-[60px] h-[60px] rounded-lg bg-linear-to-br from-[#2c1a4d] to-[#0d1b2a] border border-glass-border overflow-hidden">
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-[16px] font-bold truncate">{currentTrack.title}</h3>
          <p className="text-[12px] text-[#b0b0b0] truncate">{currentTrack.artist} - Digital Dreams</p>
        </div>
      </div>

      {/* Center: Controls & Progress */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-8">
          <button 
            onClick={handlePrev}
            className="text-white hover:text-neon-cyan transition-colors text-xl"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full transition-all hover:scale-110 active:scale-90"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
          </button>

          <button 
            onClick={handleNext}
            className="text-white hover:text-neon-cyan transition-colors text-xl"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
        </div>
        
        <div className="w-full h-1 bg-glass-border rounded-full relative overflow-hidden">
          <motion.div 
            className="h-full bg-neon-cyan shadow-[0_0_10px_#00ffff]"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
          />
        </div>
      </div>

      {/* Right: Volume/Meta */}
      <div className="flex justify-end items-center gap-3 text-[#b0b0b0]">
        <Volume2 className="w-4 h-4" />
        <div className="w-20 h-[3px] bg-white/20 rounded-full">
          <div className="w-[60%] h-full bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
}

