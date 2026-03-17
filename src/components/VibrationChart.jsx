import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement,
  LineElement, Tooltip, Filler,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

export function VibrationChart({ history, thresholds, metric = 'vibration', label, unit }) {
  const values = history.map(h => h[metric])
  const labels = history.map(h => h.timestamp)
  const last = values[values.length - 1]
  const status = last >= thresholds.critical ? 'critical' : last >= thresholds.warning ? 'warning' : 'ok'
  const lineColor = status === 'critical' ? '#c0392b' : status === 'warning' ? '#d4870a' : '#27ae60'

  const data = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: lineColor,
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: lineColor,
        tension: 0.35,
        fill: true,
        backgroundColor: (ctx) => {
          const chart = ctx.chart
          const { ctx: c, chartArea } = chart
          if (!chartArea) return 'transparent'
          const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          grad.addColorStop(0, `${lineColor}28`)
          grad.addColorStop(1, `${lineColor}00`)
          return grad
        },
      },
      {
        data: Array(30).fill(thresholds.warning),
        borderColor: '#d4870a44',
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
      },
      {
        data: Array(30).fill(thresholds.critical),
        borderColor: '#c0392b44',
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 600 },
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1c1e1f',
        borderColor: '#252729',
        borderWidth: 1,
        titleColor: '#7a7875',
        bodyColor: '#e8e6e1',
        titleFont: { family: 'IBM Plex Mono', size: 10 },
        bodyFont: { family: 'IBM Plex Mono', size: 12 },
        padding: 10,
        callbacks: {
          title: (items) => items[0].label,
          label: (item) => item.datasetIndex === 0 ? ` ${item.raw} ${unit}` : null,
          afterLabel: () => null,
        },
        filter: (item) => item.datasetIndex === 0,
      },
    },
    scales: {
      x: {
        grid: { color: '#1c1e1f', drawBorder: false },
        ticks: {
          color: '#7a7875',
          font: { family: 'IBM Plex Mono', size: 9 },
          maxTicksLimit: 6,
          maxRotation: 0,
        },
        border: { display: false },
      },
      y: {
        grid: { color: '#1c1e1f', drawBorder: false },
        ticks: {
          color: '#7a7875',
          font: { family: 'IBM Plex Mono', size: 9 },
          maxTicksLimit: 5,
          callback: (v) => `${v}${unit}`,
        },
        border: { display: false },
      },
    },
  }

  return (
    <div className="bg-bg2 border border-border p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-widest uppercase text-muted">{label} — 30 dias</span>
        <span className="font-mono text-[10px] text-muted">threshold: {thresholds.warning} / {thresholds.critical} {unit}</span>
      </div>
      <div className="h-40">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
