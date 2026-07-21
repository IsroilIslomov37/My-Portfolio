const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-10 bg-[#020617]/50 backdrop-blur-md border-t border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-400 text-sm font-medium tracking-wide">
          © {currentYear} Portfolio. All rights reserved.
        </div>
        <div className="text-gray-500 text-xs flex items-center gap-1">
          Designed & Built with <span className="text-blue-500 animate-pulse">❤</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;