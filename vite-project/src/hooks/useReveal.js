import { useEffect, useRef, useState } from 'react';

/**
 * Триггерит один раз, когда элемент входит во viewport. Используется
 * для анимаций, которые проигрываются при входе элемента в экран.
 */
export function useReveal(options) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Без IntersectionObserver секции навсегда остались бы с opacity: 0 —
    // то есть страница оказалась бы пустой. Показываем сразу.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

export default useReveal;
