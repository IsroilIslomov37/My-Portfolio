import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  // backdrop-blur только с md: на телефоне размытие подложки не окупается
  return (
    <footer className="w-full border-t border-white/10 py-6 px-6 bg-space-900/80 md:bg-space-900/50 md:backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-400">
        <div>{t('footer.rights')}</div>
        <div>{t('footer.built_with')}</div>
      </div>
    </footer>
  );
};

export default Footer;