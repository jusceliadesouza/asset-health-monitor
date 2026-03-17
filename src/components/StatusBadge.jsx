export function StatusBadge({ status, size = 'md' }) {
  const config = {
    critical: { label: 'CRÍTICO', dot: 'bg-red-500', text: 'text-red-400', border: 'border-red-900/60' },
    warning:  { label: 'ATENÇÃO', dot: 'bg-amber',   text: 'text-amber',   border: 'border-amber-dim/60' },
    ok:       { label: 'NORMAL',  dot: 'bg-ok',       text: 'text-ok',      border: 'border-green-900/60' },
  }
  const c = config[status]
  const px = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-[11px]'

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono font-medium border rounded-sm ${px} ${c.text} ${c.border} bg-transparent`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse-dot`} />
      {c.label}
    </span>
  )
}
