import { useState } from 'react'
import ContactReasonCard from '../components/ContactReasonCard.jsx'
import NavBar from '../components/NavBar.jsx'

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
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
              <span aria-hidden="true">✦</span>
              Let&apos;s Connect
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Get in{' '}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Have a question, found a bug, or have an idea to make Prompt2CLI
              better? We&apos;d love to hear from you.
            </p>
            <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
              Whether you&apos;re a developer, a student, or someone exploring
              the command line, your feedback can help us improve.
            </p>
          </header>

          <section
            aria-label="Ways to get in touch"
            className="mt-12 grid gap-4 md:grid-cols-3"
          >
            <ContactReasonCard
              description="Have questions about Prompt2CLI or how it works? Reach out, and we'll do our best to help."
              icon="💬"
              title="General Inquiries"
            />
            <ContactReasonCard
              description="Something not working as expected? Let us know what happened so we can investigate and improve your experience."
              icon="🐛"
              title="Report a Bug"
            />
            <ContactReasonCard
              description="Have an idea for a new feature or improvement? We're always looking for ways to make terminal workflows simpler and more efficient."
              icon="💡"
              title="Share a Suggestion"
            />
          </section>

          <section className="mt-10 grid gap-8 rounded-3xl border border-white/80 bg-white/75 p-5 shadow-[0_24px_80px_-32px_rgba(70,50,120,0.28)] backdrop-blur sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                We&apos;re listening
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Send Us a Message
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Have something to share? Fill out the form and tell us what is
                on your mind.
              </p>
              <div className="mt-8 rounded-2xl bg-violet-50/80 p-5">
                <h3 className="font-semibold text-slate-900">
                  Built for Developers, Improved by You
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Prompt2CLI aims to make command-line workflows simpler,
                  faster, and more approachable. Your questions, feedback, and
                  suggestions help us move toward that goal.
                </p>
              </div>
              <p className="mt-6 text-sm font-medium text-slate-700">
                Prompt2CLI — Your words, translated to terminal.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-700"
                    htmlFor="contact-name"
                  >
                    Name
                  </label>
                  <input
                    autoComplete="name"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    id="contact-name"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label
                    className="mb-2 block text-sm font-medium text-slate-700"
                    htmlFor="contact-email"
                  >
                    Email Address
                  </label>
                  <input
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    id="contact-email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                    type="email"
                  />
                </div>
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-700"
                  htmlFor="contact-subject"
                >
                  Subject
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  id="contact-subject"
                  name="subject"
                  placeholder="What is your message about?"
                  required
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-700"
                  htmlFor="contact-message"
                >
                  Message
                </label>
                <textarea
                  className="min-h-36 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                  id="contact-message"
                  name="message"
                  placeholder="Tell us more about your question, issue, or idea."
                  required
                />
              </div>

              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:w-auto"
                type="submit"
              >
                Send Message
                <span aria-hidden="true">→</span>
              </button>

              {submitted && (
                <p
                  className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900"
                  role="status"
                >
                  The contact form is not connected to a messaging service yet,
                  so your message has not been sent.
                </p>
              )}
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Contact
