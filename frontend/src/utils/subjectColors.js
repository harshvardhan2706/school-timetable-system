const subjectColors = {
  Mathematics:
    'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-100 shadow-blue-500/10',
  Science:
    'from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-100 shadow-emerald-500/10',
  English:
    'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-100 shadow-violet-500/10',
  History:
    'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-100 shadow-amber-500/10',
  Geography:
    'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-100 shadow-amber-500/10',
  Art:
    'from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30 text-fuchsia-100 shadow-fuchsia-500/10',
  PE:
    'from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-100 shadow-sky-500/10',
  Music:
    'from-violet-500/20 to-fuchsia-500/20 border-violet-500/30 text-violet-100 shadow-violet-500/10',
  Chemistry:
    'from-cyan-500/20 to-sky-500/20 border-cyan-500/30 text-cyan-100 shadow-cyan-500/10',
  Biology:
    'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-100 shadow-emerald-500/10',
  'Mathematics Advanced':
    'from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-100 shadow-sky-500/10',
  default:
    'from-slate-700/20 to-slate-800/20 border-slate-600/30 text-slate-100 shadow-slate-500/10',
};

export function getSubjectColorClasses(subject) {
  return subjectColors[subject] || subjectColors.default;
}

export default subjectColors;
