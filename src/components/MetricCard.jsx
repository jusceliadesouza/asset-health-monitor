import { StatusBadge } from './StatusBadge'

export function MetricCard({ label, value, unit, status, ticking }) {
  const statusColor = {
    critical: 'text-red-400',
    warning: 'text-amber',
    ok: 'text-[#e8e6e1]',
  }

  return (
    <div className="bg-bg2 border border-border p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-widest uppercase text-muted">{label}</span>
        {status && <StatusBadge status={status} size="sm" />}
      </div>
      <div className={`font-mono text-3xl font-medium tracking-tight ${statusColor[status] || 'text-[#e8e6e1]'} animate-tick`} key={ticking ? 'a' : 'b'}>
        {value}
        <span className="text-sm font-normal text-muted ml-1">{unit}</span>
      </div>
    </div>
  )
}
