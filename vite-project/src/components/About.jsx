import { useTranslation } from 'react-i18next';
import SectionTitle from './SectionTitle';
import StatCard from './StatCard';
import { FiCode, FiBookOpen, FiMonitor, FiCheckCircle } from 'react-icons/fi';

const About = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <FiCode />,
      label: t('about.live_label'),
      value: t('about.live_val'),
    },
    {
      icon: <FiBookOpen />,
      label: t('about.exp_label'),
      value: t('about.exp_val'),
    },
    {
      icon: <FiMonitor />,
      label: t('about.focus_label'),
      value: t('about.focus_val'),
    },
  ];

  const features = [t('about.feat_1'), t('about.feat_2'), t('about.feat_3'), t('about.feat_4')];

  return (
    <section id="about" className="section">
      <div className="container-page">
        <SectionTitle title={t('about.title')} subtitle={t('about.subtitle')} index="01" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Факты слева */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          {/* Текст справа */}
          <div className="lg:col-span-8 glass-card p-6 sm:p-8 lg:p-10">
            <div className="space-y-4">
              <p className="t-lead">{t('about.bio_p1')}</p>
              <p className="t-body">{t('about.bio_p2')}</p>
              <p className="t-body">{t('about.bio_p3')}</p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-8 pt-8 border-t border-white/[0.08]">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-ink-100">
                  <FiCheckCircle className="text-accent text-base shrink-0" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
