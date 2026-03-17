import { useState, useEffect, useRef } from 'react'
import { getStatus } from '../data/assets'

export function useTelemetry(asset) {
  const [live, setLive] = useState(() => {
    const last = asset.history[asset.history.length - 1]
    return { vibration: last.vibration, temperature: last.temperature, rpm: asset.rpm }
  })
  const [ticking, setTicking] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    const last = asset.history[asset.history.length - 1]
    setLive({ vibration: last.vibration, temperature: last.temperature, rpm: asset.rpm })

    intervalRef.current = setInterval(() => {
      setLive(prev => {
        const noise = (range) => (Math.random() - 0.5) * range
        return {
          vibration: parseFloat(Math.max(0.1, prev.vibration + noise(0.3)).toFixed(2)),
          temperature: parseFloat(Math.max(20, prev.temperature + noise(1.5)).toFixed(1)),
          rpm: Math.round(Math.max(100, prev.rpm + noise(30))),
        }
      })
      setTicking(t => !t)
    }, 2000)

    return () => clearInterval(intervalRef.current)
  }, [asset.id])

  const vibStatus = getStatus(live.vibration, asset.thresholds.vibration)
  const tempStatus = getStatus(live.temperature, asset.thresholds.temperature)
  const overallStatus = [vibStatus, tempStatus].includes('critical') ? 'critical'
    : [vibStatus, tempStatus].includes('warning') ? 'warning' : 'ok'

  return { live, overallStatus, vibStatus, tempStatus, ticking }
}
