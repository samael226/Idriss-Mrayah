import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { 
  initialState, 
  gameReducer, 
  GameActions, 
  saveGameState, 
  loadGameState 
} from './gameState';

// eslint-disable-next-line react-refresh/only-export-components
export const GameContext = createContext();

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, loadGameState() || initialState);
  
  // Save game state to localStorage when it changes
  useEffect(() => {
    saveGameState(state);
  }, [state]);
  
  // Track time spent on site
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({
        type: GameActions.UPDATE_STATS,
        updates: { timeSpent: state.gameStats.timeSpent + 1 }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [state.gameStats.timeSpent]);
  
  // Track page visits
  const trackPageVisit = useCallback((page) => {
    dispatch({
      type: GameActions.VISIT_SECTION,
      sectionId: page
    });
  }, []);
  
  // Unlock achievement helper
  const unlockAchievement = useCallback((achievementId, xp = 50) => {
    if (!state.achievements.includes(achievementId)) {
      dispatch({
        type: GameActions.UNLOCK_ACHIEVEMENT,
        achievementId,
        xp
      });
      return true; // Indicate that achievement was unlocked
    }
    return false; // Achievement was already unlocked
  }, [state.achievements]);
  
  // Add XP helper
  const addXP = useCallback((amount) => {
    dispatch({
      type: GameActions.ADD_XP,
      amount
    });
  }, []);
  
  // Add global click handler
  const handleGlobalClick = useCallback(() => {
    dispatch({
      type: GameActions.UPDATE_STATS,
      updates: { 
        clicks: state.gameStats.clicks + 1 
      }
    });
    
    // Every 10 clicks, add 1 XP
    if ((state.gameStats.clicks + 1) % 10 === 0) {
      addXP(1);
    }
  }, [state.gameStats.clicks, addXP]);
  
  // Add global click listener
  useEffect(() => {
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [handleGlobalClick]);
  
  return (
    <GameContext.Provider 
      value={{ 
        ...state, 
        trackPageVisit, 
        unlockAchievement,
        addXP
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// useGame hook has been moved to src/hooks/useGame.js
