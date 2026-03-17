// Gera histórico de 30 dias para um ativo
function generateHistory(baseVibration, baseTemp, trend = 0) {
  const now = Date.now()
  const day = 86400000
  return Array.from({ length: 30 }, (_, i) => {
    const noise = () => (Math.random() - 0.5) * 2
    const trendFactor = (i / 30) * trend
    return {
      timestamp: new Date(now - (29 - i) * day).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      vibration: parseFloat(Math.max(0.1, baseVibration + trendFactor + noise()).toFixed(2)),
      temperature: parseFloat(Math.max(20, baseTemp + trendFactor * 0.5 + noise() * 1.5).toFixed(1)),
    }
  })
}

export const ASSETS = [
  {
    id: 'motor-01',
    name: 'Motor Elétrico 01',
    location: 'Linha A — Setor 3',
    type: 'Motor',
    model: 'WEG W22 75cv',
    rpm: 1750,
    history: generateHistory(1.8, 68, 0.5),
    thresholds: { vibration: { warning: 3.5, critical: 5.0 }, temperature: { warning: 80, critical: 95 } },
  },
  {
    id: 'bomba-02',
    name: 'Bomba Centrífuga 02',
    location: 'Linha B — Setor 1',
    type: 'Bomba',
    model: 'KSB Megachem 65-200',
    rpm: 2900,
    history: generateHistory(2.4, 55, 2.8),
    thresholds: { vibration: { warning: 3.5, critical: 5.0 }, temperature: { warning: 70, critical: 85 } },
  },
  {
    id: 'compressor-03',
    name: 'Compressor Rotativo 03',
    location: 'Linha A — Setor 7',
    type: 'Compressor',
    model: 'Atlas Copco GA 30',
    rpm: 3000,
    history: generateHistory(0.9, 45, -0.3),
    thresholds: { vibration: { warning: 3.5, critical: 5.0 }, temperature: { warning: 75, critical: 90 } },
  },
  {
    id: 'redutor-04',
    name: 'Redutor Industrial 04',
    location: 'Linha C — Setor 2',
    type: 'Redutor',
    model: 'Bonfiglioli VF 49',
    rpm: 960,
    history: generateHistory(4.6, 88, 1.2),
    thresholds: { vibration: { warning: 3.5, critical: 5.0 }, temperature: { warning: 80, critical: 95 } },
  },
]

export function getStatus(value, thresholds) {
  if (value >= thresholds.critical) return 'critical'
  if (value >= thresholds.warning) return 'warning'
  return 'ok'
}

export function getHealthScore(asset) {
  const last = asset.history[asset.history.length - 1]
  const vibStatus = getStatus(last.vibration, asset.thresholds.vibration)
  const tempStatus = getStatus(last.temperature, asset.thresholds.temperature)
  if (vibStatus === 'critical' || tempStatus === 'critical') return Math.floor(Math.random() * 20 + 15)
  if (vibStatus === 'warning' || tempStatus === 'warning') return Math.floor(Math.random() * 25 + 50)
  return Math.floor(Math.random() * 15 + 82)
}
