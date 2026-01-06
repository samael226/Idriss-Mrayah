import { Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import Landing from './pages/Landing.jsx';
import System from './pages/System.jsx';
import Logs from './pages/Logs.jsx';
import Achievements from './pages/Achievements.jsx';
import Contact from './pages/Contact.jsx';
import GameProvider from './components/game/GameProvider.jsx';

function App() {
  return (
    <NotificationProvider>
      <GameProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/system" element={<System />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </GameProvider>
    </NotificationProvider>
    
  )
}

export default App

