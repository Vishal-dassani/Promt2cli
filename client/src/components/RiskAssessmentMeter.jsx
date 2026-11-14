import { useEffect, useState } from 'react'

const segments = [
  { label: 'Low', color: '#10b981' },
  { label: 'Moderate', color: '#84cc16' },
  { label: 'Elevated', color: '#eab308' },
  { label: 'High', color: '#f97316' },
  { label: 'Critical', color: '#ef4444' },
]

const pointOnArc = (angle, radius = 88) => {
  const radians = (angle * Math.PI) / 180
  return {
    x: 120 + radius * Math.cos(radians),
    y: 112 + radius * Math.sin(radians),
  }
}

const RiskAssessmentMeter = ({ assessment }) => {
  const score = Number(assessment?.score)
  const hasValidScore = Number.isFinite(score) && score >= 1 && score <= 10
  const displayScore = hasValidScore ? score : 1
  const normalizedScore = (displayScore - 1) / 9
  const targetRotation = -90 - normalizedScore * 180
  const [needleRotation, setNeedleRotation] = useState(-90)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setNeedleRotation(targetRotation))
    return () => cancelAnimationFrame(frame)
  }, [targetRotation])

  if (!hasValidScore) return null

  const riskColor = segments[Math.min(Math.floor((score - 1) / 2), 4)]
  const level = assessment.level || riskColor.label

  return (
    <section
      aria-label="Command risk assessment"
      className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div
          aria-label={`Risk score ${score} out of 10, ${level}`}
          className="mx-auto w-full max-w-64 shrink-0 sm:mx-0 sm:w-56"
          role="img"
        >
          <svg className="w-full overflow-visible" viewBox="0 0 240 142">
            {segments.map((segment, index) => {
              const start = 180 + index * 36 + 2
              const end = 180 + (index + 1) * 36 - 2
              const startPoint = pointOnArc(start)
              const endPoint = pointOnArc(end)

              return (
                <path
                  key={segment.label}
                  d={`M ${startPoint.x} ${startPoint.y} A 88 88 0 0 1 ${endPoint.x} ${endPoint.y}`}
                  fill="none"
                  stroke={segment.color}
                  strokeLinecap="round"
                  strokeWidth="13"
                />
              )
            })}
            <g
              style={{
                transform: `rotate(${needleRotation}deg)`,
                transformOrigin: '120px 112px',
                transition: 'transform 900ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <line
                x1="120"
                x2="120"
                y1="112"
                y2="39"
                stroke="#1e293b"
                strokeLinecap="round"
                strokeWidth="4"
              />
            </g>
            <circle cx="120" cy="112" r="8" fill="#1e293b" />
            <circle cx="120" cy="112" r="3" fill="white" />
            <text
              className="fill-slate-900 text-2xl font-bold"
              textAnchor="middle"
              x="120"
              y="105"
            >
              {score}
            </text>
            <text
              className="fill-slate-500 text-[10px] font-medium"
              textAnchor="middle"
              x="120"
              y="129"
            >
              out of 10
            </text>
          </svg>
          <p className="text-center text-sm font-semibold" style={{ color: riskColor.color }}>
            {level} risk
          </p>
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          {assessment.reason && (
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Risk overview</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{assessment.reason}</p>
            </div>
          )}
          {Array.isArray(assessment.potentialDamage) && assessment.potentialDamage.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Potential impact</h3>
              <ul className="mt-1 list-inside list-disc space-y-1 text-sm leading-6 text-slate-600">
                {assessment.potentialDamage.map((impact) => (
                  <li key={impact}>{impact}</li>
                ))}
              </ul>
            </div>
          )}
          {assessment.recommendation && (
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Recommendation</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {assessment.recommendation}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default RiskAssessmentMeter
