import { useTranslation } from 'react-i18next';
import { Dropdown } from 'antd';
import { FiGlobe } from 'react-icons/fi';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const items = [
    { key: 'en', label: 'English' },
    { key: 'ru', label: 'Русский' },
    { key: 'uz', label: 'Oʻzbekcha' },
  ];

  const handleMenuClick = ({ key }) => {
    i18n.changeLanguage(key);
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
        selectedKeys: [i18n.resolvedLanguage],
      }}
      trigger={['click']}
      placement="bottomRight"
    >
      <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-gray-300 hover:text-white">
        <FiGlobe className="text-xl" />
      </button>
    </Dropdown>
  );
};

export default LanguageSwitcher;