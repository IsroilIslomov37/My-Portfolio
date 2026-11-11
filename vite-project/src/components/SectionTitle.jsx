import useReveal from '../hooks/useReveal';

/**
 * Единственный заголовок секции на сайте: зелёная метка с номером,
 * заголовок капсом с подчёркиванием «от руки» и необязательное вступление
 * справа. Подчёркивание прорисовывается, когда заголовок появляется на экране.
 */
const SectionTitle = ({ title, subtitle, intro, index }) => {
  const [ref, visible] = useReveal({ threshold: 0.4 });

  return (
    <header ref={ref} className={`mb-10 sm:mb-14 ${visible ? 'web-in' : ''}`}>
      {subtitle && (
        <p className="t-eyebrow flex items-center gap-2.5 mb-4">
          {index && (
            <span
              className="px-2 py-0.5 rounded-chip bg-accent text-space-950 tracking-normal -rotate-3"
              aria-hidden="true"
            >
              {index}
            </span>
          )}
          {subtitle}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 lg:items-end">
        <div className="lg:col-span-7">
          <h2 className="t-section">{title}</h2>
          <svg
            className="block w-44 sm:w-56 h-4 mt-2 text-accent"
            viewBox="0 0 220 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 11c30-6 62-8 96-6s70 4 118-3"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength="1"
              className="web-line"
            />
          </svg>
        </div>
        {intro && <p className="t-body lg:col-span-5">{intro}</p>}
      </div>
    </header>
  );
};

export default SectionTitle;
