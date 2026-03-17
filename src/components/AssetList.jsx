import { getStatus, getHealthScore } from '../data/assets'
import { StatusBadge } from './StatusBadge'

export function AssetList({ assets, selectedId, onSelect }) {
  return (
    <div className="flex flex-col gap-px bg-border">
      {assets.map(asset => {
        const last = asset.history[asset.history.length - 1]
        const vibStatus = getStatus(last.vibration, asset.thresholds.vibration)
        const tempStatus = getStatus(last.temperature, asset.thresholds.temperature)
        const overall = [vibStatus, tempStatus].includes('critical') ? 'critical'
          : [vibStatus, tempStatus].includes('warning') ? 'warning' : 'ok'
        const health = getHealthScore(asset)
        const isSelected = asset.id === selectedId

        return (
          <button
            key={asset.id}
            onClick={() => onSelect(asset.id)}
            className={`w-full text-left px-4 py-3 transition-colors duration-150 flex items-center justify-between gap-3 group
              ${isSelected ? 'bg-bg3 border-l-2 border-amber' : 'bg-bg2 border-l-2 border-transparent hover:bg-bg3'}`}
          >
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className={`font-sans text-sm font-medium truncate ${isSelected ? 'text-[#e8e6e1]' : 'text-[#e8e6e1]/70 group-hover:text-[#e8e6e1]'}`}>
                {asset.name}
              </span>
              <span className="font-mono text-[10px] text-muted truncate">{asset.location}</span>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <StatusBadge status={overall} size="sm" />
              <span className={`font-mono text-[10px] ${health >= 75 ? 'text-ok' : health >= 45 ? 'text-amber' : 'text-red-400'}`}>
                {health}%
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
