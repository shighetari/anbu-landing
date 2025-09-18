import type { Config } from 'tailwindcss'

const tailwindConfig: Config = {
  content: ['src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'anbu-black': '#000000',
        'anbu-gold': '#FFD700',
        'anbu-gold-accent': '#FFA500',
      },
    },
  },
  plugins: [],
}

export default tailwindConfig
