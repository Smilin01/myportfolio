import { useState } from "react";

const patterns = [
  {
    name: "One big agent", nodes: [["A", 200, 90, "Agent"]], edges: [],
    text: "A single model with every tool, doing every job in one long conversation.",
    pros: "Simple. Fast to build.", cons: "Context gets crowded, failures are hard to locate, and it tends to skip checking its own work.",
  },
  {
    name: "Pipeline", nodes: [["1", 50, 90, "Step 1"], ["2", 150, 90, "Step 2"], ["3", 250, 90, "Step 3"], ["4", 350, 90, "Step 4"]], edges: [["1", "2"], ["2", "3"], ["3", "4"]],
    text: "Specialists in a fixed line. Each passes its output to the next, like a factory belt.",
    pros: "Predictable and easy to test.", cons: "No way to go back. If step 4 finds a problem, nothing can fix step 2.",
  },
  {
    name: "Manager + specialists", nodes: [["M", 200, 35, "Manager"], ["a", 70, 135, "Specialist"], ["b", 200, 135, "Specialist"], ["c", 330, 135, "Specialist"]], edges: [["M", "a"], ["M", "b"], ["M", "c"]], back: true,
    text: "A manager decides who works next and collects results. Specialists report back, and work can loop. This is the shape of my coding agent.",
    pros: "Clear ownership, loops for repair, easy to add a specialist.", cons: "The manager can become a bottleneck, and its instructions must be good.",
  },
  {
    name: "Free-for-all", nodes: [["a", 90, 40, "Agent"], ["b", 310, 40, "Agent"], ["c", 90, 140, "Agent"], ["d", 310, 140, "Agent"]], edges: [["a", "b"], ["a", "c"], ["a", "d"], ["b", "c"], ["b", "d"], ["c", "d"]],
    text: "Agents talk to each other directly with no manager.",
    pros: "Flexible, good for brainstorming.", cons: "Hard to control or debug. Conversations can wander and cost a lot.",
  },
];

export default function PatternsDiagram() {
  const [i, setI] = useState(2);
  const p = patterns[i];
  const pos = Object.fromEntries(p.nodes.map(([id, x, y]) => [id, [x, y]]));
  return (
    <figure className="rounded-2xl border border-neutral-300 bg-cream p-4 md:p-6 my-10 font-sans text-[15px]">
      <figcaption className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Interactive · four ways to organise agents</figcaption>
      <div className="flex flex-wrap gap-2 mb-4">
        {patterns.map((x, k) => (
          <button key={x.name} onClick={() => setI(k)} className={`rounded-full border px-4 py-1.5 transition-colors ${k === i ? "bg-ink text-white border-ink" : "border-neutral-300 bg-white hover:border-ink"}`}>{x.name}</button>
        ))}
      </div>
      <svg viewBox="0 0 400 180" className="w-full h-auto max-w-[520px] mx-auto" role="img" aria-label={p.name}>
        {p.edges.map(([a, b]) => (
          <line key={a + b} x1={pos[a][0]} y1={pos[a][1]} x2={pos[b][0]} y2={pos[b][1]} stroke="#1A8917" strokeWidth="2" className="flow" />
        ))}
        {p.back && <path d="M70 110 C 20 70, 20 35, 140 35" fill="none" stroke="#b42318" strokeDasharray="3 5" strokeWidth="2" />}
        {p.nodes.map(([id, x, y, label]) => (
          <g key={id}>
            <rect x={x - 42} y={y - 18} width="84" height="36" rx="10" fill={label === "Manager" ? "#191919" : "#fff"} stroke="#191919" strokeWidth="1.5" />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="Inter, sans-serif" fill={label === "Manager" ? "#F7F4ED" : "#191919"}>{label}</text>
          </g>
        ))}
      </svg>
      <div className="mt-3 rounded-xl bg-white border border-neutral-200 p-4 leading-relaxed">
        <p className="font-serif text-lg mb-2">{p.text}</p>
        <p><b className="text-leaf">Good:</b> {p.pros}</p>
        <p><b className="text-red-700">Costly:</b> {p.cons}</p>
      </div>
    </figure>
  );
}
