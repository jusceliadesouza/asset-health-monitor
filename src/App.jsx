import { useState } from 'react'
import { ASSETS, getHealthScore } from './data/assets'
import { useTelemetry } from './hooks/useTelemetry'
import { AssetList } from './components/AssetList'
import { MetricCard } from './components/MetricCard'
import { VibrationChart } from './components/VibrationChart'
import { HealthGauge } from './components/HealthGauge'
import { StatusBadge } from './components/StatusBadge'

function AssetDetail({ asset }) {
  const { live, overallStatus, vibStatus, tempStatus, ticking } = useTelemetry(asset)
  const health = getHealthScore(asset)

  return (
    <div className="flex flex-col gap-4 animate-fade-in">

      {/* Header do ativo */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="font-mono text-[10px] tracking-widest uppercase text-muted mb-1">{asset.type} · {asset.model}</div>
          <h2 className="font-sans text-xl font-medium text-[#e8e6e1]">{asset.name}</h2>
          <p className="font-mono text-xs text-muted mt-0.5">{asset.location}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={overallStatus} />
          <span className="font-mono text-[10px] text-muted flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse-dot" />
            LIVE · atualiza a cada 2s
          </span>
        </div>
      </div>

      {/* Métricas ao vivo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        <MetricCard
          label="Vibração"
          value={live.vibration}
          unit="mm/s"
          status={vibStatus}
          ticking={ticking}
        />
        <MetricCard
          label="Temperatura"
          value={live.temperature}
          unit="°C"
          status={tempStatus}
          ticking={ticking}
        />
        <MetricCard
          label="RPM"
          value={live.rpm}
          unit="rpm"
          ticking={ticking}
        />
        <HealthGauge score={health} />
      </div>

      {/* Gráficos históricos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border">
        <VibrationChart
          history={asset.history}
          thresholds={asset.thresholds.vibration}
          metric="vibration"
          label="Vibração"
          unit="mm/s"
        />
        <VibrationChart
          history={asset.history}
          thresholds={asset.thresholds.temperature}
          metric="temperature"
          label="Temperatura"
          unit="°C"
        />
      </div>

      {/* Info técnica */}
      <div className="bg-bg2 border border-border p-4">
        <div className="font-mono text-[10px] tracking-widest uppercase text-muted mb-3">Informações do Ativo</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'ID', value: asset.id },
            { label: 'Modelo', value: asset.model },
            { label: 'Localização', value: asset.location },
            { label: 'RPM Nominal', value: `${asset.rpm} rpm` },
            { label: 'Vib. Warning', value: `${asset.thresholds.vibration.warning} mm/s` },
            { label: 'Vib. Crítico', value: `${asset.thresholds.vibration.critical} mm/s` },
            { label: 'Temp. Warning', value: `${asset.thresholds.temperature.warning}°C` },
            { label: 'Temp. Crítico', value: `${asset.thresholds.temperature.critical}°C` },
          ].map(item => (
            <div key={item.label} className="flex flex-col gap-0.5">
              <span className="font-mono text-[10px] text-muted uppercase tracking-wider">{item.label}</span>
              <span className="font-mono text-xs text-[#e8e6e1]/80">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [selectedId, setSelectedId] = useState(ASSETS[0].id)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const selected = ASSETS.find(a => a.id === selectedId)

  const handleSelect = (id) => {
    setSelectedId(id)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col">

      {/* Top nav */}
      <header className="h-14 border-b border-border bg-bg/90 backdrop-blur-sm sticky top-0 z-50 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(s => !s)}
            className="lg:hidden p-1.5 text-muted hover:text-[#e8e6e1] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <span className="font-mono text-xs text-amber tracking-widest uppercase">Asset Health Monitor</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse-dot" />
          <span className="font-mono text-[10px] text-muted">Sistema operacional</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-72 bg-bg border-r border-border flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="h-14 lg:hidden border-b border-border flex items-center px-4">
            <span className="font-mono text-[10px] text-muted uppercase tracking-widest">Ativos</span>
          </div>
          <div className="hidden lg:flex items-center px-4 h-10 border-b border-border">
            <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
              {ASSETS.length} ativos monitorados
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <AssetList assets={ASSETS} selectedId={selectedId} onSelect={handleSelect} />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {selected && <AssetDetail key={selected.id} asset={selected} />}
        </main>
      </div>
    </div>
  )
}
