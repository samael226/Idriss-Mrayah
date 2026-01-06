// Update src/components/game/GameProvider.jsx
import React, { useEffect } from 'react';
import { GameProvider as BaseGameProvider } from '../../contexts/GameContext';
import { useGame } from '../../hooks/useGame';
import { ACHIEVEMENT_RARITY, achievements as achievementsList } from '../../data/achievements';

// Create a map of achievement IDs to achievement objects for quick lookup
const achievementsMap = achievementsList.reduce((map, achievement) => {
  map[achievement.id] = achievement;
  return map;
}, {});
import { useNotification } from '../../hooks/useNotification';
import XPProgress from '../ui/XPProgress';
import Achievements from '../ui/Achievements';

const GameNotifications = () => {
  const { achievements } = useGame();
  const { addNotification } = useNotification();
  const prevAchievements = React.useRef(achievements);

  useEffect(() => {
    // Check for new achievements
    const newAchievements = achievements.filter(
      (achId) => !prevAchievements.current.includes(achId)
    );

    if (newAchievements.length > 0) {
      newAchievements.forEach((achId) => {
        const achievement = achievementsMap[achId];
        if (achievement) {
          addNotification({
            type: 'achievement',
            name: achievement.name,
            description: achievement.desc,
            icon: achievement.icon,
            rarity: achievement.rarity,
            xp: achievement.xp || 0,
          });
          
          // Play sound effect
          if (typeof window !== 'undefined') {
            const audio = new Audio('/sounds/achievement-unlocked.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => console.warn('Audio play failed:', e));
          }
        }
      });
    }

    prevAchievements.current = achievements;
  }, [achievements, addNotification]);

  return null;
};

export const GameProvider = ({ children }) => {
  return (
    <BaseGameProvider>
      {children}
      <GameNotifications />
      <XPProgress />
      <Achievements />
    </BaseGameProvider>
  );
};

export default GameProvider;