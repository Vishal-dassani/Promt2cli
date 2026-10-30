const GenerateButton = ({ disabled = false, onClick }) => (
  <button
    className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-violet-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:w-auto"
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m8 7-5 5 5 5m8-10 5 5-5 5m-2-12-4 14" />
    </svg>
    Generate terminal command
  </button>
)

export default GenerateButton
