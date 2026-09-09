import { FaReact, FaJs, FaGitAlt, FaCode } from 'react-icons/fa';
import { RiOpenaiFill } from 'react-icons/ri';
import { SiCursor, SiDeepseek, SiClaudecode, SiFigma, SiVercel } from 'react-icons/si';
import useInView from '../hooks/useInView';

/*
 * Радиусы и размеры заданы в процентах от контейнера, а контейнер — от ширины
 * экрана. Раньше здесь были фиксированные 340px и радиус 175px: на экране
 * 320px орбита выходила за границы вьюпорта.
 */
// Разница радиусов (18% ширины ≈ 69px при контейнере 384px) заведомо больше
// размера плитки: кольца вращаются с разной скоростью, и спутники неизбежно
// проходят друг над другом — при меньшем зазоре они слипались.
const INNER_RADIUS = 26;
const OUTER_RADIUS = 44;

const INNER = [
  { icon: <FaReact className="text-cyan-400" />, angle: -90 },
  { icon: <FaJs className="text-yellow-400" />, angle: 0 },
  { icon: <FaCode className="text-teal-300" />, angle: 90 },
  { icon: <FaGitAlt className="text-orange-400" />, angle: 180 },
];

const OUTER = [
  { icon: <SiClaudecode className="text-orange-300" />, angle: -60 },
  { icon: <SiCursor className="text-ink-100" />, angle: 0 },
  { icon: <RiOpenaiFill className="text-emerald-300" />, angle: 60 },
  { icon: <SiDeepseek className="text-blue-300" />, angle: 120 },
  { icon: <SiFigma className="text-fuchsia-400" />, angle: 180 },
  { icon: <SiVercel className="text-ink-100" />, angle: 240 },
];

const position = (angle, radius) => {
  const radian = (angle * Math.PI) / 180;
  return {
    left: `${50 + Math.cos(radian) * radius}%`,
    top: `${50 + Math.sin(radian) * radius}%`,
  };
};

const Satellite = ({ icon, style, counterSpin }) => (
  <div className="absolute -translate-x-1/2 -translate-y-1/2" style={style}>
    {/* Контр-вращение на отдельной обёртке: иконка остаётся вертикальной */}
    <div className={counterSpin}>
      <div className="w-10 h-10 rounded-chip glass-1 flex items-center justify-center text-lg">
        {icon}
      </div>
    </div>
  </div>
);

/**
 * Чисто декоративный элемент hero-секции: те же технологии подписаны и
 * объяснены в секции Skills, поэтому здесь нет ни подсказок, ни hover-состояний,
 * ни точки входа для скринридера — только атмосфера.
 */
const PlanetOrbit = () => {
  // Две орбиты крутятся бесконечно. Пока пользователь читает нижние секции,
  // эта работа никому не видна — паузим.
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative w-[min(24rem,86vw)] aspect-square pointer-events-none select-none ${
        inView ? '' : 'orbit-paused'
      }`}
    >
      {/* Орбитальные кольца */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[52%] aspect-square rounded-full border border-white/[0.07]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] aspect-square rounded-full border border-white/[0.05]" />

      {/* Ядро */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[25%] aspect-square rounded-full bg-gradient-to-br from-blue-500/80 via-indigo-500/70 to-purple-500/70 p-px shadow-glow-accent">
        <div className="w-full h-full rounded-full bg-space-900 flex items-center justify-center border border-white/10">
          <span className="text-accent font-mono text-2xl sm:text-3xl font-bold tracking-tight">
            &lt;/&gt;
          </span>
        </div>
      </div>

      {/* Внутренняя орбита — по часовой стрелке */}
      <div className="absolute inset-0 animate-[spin_60s_linear_infinite]">
        {INNER.map((item) => (
          <Satellite
            key={item.angle}
            icon={item.icon}
            style={position(item.angle, INNER_RADIUS)}
            counterSpin="animate-[spin_60s_linear_infinite_reverse]"
          />
        ))}
      </div>

      {/* Внешняя орбита — против часовой стрелки */}
      <div className="absolute inset-0 animate-[spin_85s_linear_infinite_reverse]">
        {OUTER.map((item) => (
          <Satellite
            key={item.angle}
            icon={item.icon}
            style={position(item.angle, OUTER_RADIUS)}
            counterSpin="animate-[spin_85s_linear_infinite]"
          />
        ))}
      </div>
    </div>
  );
};

export default PlanetOrbit;
