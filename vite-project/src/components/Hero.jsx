import { Button } from 'antd';
import { FaGithub, FaTelegram, FaInstagram, FaArrowRight } from 'react-icons/fa6';

const Hero = () => {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center items-center text-center px-6 pt-10">
      <div className="space-y-6 max-w-4xl mx-auto">
        
        {/* Статус-бейдж */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Available for new projects
        </div>

        {/* Имя и Профессия */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Islomov Isroil</span>
        </h1>

        <p className="text-xl md:text-2xl font-semibold text-gray-300">
          Frontend & AI Developer
        </p>

        {/* Слоган */}
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Transforming ideas into modern, interactive web experiences powered by React & AI.
        </p>

        {/* Кнопки действий */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a href="#projects">
            <Button type="primary" size="large" className="bg-gradient-to-r from-blue-600 to-purple-600 border-none h-12 px-8 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
              View Projects <FaArrowRight />
            </Button>
          </a>
          <a href="#contact">
            <Button size="large" className="bg-white/5 border-white/20 text-white hover:text-cyan-400 h-12 px-8 rounded-xl font-semibold backdrop-blur-md hover:border-cyan-400 transition-all">
              Contact Me
            </Button>
          </a>
        </div>

        {/* Соцсети */}
        <div className="flex justify-center items-center gap-6 pt-6 text-2xl text-gray-400">
          <a href="https://github.com/IsroilIslomov37" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            <FaGithub />
          </a>
          <a href="https://t.me/islomv_047" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            <FaTelegram />
          </a>
          <a href="https://instagram.com/islomoff47" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            <FaInstagram />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;