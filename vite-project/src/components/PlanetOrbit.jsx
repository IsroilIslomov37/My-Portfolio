import { FaReact, FaJs, FaGitAlt, FaNodeJs, FaDatabase, FaCode } from 'react-icons/fa';
import { RiOpenaiFill } from 'react-icons/ri';
import { SiAnthropic, SiCursor, SiDeepseek, SiClaudecode } from 'react-icons/si';

const PlanetOrbit = () => {
  // Внутренняя орбита (ближе к центру)
  const innerSatellites = [
    { icon: <FaReact className="text-cyan-400 text-xl" />, label: 'React', angle: 0 },
    { icon: <FaJs className="text-yellow-400 text-xl" />, label: 'JavaScript', angle: 90 },
    { icon: <FaCode className="text-teal-400 text-xl" />, label: 'Frontend', angle: 180 },
    { icon: <FaGitAlt className="text-orange-500 text-xl" />, label: 'Git', angle: 270 },
  ];

  // Внешняя орбита (дальше от центра) — AI-инструменты вместо соцсетей
  const outerSatellites = [
    { icon: <RiOpenaiFill className="text-emerald-400 text-xl" />, label: 'OpenAI', angle: 26 },
    { icon: <SiAnthropic className="text-orange-300 text-xl" />, label: 'Claude', angle: 77 },
    { icon: <SiCursor className="text-white text-xl" />, label: 'Cursor', angle: 129 },
    { icon: <SiDeepseek className="text-blue-300 text-xl" />, label: 'DeepSeek', angle: 180 },
    { icon: <SiClaudecode className="text-orange-300 text-xl" />, label: 'Claude Code', angle: 231 },
    { icon: <FaNodeJs className="text-green-400 text-xl" />, label: 'Node.js', angle: 283 },
    { icon: <FaDatabase className="text-purple-400 text-xl" />, label: 'Database', angle: 334 },
  ];

  return (
    <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] mx-auto flex items-center justify-center my-6">

      {/* Фоновые орбитальные кольца */}
      <div className="absolute w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full border border-blue-500/25 pointer-events-none"></div>
      <div className="absolute w-[320px] h-[320px] sm:w-[390px] sm:h-[390px] rounded-full border border-purple-500/20 pointer-events-none"></div>

      {/* Центральная планета со знаком </> */}
      <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-1 shadow-glow-blue-lg flex items-center justify-center animate-pulse">
        <div className="w-full h-full rounded-full bg-space-850 flex items-center justify-center border border-blue-400/40">
          <span className="text-blue-400 font-mono text-3xl font-black tracking-wider">&lt;/&gt;</span>
        </div>
      </div>

      {/* Внутренняя орбита (вращается по часовой стрелке) */}
      <div className="absolute inset-0 flex items-center justify-center animate-[spin_35s_linear_infinite] pointer-events-none">
        {innerSatellites.map((item, index) => {
          const radius = 115;
          const radian = (item.angle * Math.PI) / 180;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <div
              key={`inner-${index}`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
              className="absolute pointer-events-auto"
            >
              {/* Контр-вращение живёт на отдельной обёртке, чтобы не конфликтовать с hover-transform ниже */}
              <div className="animate-[spin_35s_linear_infinite_reverse]">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-space-850/95 border border-gray-700/80 flex items-center justify-center shadow-lg hover:border-blue-400 hover:scale-125 hover:-translate-y-1 hover:shadow-glow-blue focus-visible:scale-125 focus-visible:border-blue-400 transition-all duration-300 ease-out group cursor-pointer">
                  {item.icon}
                  <span className="absolute -bottom-7 opacity-0 translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-out bg-slate-900 text-white text-[10px] font-medium px-2 py-0.5 rounded-md border border-gray-700 whitespace-nowrap shadow-md pointer-events-none">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Внешняя орбита (вращается против часовой стрелки) */}
      <div className="absolute inset-0 flex items-center justify-center animate-[spin_45s_linear_infinite_reverse] pointer-events-none">
        {outerSatellites.map((item, index) => {
          const radius = 175;
          const radian = (item.angle * Math.PI) / 180;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <div
              key={`outer-${index}`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
              className="absolute pointer-events-auto"
            >
              {/* Контр-вращение живёт на отдельной обёртке, чтобы не конфликтовать с hover-transform ниже */}
              <div className="animate-[spin_45s_linear_infinite]">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-space-850/95 border border-gray-700/80 flex items-center justify-center shadow-lg hover:border-blue-400 hover:scale-125 hover:-translate-y-1 hover:shadow-glow-blue focus-visible:scale-125 focus-visible:border-blue-400 transition-all duration-300 ease-out group cursor-pointer">
                  {item.icon}
                  <span className="absolute -bottom-7 opacity-0 translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-out bg-slate-900 text-white text-[10px] font-medium px-2 py-0.5 rounded-md border border-gray-700 whitespace-nowrap shadow-md pointer-events-none">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default PlanetOrbit;
