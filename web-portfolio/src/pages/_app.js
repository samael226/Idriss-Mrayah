// pages/_app.js
import { NotificationProvider } from '../contexts/NotificationContext';
import GameProvider from '../components/game/GameProvider';

function MyApp({  pageProps }) {
  return (
    <NotificationProvider>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </NotificationProvider>
  );
}

export default MyApp;