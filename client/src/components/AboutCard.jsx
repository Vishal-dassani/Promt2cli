const AboutCard = ({ children, eyebrow, title }) => (
  <article className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm shadow-slate-200/50 sm:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
      {eyebrow}
    </p>
    <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
      {title}
    </h2>
    <div className="mt-4 leading-7 text-slate-600">{children}</div>
  </article>
)

export default AboutCard
