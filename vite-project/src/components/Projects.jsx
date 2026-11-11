import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCheck,
  FiShoppingBag,
  FiSliders,
  FiSmartphone,
  FiZap,
} from 'react-icons/fi';

const FORMO_URL = 'https://formo.uz';
const FORMO_TAGS = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'NestJS', 'PostgreSQL'];
// Цвета формы в мини-конфигураторе: заливка и контрастный к ней цвет номера
const KITS = [
  { color: '#16803c', number: '#ffffff' },
  { color: '#1c1917', number: '#ffffff' },
  { color: '#ef4444', number: '#ffffff' },
  { color: '#3b82f6', number: '#ffffff' },
];

const Shot = ({ src, alt, width, height, className = '' }) => (
  <div className={`taped relative rounded-chip border border-ink-50/[0.12] bg-space-800 ${className}`}>
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className="shot w-full h-full object-cover object-top rounded-chip"
    />
  </div>
);

const handleSpotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
};

const LiveLink = ({ href, label, children, primary = false }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={
      primary
        ? 'btn btn-primary group/link'
        : 'inline-flex items-center gap-1.5 px-3 py-2 rounded-full uppercase tracking-wider bg-space-800 border border-ink-50/[0.12] text-ink-200 hover:text-space-950 hover:bg-accent hover:border-accent transition-colors duration-250 group/link'
    }
  >
    {children}
    <FiArrowUpRight
      className="text-base group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-250"
      aria-hidden="true"
    />
  </a>
);

const Tags = ({ tags }) => (
  <ul className="relative flex flex-wrap gap-2 pt-5 border-t border-ink-50/[0.08]">
    {tags.map((tag) => (
      <li
        key={tag}
        className="px-2 py-1 text-[0.6875rem] rounded-full bg-space-800 text-ink-100 border border-ink-50/[0.1]"
      >
        {tag}
      </li>
    ))}
  </ul>
);

const Jersey = ({ number, className, style, numberFill = '#fff' }) => (
  <svg viewBox="0 0 200 180" className={className} style={style}>
    <path
      d="M70 14 45 26 16 58l22 22 17-12v98h90V68l17 12 22-22-29-32-25-12q-30 20-60 0Z"
      fill="currentColor"
      stroke="rgba(28,25,23,0.45)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M70 14q30 20 60 0" fill="none" stroke="rgba(28,25,23,0.35)" strokeWidth="5" />
    <text
      x="100"
      y="126"
      textAnchor="middle"
      fontSize="58"
      fontWeight="800"
      fill={numberFill}
      fontFamily="inherit"
    >
      {number}
    </text>
  </svg>
);

/*
 * Мини-конфигуратор: цвет и номер формы меняются прямо в карточке — та же
 * идея, что в самом Formo, в миниатюре. Декоративные части скрыты от
 * скринридера, управляемые — подписаны.
 */
const FormoMockup = ({ domain, orderLabel, colorLabel, numberLabel }) => {
  const [kit, setKit] = useState(KITS[0]);
  const [number, setNumber] = useState('07');

  return (
    <div className="relative rounded-card border border-ink-50/[0.12] bg-space-900 overflow-hidden">
      <div
        className="flex items-center gap-1.5 px-4 py-2.5 border-b border-ink-50/[0.08]"
        aria-hidden="true"
      >
        <span className="w-2 h-2 rounded-full bg-ink-50/20" />
        <span className="w-2 h-2 rounded-full bg-ink-50/20" />
        <span className="w-2 h-2 rounded-full bg-ink-50/20" />
        <span className="mx-auto px-4 py-0.5 rounded-full bg-ink-50/[0.06] text-[0.6875rem] text-ink-300">
          {domain}
        </span>
      </div>

      <div className="flex items-center gap-4 p-5 pb-16 blueprint-grid [--grid:16px]">
        <div className="relative flex-1 h-40 sm:h-48" aria-hidden="true">
          <Jersey
            number="47"
            className="absolute inset-y-0 left-[38%] h-full text-ink-300 rotate-6 transition-transform duration-500 ease-soft group-hover:translate-x-4 group-hover:rotate-12"
          />
          <Jersey
            number={number || '07'}
            numberFill={kit.number}
            className="absolute inset-y-0 left-[6%] h-full -rotate-3 transition-[transform,color] duration-500 ease-soft group-hover:-translate-y-1.5 group-hover:-rotate-6"
            style={{ color: kit.color }}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          {KITS.map((item, i) => (
            <button
              key={item.color}
              type="button"
              onClick={() => setKit(item)}
              aria-label={`${colorLabel} ${i + 1}`}
              aria-pressed={kit === item}
              className={`w-6 h-6 rounded-full transition-transform duration-250 hover:scale-110 ${
                kit === item ? 'ring-1 ring-ink-50 ring-offset-2 ring-offset-space-900' : ''
              }`}
              style={{ backgroundColor: item.color }}
            />
          ))}
        </div>
      </div>

      <span
        className="absolute left-4 bottom-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full uppercase tracking-wider bg-space-850 border border-accent/40 text-[0.6875rem] text-accent"
        aria-hidden="true"
      >
        <FiCheck />
        {orderLabel}
      </span>

      <label className="absolute right-4 bottom-3 flex items-center gap-2 text-[0.6875rem] uppercase tracking-wider text-ink-300">
        {numberLabel}
        <input
          type="text"
          inputMode="numeric"
          maxLength={2}
          value={number}
          onChange={(e) => setNumber(e.target.value.replace(/\D/g, '').slice(0, 2))}
          className="field !w-12 !px-0 !py-1.5 text-center font-semibold"
        />
      </label>
    </div>
  );
};

const Projects = () => {
  const { t } = useTranslation();

  const formoFeatures = [
    { icon: <FiSliders />, text: t('projects.formo_feat_1') },
    { icon: <FiZap />, text: t('projects.formo_feat_2') },
    { icon: <FiSmartphone />, text: t('projects.formo_feat_3') },
  ];

  const projects = [
    {
      title: t('projects.edu_center_title'),
      description: t('projects.edu_center_desc'),
      features: [1, 2, 3, 4].map((n) => t(`projects.edu_feat_${n}`)),
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'PostgreSQL'],
      liveUrl: 'https://vibrant-landing-woad.vercel.app/',
      image: '/projects/perfect-school.png',
      icon: <FiBookOpen className="text-2xl text-accent" />,
    },
    {
      title: t('projects.core_store_title'),
      description: t('projects.core_store_desc'),
      features: [1, 2, 3].map((n) => t(`projects.core_feat_${n}`)),
      tags: ['React', 'JavaScript', 'Tailwind CSS', 'React Router', 'Swiper', 'Vercel'],
      liveUrl: 'https://core-store-peach.vercel.app/',
      image: '/projects/core-store.png',
      icon: <FiShoppingBag className="text-2xl text-accent" />,
    },
  ];

  return (
    <section id="projects" className="section">
      <div className="container-page">
        <SectionTitle title={t('projects.title')} subtitle={t('projects.subtitle')} index="04" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Formo — флагман на всю ширину */}
          <article
            className="group relative md:col-span-2 glass-card glass-spotlight card-hover p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            onMouseMove={handleSpotlight}
          >
            <Shot
              src="/projects/formo.png"
              alt={t('projects.screenshot_alt', { name: t('projects.formo_title') })}
              width={1200}
              height={630}
              className="lg:col-span-2 aspect-[1200/630]"
            />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
                <span className="t-eyebrow text-accent-soft">{t('projects.formo_badge')}</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 glass-1 !rounded-full uppercase tracking-wider text-[0.6875rem] text-ink-200">
                  <span
                    className="w-1.5 h-1.5 bg-emerald-400 animate-pulse"
                    aria-hidden="true"
                  />
                  {t('projects.formo_status')}
                </span>
              </div>

              <h3 className="t-section mb-3">{t('projects.formo_title')}</h3>
              <p className="t-body measure mb-6">{t('projects.formo_desc')}</p>

              <ul className="space-y-3 mb-7">
                {formoFeatures.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3 text-sm text-ink-100">
                    <span
                      className="w-8 h-8 rounded-full glass-1 flex items-center justify-center shrink-0 text-accent"
                      aria-hidden="true"
                    >
                      {feature.icon}
                    </span>
                    <span className="pt-1.5">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-7">
                <LiveLink
                  href={FORMO_URL}
                  label={t('projects.open_project', { name: t('projects.formo_title') })}
                  primary
                >
                  {t('projects.formo_domain')}
                </LiveLink>
              </div>

              <Tags tags={FORMO_TAGS} />
            </div>

            <FormoMockup
              domain={t('projects.formo_domain')}
              orderLabel={t('projects.formo_mock_order')}
              colorLabel={t('projects.formo_mock_color')}
              numberLabel={t('projects.formo_mock_number')}
            />
          </article>

          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative glass-card glass-spotlight card-hover p-6 sm:p-8 flex flex-col justify-between"
              onMouseMove={handleSpotlight}
            >
              <div className="relative">
                <Shot
                  src={project.image}
                  alt={t('projects.screenshot_alt', { name: project.title })}
                  width={728}
                  height={455}
                  className="aspect-[16/10] mb-6"
                />

                <div className="flex items-center justify-between gap-4 mb-6">
                  <span
                    className="w-12 h-12 rounded-full glass-1 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    {project.icon}
                  </span>

                  <LiveLink
                    href={project.liveUrl}
                    label={t('projects.open_project', { name: project.title })}
                  >
                    <span className="text-[0.6875rem] font-medium hidden sm:inline">
                      {t('projects.live_demo')}
                    </span>
                  </LiveLink>
                </div>

                <h3 className="t-card-lg mb-3">{project.title}</h3>
                <p className="t-body mb-5">{project.description}</p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-6">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-ink-100">
                      <FiCheck className="text-accent mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Tags tags={project.tags} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
