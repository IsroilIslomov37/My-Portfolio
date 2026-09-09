/**
 * Единственный заголовок секции на сайте. Раньше Contact рисовал свой,
 * с другими размерами и другой подчёркивающей чертой, — из-за этого две
 * соседние секции выглядели сделанными разными людьми.
 */
const SectionTitle = ({ title, subtitle, intro }) => (
  <header className="flex flex-col items-center text-center mb-12 sm:mb-14">
    {subtitle && <p className="t-eyebrow mb-3">{subtitle}</p>}

    <h2 className="t-section">{title}</h2>

    {/* Волосяная линия вместо жирного синего бруска: акцент, а не украшение */}
    <span
      aria-hidden="true"
      className="mt-5 h-px w-16 bg-gradient-to-r from-transparent via-accent/70 to-transparent"
    />

    {intro && <p className="t-body measure mt-5">{intro}</p>}
  </header>
);

export default SectionTitle;
