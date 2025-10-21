import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import System from './pages/System.jsx'
import Logs from './pages/Logs.jsx'
import Achievements from './pages/Achievements.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/system" element={<System />} />
      <Route path="/logs" element={<Logs />} />
      <Route path="/achievements" element={<Achievements />} />
    </Routes>
  )
}

export default App
