const StatCard = ({ icon, label, value, colorClass }) => (
  <div className="glass-card p-6 flex items-center gap-4 hover:border-white/20">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border ${colorClass}`}>
      {icon}
    </div>
    <div>
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
        {label}
      </span>
      <span className="text-xl font-bold text-white">
        {value}
      </span>
    </div>
  </div>
);

export default StatCard;
