import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  // backdrop-blur только с md: на телефоне размытие подложки не окупается
  return (
    <footer className="w-full border-t border-white/[0.08] py-7 bg-space-900/80 md:bg-space-900/50 md:backdrop-blur-md">
      <div className="container-page flex flex-col sm:flex-row justify-between items-center gap-3 t-meta">
        <p>{t('footer.rights')}</p>
        <p>{t('footer.built_with')}</p>
      </div>
    </footer>
  );
};

export default Footer;
