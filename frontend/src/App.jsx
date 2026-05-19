import { AnimatePresence } from 'framer-motion'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/auth/Login'
import RegisterPage from './pages/auth/Register'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={<ProtectedRoute><AppLayout /></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  )
}

export default App
