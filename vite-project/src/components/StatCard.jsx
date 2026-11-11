const StatCard = ({ icon, label, value }) => (
  <div className="glass-card p-5 flex items-center gap-4">
    <div
      className="w-11 h-11 shrink-0 rounded-chip flex items-center justify-center text-xl border border-ink-50/[0.1] bg-space-800 text-accent"
      aria-hidden="true"
    >
      {icon}
    </div>
    <div className="min-w-0">
      <span className="t-eyebrow text-ink-300 block mb-1.5">{label}</span>
      <span className="block text-ink-50 font-semibold text-lg leading-tight">{value}</span>
    </div>
  </div>
);

export default StatCard;
