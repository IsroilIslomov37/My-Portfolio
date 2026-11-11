/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Тёмная тетрадь: лист в клетку ночью и яркая зелёная ручка.
        // Имена токенов прежние (роль важнее оттенка).
        space: {
          950: '#06140b', // текст на зелёной заливке (кнопки, активный пункт меню)
          900: '#0c120e', // фон страницы
          850: '#121a15', // карточки — вклеенные листы
          800: '#17221b', // вторичная поверхность
          700: '#1d2a22', // приподнятая поверхность
          600: '#25352b', // hover поверхности
          input: '#0e1611', // поля ввода
        },
        ink: {
          50: '#f2f5f0',  // заголовки, контуры
          100: '#dfe5dc', // усиленный текст
          200: '#b4bdb1', // основной текст
          300: '#8a9487', // вторичный текст
          400: '#6b7568', // плейсхолдеры
        },
        accent: {
          soft: '#86efac', // hover заливки — светлее, тёмный текст на ней читается
          DEFAULT: '#4ade80', // зелёная ручка
          deep: '#22c55e',
        },
      },
      fontFamily: {
        // У всех трёх есть кириллица: русский и узбекский выглядят как английский
        sans: ['Onest', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['Montserrat', 'Onest', 'sans-serif'],
        condensed: ['Oswald', 'Onest', 'sans-serif'],
      },
      borderRadius: {
        chip: '0.625rem',
        card: '1.25rem',
        panel: '1.5rem',
      },
      boxShadow: {
        'elev-2': '0 12px 32px -14px rgba(0, 0, 0, 0.8)',
        'glow-accent': '0 6px 22px -8px rgba(74, 222, 128, 0.45)',
        'glow-accent-lg': '0 10px 30px -8px rgba(74, 222, 128, 0.6)',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        250: '250ms',
      },
      animation: {
        // Одноразовые входы: линии схемы прочерчиваются, узлы проявляются.
        'draw-in': 'drawIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
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
