import { useMemo, useState } from 'react'
import { Cloud, CheckCircle2, Upload } from 'lucide-react'

const MAX_PROGRESS = 100

export default function UploadDropzone() {
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('Waiting for file upload')
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(false)

  const fileCountLabel = useMemo(() => `${files.length} file${files.length === 1 ? '' : 's'}`, [files.length])

  const updateFiles = (incomingFiles) => {
    const accepted = Array.from(incomingFiles).filter((file) => file.name.endsWith('.xlsx'))
    if (accepted.length > 0) {
      setFiles(accepted)
      setStatus('Ready to import')
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((value) => {
          if (value >= MAX_PROGRESS) {
            clearInterval(interval)
            setStatus('Upload complete')
            return MAX_PROGRESS
          }
          return value + 18
        })
      }, 170)
    } else {
      setStatus('Only .xlsx files are supported')
    }
  }

  const onDrop = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setActive(false)
    updateFiles(event.dataTransfer.files)
  }

  const onChange = (event) => {
    updateFiles(event.target.files)
  }

  return (
    <div className="rounded-[32px] border border-white/10 bg-[#111827] p-6 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="rounded-3xl bg-blue-500/10 p-4 text-blue-300">
          <Upload className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Excel import</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Drag and drop your timetable file</h2>
          <p className="mt-2 text-slate-400">Upload Excel to automatically populate classes, teachers, and schedule slots.</p>
        </div>
      </div>
      <div
        onDragEnter={() => setActive(true)}
        onDragLeave={() => setActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className={`mt-6 rounded-[28px] border border-dashed px-6 py-12 text-center transition ${
          active ? 'border-blue-500/60 bg-slate-900/80' : 'border-white/10 bg-slate-950/80'
        }`}
      >
        <input type="file" accept=".xlsx" onChange={onChange} className="hidden" id="excel-file-input" />
        <label htmlFor="excel-file-input" className="cursor-pointer">
          <Cloud className="mx-auto mb-5 h-12 w-12 text-blue-400" />
          <p className="text-lg font-semibold text-white">Drag files here to start import</p>
          <p className="mt-3 text-sm text-slate-500">Supports .xlsx files. No file? Click to browse.</p>
        </label>
      </div>
      <div className="mt-6 rounded-3xl bg-slate-950/70 p-4 text-sm text-slate-400">
        <div className="flex items-center justify-between">
          <span>{status}</span>
          <span className="font-semibold text-white">{fileCountLabel}</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      {files.length > 0 && (
        <div className="mt-6 grid gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-4">
          {files.map((file) => (
            <div key={file.name} className="flex items-center justify-between gap-4 rounded-3xl bg-slate-900/80 px-4 py-3">
              <div>
                <p className="font-semibold text-white">{file.name}</p>
                <p className="text-sm text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
