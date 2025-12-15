import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'agri-green': '#1b6f3a',
        'agri-green-dark': '#0a751f',
        'agri-green-light': '#e7f5ec',
      },
    },
  },
  plugins: [],
}
export default config
