export const ACHIEVEMENT_CATEGORIES = {
  EXPLORATION: 'exploration',
  INTERACTION: 'interaction',
  MILESTONE: 'milestone',
  SKILL: 'skill',
  SOCIAL: 'social'
};

export const ACHIEVEMENT_RARITY = {
  COMMON: 'common',
  UNCOMMON: 'uncommon',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary',
  MYTHIC: 'mythic'
};

export const achievements = [
  // Exploration Achievements
  {
    id: 'explore-home',
    name: 'First Steps',
    desc: 'Visit the home page',
    category: ACHIEVEMENT_CATEGORIES.EXPLORATION,
    rarity: ACHIEVEMENT_RARITY.COMMON,
    icon: '👣',
    xp: 10
  },
  {
    id: 'explore-projects',
    name: 'Project Explorer',
    desc: 'View all project pages',
    category: ACHIEVEMENT_CATEGORIES.EXPLORATION,
    rarity: ACHIEVEMENT_RARITY.UNCOMMON,
    icon: '🔍',
    xp: 25
  },
  {
    id: 'explore-everywhere',
    name: 'Globetrotter',
    desc: 'Visit every page on the site',
    category: ACHIEVEMENT_CATEGORIES.EXPLORATION,
    rarity: ACHIEVEMENT_RARITY.RARE,
    icon: '🌐',
    xp: 50
  },
  
  // Interaction Achievements
  {
    id: 'interact-click-100',
    name: 'Click Happy',
    desc: 'Click 100 times anywhere',
    category: ACHIEVEMENT_CATEGORIES.INTERACTION,
    rarity: ACHIEVEMENT_RARITY.COMMON,
    icon: '🖱️',
    xp: 15
  },
  {
    id: 'interact-scroll-1000',
    name: 'Scrolling Warrior',
    desc: 'Scroll 1000 pixels',
    category: ACHIEVEMENT_CATEGORIES.INTERACTION,
    rarity: ACHIEVEMENT_RARITY.UNCOMMON,
    icon: '🖱️',
    xp: 20
  },
  {
    id: 'interact-time-30',
    name: 'Time Well Spent',
    desc: 'Spend 30 minutes on the site',
    category: ACHIEVEMENT_CATEGORIES.INTERACTION,
    rarity: ACHIEVEMENT_RARITY.RARE,
    icon: '⏱️',
    xp: 50
  },
  
  // Milestone Achievements
  {
    id: 'milestone-level-5',
    name: 'Rising Star',
    desc: 'Reach level 5',
    category: ACHIEVEMENT_CATEGORIES.MILESTONE,
    rarity: ACHIEVEMENT_RARITY.UNCOMMON,
    icon: '⭐',
    xp: 25
  },
  {
    id: 'milestone-level-10',
    name: 'Veteran',
    desc: 'Reach level 10',
    category: ACHIEVEMENT_CATEGORIES.MILESTONE,
    rarity: ACHIEVEMENT_RARITY.RARE,
    icon: '🏆',
    xp: 50
  },
  {
    id: 'milestone-all-achievements',
    name: 'Completionist',
    desc: 'Unlock all achievements',
    category: ACHIEVEMENT_CATEGORIES.MILESTONE,
    rarity: ACHIEVEMENT_RARITY.LEGENDARY,
    icon: '🏅',
    xp: 100
  },
  
  // Skill Achievements
  {
    id: 'skill-js',
    name: 'JavaScript Ninja',
    desc: 'View the JavaScript projects section',
    category: ACHIEVEMENT_CATEGORIES.SKILL,
    rarity: ACHIEVEMENT_RARITY.COMMON,
    icon: '⚔️',
    xp: 15
  },
  {
    id: 'skill-react',
    name: 'React Master',
    desc: 'View the React projects section',
    category: ACHIEVEMENT_CATEGORIES.SKILL,
    rarity: ACHIEVEMENT_RARITY.UNCOMMON,
    icon: '⚛️',
    xp: 20
  },
  {
    id: 'skill-3d',
    name: '3D Visionary',
    desc: 'Interact with the 3D scene',
    category: ACHIEVEMENT_CATEGORIES.SKILL,
    rarity: ACHIEVEMENT_RARITY.EPIC,
    icon: '🎮',
    xp: 40
  },
  
  // Social Achievements
  {
    id: 'social-contact',
    name: 'Social Butterfly',
    desc: 'Send a message via contact form',
    category: ACHIEVEMENT_CATEGORIES.SOCIAL,
    rarity: ACHIEVEMENT_RARITY.UNCOMMON,
    icon: '💬',
    xp: 25
  },
  {
    id: 'social-share',
    name: 'Share the Love',
    desc: 'Share the portfolio on social media',
    category: ACHIEVEMENT_CATEGORIES.SOCIAL,
    rarity: ACHIEVEMENT_RARITY.RARE,
    icon: '❤️',
    xp: 30
  },
  
  // Easter Egg Achievements
  {
    id: 'easter-egg-console',
    name: 'Console Explorer',
    desc: 'Find the hidden console message',
    category: 'easter-egg',
    rarity: ACHIEVEMENT_RARITY.RARE,
    icon: '🥚',
    hidden: true,
    xp: 20
  },
  {
    id: 'easter-egg-secret',
    name: 'Secret Finder',
    desc: 'Discover a hidden secret',
    category: 'easter-egg',
    rarity: ACHIEVEMENT_RARITY.EPIC,
    icon: '🔑',
    hidden: true,
    xp: 50
  }
];

// Create a map of achievements by ID for quick lookup
export const achievementsMap = achievements.reduce((map, achievement) => {
  map[achievement.id] = achievement;
  return map;
}, {});
