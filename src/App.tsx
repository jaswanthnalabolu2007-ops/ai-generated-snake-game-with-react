/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-neon-cyan/30">
      {/* Header */}
      <header className="h-[80px] px-10 flex items-center justify-between border-bottom border-glass-border">
        <div className="text-2xl font-extrabold tracking-[2px] uppercase bg-linear-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">
          Neon Synth
        </div>
        <div className="flex gap-6 text-sm font-semibold tracking-wider uppercase">
          <div className="flex items-center">
            High Score <span className="text-neon-cyan ml-2 font-mono text-lg">{highScore.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            Current <span className="text-neon-cyan ml-2 font-mono text-lg">{score.toLocaleString()}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-[280px_1fr_280px] gap-5 p-5 h-[calc(100vh-180px)]">
        {/* Left Sidebar - Playlist Info */}
        <div className="flex flex-col gap-5">
          <div className="glass-panel p-5 flex-1">
            <p className="text-[12px] uppercase tracking-[1.5px] text-[#b0b0b0] mb-3 pl-1">Your Mix</p>
            <div className="space-y-2">
              <div className="p-3 rounded-lg flex items-center gap-3 bg-neon-pink/15 border border-neon-pink/30">
                <div className="w-10 h-10 rounded bg-[#1a1a2e] flex items-center justify-center border border-glass-border">🎵</div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold truncate">Cyber Pulse</h4>
                  <p className="text-[11px] text-[#b0b0b0]">AI Generator • 03:45</p>
                </div>
              </div>
              <div className="p-3 rounded-lg flex items-center gap-3 hover:bg-white/5 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded bg-[#1a1a2e] flex items-center justify-center border border-glass-border">🎹</div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold truncate">Midnight Grid</h4>
                  <p className="text-[11px] text-[#b0b0b0]">SynthMind • 04:12</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Game Area */}
        <div className="glass-panel relative flex items-center justify-center bg-black/30 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <SnakeGame onScoreChange={handleScoreChange} />
        </div>

        {/* Right Sidebar - Stats */}
        <div className="flex flex-col gap-5">
          <div className="glass-panel p-5 flex-1">
            <p className="text-[12px] uppercase tracking-[1.5px] text-[#b0b0b0] mb-3 pl-1">Game Stats</p>
            <div className="mt-2 space-y-5">
              <div>
                <p className="text-[11px] text-[#b0b0b0] mb-1 uppercase">Multiplier</p>
                <p className="text-2xl font-bold text-neon-pink">x2.5</p>
              </div>
              <div>
                <p className="text-[11px] text-[#b0b0b0] mb-1 uppercase">Recovery</p>
                <div className="w-full h-[6px] bg-white/10 rounded-full">
                  <div className="w-3/4 h-full bg-neon-green rounded-full shadow-[0_0_10px_#39ff14]" />
                </div>
              </div>
              <div className="border-t border-glass-border pt-4">
                <p className="text-[11px] text-[#b0b0b0] leading-relaxed">
                  Snake speed scales with track BPM. Collect rhythm fragments to increase score multiplier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Music Player */}
      <footer className="h-[100px] px-10 border-t border-glass-border">
        <MusicPlayer />
      </footer>
    </div>
  );
}


