import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { meta, layouts, edgeDefs, link, useIsWide } from "./agentLayout";

const steps = [
  { title: "A request arrives", body: "The Main Brain receives the task, holds the conversation and decides what needs to happen. It doesn't write code itself. It delegates.", focus: ["brain"], nodes: ["brain"], edges: [] },
  { title: "Explore first", body: "The Explorer maps the repository: structure, conventions and the files that matter. Builders never start blind.", focus: ["explorer"], nodes: ["brain", "explorer"], edges: ["brain-explorer"] },
  { title: "Plan the work", body: "The Planner turns the request and the context into an ordered, checkable plan with clear ownership.", focus: ["planner"], nodes: ["brain", "explorer", "planner"], edges: ["brain-explorer", "explorer-planner"] },
  { title: "Build in parallel", body: "A Frontend Builder and a Backend Builder implement their halves at the same time, against the same plan.", focus: ["fe", "be"], nodes: ["brain", "explorer", "planner", "fe", "be"], edges: ["brain-explorer", "explorer-planner", "planner-fe", "planner-be"] },
  { title: "Verify everything", body: "The Verifier runs the checks on what was built. Nothing moves forward on trust.", focus: ["verifier"], nodes: ["brain", "explorer", "planner", "fe", "be", "verifier"], edges: ["brain-explorer", "explorer-planner", "planner-fe", "planner-be", "fe-verifier", "be-verifier"] },
  { title: "Close the loop", body: "Failures go back to the Main Brain, which re-plans or retries. Only verified work is returned to the user.", focus: ["brain", "verifier"], nodes: ["brain", "explorer", "planner", "fe", "be", "verifier"], edges: ["brain-explorer", "explorer-planner", "planner-fe", "planner-be", "fe-verifier", "be-verifier", "verifier-brain"] },
];

function Diagram({ step, wide }) {
  const L = wide ? layouts.wide : layouts.tall;
  const s = steps[step];
  return (
    <svg viewBox={`0 0 ${L.w} ${L.h}`} className="h-full w-full" role="img" aria-label="Multi-agent coding pipeline">
      {edgeDefs.map(([a, b]) => {
        const id = `${a}-${b}`;
        const shown = s.edges.includes(id);
        const active = shown && (s.focus.includes(b) || (id === "planner-fe" && s.focus.includes("fe")));
        return (
          <path key={id} d={link(L, a, b)} fill="none" strokeWidth="2"
            stroke={active ? "#4ade80" : shown ? "#8a8a8a" : "#333"}
            className={active ? "flow" : ""} style={{ transition: "stroke 0.4s" }} />
        );
      })}
      <path d={L.back} fill="none" strokeWidth="2" strokeLinecap="round"
        stroke={step === 5 ? "#4ade80" : "#333"} className={step === 5 ? "flow" : ""} style={{ transition: "stroke 0.4s" }} />
      {step === 5 && (
        <text x={wide ? 405 : 395} y={wide ? 432 : 300} fill="#4ade80" fontSize="13" fontFamily="Inter, sans-serif" textAnchor="middle">
          failed checks loop back
        </text>
      )}
      {Object.entries(L.pos).map(([id, [x, y]]) => {
        const visible = s.nodes.includes(id);
        const current = s.focus.includes(id);
        return (
          <g key={id} style={{ transition: "opacity 0.5s", opacity: visible ? 1 : 0.28 }}>
            {current && <rect className="pulse-ring" x={x - L.nw / 2} y={y - L.nh / 2} width={L.nw} height={L.nh} rx="14" fill="none" stroke="#4ade80" strokeWidth="2" />}
            <rect x={x - L.nw / 2} y={y - L.nh / 2} width={L.nw} height={L.nh} rx="14"
              fill={current ? "#F7F4ED" : "#222"} stroke={current ? "#F7F4ED" : visible ? "#777" : "#3a3a3a"} strokeWidth="1.5"
              style={{ transition: "fill 0.4s, stroke 0.4s" }} />
            <text x={x} y={y - 3} textAnchor="middle" fontSize="15" fontWeight="600" fontFamily="Inter, sans-serif" fill={current ? "#191919" : "#ddd"}>
              {meta[id][0]}
            </text>
            <text x={x} y={y + 15} textAnchor="middle" fontSize="11.5" fontFamily="Inter, sans-serif" fill={current ? "#555" : "#888"}>
              {meta[id][1]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Pipeline() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const wide = useIsWide();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setStep(Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length)))));
  const s = steps[step];

  return (
    <section id="how" ref={ref} className="relative bg-ink text-cream" style={{ height: `${steps.length * 90 + 40}vh` }}>
      <div className="sticky top-0 h-screen pt-16 flex flex-col">
        <div className="mx-auto max-w-6xl w-full px-5 pt-6 md:pt-10 flex-1 min-h-0 flex flex-col">
          <p className="text-sm text-neutral-400">How my coding agent works · scroll</p>
          <div className="flex-1 min-h-0 grid lg:grid-cols-[minmax(0,380px)_1fr] gap-4 lg:gap-10 items-center grid-rows-[minmax(0,1fr)_auto] lg:grid-rows-1">
            <div className="order-2 lg:order-1 pb-6">
              <p className="font-serif text-leaf text-lg mb-1" style={{ color: "#4ade80" }}>
                0{step + 1} / 0{steps.length}
              </p>
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-[1.05]">{s.title}</h2>
                  <p className="text-neutral-300 text-base md:text-lg mt-3 leading-relaxed">{s.body}</p>
                </motion.div>
              </AnimatePresence>
              <div className="flex gap-2 mt-5">
                {steps.map((_, i) => (
                  <span key={i} className="h-1 rounded-full transition-all duration-500" style={{ width: i === step ? 32 : 12, background: i <= step ? "#4ade80" : "#444" }} />
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 h-full min-h-0 flex justify-center">
              <Diagram step={step} wide={wide} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
