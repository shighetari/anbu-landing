import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'anbu-black': '#000000',
        'anbu-gold': '#FFD700',
        'anbu-gold-accent': '#FFA500',
        'anbu-marble': '#F8F8F8',
        'anbu-gray': '#2C2C2C',
      },
      backgroundImage: {
        'marble-gradient': 'linear-gradient(135deg, #000000 0%, #2C2C2C 50%, #000000 100%)',
        'gold-radial': 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
      },
      animation: {
        'marble-flow': 'marbleFlow 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        marbleFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config