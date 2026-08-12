import { useReveal } from '../hooks/useReveal';

/**
 * Тонкая обёртка для scroll-reveal секций — избавляет каждую секцию
 * от необходимости самой подключать IntersectionObserver.
 */
const Reveal = ({ children, className = '', delay = 0, as: Tag = 'div' }) => {
  const [ref, visible] = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
