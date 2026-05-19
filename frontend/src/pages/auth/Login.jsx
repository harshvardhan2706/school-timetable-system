import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { motion } from 'framer-motion'
import { Lock, Mail } from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loading } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email || !password) {
      setError('Please fill in both fields.')
      return
    }
    setError('')
    try {
      await login({ email, password })
      navigate('/dashboard')
    } catch (err) {
      setError('Unable to sign in. Check credentials and try again.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-page px-4 py-10 text-white">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-[32px] border border-white/10 bg-surface/95 p-8 shadow-soft"
      >
        <div className="mb-8 space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
          <h1 className="text-3xl font-semibold text-white">Sign in to Timetable HQ</h1>
          <p className="text-slate-400">Access teacher, timetable, and analytics workflows in one premium portal.</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block rounded-3xl border border-white/10 bg-slate-950/70 p-4 focus-within:border-blue-400/40">
            <span className="mb-2 block text-sm text-slate-400">Email address</span>
            <div className="flex items-center gap-3 text-slate-400">
              <Mail className="h-4 w-4" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="admin@schoolhq.com"
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </label>
          <label className="block rounded-3xl border border-white/10 bg-slate-950/70 p-4 focus-within:border-blue-400/40">
            <span className="mb-2 block text-sm text-slate-400">Password</span>
            <div className="flex items-center gap-3 text-slate-400">
              <Lock className="h-4 w-4" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </label>
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110"
          >
            {loading ? <LoadingSpinner /> : 'Continue'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          New to the portal?{' '}
          <Link to="/register" className="font-semibold text-white hover:text-blue-300">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
