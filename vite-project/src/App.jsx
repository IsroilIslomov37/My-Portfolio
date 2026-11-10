import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppRouter from './router/AppRouter';
import Header from './components/Header';
import Footer from './components/Footer';
import StarBackground from './components/StarBackground';

function App() {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <StarBackground />

      {/* Ссылка видна только при переходе табом: позволяет пропустить
          навигацию и сразу попасть в контент */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] btn btn-secondary"
      >
        {t('header.skip_to_content')}
      </a>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main id="main" className="flex-grow">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
