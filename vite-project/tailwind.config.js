/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Единая шкала тонов "глубокого космоса" — от чистого чёрного (950)
        // до самой светлой поверхности карточек (600). Раньше одни и те же
        // роли (фон страницы, фон карточки, фон инпута...) заливались
        // случайно выбранными hex-значениями в разных компонентах.
        space: {
          950: '#000000', // фон-vignette / самые глубокие тени
          900: '#020617', // базовый фон страницы, header, footer
          850: '#0b0f17', // фон карточек (Contact, ContactForm, PlanetOrbit)
          800: '#0f172a', // вторичный фон (Drawer, средняя точка градиента)
          700: '#111827', // приподнятые поверхности (secondary-кнопка)
          600: '#1f2937', // hover-состояние приподнятых поверхностей
          input: '#06090e', // фон полей ввода — нарочито темнее карточки
        },
        // Семантическая шкала текста. Роль важнее оттенка: заголовок всегда
        // ink-50, основной текст — ink-200, подписи — ink-300. Это убирает
        // разнобой text-gray-300/400/500, разбросанный по компонентам.
        ink: {
          50: '#f8fafc',  // заголовки, ключевые значения
          100: '#e2e8f0', // усиленный текст, подписи узлов
          200: '#cbd5e1', // основной текст абзацев
          300: '#94a3b8', // вторичный текст, метаданные
          400: '#64748b', // самый тихий текст, плейсхолдеры
        },
        // Акцент — только для действий и активных состояний, не для площадей.
        accent: {
          soft: '#bfdbfe',
          DEFAULT: '#60a5fa',
          deep: '#2563eb',
        },
      },
      // Один масштаб радиусов: чип → карточка → панель.
      borderRadius: {
        chip: '0.625rem',
        card: '1rem',
        panel: '1.5rem',
      },
      boxShadow: {
        // Одна "высота" для поднятых поверхностей + акцентный glow,
        // который разрешён только первичному действию.
        'elev-2': '0 12px 32px -12px rgba(0, 0, 0, 0.7)',
        'glow-accent': '0 8px 24px -10px rgba(37, 99, 235, 0.9)',
        'glow-accent-lg': '0 14px 40px -12px rgba(37, 99, 235, 0.85)',
      },
      transitionTimingFunction: {
        // Единственная кривая для входов и наведений: быстрый старт, мягкий стоп.
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        250: '250ms',
      },
      animation: {
        'twinkle': 'twinkle 4s ease-in-out infinite alternate',
        'twinkle-slow': 'twinkle 7s ease-in-out infinite alternate',
        'aurora-drift': 'auroraDrift 70s ease-in-out infinite alternate',
        'aurora-drift-slow': 'auroraDrift 95s ease-in-out infinite alternate',
        // Одноразовые входы: линии "паутины" прочерчиваются, узлы проявляются.
        'draw-in': 'drawIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'node-in': 'nodeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards',
      },
      keyframes: {
        // Только opacity: scale заставлял браузер заново размывать
        // соседние слои на каждом кадре — самый дорогой эффект на странице.
        twinkle: {
          '0%': { opacity: '0.25' },
          '100%': { opacity: '0.9' },
        },
        auroraDrift: {
          '0%': { transform: 'translate(-3%, -2%) rotate(0deg) scale(1)', opacity: '0.5' },
          '50%': { transform: 'translate(2%, 1.5%) rotate(4deg) scale(1.05)', opacity: '0.85' },
          '100%': { transform: 'translate(-1%, 2%) rotate(-3deg) scale(1.02)', opacity: '0.6' },
        },
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
