import UploadDropzone from '../../components/UploadDropzone'

export default function ExcelUploadPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-[#111827] p-6 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Excel import</p>
            <h1 className="text-2xl font-semibold text-white">Import timetable from spreadsheet</h1>
          </div>
          <p className="max-w-xl text-sm text-slate-400">Upload your latest Excel file and sync the timetable into the school dashboard instantly.</p>
        </div>
      </section>
      <UploadDropzone />
    </div>
  )
}
