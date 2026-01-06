import { createContext } from 'react';

export const NotificationContext = createContext({
  addNotification: () => {},
  removeNotification: () => {}
});

export { NotificationProvider } from './NotificationContext.jsx';
