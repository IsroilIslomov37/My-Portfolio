import './i18n/i18n';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n' // Импортируем конфигурацию языков

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)