import { useEffect, useRef, useState } from 'react';

/*
 * Раньше каждая звезда была отдельным <div> с собственной бесконечной
 * анимацией: ~180 узлов и столько же слоёв композитора, которые браузер
 * пересчитывал при любой прокрутке. Теперь основное звёздное поле рисуется
 * один раз в <canvas> (один узел, ноль работы после отрисовки), а «живыми»
 * остаются лишь два десятка ближних звёзд — ровно столько, чтобы фон дышал.
 */

// Плотность: один пиксель звезды примерно на N пикселей площади экрана.
const DENSITY_FULL = 7000;
const DENSITY_LITE = 11000;
const MAX_STARS = 260;

// Слабое устройство: узкий экран, touch, мало ядер или включённый
// reduced-motion. Условия совпадают с медиазапросом облегчённого режима в CSS.
const detectLite = () => {
  if (typeof window === 'undefined') return true;
  return (
    window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    (navigator.hardwareConcurrency || 8) <= 4
  );
};

// Детерминированный генератор: при перерисовке после ресайза звёздное поле
// остаётся тем же самым, а не «перепрыгивает» на новые позиции.
const seededRandom = (seed) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const randomStars = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1.4 + Math.random() * 1.1,
    delay: `${(Math.random() * 5).toFixed(2)}s`,
    slow: Math.random() > 0.5,
    opacity: 0.35 + Math.random() * 0.45,
  }));

const StarBackground = () => {
  const [lite] = useState(detectLite);
  const [nearStars] = useState(() => randomStars(lite ? 10 : 22));

  const canvasRef = useRef(null);
  const auroraRef = useRef(null);
  const nearLayerRef = useRef(null);

  // Звёздное поле: одна отрисовка на монтирование и по одной на ощутимый ресайз.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    let lastWidth = 0;
    let lastHeight = 0;
    let timer = null;

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      if (!width || !height) return;

      lastWidth = width;
      lastHeight = height;

      // Больше 2x не даёт видимой разницы на точках в 1–2 пикселя,
      // а память под буфер растёт квадратично.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const density = lite ? DENSITY_LITE : DENSITY_FULL;
      const count = Math.min(MAX_STARS, Math.round((width * height) / density));
      const random = seededRandom(20260909);

      for (let i = 0; i < count; i += 1) {
        const x = random() * width;
        const y = random() * height;
        const radius = 0.35 + random() * 0.75;
        const alpha = 0.2 + random() * 0.5;
        // Часть звёзд уводим в холодный оттенок — поле перестаёт выглядеть
        // напечатанным одной краской.
        const cool = random() > 0.72;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = cool
          ? `rgba(191, 219, 254, ${alpha.toFixed(3)})`
          : `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.fill();
      }
    };

    const handleResize = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      // Появление/скрытие адресной строки на телефоне меняет высоту на
      // десятки пикселей десятки раз подряд — перерисовываться на это не нужно.
      if (Math.abs(width - lastWidth) < 60 && Math.abs(height - lastHeight) < 140) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(draw, 200);
    };

    draw();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [lite]);

  // Аврора и ближние звёзды очень слабо реагируют на курсор — ощущение
  // объёма без «преследования» указателя. На touch и при reduced-motion выключено.
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
      auroraRef.current?.style.setProperty('--ax', `${targetX}px`);
      auroraRef.current?.style.setProperty('--ay', `${targetY}px`);
      nearLayerRef.current?.style.setProperty('--sx', `${targetX * 0.45}px`);
      nearLayerRef.current?.style.setProperty('--sy', `${targetY * 0.45}px`);
    };

    const handlePointerMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 18;
      targetY = (e.clientY / window.innerHeight - 0.5) * 12;
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
      {/* Туманности — мягкие пятна цвета, задающие объём. Раньше они ещё и
          пульсировали по opacity: постоянное движение фона мешало читать. */}
      <div
        className={`absolute top-[-12%] left-[-10%] w-[45%] h-[45%] bg-indigo-950/40 rounded-full ${
          lite ? 'blur-[70px]' : 'blur-[130px]'
        }`}
      />
      <div
        className={`absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] bg-violet-950/30 rounded-full ${
          lite ? 'blur-[80px]' : 'blur-[150px]'
        }`}
      />

      {/* Aurora Borealis — курсор слегка смещает слой целиком (см. --ax/--ay) */}
      <div
        ref={auroraRef}
        className="absolute inset-0 transition-transform duration-700 ease-soft"
        style={{ transform: 'translate3d(var(--ax, 0px), var(--ay, 0px), 0)' }}
      >
        <div className={`aurora-ribbon aurora-1 ${lite ? '' : 'animate-aurora-drift'}`} />
        {!lite && <div className="aurora-ribbon aurora-2 animate-aurora-drift-slow" />}
      </div>

      {/* Дальнее звёздное поле — один canvas вместо полутора сотен узлов */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Ближний слой — крупнее, мерцает, едва заметно идёт за курсором */}
      <div
        ref={nearLayerRef}
        className="absolute inset-0 transition-transform duration-700 ease-soft"
        style={{ transform: 'translate3d(var(--sx, 0px), var(--sy, 0px), 0)' }}
      >
        {nearStars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full bg-white ${
              lite ? '' : star.slow ? 'animate-twinkle-slow' : 'animate-twinkle'
            }`}
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: lite ? undefined : star.delay,
              opacity: lite ? star.opacity : undefined,
              boxShadow: lite ? undefined : '0 0 4px rgba(255, 255, 255, 0.45)',
            }}
          />
        ))}
      </div>

      {/* Виньетка — держит края темнее центра, усиливает глубину и контраст UI */}
      <div className="absolute inset-0 deep-space-vignette" />
    </div>
  );
};

export default StarBackground;
