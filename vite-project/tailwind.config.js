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
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite alternate',
        'twinkle-slow': 'twinkle 5s ease-in-out infinite alternate',
        'glow': 'glow 8s ease-in-out infinite alternate',
      },
      keyframes: {
        twinkle: {
          '0%': { opacity: '0.2', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1.2)' },
        },
        glow: {
          '0%': { opacity: '0.3', transform: 'scale(1)' },
          '100%': { opacity: '1', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}