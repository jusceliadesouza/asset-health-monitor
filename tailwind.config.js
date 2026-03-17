/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'monospace'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
      colors: {
        bg: '#0c0d0d',
        bg2: '#141516',
        bg3: '#1c1e1f',
        border: '#252729',
        border2: '#35383b',
        muted: '#7a7875',
        amber: '#d4870a',
        'amber-dim': '#7a4e06',
        critical: '#c0392b',
        warning: '#d4870a',
        ok: '#27ae60',
      },
    },
  },
  plugins: [],
}
