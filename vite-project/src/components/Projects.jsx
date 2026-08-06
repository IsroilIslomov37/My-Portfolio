import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
import { FiHelpCircle, FiArrowUpRight, FiShoppingBag } from 'react-icons/fi';
import { FaRocket } from 'react-icons/fa6';

const Projects = () => {
  const { t } = useTranslation();

  const projectsData = [
    {
      title: t('projects.quiz_title'),
      description: t('projects.quiz_desc'),
      tags: ['React', 'Tailwind CSS', 'JavaScript', 'Vercel'],
      liveUrl: 'https://quiz-app-eight-nu-19.vercel.app/',
      icon: <FiHelpCircle className="text-blue-400 text-3xl" />,
    },
    {
      title: t('projects.core_store_title'),
      description: t('projects.core_store_desc'),
      tags: ['React', 'Tailwind CSS', 'JavaScript', 'Vercel', 'react-router-dom', 'swiper'],
      liveUrl: 'https://core-store-peach.vercel.app/',
      icon: <FiShoppingBag className="text-blue-400 text-3xl" />,
    },
  ];

  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
      <SectionTitle title={t('projects.title')} subtitle={t('projects.subtitle')} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="group relative bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 transition-all duration-300 hover:border-blue-500/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500 pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </div>
                
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 group/link flex items-center gap-1"
                  title="Live Demo"
                >
                  <span className="text-xs font-medium pl-1 hidden sm:inline">{t('projects.live_demo')}</span>
                  <FiArrowUpRight className="text-lg group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className="relative bg-white/5 border border-dashed border-white/15 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-white/30">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-purple-400 animate-pulse">
            <FaRocket className="text-2xl" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">{t('projects.coming_soon_title')}</h4>
          <p className="text-gray-400 text-sm max-w-xs">
            {t('projects.coming_soon_desc')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;