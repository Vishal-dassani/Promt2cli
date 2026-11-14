import { useState } from 'react'
import GenerateButton from '../components/GenerateButton.jsx'
import NavBar from '../components/NavBar.jsx'
import PromptInput from '../components/PromptInput.jsx'
import RiskAssessmentMeter from '../components/RiskAssessmentMeter.jsx'
import { generateCommand } from '../services/commandService.js'

const Home = () => {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [shell, setShell] = useState('powershell')
  const shellOptions = [
    { value: 'powershell', label: 'Windows PowerShell / CMD' },
    { value: 'bash', label: 'Linux (Bash)' },
    { value: 'zsh', label: 'macOS (Zsh)' },
  ]

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await generateCommand(prompt.trim(), shell)
      if (typeof data.command !== 'string' || !data.command.trim()) {
        throw new Error('The server returned an empty command.')
      }
      setResult(data)
    } catch (error) {
      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          'Unable to generate command. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] text-slate-900">
      <NavBar />
      <main className="relative isolate flex min-h-[calc(100vh-73px)] flex-col items-center justify-center overflow-hidden px-5 py-16 sm:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-40 top-12 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_0.7px,transparent_0.7px)] [background-size:24px_24px] opacity-20" />
        </div>

        <section className="w-full max-w-3xl">
          <div className="mb-5 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-violet-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Your words, translated to the terminal
            </span>
          </div>

          <h1 className="text-center text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            What do you want
            <span className="mt-1 block bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              your terminal to do?
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-center text-base leading-7 text-slate-600 sm:text-lg">
            Describe a task in plain English. Get the terminal command you need,
            without having to remember the syntax.
          </p>

          {result && (
            <div className="mt-8 space-y-4 rounded-3xl border border-white/80 bg-white/75 p-3 shadow-[0_24px_80px_-32px_rgba(70,50,120,0.28)] backdrop-blur sm:p-5">
              <section
                aria-label="Generated command"
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-white shadow-inner"
              >
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <h2 className="text-sm font-semibold text-slate-200">
                    Generated command
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                      {shellOptions.find((option) => option.value === result.platform)?.label ||
                        result.platform}
                    </span>
                    <button
                      aria-label="Dismiss generated result"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                      onClick={() => setResult(null)}
                      type="button"
                    >
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
                      </svg>
                    </button>
                  </div>
                </div>
                <pre className="overflow-x-auto p-4 text-sm leading-6 text-emerald-300">
                  <code>{result.command}</code>
                </pre>
              </section>
              {result.riskAssessment && (
                <RiskAssessmentMeter assessment={result.riskAssessment} />
              )}
            </div>
          )}

          <div className="mt-10 rounded-3xl border border-white/80 bg-white/75 p-3 shadow-[0_24px_80px_-32px_rgba(70,50,120,0.28)] backdrop-blur sm:p-5">
            <fieldset className="mb-4 px-2">
              <legend className="mb-2 text-sm font-medium text-slate-700">
                Choose your terminal
              </legend>
              <div className="flex flex-wrap gap-2">
                {shellOptions.map((option) => (
                  <label key={option.value} className="cursor-pointer">
                    <input
                      checked={shell === option.value}
                      className="peer sr-only"
                      name="shell"
                      onChange={() => {
                        setShell(option.value)
                        setResult(null)
                      }}
                      type="radio"
                      value={option.value}
                      disabled={loading}
                    />
                    <span className="inline-flex min-h-11 items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-violet-300 peer-checked:border-violet-500 peer-checked:bg-violet-50 peer-checked:text-violet-700 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet-600">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <PromptInput
              disabled={loading}
              onChange={(event) => {
                setPrompt(event.target.value)
                setResult(null)
              }}
              value={prompt}
            />
            {error && (
              <p className="px-2 pt-3 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <div className="flex flex-col items-center justify-between gap-4 px-2 pb-1 pt-4 sm:flex-row sm:px-2">
              <p className="text-center text-sm text-slate-500 sm:text-left">
                Be as specific as you like. No command-line jargon required.
              </p>
              <GenerateButton
                disabled={!prompt.trim() || loading}
                label={loading ? 'Generating...' : 'Generate terminal command'}
                onClick={handleGenerate}
              />
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Always review commands before running them.
          </p>
        </section>
      </main>
    </div>
  )
}

export default Home
