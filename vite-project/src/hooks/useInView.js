import { useEffect, useRef, useState } from 'react';

/**
 * В отличие от useReveal (срабатывает один раз), следит за элементом постоянно —
 * нужен, чтобы останавливать бесконечные анимации, ушедшие за пределы экрана.
 */
export function useInView({ rootMargin = '200px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}

export default useInView;
