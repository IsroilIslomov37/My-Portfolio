/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Чёрный с лаймом. Имена токенов прежние (роль важнее оттенка):
        // space — поверхности, ink — текст, accent — единственный цвет.
        space: {
          950: '#000000', // текст на лаймовой заливке, самые глубокие тени
          900: '#0a0a0a', // фон страницы
          850: '#121212', // карточки
          800: '#181818', // вторичная поверхность
          700: '#1f1f1f', // приподнятая поверхность
          600: '#2a2a2a', // hover поверхности
          input: '#0d0d0d', // поля ввода
        },
        ink: {
          50: '#fafafa',  // заголовки
          100: '#e5e5e5', // усиленный текст
          200: '#b3b3b3', // основной текст
          300: '#8a8a8a', // вторичный текст
          400: '#5c5c5c', // плейсхолдеры, тихие метки
        },
        accent: {
          soft: '#dcf97a',
          DEFAULT: '#c6f432', // кислотный лайм
          deep: '#a8d61f',
        },
      },
      fontFamily: {
        // Onest: есть кириллица и латиница с узбекскими апострофами
        sans: ['Onest', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      borderRadius: {
        chip: '0.625rem',
        card: '1.25rem',
        panel: '1.5rem',
      },
      boxShadow: {
        'elev-2': '0 12px 32px -12px rgba(0, 0, 0, 0.9)',
        'glow-accent': '0 6px 24px -8px rgba(198, 244, 50, 0.5)',
        'glow-accent-lg': '0 10px 32px -8px rgba(198, 244, 50, 0.65)',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        250: '250ms',
      },
      animation: {
        // Одноразовые входы: линии схемы прочерчиваются, узлы проявляются.
        'draw-in': 'drawIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'node-in': 'nodeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards',
      },
      keyframes: {
        drawIn: {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
        nodeIn: {
          '0%': { opacity: '0', transform: 'translate(-50%, -50%) scale(0.85)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
      }
    },
  },
  plugins: [],
}
