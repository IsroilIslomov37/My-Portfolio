/**
 * Единственный заголовок секции на сайте: лаймовая метка с номером и
 * подзаголовком, под ней заголовок слева и необязательное вступление справа.
 */
const SectionTitle = ({ title, subtitle, intro, index }) => (
  <header className="mb-10 sm:mb-12">
    {subtitle && (
      <p className="t-eyebrow flex items-center gap-2.5 mb-4">
        {index && (
          <span
            className="px-2 py-0.5 rounded-full bg-accent text-space-950 tracking-normal"
            aria-hidden="true"
          >
            {index}
          </span>
        )}
        {subtitle}
      </p>
    )}

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 lg:items-end">
      <h2 className="t-section lg:col-span-7">{title}</h2>
      {intro && <p className="t-body lg:col-span-5">{intro}</p>}
    </div>
  </header>
);

export default SectionTitle;
