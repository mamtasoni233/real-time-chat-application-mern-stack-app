
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Chat from './pages/chat/Chat.jsx'
import Profile from './pages/profile/Profile.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />


        <Route path='*' element={<Navigate to={'/auth'} />}></Route>
      </Routes >
    </BrowserRouter >
  )
}

export default App