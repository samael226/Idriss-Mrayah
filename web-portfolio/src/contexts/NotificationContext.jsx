// src/contexts/NotificationContext.jsx
import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Notification from '../components/ui/Notification';
import { NotificationContext } from './NotificationContext';

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = uuidv4();
    setNotifications((prev) => [...prev, { id, ...notification }]);
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const contextValue = {
    addNotification,
    removeNotification,
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