import { motion } from 'framer-motion'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import DashboardPage from '../pages/dashboard/Dashboard'
import TeachersPage from '../pages/teachers/Teachers'
import ClassesPage from '../pages/classes/Classes'
import SubjectsPage from '../pages/subjects/Subjects'
import TimetablePage from '../pages/timetable/Timetable'
import ReportsPage from '../pages/reports/Reports'
import ExcelUploadPage from '../pages/excel/ExcelUpload'
import SettingsPage from '../pages/settings/Settings'

const pageTransition = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

export default function AppLayout() {
  return (
    <div className="min-h-screen w-full bg-page text-text antialiased overflow-x-hidden">
      {/* Horizontal Layout Flex Matrix
        w-full and max-w structures define strict responsive constraints 
      */}
      <div className="mx-auto flex h-screen w-full max-w-[1600px] gap-6 p-4 md:p-6">
        
        {/* Fixed Width Sidebar Navigation Panel Container */}
        <aside className="hidden md:block w-[280px] shrink-0 h-full">
          <Sidebar />
        </aside>

        {/* Glassmorphism Content Viewport Window
          min-w-0 prevents flex layouts and absolute elements from blowing out width bounds
        */}
        <div className="flex min-w-0 flex-1 flex-col rounded-3xl border border-white/10 bg-surface shadow-soft backdrop-blur-2xl overflow-hidden">
          
          {/* Top Level Section Navigation Header */}
          <Navbar />
          
          {/* Dynamic Render Context View */}
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={pageTransition} 
              className="w-full h-full"
            >
              <Routes>
                <Route path="/" element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="teachers" element={<TeachersPage />} />
                <Route path="classes" element={<ClassesPage />} />
                <Route path="subjects" element={<SubjectsPage />} />
                <Route path="timetable" element={<TimetablePage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="excel-upload" element={<ExcelUploadPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate replace to="dashboard" />} />
              </Routes>
            </motion.div>
          </main>
        </div>

      </div>
    </div>
  )
}