import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
import { FiCode, FiBookOpen, FiMonitor, FiCheckCircle } from 'react-icons/fi';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
      <SectionTitle 
        title={t('about.title')} 
        subtitle={t('about.subtitle')} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Карточки слева */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4 hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-2xl">
              <FiCode />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                {t('about.age_label')}
              </span>
              <span className="text-xl font-bold text-white">
                {t('about.age_val')}
              </span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4 hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-2xl">
              <FiBookOpen />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                {t('about.exp_label')}
              </span>
              <span className="text-xl font-bold text-white">
                {t('about.exp_val')}
              </span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4 hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl">
              <FiMonitor />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                {t('about.focus_label')}
              </span>
              <span className="text-xl font-bold text-white">
                {t('about.focus_val')}
              </span>
            </div>
          </div>
        </div>

        {/* Правая карточка с описанием */}
        <div className="lg:col-span-8 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 flex flex-col justify-between">
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>{t('about.bio_p1')}</p>
            <p>{t('about.bio_p2')}</p>
          </div>

          {/* Список преимуществ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 text-sm text-gray-200">
              <FiCheckCircle className="text-cyan-400 text-lg flex-shrink-0" />
              <span>{t('about.feat_1')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-200">
              <FiCheckCircle className="text-cyan-400 text-lg flex-shrink-0" />
              <span>{t('about.feat_2')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-200">
              <FiCheckCircle className="text-cyan-400 text-lg flex-shrink-0" />
              <span>{t('about.feat_3')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-200">
              <FiCheckCircle className="text-cyan-400 text-lg flex-shrink-0" />
              <span>{t('about.feat_4')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;