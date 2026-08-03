import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from 'antd';
import { HiMenu, HiX } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('header.home'), href: '#' },
    { name: t('header.projects'), href: '#projects' },
    { name: t('header.about'), href: '#about' },
    { name: t('header.contact'), href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020617]/70 backdrop-blur-md border-b border-white/10 shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-white hover:text-blue-400 transition-colors">
          Portfolio<span className="text-blue-500">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Header Elements */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button
            className="text-2xl text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <HiMenu />
          </button>
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title={<span className="text-white font-bold text-xl">{t('header.menu')}</span>}
          placement="right"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          closeIcon={<HiX className="text-white text-xl" />}
          styles={{
            body: { backgroundColor: '#0f172a', padding: 0 },
            header: { backgroundColor: '#020617', borderBottom: '1px solid rgba(255,255,255,0.1)' }
          }}
        >
          <div className="flex flex-col py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-4 text-gray-300 hover:text-white hover:bg-white/5 border-b border-white/5 transition-colors text-lg"
              >
                {link.name}
              </a>
            ))}
          </div>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;