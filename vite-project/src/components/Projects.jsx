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
const SWATCHES = ['bg-accent-deep', 'bg-emerald-400', 'bg-amber-400', 'bg-ink-50'];

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
        : 'inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-ink-200 hover:text-white hover:bg-accent-deep hover:border-accent-deep transition-colors duration-250 group/link'
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
  <ul className="relative flex flex-wrap gap-2 pt-5 border-t border-white/[0.08]">
    {tags.map((tag) => (
      <li
        key={tag}
        className="px-2.5 py-1 text-xs font-medium rounded-full bg-accent/[0.09] text-accent-soft border border-accent/20"
      >
        {tag}
      </li>
    ))}
  </ul>
);

const Jersey = ({ number, className }) => (
  <svg viewBox="0 0 200 180" className={className}>
    <path
      d="M70 14 45 26 16 58l22 22 17-12v98h90V68l17 12 22-22-29-32-25-12q-30 20-60 0Z"
      fill="currentColor"
      stroke="rgba(255,255,255,0.28)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M70 14q30 20 60 0" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="5" />
    <text
      x="100"
      y="126"
      textAnchor="middle"
      fontSize="58"
      fontWeight="800"
      fill="#fff"
      fontFamily="inherit"
    >
      {number}
    </text>
  </svg>
);

/*
 * Превью конфигуратора — чистая декорация, поэтому aria-hidden. Окно само не
 * размывает фон: оно лежит на уже размытой карточке, второй backdrop-filter
 * поверх стоил бы кадров и ничего не добавил. На hover меняются только
 * transform и opacity.
 */
const FormoMockup = ({ domain, orderLabel }) => (
  <div
    className="relative rounded-card border border-white/[0.08] bg-space-900/70 overflow-hidden"
    aria-hidden="true"
  >
    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.08]">
      <span className="w-2 h-2 rounded-full bg-white/20" />
      <span className="w-2 h-2 rounded-full bg-white/20" />
      <span className="w-2 h-2 rounded-full bg-white/20" />
      <span className="mx-auto px-4 py-0.5 rounded-full bg-white/[0.05] font-mono text-[0.6875rem] text-ink-300">
        {domain}
      </span>
    </div>

    <div className="flex items-center gap-4 p-5 pb-14">
      <div className="relative flex-1 h-40 sm:h-48">
        <Jersey
          number="47"
          className="absolute inset-y-0 left-[38%] h-full text-emerald-500 opacity-70 rotate-6 transition-transform duration-500 ease-soft group-hover:translate-x-4 group-hover:rotate-12"
        />
        <Jersey
          number="07"
          className="absolute inset-y-0 left-[6%] h-full text-accent-deep -rotate-3 transition-transform duration-500 ease-soft group-hover:-translate-y-1.5 group-hover:-rotate-6"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        {SWATCHES.map((color, i) => (
          <span
            key={color}
            className={`w-5 h-5 rounded-full ${color} ${
              i === 0 ? 'ring-2 ring-white/70 ring-offset-2 ring-offset-space-900' : 'opacity-80'
            }`}
          />
        ))}
      </div>
    </div>

    <span className="absolute left-4 bottom-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/25 text-xs font-medium text-emerald-300 transition-transform duration-500 ease-soft group-hover:-translate-y-1">
      <FiCheck />
      {orderLabel}
    </span>
  </div>
);

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
      icon: <FiBookOpen className="text-2xl text-accent" />,
    },
    {
      title: t('projects.core_store_title'),
      description: t('projects.core_store_desc'),
      features: [1, 2, 3].map((n) => t(`projects.core_feat_${n}`)),
      tags: ['React', 'JavaScript', 'Tailwind CSS', 'React Router', 'Swiper', 'Vercel'],
      liveUrl: 'https://core-store-peach.vercel.app/',
      icon: <FiShoppingBag className="text-2xl text-accent" />,
    },
  ];

  return (
    <section id="projects" className="section">
      <div className="container-page">
        <SectionTitle title={t('projects.title')} subtitle={t('projects.subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Formo — флагман на всю ширину */}
          <article
            className="group relative md:col-span-2 glass-card glass-spotlight card-hover p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            onMouseMove={handleSpotlight}
          >
            <div className="relative">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
                <span className="t-eyebrow text-accent-soft">{t('projects.formo_badge')}</span>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-1 text-xs font-medium text-ink-200">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
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
                      className="w-8 h-8 rounded-chip glass-1 flex items-center justify-center shrink-0 text-accent"
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
            />
          </article>

          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative glass-card glass-spotlight card-hover p-6 sm:p-8 flex flex-col justify-between"
              onMouseMove={handleSpotlight}
            >
              <div className="relative">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span
                    className="w-12 h-12 rounded-chip glass-1 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    {project.icon}
                  </span>

                  <LiveLink
                    href={project.liveUrl}
                    label={t('projects.open_project', { name: project.title })}
                  >
                    <span className="text-xs font-medium hidden sm:inline">
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
