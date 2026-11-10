/*
 * Имя файла осталось от звёздного фона первой версии. Теперь это чёрный фон
 * с одним мягким лаймовым свечением сверху: один CSS-градиент, без анимаций.
 */
const StarBackground = () => (
  <div
    className="fixed inset-0 z-0 pointer-events-none bg-space-900"
    style={{
      backgroundImage: 'radial-gradient(55% 38% at 70% 0%, rgba(198, 244, 50, 0.09), transparent 70%)',
    }}
    aria-hidden="true"
  />
);

export default StarBackground;
