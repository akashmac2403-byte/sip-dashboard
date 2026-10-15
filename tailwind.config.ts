import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#090d12', panel: '#111820', muted: '#87939e', accent: '#b6ef68' }, boxShadow: { glow: '0 20px 60px rgba(0,0,0,.28)' } } }, plugins: [] };
export default config;
