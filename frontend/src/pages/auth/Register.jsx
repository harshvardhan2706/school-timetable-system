import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { motion } from 'framer-motion'
import { Lock, Mail, User } from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, loading } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name || !email || !password) {
      setError('Please complete all registration fields.')
      return
    }
    setError('')
    try {
      await register({ name, email, password })
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-page px-4 py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 xl:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-[32px] border border-white/10 bg-surface/80 p-10 shadow-soft backdrop-blur-xl"
        >
          <span className="inline-flex rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-blue-300">
            Welcome to Timetable HQ
          </span>
          <h1 className="mt-6 text-4xl font-semibold text-white">Launch your school operations with confidence.</h1>
          <p className="mt-4 max-w-xl text-slate-400">
            A modern academic dashboard for timetable planning, teacher workflows, and performance analytics.
            Setup your institution and start managing schedules without the clutter.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/80 p-5 shadow-inner shadow-slate-950/40">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Instant setup</p>
              <p className="mt-3 text-sm text-slate-300">Create your first timetable in minutes with built-in templates.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5 shadow-inner shadow-slate-950/40">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Secure access</p>
              <p className="mt-3 text-sm text-slate-300">Protect faculty accounts with JWT authentication and enterprise controls.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-slate-950/95 p-10 shadow-soft"
        >
          <div className="mb-8 space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Create account</p>
            <h2 className="text-3xl font-semibold text-white">Get started with Timetable HQ</h2>
            <p className="text-slate-400">Build your school schedule, staff roster and analytics in one premium dashboard.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block rounded-3xl border border-white/10 bg-[#111827] p-4 transition focus-within:border-blue-400/50">
              <span className="mb-2 block text-sm text-slate-400">Full name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Jane Doe"
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </label>
            <label className="block rounded-3xl border border-white/10 bg-[#111827] p-4 transition focus-within:border-blue-400/50">
              <span className="mb-2 block text-sm text-slate-400">Email address</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="admin@schoolhq.com"
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </label>
            <label className="block rounded-3xl border border-white/10 bg-[#111827] p-4 transition focus-within:border-blue-400/50">
              <span className="mb-2 block text-sm text-slate-400">Password</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Create a password"
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </label>
            {error && <p className="rounded-3xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110"
            >
              {loading ? <LoadingSpinner /> : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-white hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
