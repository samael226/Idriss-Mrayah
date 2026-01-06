import React from 'react';
import { useGame } from '../../hooks/useGame';

const XPProgress = () => {
  const { level, xp, xpToNextLevel } = useGame();
  const progress = (xp / xpToNextLevel) * 100;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-black/70 backdrop-blur-sm p-4 rounded-lg border border-white/10 shadow-lg max-w-xs w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-white/80">Level {level}</span>
        <span className="text-xs font-mono text-white/60">{xp} / {xpToNextLevel} XP</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-[#e04b43] to-[#ff7b74] h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-xs text-white/60">{Math.round(progress)}% to next level</span>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
        </div>
      </div>
    </div>
  );
};

export default XPProgress;
