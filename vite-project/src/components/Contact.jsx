import { useTranslation } from 'react-i18next';
import { FaTelegramPlane, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import SectionTitle from './SectionTitle';
import ContactForm from './ContactForm';

const Contact = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: 'Telegram',
      username: '@islomov_047',
      link: 'https://t.me/islomov_047',
      icon: <FaTelegramPlane className="text-xl" />,
      desc: t('contact.social.telegram_desc'),
    },
    {
      name: 'Instagram',
      username: 'islomoff47',
      link: 'https://instagram.com/islomoff47/',
      icon: <FaInstagram className="text-xl" />,
      desc: t('contact.social.instagram_desc'),
    },
    {
      name: 'GitHub',
      username: 'IsroilIslomov37',
      link: 'https://github.com/IsroilIslomov37',
      icon: <FaGithub className="text-xl" />,
      desc: t('contact.social.github_desc'),
    },
    {
      name: 'LinkedIn',
      username: 'islomovisroil37',
      link: 'https://www.linkedin.com/in/islomovisroil37',
      icon: <FaLinkedin className="text-xl" />,
      desc: t('contact.social.linkedin_desc'),
    },
  ];

  return (
    <section id="contact" className="section">
      <div className="container-page">
        {/* Раньше эта секция рисовала собственный заголовок с другим кеглем
            и другой чертой — теперь тот же компонент, что и везде. */}
        <SectionTitle title={t('contact.title')} subtitle={t('contact.badge')} index="05" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5">
            <h3 className="t-card mb-4">{t('contact.social_title')}</h3>

            <ul className="space-y-3">
              {socialLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass-1 card-hover p-4 flex items-center gap-4"
                  >
                    <span
                      className="w-11 h-11 rounded-chip bg-space-800 border border-ink-50/[0.1] flex items-center justify-center shrink-0 text-ink-100 group-hover:text-accent transition-colors duration-250"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>

                    <span className="flex-1 min-w-0">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-medium text-ink-50">{item.name}</span>
                        <span className="text-xs text-ink-300 truncate">{item.username}</span>
                      </span>
                      <span className="t-meta block mt-1 truncate">{item.desc}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
