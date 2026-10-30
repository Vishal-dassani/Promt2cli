import AboutCard from '../components/AboutCard.jsx'
import NavBar from '../components/NavBar.jsx'

const About = () => (
  <div className="min-h-screen bg-[#faf9f7] text-slate-900">
    <NavBar />
    <main className="relative isolate overflow-hidden px-5 py-16 sm:px-8 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-40 top-12 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="absolute -right-32 top-80 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_0.7px,transparent_0.7px)] [background-size:24px_24px] opacity-20" />
      </div>

      <div className="mx-auto max-w-5xl">
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-violet-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Simple. Fast. Developer-friendly.
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            About{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              Prompt2CLI
            </span>
          </h1>
          <p className="mt-4 text-xl font-medium text-slate-700 sm:text-2xl">
            From Plain English to Terminal Commands
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Prompt2CLI is an AI-powered tool that transforms natural-language
            instructions into terminal commands, helping developers accomplish
            tasks without having to remember complex command syntax.
          </p>
        </header>

        <section
          aria-label="About Prompt2CLI"
          className="mt-12 grid gap-5 md:grid-cols-2"
        >
          <AboutCard eyebrow="The challenge" title="Why Prompt2CLI?">
            <p>
              Working with the terminal is an essential part of software
              development, but remembering commands and their syntax can
              sometimes slow developers down.
            </p>
            <p className="mt-3">
              Describe what you want to accomplish in plain English, generate
              the corresponding terminal command, and copy it directly to your
              clipboard.
            </p>
          </AboutCard>

          <AboutCard eyebrow="Made for everyone" title="Who Is It For?">
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span aria-hidden="true" className="font-semibold text-violet-600">01</span>
                <span>Developers who want to work more efficiently in the terminal.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="font-semibold text-violet-600">02</span>
                <span>Students who are learning programming and command-line tools.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="font-semibold text-violet-600">03</span>
                <span>Beginners who want to become more comfortable using the terminal.</span>
              </li>
            </ul>
          </AboutCard>

          <div className="md:col-span-2">
            <AboutCard eyebrow="Our purpose" title="Our Goal">
              <p>
                Our goal is to make terminal commands easier to understand and
                use by bridging the gap between natural language and the
                command line.
              </p>
            </AboutCard>
          </div>
        </section>

        <footer className="mt-8 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 px-6 py-10 text-center text-white shadow-xl shadow-violet-200/70 sm:px-12 sm:py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-100">
            Simple. Fast. Developer-Friendly.
          </p>
          <p className="mt-4 text-lg leading-8 text-white/90">
            Describe your task. Generate the command. Review it before running
            it.
          </p>
          <p className="mt-6 text-xl font-semibold tracking-tight sm:text-2xl">
            Prompt2CLI — Your words, translated to terminal.
          </p>
          <a
            className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-violet-700 transition hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            href="#home"
          >
            Try Prompt2CLI
          </a>
        </footer>
      </div>
    </main>
  </div>
)

export default About
