import { Bell, Lock, Palette, ShieldCheck } from 'lucide-react'

const preferences = [
  { title: 'Dark mode', value: 'Enabled' },
  { title: 'Notification delivery', value: 'Email, Push' },
  { title: 'Auto-save timetable', value: 'Every 10 minutes' },
]

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-[#111827] p-6 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Settings</p>
            <h1 className="text-2xl font-semibold text-white">System & profile settings</h1>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110">
            <ShieldCheck className="h-4 w-4" />
            Save preferences
          </button>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[32px] border border-white/10 bg-[#111827] p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-white">Profile settings</h2>
          <p className="mt-2 text-sm text-slate-400">Update your account details and security options for premium access.</p>
          <div className="mt-6 space-y-4">
            {preferences.map((pref) => (
              <div key={pref.title} className="rounded-3xl bg-slate-950/80 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">{pref.title}</p>
                    <p className="text-sm text-slate-400">{pref.value}</p>
                  </div>
                  <button className="rounded-3xl bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10">Update</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-[#111827] p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-white">Notifications</h2>
          <p className="mt-2 text-sm text-slate-400">Choose how your team receives alerts and summary updates.</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 rounded-3xl bg-slate-950/80 p-4">
              <Bell className="h-5 w-5 text-blue-400" />
              <div>
                <p className="font-semibold text-white">Push notifications</p>
                <p className="text-sm text-slate-400">Real-time schedule alerts and reminders.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-3xl bg-slate-950/80 p-4">
              <Palette className="h-5 w-5 text-violet-400" />
              <div>
                <p className="font-semibold text-white">Theme mode</p>
                <p className="text-sm text-slate-400">Keep the dashboard in a professional dark mode.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-3xl bg-slate-950/80 p-4">
              <Lock className="h-5 w-5 text-emerald-400" />
              <div>
                <p className="font-semibold text-white">Security features</p>
                <p className="text-sm text-slate-400">MFA, session management, and secure authentication.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
