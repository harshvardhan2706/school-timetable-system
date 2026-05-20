import { AnimatePresence } from 'framer-motion'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/auth/Login'
import RegisterPage from './pages/auth/Register'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { LayoutProvider } from './context/LayoutContext'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LayoutProvider>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/*" element={<ProtectedRoute><AppLayout /></ProtectedRoute>} />
            </Routes>
          </AnimatePresence>
        </LayoutProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
