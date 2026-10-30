const PromptInput = ({ value, onChange }) => (
  <textarea
    aria-label="Describe the terminal command you need"
    className="min-h-56 w-full resize-y rounded-2xl border border-slate-200 bg-white/80 p-5 text-base leading-7 text-slate-800 shadow-inner shadow-slate-100 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 sm:min-h-64 sm:p-7 sm:text-lg"
    onChange={onChange}
    placeholder="e.g. Find all JavaScript files larger than 1 MB in this folder…"
    value={value}
  />
)

export default PromptInput
