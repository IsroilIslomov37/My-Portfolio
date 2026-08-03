import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import AppRouter from './router/AppRouter';
import Header from './components/Header';
import Footer from './components/Footer';
import StarBackground from './components/StarBackground';

function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <BrowserRouter>
        <StarBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <AppRouter />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;