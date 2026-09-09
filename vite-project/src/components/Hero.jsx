import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import PlanetOrbit from './PlanetOrbit';

/**
 * Порядок блоков подчинён одному требованию: за 2–3 секунды должно стать
 * понятно, кто перед вами. Приветствие → роль крупно → стек одной строкой →
 * одно предложение по существу → действия. Раньше роль и стек были размазаны
 * между заголовком-градиентом и мелким серым описанием.
 */
const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-20">
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

        {/* Текстовая колонка */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">

          <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-1 text-ink-200 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            {t('hero.badge')}
          </p>

          <p className="t-meta mt-7">
            {t('hero.greeting')} <span className="text-ink-100 font-medium">{t('hero.name')}</span>
          </p>

          {/* Две строки жёстко: так заголовок одинаково собран на всех языках
              и не рассыпается на узких экранах */}
          <h1 className="t-display text-gradient-space mt-2">
            <span className="block">{t('hero.title_part1')}</span>
            <span className="block">{t('hero.title_part2')}</span>
          </h1>

          <p className="t-lead font-medium mt-5 measure">{t('hero.kicker')}</p>

          <p className="t-body mt-4 measure">{t('hero.description')}</p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-9 w-full sm:w-auto">
            <a href="#projects" className="btn btn-primary btn-lg w-full sm:w-auto">
              {t('hero.btn_projects')}
              <FiArrowRight aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-secondary btn-lg w-full sm:w-auto">
              <FiMail aria-hidden="true" />
              {t('hero.btn_contact')}
            </a>
          </div>
        </div>

        {/* Декоративная колонка: орбита дублирует данные секции Skills,
            поэтому для скринридера она скрыта целиком. */}
        <div className="lg:col-span-5 flex justify-center">
          <PlanetOrbit />
        </div>

      </div>
    </section>
  );
};

export default Hero;
