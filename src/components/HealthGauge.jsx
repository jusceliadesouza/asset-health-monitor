export function HealthGauge({ score }) {
  const color = score >= 75 ? '#27ae60' : score >= 45 ? '#d4870a' : '#c0392b'
  const r = 52
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ

  return (
    <div className="bg-bg2 border border-border p-4 flex flex-col items-center gap-2">
      <span className="font-mono text-[10px] tracking-widest uppercase text-muted self-start">Saúde do Ativo</span>
      <div className="relative flex items-center justify-center w-36 h-36">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#1c1e1f" strokeWidth="8" />
          <circle
            cx="60" cy="60" r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            style={{ transition: 'stroke-dasharray 0.8s ease, stroke 0.5s ease' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-mono text-3xl font-medium" style={{ color }}>{score}</span>
          <span className="font-mono text-[10px] text-muted">/ 100</span>
        </div>
      </div>
    </div>
  )
}
