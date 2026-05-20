import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom' // <-- 1. Routes ki jagah Outlet import karein
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useLayout } from '../context/LayoutContext'

const pageTransition = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

export default function AppLayout() {
  const { sidebarOpen, closeSidebar } = useLayout()

  return (
    <div className="min-h-screen w-full bg-page text-text antialiased overflow-x-hidden">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] gap-6 p-4 md:p-6">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-[280px] shrink-0 h-full">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar Backdrop */}
        <div 
          className={`fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
            sidebarOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`} 
          onClick={closeSidebar} 
        />
        
        {/* Mobile Sidebar Drawer */}
        <aside 
          className={`fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r border-white/10 bg-page p-4 pb-8 shadow-2xl transition-transform duration-300 md:hidden ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar />
        </aside>

        {/* Main Application Window */}
        <div className="flex min-w-0 flex-1 flex-col rounded-3xl border border-white/10 bg-surface shadow-soft backdrop-blur-2xl overflow-hidden">
          <Navbar />

          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            <motion.div initial="hidden" animate="visible" variants={pageTransition} className="w-full h-full">
              
              {/* 2. SAARE NESTED PAGES AB IS OUTLET KI JAGAH RENDER HONGE */}
              <Outlet />

            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}