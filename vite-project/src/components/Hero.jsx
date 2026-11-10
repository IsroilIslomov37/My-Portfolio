import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import { FaGithub, FaTelegramPlane } from 'react-icons/fa';
import PlanetOrbit from './PlanetOrbit';

const quickLink =
  'flex items-center justify-center w-11 h-11 rounded-full border border-white/[0.12] text-lg text-ink-100 hover:text-accent hover:border-accent transition-colors duration-250';

/**
 * Порядок блоков подчинён одному требованию: за 2–3 секунды должно стать
 * понятно, кто перед вами. Приветствие → роль крупно → стек одной строкой →
 * одно предложение по существу → действия.
 */
const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative">
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16">

        {/* Текстовая колонка */}
        <div className="lg:col-span-7 flex flex-col items-start">

          <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent text-accent text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            {t('hero.badge')}
          </p>

          <p className="t-lead mt-7">
            {t('hero.greeting')} <span className="font-semibold text-ink-50">{t('hero.name')}</span>
          </p>

          {/* Две строки жёстко: так заголовок одинаково собран на всех языках
              и не рассыпается на узких экранах */}
          <h1 className="t-display mt-3">
            <span className="block">{t('hero.title_part1')}</span>
            <span className="block text-accent">{t('hero.title_part2')}</span>
          </h1>

          <p className="t-lead font-medium mt-6 measure">{t('hero.kicker')}</p>

          <p className="t-body mt-3 measure">{t('hero.description')}</p>

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

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-7">
            {/* Названия брендов не переводятся, поэтому не вынесены в локали */}
            <a
              href="https://github.com/IsroilIslomov37"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={quickLink}
            >
              <FaGithub aria-hidden="true" />
            </a>
            <a
              href="https://t.me/islomov_047"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className={quickLink}
            >
              <FaTelegramPlane aria-hidden="true" />
            </a>
            <span className="t-meta">{t('hero.focus')}</span>
          </div>
        </div>

        {/* Карточка стека */}
        <div className="lg:col-span-5 flex lg:justify-end">
          <PlanetOrbit />
        </div>

      </div>
    </section>
  );
};

export default Hero;
