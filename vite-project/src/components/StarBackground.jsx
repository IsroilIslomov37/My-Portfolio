import { useEffect, useRef, useState } from 'react';

// Сколько звёзд генерировать на каждом из двух слоёв глубины.
const FAR_STARS = 110;
const NEAR_STARS = 55;
const PARTICLES = 14;

const randomStars = (count, sizeRange) =>
  Array.from({ length: count }).map(() => ({
    id: Math.random(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
    delay: `${(Math.random() * 4).toFixed(2)}s`,
    slow: Math.random() > 0.5,
  }));

const StarBackground = () => {
  const [farStars] = useState(() => randomStars(FAR_STARS, [1, 1.6]));
  const [nearStars] = useState(() => randomStars(NEAR_STARS, [1.6, 2.6]));
  const [particles] = useState(() =>
    Array.from({ length: PARTICLES }).map(() => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 2.5,
      duration: `${8 + Math.random() * 8}s`,
      delay: `${(Math.random() * 6).toFixed(2)}s`,
    }))
  );

  const auroraRef = useRef(null);
  const nearLayerRef = useRef(null);

  // Aurora / звёзды очень слабо реагируют на курсор — ощущение "живого" пространства.
  // Полностью отключено на touch-устройствах и при prefers-reduced-motion.
  useEffect(() => {
    const canReact =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canReact) return undefined;

    let frame = null;
    let targetX = 0;
    let targetY = 0;

    const applyTransform = () => {
      frame = null;
      if (auroraRef.current) {
        auroraRef.current.style.setProperty('--ax', `${targetX}px`);
        auroraRef.current.style.setProperty('--ay', `${targetY}px`);
      }
      if (nearLayerRef.current) {
        nearLayerRef.current.style.setProperty('--sx', `${targetX * 0.4}px`);
        nearLayerRef.current.style.setProperty('--sy', `${targetY * 0.4}px`);
      }
    };

    const handlePointerMove = (e) => {
      const relX = e.clientX / window.innerWidth - 0.5;
      const relY = e.clientY / window.innerHeight - 0.5;
      targetX = relX * 26;
      targetY = relY * 18;
      if (!frame) frame = requestAnimationFrame(applyTransform);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none deep-space-base" aria-hidden="true">
      {/* Nebula — глубокие мягкие пятна цвета, задают объём без резких границ */}
      <div className="absolute top-[-12%] left-[-10%] w-[45%] h-[45%] bg-indigo-950/40 rounded-full blur-[130px] animate-glow" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] bg-violet-950/30 rounded-full blur-[150px] animate-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-blue-950/20 rounded-full blur-[120px] animate-glow" style={{ animationDelay: '4s' }} />

      {/* Aurora Borealis — курсор слегка смещает слой целиком (см. --ax/--ay) */}
      <div
        ref={auroraRef}
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: 'translate3d(var(--ax, 0px), var(--ay, 0px), 0)' }}
      >
        <div className="aurora-ribbon aurora-1 animate-aurora-drift" />
        <div className="aurora-ribbon aurora-2 animate-aurora-drift-slow" />
      </div>

      {/* Далёкий слой звёзд — мельче, статичнее (без параллакса) */}
      <div className="absolute inset-0">
        {farStars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full bg-white ${star.slow ? 'animate-twinkle-slow' : 'animate-twinkle'}`}
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              opacity: 0.55,
            }}
          />
        ))}
      </div>

      {/* Ближний слой звёзд — крупнее, ярче, едва заметно смещается за курсором (глубина) */}
      <div
        ref={nearLayerRef}
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: 'translate3d(var(--sx, 0px), var(--sy, 0px), 0)' }}
      >
        {nearStars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full bg-white ${star.slow ? 'animate-twinkle-slow' : 'animate-twinkle'}`}
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              boxShadow: '0 0 4px rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>

      {/* Foreground particles — редкие, очень медленно "дышащие" точки для ощущения глубины */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-blue-300/40 animate-float-slow"
            style={{
              top: `${p.y}%`,
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Виньетка — держит края темнее центра, усиливает ощущение глубины и контраст UI */}
      <div className="absolute inset-0 deep-space-vignette" />
    </div>
  );
};

export default StarBackground;
