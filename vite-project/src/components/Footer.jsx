import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t border-ink-50/[0.08]">
      <div className="container-page py-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 t-meta">
        <p>{t('footer.rights')}</p>
        <p>{t('footer.built_with')}</p>
      </div>
    </footer>
  );
};

export default Footer;
