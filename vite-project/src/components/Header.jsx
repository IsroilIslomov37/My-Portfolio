import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'contact'];

const iconButton =
  'flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.12] text-ink-100 hover:text-accent hover:border-accent transition-colors duration-250';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const { t } = useTranslation();

  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Scrollspy: подсвечиваем ссылку той секции, что сейчас проходит через
  // центральную полосу viewport-а.
  useEffect(() => {
    // #ai-skills — продолжение навыков без своего пункта меню.
    const nodes = [...SECTION_IDS, 'ai-skills'].map((id) => document.getElementById(id)).filter(Boolean);
    if (nodes.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id === 'ai-skills' ? 'skills' : entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // Мобильное меню: Esc закрывает, фон под ним не скроллится, фокус уходит
  // внутрь панели и возвращается на кнопку меню после закрытия.
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // Фокус уводим внутрь панели, иначе он остался бы на кнопке меню под
    // затемнением. Чтение геометрии форсирует пересчёт стилей: с элементом,
    // который браузер ещё считает недоступным, focus() молча не сработал бы.
    const closeButton = closeButtonRef.current;
    if (closeButton) {
      void closeButton.offsetWidth;
      closeButton.focus();
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [mobileMenuOpen]);

  const navLinks = SECTION_IDS.map((id) => ({ id, name: t(`header.${id}`), href: `#${id}` }));

  return (
    // Размытие подложки только с md: на телефоне оно не окупается
    <header className="fixed top-0 inset-x-0 z-50 bg-space-900/95 md:bg-space-900/80 md:backdrop-blur-md border-b border-white/[0.08]">
      <div className="container-page flex items-center justify-between gap-4 h-16">
        <Link to="/" className="shrink-0 text-lg font-bold tracking-tight text-ink-50">
          isroil<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label={t('header.menu')}>
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-250 ${
                  isActive
                    ? 'bg-accent text-space-950'
                    : 'text-ink-200 hover:text-ink-50 hover:bg-white/[0.06]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher />
          <button
            ref={menuButtonRef}
            type="button"
            className={`md:hidden ${iconButton}`}
            aria-label={t('header.menu')}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
          >
            <HiMenu className="text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer.
          Закрытая панель убирается из порядка обхода табом атрибутом inert —
          он же прячет её от скринридера. Попытка добиться того же через
          transition на visibility не работает: браузер отрабатывает это
          свойство дискретно и застревает то на открытии, то на закрытии,
          а анимация выезда при этом всё равно нужна. */}
      <div className={`md:hidden ${mobileMenuOpen ? '' : 'pointer-events-none'}`}>
        <div
          className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 ease-soft ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <aside
          className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[82vw] bg-space-900 border-l border-white/[0.1] transition-transform duration-300 ease-soft ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={t('header.menu')}
          inert={mobileMenuOpen ? undefined : ''}
        >
          <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.08]">
            <span className="t-eyebrow text-ink-300">{t('header.menu')}</span>
            <button
              ref={closeButtonRef}
              type="button"
              className={iconButton}
              aria-label={t('header.close')}
              onClick={() => setMobileMenuOpen(false)}
            >
              <HiX className="text-xl" />
            </button>
          </div>

          <nav className="flex flex-col gap-1.5 p-4" aria-label={t('header.menu')}>
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`px-4 py-3 rounded-full font-medium transition-colors duration-250 ${
                    isActive
                      ? 'bg-accent text-space-950'
                      : 'text-ink-200 hover:text-ink-50 hover:bg-white/[0.06]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </aside>
      </div>
    </header>
  );
};

export default Header;
