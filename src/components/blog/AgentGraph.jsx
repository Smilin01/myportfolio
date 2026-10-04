import { meta, layouts, edgeDefs, link } from "../agentLayout";

// Light-theme, optionally clickable version of the agent architecture.
// edges: { "brain-explorer": "off" | "done" | "active" }, back: same states.
export default function AgentGraph({ wide, active = [], dim = [], edges = {}, back = "done", selected, onSelect, showAll = true }) {
  const L = wide ? layouts.wide : layouts.tall;
  const stroke = { off: "#d4d0c6", done: "#8a877e", active: "#1A8917" };
  return (
    <svg viewBox={`0 0 ${L.w} ${L.h}`} className="w-full h-auto select-none" role="img" aria-label="Multi-agent architecture diagram">
      {edgeDefs.map(([a, b]) => {
        const st = edges[`${a}-${b}`] ?? (showAll ? "done" : "off");
        return <path key={`${a}-${b}`} d={link(L, a, b)} fill="none" strokeWidth="2" stroke={stroke[st]} className={st === "active" ? "flow" : ""} style={{ transition: "stroke 0.3s" }} />;
      })}
      <path d={L.back} fill="none" strokeWidth="2" strokeDasharray={back === "active" ? undefined : "2 6"} strokeLinecap="round"
        stroke={back === "active" ? "#b42318" : stroke[back === "off" ? "off" : "done"]} className={back === "active" ? "flow" : ""} style={{ transition: "stroke 0.3s" }} />
      {Object.entries(L.pos).map(([id, [x, y]]) => {
        const isActive = active.includes(id);
        const isSel = selected === id;
        const faded = dim.includes(id);
        const clickable = !!onSelect;
        return (
          <g key={id} opacity={faded ? 0.3 : 1} style={{ cursor: clickable ? "pointer" : "default", transition: "opacity 0.3s" }}
            onClick={clickable ? () => onSelect(id) : undefined}
            onKeyDown={clickable ? (e) => (e.key === "Enter" || e.key === " ") && onSelect(id) : undefined}
            tabIndex={clickable ? 0 : undefined} role={clickable ? "button" : undefined} aria-label={meta[id][0]}>
            {(isActive || isSel) && (
              <rect className={isActive ? "pulse-ring" : ""} x={x - L.nw / 2 - 3} y={y - L.nh / 2 - 3} width={L.nw + 6} height={L.nh + 6} rx="16" fill="none" stroke="#1A8917" strokeWidth="2" />
            )}
            <rect x={x - L.nw / 2} y={y - L.nh / 2} width={L.nw} height={L.nh} rx="14"
              fill={isActive || isSel ? "#191919" : "#fff"} stroke="#191919" strokeWidth="1.5" style={{ transition: "fill 0.3s" }} />
            <text x={x} y={y - 3} textAnchor="middle" fontSize="15" fontWeight="600" fontFamily="Inter, sans-serif" fill={isActive || isSel ? "#F7F4ED" : "#191919"}>{meta[id][0]}</text>
            <text x={x} y={y + 15} textAnchor="middle" fontSize="11.5" fontFamily="Inter, sans-serif" fill={isActive || isSel ? "#bbb" : "#777"}>{meta[id][1]}</text>
          </g>
        );
      })}
    </svg>
  );
}
