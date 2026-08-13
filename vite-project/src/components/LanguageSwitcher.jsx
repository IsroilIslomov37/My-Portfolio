import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi';

const LANGUAGES = [
  { key: 'en', label: 'English' },
  { key: 'ru', label: 'Русский' },
  { key: 'uz', label: 'Oʻzbekcha' },
];

// Раньше здесь был antd <Dropdown>: одно меню из трёх пунктов тянуло в бандл
// всю библиотеку. Своя реализация — те же клик-по-кнопке, закрытие по клику
// снаружи и по Esc.
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const selectLanguage = (key) => {
    i18n.changeLanguage(key);
    setOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-gray-300 hover:text-white"
      >
        <FiGlobe className="text-xl" />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[140px] py-1 rounded-xl bg-space-800 border border-white/10 shadow-xl overflow-hidden"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.key} role="option" aria-selected={i18n.resolvedLanguage === lang.key}>
              <button
                type="button"
                onClick={() => selectLanguage(lang.key)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  i18n.resolvedLanguage === lang.key
                    ? 'text-blue-400 bg-white/5 font-medium'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
