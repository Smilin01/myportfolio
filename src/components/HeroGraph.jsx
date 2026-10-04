const sats = ["Explorer", "Planner", "Frontend", "Backend", "Verifier"].map((label, i) => {
  const a = ((-90 + i * 72) * Math.PI) / 180;
  return { label, x: 210 + 150 * Math.cos(a), y: 210 + 150 * Math.sin(a) };
});

export default function HeroGraph() {
  return (
    <svg viewBox="0 0 420 420" className="w-full h-auto" role="img" aria-label="Animated diagram of a multi-agent system">
      <circle cx="210" cy="210" r="150" fill="none" stroke="#191919" strokeOpacity="0.12" strokeDasharray="3 6" />
      {sats.map((s, i) => (
        <g key={s.label}>
          <line x1="210" y1="210" x2={s.x} y2={s.y} stroke="#191919" strokeOpacity="0.25" />
          <circle cx="210" cy="210" r="4" fill="#1A8917">
            <animateMotion dur="2.6s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M0 0 L${s.x - 210} ${s.y - 210}`} />
          </circle>
          <circle cx={s.x} cy={s.y} r="26" fill="#F7F4ED" stroke="#191919" strokeWidth="1.5" />
          <circle cx={s.x} cy={s.y} r="5" fill="#191919" />
          <text x={s.x} y={s.y + 44} textAnchor="middle" fontSize="13" fontFamily="Inter, sans-serif" fill="#191919">
            {s.label}
          </text>
        </g>
      ))}
      <circle className="pulse-ring" cx="210" cy="210" r="38" fill="none" stroke="#1A8917" strokeWidth="2" />
      <circle cx="210" cy="210" r="38" fill="#191919" />
      <text x="210" y="215" textAnchor="middle" fontSize="14" fontWeight="600" fontFamily="Inter, sans-serif" fill="#F7F4ED">
        Brain
      </text>
    </svg>
  );
}
