import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
import { FiBookOpen, FiArrowUpRight, FiShoppingBag } from 'react-icons/fi';
import { FaRocket } from 'react-icons/fa6';

/*
 * Структура секции намеренно оставлена прежней — она ждёт своей очереди,
 * когда появится большой проект. Здесь только приведение к общим токенам:
 * ширина контейнера, ритм секции, единый hover карточки, типографика
 * и доступное имя у ссылки на демо.
 */
const Projects = () => {
  const { t } = useTranslation();

  const projectsData = [
    {
      title: t('projects.edu_center_title'),
      description: t('projects.edu_center_desc'),
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'PostgreSQL'],
      liveUrl: 'https://vibrant-landing-woad.vercel.app/',
      icon: <FiBookOpen className="text-2xl text-accent" />,
    },
    {
      title: t('projects.core_store_title'),
      description: t('projects.core_store_desc'),
      tags: ['React', 'Tailwind CSS', 'JavaScript', 'Vercel', 'react-router-dom', 'swiper'],
      liveUrl: 'https://core-store-peach.vercel.app/',
      icon: <FiShoppingBag className="text-2xl text-accent" />,
    },
  ];

  const handleSpotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="projects" className="section">
      <div className="container-page">
        <SectionTitle title={t('projects.title')} subtitle={t('projects.subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project) => (
            <article
              key={project.title}
              className="group relative glass-card glass-spotlight card-hover p-6 sm:p-8 flex flex-col justify-between"
              onMouseMove={handleSpotlight}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-accent/[0.07] rounded-full blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span
                    className="w-12 h-12 rounded-chip glass-1 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    {project.icon}
                  </span>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('projects.open_project', { name: project.title })}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-ink-200 hover:text-white hover:bg-accent-deep hover:border-accent-deep transition-colors duration-250 group/link"
                  >
                    <span className="text-xs font-medium hidden sm:inline">
                      {t('projects.live_demo')}
                    </span>
                    <FiArrowUpRight
                      className="text-base group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-250"
                      aria-hidden="true"
                    />
                  </a>
                </div>

                <h3 className="t-card-lg mb-3">{project.title}</h3>
                <p className="t-body mb-6">{project.description}</p>
              </div>

              <ul className="relative flex flex-wrap gap-2 pt-5 border-t border-white/[0.08]">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium rounded-full bg-accent/[0.09] text-accent-soft border border-accent/20"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <div className="glass-1 border-dashed border-white/[0.12] p-8 flex flex-col items-center justify-center text-center">
            <span
              className="w-14 h-14 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 text-indigo-300"
              aria-hidden="true"
            >
              <FaRocket className="text-xl" />
            </span>
            <h3 className="t-card mb-2">{t('projects.coming_soon_title')}</h3>
            <p className="t-meta max-w-xs">{t('projects.coming_soon_desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
