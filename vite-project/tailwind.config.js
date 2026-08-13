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
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(37, 99, 235, 0.4)',
        'glow-blue-lg': '0 0 45px rgba(59, 130, 246, 0.6)',
        'glow-purple': '0 0 30px rgba(168, 85, 247, 0.25)',
        // Мягкий rim-light по краю планеты/узлов — имитация света от Aurora
        'rim-light': '0 0 0 1px rgba(147, 197, 253, 0.25), 0 0 40px rgba(96, 165, 250, 0.35)',
        'node-glow': '0 0 18px rgba(99, 102, 241, 0.45)',
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite alternate',
        'twinkle-slow': 'twinkle 5s ease-in-out infinite alternate',
        'glow': 'glow 8s ease-in-out infinite alternate',
        // Структурный motion-уровень: медленное органическое покачивание/дыхание
        'float': 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        'aurora-drift': 'auroraDrift 55s ease-in-out infinite alternate',
        'aurora-drift-slow': 'auroraDrift 80s ease-in-out infinite alternate',
        'planet-rotate': 'planetRotate 120s linear infinite',
        // Линия "паутины знаний" мигает, пока курсор держат на узле/кластере
        'web-blink': 'webBlink 2.55s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%': { opacity: '0.2', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1.2)' },
        },
        // Только opacity: scale заставлял браузер заново размывать
        // blur(130px)-пятно на каждом кадре — самый дорогой эффект на странице.
        glow: {
          '0%': { opacity: '0.35' },
          '100%': { opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        auroraDrift: {
          '0%': { transform: 'translate(-4%, -2%) rotate(0deg) scale(1)', opacity: '0.22' },
          '50%': { transform: 'translate(3%, 2%) rotate(6deg) scale(1.08)', opacity: '0.38' },
          '100%': { transform: 'translate(-2%, 3%) rotate(-4deg) scale(1.02)', opacity: '0.28' },
        },
        planetRotate: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        webBlink: {
          '0%, 100%': { strokeOpacity: '1', filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.85))' },
          '50%': { strokeOpacity: '0.15', filter: 'drop-shadow(0 0 0 rgba(255, 255, 255, 0))' },
        },
      }
    },
  },
  plugins: [],
}