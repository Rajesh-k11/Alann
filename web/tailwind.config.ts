import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../packages/alann-orb-web/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        alann: {
          light: {
            primary: '#340549',
            secondary: '#720488',
            accent: '#F3EBFA',
            bg: '#FEFEFE',
            surface: '#ECECF1',
            text: '#1C1528',
            subtext: '#8A8A92',
          },
          dark: {
            primary: '#560267',
            secondary: '#C084FC',
            accent: '#15101F',
            bg: '#000000',
            surface: '#2A2138',
            text: '#F3EEFA',
            subtext: '#A193B8',
          },
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;

