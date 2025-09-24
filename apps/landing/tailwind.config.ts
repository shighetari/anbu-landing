import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'laptop': '1440px', // I'm adding 15.5" MacBook Pro breakpoint
      '2xl': '1536px',
      '3xl': '1920px',
    },
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
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'meteor-effect': 'meteor 5s linear infinite',
        'shiny-text': 'shiny-text 8s infinite',
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
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
        'shiny-text': {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - var(--shiny-width,100px)) 0',
          },
          '30%, 60%': {
            'background-position': 'calc(100% + var(--shiny-width,100px)) 0',
          },
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        'fluid-xs': 'var(--space-xs)',
        'fluid-sm': 'var(--space-sm)',
        'fluid-md': 'var(--space-md)',
        'fluid-lg': 'var(--space-lg)',
        'fluid-xl': 'var(--space-xl)',
        'fluid-2xl': 'var(--space-2xl)',
        'fluid-3xl': 'var(--space-3xl)',
        'fluid-4xl': 'var(--space-4xl)',
      },
      fontSize: {
        'fluid-xs': 'var(--text-xs)',
        'fluid-sm': 'var(--text-sm)',
        'fluid-base': 'var(--text-base)',
        'fluid-lg': 'var(--text-lg)',
        'fluid-xl': 'var(--text-xl)',
        'fluid-2xl': 'var(--text-2xl)',
        'fluid-3xl': 'var(--text-3xl)',
        'fluid-4xl': 'var(--text-4xl)',
        'fluid-hero': 'var(--text-hero)',
      },
      height: {
        'screen-small': '100svh',
        'screen-large': '100lvh',
        'screen-dynamic': '100dvh',
      },
      width: {
        'screen-small': '100svw',
        'screen-large': '100lvw',
        'screen-dynamic': '100dvw',
      },
      transitionTimingFunction: {
        'out-cubic': 'cubic-bezier(0.33, 1, 0.68, 1)',
        'in-cubic': 'cubic-bezier(0.32, 0, 0.67, 0)',
      },
    },
  },
  plugins: [],
}
export default config