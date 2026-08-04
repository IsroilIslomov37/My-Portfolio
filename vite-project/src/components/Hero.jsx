import React from 'react';
import PlanetOrbit from './PlanetOrbit';

const Hero = () => {
  return (
    <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Главный контейнер на 2 колонки */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* ЛЕВАЯ КОЛОНКА: Текст, бейдж и кнопки */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          
          {/* Бейдж */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-medium shadow-inner">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Открыт к новым предложениям
          </div>

          {/* Заголовок */}
          <div className="space-y-2">
            <p className="text-gray-300 text-lg sm:text-xl font-medium">
              Привет, я <span className="text-white font-semibold">Исроил Исломов</span>
            </p>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Frontend & AI <br className="hidden sm:inline" /> Разработчик
            </h1>
          </div>

          {/* Описание */}
          <p className="text-gray-400 text-sm sm:text-base max-w-lg">
            Создаю интеллектуальные продукты и современные веб-приложения.
          </p>

          {/* Кнопки */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm sm:text-base shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 flex items-center gap-2"
            >
              Смотреть проекты <span>→</span>
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl bg-[#111827]/80 hover:bg-[#1f2937] text-gray-200 border border-gray-700/80 font-medium text-sm sm:text-base transition-all duration-300 flex items-center gap-2"
            >
              Связаться ✉
            </a>
          </div>

        </div>

        {/* ПРАВАЯ КОЛОНКА: Анимированная планета с орбитами */}
        <div className="lg:col-span-5 flex justify-center">
          <PlanetOrbit />
        </div>

      </div>
    </section>
  );
};

export default Hero;