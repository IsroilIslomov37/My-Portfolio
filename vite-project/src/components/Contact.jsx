import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaTelegramPlane, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import ContactForm from './ContactForm';

const Contact = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: 'Telegram',
      username: '@islomv_047',
      link: 'https://t.me/islomv_047',
      icon: <FaTelegramPlane className="text-2xl text-sky-400" />,
      desc: t('contact.social.telegram_desc', 'Прямая связь в Telegram'),
    },
    {
      name: 'Instagram',
      username: 'islomov14/',
      link: 'https://instagram.com/islomov14/',
      icon: <FaInstagram className="text-2xl text-pink-500" />,
      desc: t('contact.social.instagram_desc', 'Мой личный профиль'),
    },
    {
      name: 'GitHub',
      username: 'IsroilIslomov37',
      link: 'https://github.com/IsroilIslomov37',
      icon: <FaGithub className="text-2xl text-white" />,
      desc: t('contact.social.github_desc', 'Исходные коды проектов'),
    },
    {
      name: 'LinkedIn',
      username: 'islomovisroil37',
      link: 'https://www.linkedin.com/in/islomovisroil37',
      icon: <FaLinkedin className="text-2xl text-blue-500" />,
      desc: t('contact.social.linkedin_desc', 'Профессиональный профиль'),
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Заголовок раздела */}
      <div className="text-center mb-12">
        <span className="text-xs sm:text-sm font-semibold text-blue-500 tracking-widest uppercase mb-2 block">
          {t('contact.badge', 'ДАВАЙТЕ НА СВЯЗЬ')}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white relative inline-block pb-3">
          {t('contact.title', 'Связаться со мной')}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full"></span>
        </h2>
      </div>

      {/* Двухколоночный макет: Слева Форма, Справа Соцсети */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Левая колонка — Форма отправки (7 из 12) */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Правая колонка — Соцсети (5 из 12) */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="text-lg font-bold text-white mb-4">
            {t('contact.social_title', 'Мои социальные сети')}
          </h4>

          {socialLinks.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0b0f17]/90 border border-gray-800/80 rounded-2xl p-4 flex items-center gap-4 hover:border-blue-500/50 hover:bg-[#101623] transition-all duration-300 group shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800/60 border border-gray-700/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5 className="text-base font-bold text-white">{item.name}</h5>
                  <span className="text-xs font-mono text-cyan-400 truncate max-w-[120px] sm:max-w-none">
                    {item.username}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 truncate">{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;