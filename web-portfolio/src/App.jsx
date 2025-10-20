import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import System from './pages/System.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/system" element={<System />} />
    </Routes>
  )
}

export default App
