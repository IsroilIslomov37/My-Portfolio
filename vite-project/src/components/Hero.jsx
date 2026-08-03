import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { FiArrowRight, FiSend } from 'react-icons/fi';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="hero" className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-12 relative">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-medium mb-8 animate-fade-in">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
        {t('hero.badge')}
      </div>

      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-6 max-w-4xl leading-tight">
        <span className="text-gray-400 font-normal block text-2xl sm:text-3xl mb-2">
          {t('hero.greeting')} <span className="text-white font-bold">{t('hero.name')}</span>
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500">
          {t('hero.title_1')} {t('hero.title_2')}
        </span>
      </h1>

      <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
        {t('hero.subtitle')}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <a href="#projects">
          <Button
            type="primary"
            size="large"
            className="bg-blue-600 hover:bg-blue-500 h-12 px-8 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/25 border-none"
          >
            {t('hero.btn_projects')}
            <FiArrowRight className="text-lg" />
          </Button>
        </a>

        <a href="#contact">
          <Button
            size="large"
            className="bg-white/5 hover:bg-white/10 text-white border-white/15 h-12 px-8 rounded-xl font-semibold flex items-center gap-2 backdrop-blur-md"
          >
            {t('hero.btn_contact')}
            <FiSend className="text-base text-gray-400" />
          </Button>
        </a>
      </div>
    </section>
  );
};

export default Hero;