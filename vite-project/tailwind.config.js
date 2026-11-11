/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Редакционная палитра: бумага, чернила и один зелёный акцент.
        // Имена токенов прежние (роль важнее оттенка).
        space: {
          950: '#f6f3ec', // текст на зелёной заливке (кнопки, активный пункт меню)
          900: '#f6f3ec', // фон страницы — бумага
          850: '#fffdf8', // карточки
          800: '#efeadf', // вторичная поверхность
          700: '#e8e2d4', // приподнятая поверхность
          600: '#ddd6c4', // hover поверхности
          input: '#fffdf8', // поля ввода
        },
        ink: {
          50: '#1c1917',  // заголовки, контуры
          100: '#292524', // усиленный текст
          200: '#44403c', // основной текст
          300: '#57534e', // вторичный текст
          400: '#78716c', // плейсхолдеры, тихие метки
        },
        accent: {
          soft: '#15803d', // hover заливки: светлее, но текст на нём всё ещё читается
          DEFAULT: '#166534',
          deep: '#14532d',
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
        'elev-2': '0 12px 32px -12px rgba(28, 25, 23, 0.18)',
        'glow-accent': '0 6px 18px -8px rgba(22, 101, 52, 0.45)',
        'glow-accent-lg': '0 10px 24px -8px rgba(22, 101, 52, 0.55)',
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
