import React, { useState, useEffect } from 'react';
import { useGame } from '../../hooks/useGame';
import { achievements } from '../../data/achievements';

const rarityColors = {
  common: 'bg-gray-400/20 border-gray-400',
  rare: 'bg-blue-400/20 border-blue-400',
  epic: 'bg-purple-400/20 border-purple-400',
  legendary: 'bg-yellow-400/20 border-yellow-400',
  mythic: 'bg-pink-400/20 border-pink-400'
};

const AchievementBadge = ({ achievement }) => {
  const [isNew, setIsNew] = useState(true);
  
  useEffect(() => {
    // Mark as not new after initial render
    const timer = setTimeout(() => setIsNew(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`relative p-4 rounded-lg border ${rarityColors[achievement.rarity] || 'bg-gray-800/50 border-gray-600'} 
      transition-all duration-300 transform ${isNew ? 'scale-105' : 'scale-100'}`}
    >
      {isNew && (
        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
          New!
        </span>
      )}
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-md ${rarityColors[achievement.rarity].replace('bg-', 'bg-opacity-30 bg-').replace('border-', 'border-opacity-50 border-')}`}>
          {achievement.rarity === 'common' && '🏆'}
          {achievement.rarity === 'rare' && '🥈'}
          {achievement.rarity === 'epic' && '🏅'}
          {achievement.rarity === 'legendary' && '🌟'}
          {achievement.rarity === 'mythic' && '💎'}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-white">{achievement.name}</h4>
          <p className="text-sm text-white/70">{achievement.desc}</p>
          <div className="mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              achievement.rarity === 'common' ? 'bg-gray-400/20 text-gray-200' :
              achievement.rarity === 'rare' ? 'bg-blue-400/20 text-blue-200' :
              achievement.rarity === 'epic' ? 'bg-purple-400/20 text-purple-200' :
              achievement.rarity === 'legendary' ? 'bg-yellow-400/20 text-yellow-200' :
              'bg-pink-400/20 text-pink-200'
            }`}>
              {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Achievements = () => {
  const { achievements: unlockedAchievements } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter and sort achievements
  const userAchievements = achievements
    .filter(ach => unlockedAchievements.includes(ach.id))
    .sort((a, b) => {
      const rarityOrder = { common: 1, rare: 2, epic: 3, legendary: 4, mythic: 5 };
      return rarityOrder[b.rarity] - rarityOrder[a.rarity];
    });
  
  const lockedAchievements = achievements
    .filter(ach => !unlockedAchievements.includes(ach.id))
    .sort((a, b) => {
      const rarityOrder = { common: 1, rare: 2, epic: 3, legendary: 4, mythic: 5 };
      return rarityOrder[b.rarity] - rarityOrder[a.rarity];
    });

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 bg-black/70 hover:bg-black/80 backdrop-blur-sm p-3 rounded-full border border-white/10 shadow-lg transition-all duration-200 hover:scale-105"
        aria-label="View achievements"
      >
        <div className="relative">
          🏆
          {userAchievements.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {userAchievements.length}
            </span>
          )}
        </div>
      </button>
      
      {/* Achievements Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-gray-900/95 border border-white/10 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900/80 backdrop-blur-sm p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Achievements</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Close achievements"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="bg-yellow-500/20 text-yellow-400 text-sm px-3 py-1 rounded-full mr-2">
                    {userAchievements.length} / {achievements.length} Unlocked
                  </span>
                  Your Achievements
                </h3>
                {userAchievements.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userAchievements.map(ach => (
                      <AchievementBadge key={ach.id} achievement={ach} />
                    ))}
                  </div>
                ) : (
                  <p className="text-white/50 text-center py-6">No achievements unlocked yet. Keep exploring!</p>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white/70 mb-4">Locked Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lockedAchievements.map(ach => (
                    <div 
                      key={ach.id} 
                      className="p-4 rounded-lg border border-white/5 bg-gray-800/30 opacity-60"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-md bg-gray-700/50">
                          🔒
                        </div>
                        <div>
                          <h4 className="font-medium text-white/70">???</h4>
                          <p className="text-sm text-white/40">Keep exploring to unlock</p>
                          <div className="mt-1">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-400">
                              {ach.rarity.charAt(0).toUpperCase() + ach.rarity.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Achievements;
