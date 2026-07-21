const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-start md:items-center text-left md:text-center mb-12 group cursor-default">
      {subtitle && (
        <span className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-2 transition-transform duration-300 group-hover:-translate-y-1">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white relative inline-block">
        {title}
        {/* Декоративный элемент с rounded-2xl и анимацией */}
        <div className="absolute -bottom-4 left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl transition-all duration-300 group-hover:w-full"></div>
      </h2>
    </div>
  );
};

export default SectionTitle;