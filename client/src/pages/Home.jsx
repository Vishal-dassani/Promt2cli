import { useState } from 'react'
import GenerateButton from '../components/GenerateButton.jsx'
import NavBar from '../components/NavBar.jsx'
import PromptInput from '../components/PromptInput.jsx'

const Home = () => {
  const [prompt, setPrompt] = useState('')

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

          <div className="mt-10 rounded-3xl border border-white/80 bg-white/75 p-3 shadow-[0_24px_80px_-32px_rgba(70,50,120,0.28)] backdrop-blur sm:p-5">
            <PromptInput
              onChange={(event) => setPrompt(event.target.value)}
              value={prompt}
            />
            <div className="flex flex-col items-center justify-between gap-4 px-2 pb-1 pt-4 sm:flex-row sm:px-2">
              <p className="text-center text-sm text-slate-500 sm:text-left">
                Be as specific as you like. No command-line jargon required.
              </p>
              <GenerateButton disabled={!prompt.trim()} />
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
