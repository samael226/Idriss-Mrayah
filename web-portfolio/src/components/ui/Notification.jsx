// src/components/ui/Notification.jsx
import React, { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ACHIEVEMENT_RARITY } from '../../data/achievements';

const Notification = ({ notification, onClose }) => {
  const notificationRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification, onClose]);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case ACHIEVEMENT_RARITY.COMMON:
        return 'bg-gray-600/90 border-gray-400';
      case ACHIEVEMENT_RARITY.UNCOMMON:
        return 'bg-green-600/90 border-green-400';
      case ACHIEVEMENT_RARITY.RARE:
        return 'bg-blue-600/90 border-blue-400';
      case ACHIEVEMENT_RARITY.EPIC:
        return 'bg-purple-600/90 border-purple-400';
      case ACHIEVEMENT_RARITY.LEGENDARY:
        return 'bg-yellow-600/90 border-yellow-400';
      case ACHIEVEMENT_RARITY.MYTHIC:
        return 'bg-pink-600/90 border-pink-400';
      default:
        return 'bg-gray-600/90 border-gray-400';
    }
  };

  if (!notification) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={notificationRef}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`fixed right-6 top-6 z-50 max-w-sm w-full p-4 rounded-lg shadow-xl backdrop-blur-sm border-l-4 ${getRarityColor(notification.rarity)}`}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <div className="text-2xl">{notification.icon}</div>
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-white">
              Achievement Unlocked!
            </p>
            <p className="mt-1 text-sm text-white/90 font-bold">
              {notification.name}
            </p>
            <p className="mt-1 text-xs text-white/70">
              {notification.description}
            </p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs font-mono text-white/70">
                +{notification.xp} XP
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                {notification.rarity}
              </span>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onClose}
              className="inline-flex text-white/70 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;