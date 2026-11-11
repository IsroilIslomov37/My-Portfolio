import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import { FaGithub, FaTelegramPlane } from 'react-icons/fa';
import { SiNextdotjs, SiReact, SiTypescript } from 'react-icons/si';
import { RiSparkling2Line } from 'react-icons/ri';
import Terminal from './Terminal';

const quickLink =
  'flex items-center justify-center w-11 h-11 rounded-chip border-2 border-ink-50 bg-space-850 text-lg text-ink-50 hover:text-accent hover:border-accent transition-colors duration-250';

// Наклейки — названия технологий, они не переводятся. Позиции в процентах
// от области наклеек, поворот — чтобы лежали «как попало», как в тетради.
const STICKERS = [
  { label: 'React', icon: <SiReact />, style: { left: '6%', top: '8%' }, rotate: '-rotate-6' },
  { label: 'Next.js', icon: <SiNextdotjs />, style: { left: '52%', top: '0%' }, rotate: 'rotate-3' },
  { label: 'TypeScript', icon: <SiTypescript />, style: { left: '22%', top: '52%' }, rotate: 'rotate-6' },
  { label: 'AI', icon: <RiSparkling2Line />, style: { left: '68%', top: '58%' }, rotate: '-rotate-3' },
];

/*
 * Наклейку можно утащить мышкой или пальцем, но не за пределы её области.
 * Смещение пишется прямо в style.translate, без перерисовки React на каждом
 * движении. Наклейки — игрушка: скринридеру они не нужны, поэтому скрыты.
 */
const Sticker = ({ label, icon, style, rotate }) => {
  const ref = useRef(null);
  const drag = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const onPointerDown = (e) => {
    const el = ref.current;
    const area = el.parentElement.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    const { x, y } = pos.current;
    el.setPointerCapture(e.pointerId);
    el.dataset.dragging = 'true';
    drag.current = {
      startX: e.clientX - x,
      startY: e.clientY - y,
      minX: x + area.left - box.left,
      maxX: x + area.right - box.right,
      minY: y + area.top - box.top,
      maxY: y + area.bottom - box.bottom,
    };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const x = Math.min(d.maxX, Math.max(d.minX, e.clientX - d.startX));
    const y = Math.min(d.maxY, Math.max(d.minY, e.clientY - d.startY));
    pos.current = { x, y };
    ref.current.style.translate = `${x}px ${y}px`;
  };

  const onPointerUp = () => {
    drag.current = null;
    ref.current.dataset.dragging = 'false';
  };

  return (
    <div
      ref={ref}
      className={`sticker ${rotate}`}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <span className="text-accent">{icon}</span>
      {label}
    </div>
  );
};

/**
 * Первый экран — страница тетради: «Frontend» в зелёной рамке от руки,
 * «разработчик» жирным, стрелка ручкой к главной кнопке, наклейки со
 * стеком, которые можно двигать, и терминал справа на вклеенном листе.
 */
const Hero = () => {
  const { t } = useTranslation();
  const [drawn, setDrawn] = useState(false);

  // Рисунки ручкой прорисовываются сразу после первого кадра
  useEffect(() => {
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className={`relative overflow-x-clip ${drawn ? 'web-in' : ''}`}>
      <div className="container-page pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-20">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-chip border-2 border-accent text-accent t-eyebrow -rotate-1">
                <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                {t('hero.badge')}
              </p>
              <p className="t-meta">
                {t('hero.greeting')} <span className="font-semibold text-ink-50">{t('hero.name')}</span>
              </p>
            </div>

            {/* Две строки жёстко: так заголовок одинаково собран на всех языках
                и не рассыпается на узких экранах */}
            <h1 className="t-display mt-7">
              <span className="ink-box font-condensed font-bold uppercase text-accent tracking-normal">
                {t('hero.title_part1')}
              </span>
              <span className="flex items-end gap-3 mt-3">
                {t('hero.title_part2')}
                <svg
                  className="w-[0.8em] h-[0.8em] shrink-0 text-accent"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 40C14 30 24 18 40 8M40 8l-13 1M40 8l-2 13"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="1"
                    className="web-line"
                  />
                </svg>
              </span>
            </h1>
          </div>

          {/* Область наклеек: только там, где есть мышь и место */}
          <div className="hidden lg:block lg:col-span-4 relative h-48" aria-hidden="true">
            {STICKERS.map((sticker) => (
              <Sticker key={sticker.label} {...sticker} />
            ))}
          </div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start mt-10 sm:mt-14">
          <div className="lg:col-span-7 flex flex-col items-start">
            <p className="t-lead font-medium measure">
              <span className="marker">{t('hero.kicker')}</span>
            </p>
            <p className="t-body mt-3 measure">{t('hero.description')}</p>

            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-9 w-full sm:w-auto">
              <a href="#projects" className="btn btn-primary btn-lg w-full sm:w-auto">
                {t('hero.btn_projects')}
                <FiArrowRight aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn-secondary btn-lg w-full sm:w-auto">
                <FiMail aria-hidden="true" />
                {t('hero.btn_contact')}
              </a>

              {/* Стрелка ручкой к главной кнопке */}
              <svg
                className="hidden md:block absolute -left-16 -top-12 w-20 h-16 text-accent"
                viewBox="0 0 80 64"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 6c4 22 18 40 52 46M58 52l-12-10M58 52l-14 4"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  className="web-line"
                  style={{ animationDelay: '0.6s' }}
                />
              </svg>
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

          {/* Терминал на вклеенном листе: при загрузке в нём уже выполнена команда stack */}
          <div className="lg:col-span-5 flex lg:justify-end">
            <Terminal />
          </div>
        </div>
      </div>

      {/* Оторванный зелёный уголок, как на развороте тетради */}
      <svg
        className="hidden lg:block absolute left-0 bottom-0 w-28 h-28 text-accent -scale-x-100"
        viewBox="0 0 160 160"
        aria-hidden="true"
      >
        <path
          d="M160 18 148 30 154 44 140 58 150 72 132 86 142 100 120 114 130 128 106 140 112 160H160Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
};

export default Hero;
