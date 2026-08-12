import { useEffect, useRef, useState } from 'react';

/**
 * Триггерит один раз, когда элемент входит во viewport — используется вместе
 * с классом .reveal (см. index.css) для мягкого scroll-появления секций.
 */
export function useReveal(options) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

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
