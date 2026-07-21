import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from 'antd';
import { HiMenu, HiX } from 'react-icons/hi';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active Navigation logic
      const sections = navLinks.map(link => link.href.substring(1));
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Проверяем, находится ли секция в области видимости (с небольшим смещением для хедера)
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
          }
        }
      }
      
      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Корректировка под высоту хедера
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#020617]/70 backdrop-blur-lg border-b border-white/10 shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link 
          to="/" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-2xl font-bold tracking-tighter text-white hover:text-blue-400 transition-colors duration-300"
        >
          Portfolio<span className="text-blue-500">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium transition-all duration-300 hover:text-white ${
                activeSection === link.href.substring(1)
                  ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                  : 'text-gray-400'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl text-white transition-transform hover:scale-110 active:scale-95"
          onClick={() => setMobileMenuOpen(true)}
        >
          <HiMenu />
        </button>

        {/* Mobile Drawer */}
        <Drawer
          title={<span className="text-white font-bold text-xl tracking-tight">Menu</span>}
          placement="right"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          closeIcon={<HiX className="text-white text-xl hover:text-blue-400 transition-colors" />}
          styles={{
            body: { backgroundColor: '#0f172a', padding: 0 },
            header: { backgroundColor: '#020617', borderBottom: '1px solid rgba(255,255,255,0.05)' }
          }}
        >
          <div className="flex flex-col py-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-6 py-4 border-b border-white/5 transition-colors duration-300 ${
                  activeSection === link.href.substring(1)
                    ? 'text-white bg-white/5 font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
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