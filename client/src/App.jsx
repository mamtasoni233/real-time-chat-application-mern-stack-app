
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Chat from './pages/chat/Chat.jsx'
import Profile from './pages/profile/Profile.jsx'
import userAppstore from './store'
import { useEffect, useState } from 'react'
import apiRequest from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'

const PrivateRoute = ({ children }) => {
  const { userInfo } = userAppstore();
  const isAuthenticated = !!userInfo
  return isAuthenticated ? children : <Navigate to="/auth" />
}

const AuthRoute = ({ children }) => {
  const { userInfo } = userAppstore();
  const isAuthenticated = !!userInfo
  return isAuthenticated ? <Navigate to="/auth" /> : children
}

const App = () => {
  const { userInfo, setUserInfo } = userAppstore();
  const [lodaing, setLodaing] = useState(true)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await apiRequest.get(GET_USER_INFO, { withCredentials: true })
        if (res.status === 200 && res.data.id) {
          setUserInfo(res.data)
        } else {
          setUserInfo(undefined)
        }
      } catch (error) {
        console.log({ error });
        setUserInfo(undefined)
        // toast.error(error.response.data.message)
      } finally {
        setLodaing(false)
      }

    }
    if (!userInfo) {
      getUserData()
    } else {
      setLodaing(false)
    }
  }, [userInfo, setUserInfo])

  if (lodaing) {
    return <div>Loading...</div>
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        }
        />
        <Route path="/chat" element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />


        <Route path='*' element={<Navigate to={'/auth'} />} />
      </Routes >
    </BrowserRouter >
  )
}

export default App