import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi';

const LANGUAGES = [
  { key: 'en', label: 'English', short: 'EN' },
  { key: 'ru', label: 'Русский', short: 'RU' },
  { key: 'uz', label: 'Oʻzbekcha', short: 'UZ' },
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

  const current = LANGUAGES.find((lang) => lang.key === i18n.resolvedLanguage) ?? LANGUAGES[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.label}`}
        className="flex items-center gap-1.5 h-10 pl-2.5 pr-3 rounded-full border border-ink-50/[0.12] bg-space-850 hover:border-accent/60 text-ink-200 hover:text-ink-50 transition-colors duration-250"
      >
        <FiGlobe className="text-base" aria-hidden="true" />
        {/* Текущий язык виден сразу — раньше глобус ничего о нём не сообщал */}
        <span className="text-xs font-medium tracking-wide">{current.short}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[150px] py-1 glass-2 overflow-hidden"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.key} role="option" aria-selected={i18n.resolvedLanguage === lang.key}>
              <button
                type="button"
                onClick={() => selectLanguage(lang.key)}
                className={`w-full text-left px-4 py-2.5 text-xs transition-colors duration-250 ${
                  i18n.resolvedLanguage === lang.key
                    ? 'text-accent bg-space-800'
                    : 'text-ink-200 hover:text-ink-50 hover:bg-space-800'
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
