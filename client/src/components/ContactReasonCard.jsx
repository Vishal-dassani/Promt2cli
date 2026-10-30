const ContactReasonCard = ({ description, icon, title }) => (
  <article className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm shadow-slate-200/50 sm:p-6">
    <span
      aria-hidden="true"
      className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-xl"
    >
      {icon}
    </span>
    <h2 className="mt-4 font-semibold text-slate-900">{title}</h2>
    <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
  </article>
)

export default ContactReasonCard
