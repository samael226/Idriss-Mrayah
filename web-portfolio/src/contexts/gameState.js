// Initial game state
export const initialState = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  achievements: [],
  visitedSections: [],
  unlockedFeatures: [],
  gameStats: {
    timeSpent: 0,
    clicks: 0,
    pagesVisited: 1
  }
};

// Action types
export const GameActions = {
  ADD_XP: 'ADD_XP',
  UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',
  VISIT_SECTION: 'VISIT_SECTION',
  UPDATE_STATS: 'UPDATE_STATS'
};

// Reducer for game state updates
export function gameReducer(state, action) {
  switch (action.type) {
    case GameActions.ADD_XP: {
      const newXP = state.xp + action.amount;
      if (newXP >= state.xpToNextLevel) {
        return {
          ...state,
          level: state.level + 1,
          xp: newXP - state.xpToNextLevel,
          xpToNextLevel: Math.floor(state.xpToNextLevel * 1.5)
        };
      }
      return { ...state, xp: newXP };
    }
      
    case GameActions.UNLOCK_ACHIEVEMENT:
      if (!state.achievements.includes(action.achievementId)) {
        return {
          ...state,
          achievements: [...state.achievements, action.achievementId],
          xp: state.xp + (action.xp || 50)
        };
      }
      return state;
      
    case GameActions.VISIT_SECTION:
      if (!state.visitedSections.includes(action.sectionId)) {
        return {
          ...state,
          visitedSections: [...state.visitedSections, action.sectionId],
          xp: state.xp + 10
        };
      }
      return state;
      
    case GameActions.UPDATE_STATS:
      return {
        ...state,
        gameStats: {
          ...state.gameStats,
          ...action.updates
        }
      };
      
    default:
      return state;
  }
}

// Helper functions
export const saveGameState = (state) => {
  try {
    localStorage.setItem('gameState', JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save game state', e);
  }
};

export const loadGameState = () => {
  try {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (e) {
    console.error('Failed to load game state', e);
  }
  return null;
};
