// src/contexts/NotificationContext.jsx
import React, { useState, useCallback, useEffect } from 'react';
import Notification from '../components/ui/Notification';

// XP required for each level (exponential scaling)
const XP_LEVELS = Array(100).fill(0).map((_, i) => Math.floor(100 * Math.pow(1.5, i)));

// Achievement definitions
const ACHIEVEMENTS = {
  FIRST_PROJECT: {
    id: 'first_project',
    title: 'First Project!',
    description: 'Added your first project to the portfolio',
    xp: 50,
    icon: '🏆'
  },
  LEVEL_5: {
    id: 'level_5',
    title: 'Level 5 Reached!',
    description: 'You\'ve reached level 5',
    xp: 0,
    icon: '⭐',
    requiredLevel: 5
  },
  CODE_MASTER: {
    id: 'code_master',
    title: 'Code Master',
    description: 'Added 5 projects to your portfolio',
    xp: 100,
    icon: '👨‍💻',
    requiredProjects: 5
  }
};

const NotificationContext = React.createContext({
  // Notifications
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
  
  // User Stats
  stats: {
    level: 1,
    xp: 0,
    nextLevelXp: 0,
    xpToNextLevel: 0,
    projectsCompleted: 0,
    achievements: []
  },
  
  // Actions
  addXp: () => {},
  completeProject: () => {},
  getAchievement: () => {}
});

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    level: 1,
    xp: 0,
    nextLevelXp: XP_LEVELS[0],
    xpToNextLevel: XP_LEVELS[0],
    projectsCompleted: 0,
    achievements: []
  });

  // Load saved stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('userStats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Failed to load user stats', e);
      }
    }
  }, []);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(stats));
  }, [stats]);

  const addXp = useCallback((amount) => {
    setStats(prev => {
      const newXp = prev.xp + amount;
      const nextLevelXp = XP_LEVELS[prev.level - 1] || XP_LEVELS[XP_LEVELS.length - 1];
      let newLevel = prev.level;
      let xpToNextLevel = nextLevelXp - newXp;
      let leveledUp = false;

      // Check for level up
      if (newXp >= nextLevelXp) {
        newLevel += 1;
        xpToNextLevel = XP_LEVELS[newLevel - 1] - (newXp - nextLevelXp);
        leveledUp = true;
      }

      const newStats = {
        ...prev,
        xp: newXp,
        level: newLevel,
        nextLevelXp: XP_LEVELS[newLevel - 1] || XP_LEVELS[XP_LEVELS.length - 1],
        xpToNextLevel
      };

      // Check for level-based achievements
      checkAchievements(newStats);

      if (leveledUp) {
        addNotification({
          type: 'success',
          title: `Level ${newLevel} Unlocked!`,
          message: `You've reached level ${newLevel}! Keep it up!`
        });
      }

      return newStats;
    });
  }, [stats.level]);

  const completeProject = useCallback(() => {
    setStats(prev => {
      const newProjectsCompleted = prev.projectsCompleted + 1;
      const newStats = {
        ...prev,
        projectsCompleted: newProjectsCompleted
      };

      // Check for project-based achievements
      checkAchievements(newStats);

      // Add XP for completing a project
      addXp(25);

      return newStats;
    });
  }, [addXp]);

  const checkAchievements = useCallback((currentStats) => {
    const newAchievements = [...currentStats.achievements];

    // Check for first project
    if (currentStats.projectsCompleted >= 1 && !newAchievements.includes('first_project')) {
      newAchievements.push('first_project');
      addNotification({
        type: 'success',
        title: 'Achievement Unlocked!',
        message: ACHIEVEMENTS.FIRST_PROJECT.description
      });
      addXp(ACHIEVEMENTS.FIRST_PROJECT.xp);
    }

    // Check for level 5
    if (currentStats.level >= 5 && !newAchievements.includes('level_5')) {
      newAchievements.push('level_5');
      addNotification({
        type: 'success',
        title: 'Achievement Unlocked!',
        message: ACHIEVEMENTS.LEVEL_5.description
      });
    }

    // Check for code master
    if (currentStats.projectsCompleted >= 5 && !newAchievements.includes('code_master')) {
      newAchievements.push('code_master');
      addNotification({
        type: 'success',
        title: 'Achievement Unlocked!',
        message: ACHIEVEMENTS.CODE_MASTER.description
      });
      addXp(ACHIEVEMENTS.CODE_MASTER.xp);
    }

    setStats(prev => ({
      ...prev,
      achievements: [...new Set(newAchievements)]
    }));
  }, [addXp]);

  const addNotification = useCallback(({ type = 'info', title, message, duration = 5000 }) => {
    const id = Date.now().toString();
    const notification = { id, type, title, message };
    
    setNotifications(prev => [...prev, notification]);
    
    if (duration > 0) {
      setTimeout(() => removeNotification(id), duration);
    }
    
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const getAchievement = useCallback((achievementId) => {
    return ACHIEVEMENTS[achievementId] || null;
  }, []);

  const contextValue = {
    // Notifications
    notifications,
    addNotification,
    removeNotification,
    
    // Stats
    stats,
    
    // Actions
    addXp,
    completeProject,
    getAchievement
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;