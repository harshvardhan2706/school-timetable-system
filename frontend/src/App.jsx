import { AnimatePresence } from 'framer-motion'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/auth/Login'
import RegisterPage from './pages/auth/Register'

// Saare Pages ko import kiya
import DashboardPage from './pages/dashboard/Dashboard'
import TeachersPage from './pages/teachers/Teachers'
import ClassesPage from './pages/classes/Classes'
import SubjectsPage from './pages/subjects/Subjects'
import TimetablePage from './pages/timetable/Timetable'
import ReportsPage from './pages/reports/Reports'
import ExcelUploadPage from './pages/excel/ExcelUpload'
import SettingsPage from './pages/settings/Settings'

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
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Layout Routes (Nested under /dashboard to match Sidebar) */}
              <Route path="/dashboard" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                {/* Jab user direct '/dashboard' par aayega, toh DashboardPage dikhega */}
                <Route index element={<DashboardPage />} /> 
                
                {/* Ab yeh saare paths '/dashboard/teachers', '/dashboard/classes' ban jayenge */}
                <Route path="teachers" element={<TeachersPage />} />
                <Route path="classes" element={<ClassesPage />} />
                <Route path="subjects" element={<SubjectsPage />} />
                <Route path="timetable" element={<TimetablePage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="excel-upload" element={<ExcelUploadPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* URL Root handle karne ke liye (Agar user direct '/' par aaye toh dashboard bhej do) */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Fallback global redirect */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AnimatePresence>
        </LayoutProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App