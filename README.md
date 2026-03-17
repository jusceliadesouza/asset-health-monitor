# Asset Health Monitor

Dashboard de monitoramento de saúde de ativos industriais com telemetria simulada em tempo real.

## Stack

- React 18 + Vite
- Tailwind CSS
- Chart.js + react-chartjs-2
- IBM Plex Mono / IBM Plex Sans

## Funcionalidades

- 4 ativos monitorados (motor, bomba, compressor, redutor)
- Telemetria ao vivo simulada — vibração (mm/s), temperatura (°C) e RPM atualizam a cada 2s
- Gráficos de série temporal dos últimos 30 dias por ativo
- Indicador de saúde do ativo (gauge circular)
- Status por criticidade: NORMAL / ATENÇÃO / CRÍTICO com thresholds configuráveis
- Layout responsivo com sidebar colapsável em mobile

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`

## Deploy na Vercel

1. Suba o repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) → New Project → importe o repo
3. Framework: **Vite** (detectado automaticamente)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Clique em Deploy

## Estrutura

```
src/
├── data/
│   └── assets.js          # Dados e funções de status dos ativos
├── hooks/
│   └── useTelemetry.js    # Hook de simulação de telemetria em tempo real
├── components/
│   ├── AssetList.jsx       # Sidebar com lista de ativos
│   ├── MetricCard.jsx      # Card de métrica individual
│   ├── VibrationChart.jsx  # Gráfico de série temporal (Chart.js)
│   ├── HealthGauge.jsx     # Gauge circular de saúde
│   └── StatusBadge.jsx     # Badge de status (crítico/atenção/normal)
├── App.jsx                 # Componente principal
└── main.jsx               # Entry point
```

## Customização

Para adicionar ou editar ativos, edite `src/data/assets.js`. Cada ativo tem:

- `id`, `name`, `location`, `type`, `model`, `rpm`
- `history` — gerado por `generateHistory(baseVibration, baseTemp, trend)`
- `thresholds` — limites de warning e critical para vibração e temperatura
