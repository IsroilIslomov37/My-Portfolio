import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
import StatCard from './StatCard';
import { FiCode, FiBookOpen, FiMonitor, FiCheckCircle } from 'react-icons/fi';

const About = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: <FiCode />, label: t('about.age_label'), value: t('about.age_val'), colorClass: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
    { icon: <FiBookOpen />, label: t('about.exp_label'), value: t('about.exp_val'), colorClass: 'bg-purple-500/10 border-purple-500/20 text-purple-400' },
    { icon: <FiMonitor />, label: t('about.focus_label'), value: t('about.focus_val'), colorClass: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' },
  ];

  return (
    <section id="about" className="py-16 px-6 max-w-7xl mx-auto">
      <SectionTitle
        title={t('about.title')}
        subtitle={t('about.subtitle')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Карточки слева */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Правая карточка с описанием */}
        <div className="lg:col-span-8 glass-card p-8 md:p-10 flex flex-col justify-between">
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>{t('about.bio_p1')}</p>
            <p>{t('about.bio_p2')}</p>
          </div>

          {/* Список преимуществ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
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