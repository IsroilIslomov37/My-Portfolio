/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Тетрадь в клетку: бумага, чернила и зелёная ручка.
        // Имена токенов прежние (роль важнее оттенка).
        space: {
          950: '#ffffff', // текст на зелёной заливке (кнопки, активный пункт меню)
          900: '#f4f4ef', // фон страницы — лист в клетку
          850: '#fbfbf8', // карточки — вклеенные листы
          800: '#ececE5', // вторичная поверхность
          700: '#e4e4dc', // приподнятая поверхность
          600: '#d9d9cf', // hover поверхности
          input: '#ffffff', // поля ввода
        },
        ink: {
          50: '#1c1917',  // заголовки
          100: '#292524', // усиленный текст
          200: '#3f3b37', // основной текст
          300: '#57534e', // вторичный текст
          400: '#78716c', // плейсхолдеры
        },
        accent: {
          soft: '#126b32', // hover заливки — темнее, чтобы белый текст оставался контрастным
          DEFAULT: '#16803c', // зелёная ручка
          deep: '#14532d',
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
        'elev-2': '0 12px 28px -14px rgba(28, 25, 23, 0.3)',
        'glow-accent': '0 6px 16px -8px rgba(22, 128, 60, 0.5)',
        'glow-accent-lg': '0 10px 22px -8px rgba(22, 128, 60, 0.6)',
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
