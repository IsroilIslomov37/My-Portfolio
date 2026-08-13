import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'contact'];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy: подсвечиваем ссылку той секции, что сейчас проходит через
  // центральную полосу viewport-а.
  useEffect(() => {
    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (nodes.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // Мобильное меню: Esc закрывает, фон под ним не скроллится
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', name: t('header.home'), href: '#home' },
    { id: 'about', name: t('header.about'), href: '#about' },
    { id: 'skills', name: t('header.skills'), href: '#skills' },
    { id: 'projects', name: t('header.projects'), href: '#projects' },
    { id: 'contact', name: t('header.contact'), href: '#contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={`w-full max-w-5xl flex justify-between items-center gap-4 rounded-full px-4 sm:px-5 py-2.5 transition-all duration-300 glass-2 ${
          scrolled ? 'shadow-lg' : 'shadow-none border-white/[0.08]'
        }`}
      >
        <Link to="/" className="shrink-0 text-lg font-bold tracking-tighter text-white hover:text-blue-400 transition-colors">
          Portfolio<span className="text-blue-500">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeId === link.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {activeId === link.id && (
                <span className="absolute inset-0 rounded-full bg-blue-500/15 border border-blue-400/30 shadow-node-glow -z-10" />
              )}
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <button
              className="text-xl text-white"
              aria-label={t('header.menu')}
              onClick={() => setMobileMenuOpen(true)}
            >
              <HiMenu />
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Drawer — раньше это был antd <Drawer>, ради которого в бандл
          тянулась вся библиотека; поведение и вид те же, вес нулевой. */}
      <div className={`md:hidden ${mobileMenuOpen ? '' : 'pointer-events-none'}`}>
        <div
          className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <aside
          className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[80vw] bg-space-800 border-l border-white/10 shadow-2xl transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={t('header.menu')}
        >
          <div className="flex items-center justify-between px-5 py-4 bg-space-900 border-b border-white/10">
            <span className="text-white font-bold text-xl">{t('header.menu')}</span>
            <button
              type="button"
              className="text-white text-xl p-1"
              aria-label={t('header.close')}
              onClick={() => setMobileMenuOpen(false)}
            >
              <HiX />
            </button>
          </div>

          <div className="flex flex-col py-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-6 py-4 border-b border-white/5 transition-colors text-lg ${
                  activeId === link.id ? 'text-blue-400 bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </header>
  );
};

export default Header;
