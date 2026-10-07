import { useEffect, useMemo, useRef, useState } from "react";
import { useIsWide } from "../agentLayout";

const nodes = {
  wide: { w: 700, h: 300, nw: 150, nh: 64, pos: { you: [85, 150], app: [350, 150], model: [615, 55], tools: [615, 245] } },
  tall: { w: 430, h: 380, nw: 150, nh: 60, pos: { you: [215, 40], app: [215, 150], model: [90, 310], tools: [340, 310] } },
};
const labels = { you: ["You", "typing in the terminal"], app: ["Claude Code", "the app on your computer"], model: ["Claude", "the AI model"], tools: ["Your computer", "files, search, shell"] };
const edgeEnds = { ya: ["you", "app"], am: ["app", "model"], at: ["app", "tools"] };

const edgePath = (L, id) => {
  const [a, b] = edgeEnds[id];
  const [x1, y1] = L.pos[a];
  const [x2, y2] = L.pos[b];
  if (L === nodes.wide) {
    const sx = x1 + L.nw / 2, ex = x2 - L.nw / 2, mx = (sx + ex) / 2;
    return `M${sx} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${ex} ${y2}`;
  }
  const sy = y1 + L.nh / 2, ey = y2 - L.nh / 2, my = (sy + ey) / 2;
  return `M${x1} ${sy} C ${x1} ${my}, ${x2} ${my}, ${x2} ${ey}`;
};

function buildSteps(choice) {
  const S = [
    { title: "You ask", edges: ["ya"], label: "your request", msgs: [["user", "The login test is failing. Can you fix it?"]], why: "You type a normal sentence. Claude Code (the app) receives it. The AI model hasn't seen it yet." },
    { title: "App calls the model", edges: ["am"], label: "request + tool menu →", msgs: [], tools: true, why: "Each time, the app sends the model three things: its instructions, the conversation so far, and the menu of tools it may ask for. The model can't see your files yet." },
    { title: "Model asks for a tool", edges: ["am"], label: "← tool_use", stop: "tool_use", msgs: [["assistant", "I'll start by finding the login tests."], ["tool_use", "grep({ pattern: \"login\", glob: \"*.test.ts\" })"]], why: "The model does not run anything. It replies with a structured request: tool name plus arguments. Then it stops and waits." },
    { title: "App checks, then runs it", edges: ["at"], label: "run grep (read-only, auto-allowed)", msgs: [], why: "The app decides whether the request is allowed. Searching only reads, so it runs without asking. The work happens on your computer, not inside the model." },
    { title: "Result goes back", edges: ["at", "am"], label: "result → model", msgs: [["tool_result", "auth.test.ts:12  expect(res.url).toBe('/login/v1')"]], why: "The output becomes a new message, and the whole conversation is sent to the model again. The model has no memory between calls except this transcript." },
    { title: "Another tool call", edges: ["am", "at"], label: "read_file → result", stop: "tool_use", msgs: [["tool_use", "read_file({ path: \"auth.test.ts\" })"], ["tool_result", "…line 12: expects '/login/v1' but the app now uses '/login'…"]], why: "The model is now working from evidence. It found the line that doesn't match. Each call is chosen using what the previous one returned." },
    { title: "Model proposes a fix", edges: ["am"], label: "← tool_use", stop: "tool_use", msgs: [["assistant", "The test expects the old route. I'll update it."], ["tool_use", "edit({ file: \"auth.test.ts\", old: \"/login/v1\", new: \"/login\" })"]], why: "Editing changes your files, so this is where a safety check matters." },
    { title: "Permission gate", edges: ["ya"], label: "allow this edit?", gate: true, msgs: [["ui", "Claude Code asks: Allow editing auth.test.ts?"]], why: "The app pauses and asks you. This is a decision made by the app, not the model. Try both answers." },
  ];
  if (choice === "deny") {
    S.push(
      { title: "Model is told no", edges: ["ya", "am"], label: "declined → model", msgs: [["tool_result", "{ is_error: true } The user declined this edit."], ], why: "A refusal is just another tool_result, flagged as an error. The model reads it and adjusts." },
      { title: "Model adapts", edges: ["am", "ya"], label: "← end_turn", stop: "end_turn", msgs: [["assistant", "No problem, I left the file unchanged. The test fails because it expects /login/v1 while the app serves /login. Want me to try another approach?"]], why: "No tool call this time, so the loop ends and the answer goes to you." },
    );
  } else if (choice === "approve") {
    S.push(
      { title: "Edit is applied", edges: ["ya", "at"], label: "approved → edit runs", msgs: [["tool_result", "OK: auth.test.ts updated"]], why: "You approved, so the app ran the edit and sent back a short result." },
      { title: "Model checks its work", edges: ["am", "at"], label: "run tests → result", stop: "tool_use", msgs: [["tool_use", "bash({ command: \"npm test auth\" })"], ["tool_result", "1 passed, 0 failed"]], why: "Good agents verify. This command is on an allow list, so it ran without a prompt." },
      { title: "Loop ends", edges: ["am", "ya"], label: "← end_turn", stop: "end_turn", msgs: [["assistant", "Fixed. The test was still expecting the old /login/v1 route. I updated it and the test now passes."]], why: "stop_reason is end_turn: no more tool requests, so the app shows you the answer. That is the whole loop." },
    );
  }
  return S;
}

const est = (msgs) => msgs.reduce((n, [, t]) => n + Math.round(t.length / 3.5) + 24, 0);

export default function ToolLoop() {
  const [i, setI] = useState(0);
  const [choice, setChoice] = useState(null);
  const [playing, setPlaying] = useState(false);
  const wide = useIsWide();
  const logRef = useRef(null);
  const steps = useMemo(() => buildSteps(choice), [choice]);
  const cur = steps[Math.min(i, steps.length - 1)];
  const gateIdx = 7;
  const last = steps.length - 1;
  const atGate = cur.gate;

  useEffect(() => {
    if (!playing) return;
    if (atGate && !choice) { setPlaying(false); return; }
    const id = setTimeout(() => (i >= last ? setPlaying(false) : setI(i + 1)), 2600);
    return () => clearTimeout(id);
  }, [playing, i, last, atGate, choice]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [i]);

  const decide = (c) => { setChoice(c); setI(gateIdx + 1); };
  const reset = () => { setI(0); setChoice(null); setPlaying(false); };

  const L = wide ? nodes.wide : nodes.tall;
  const activeNodes = new Set(cur.edges.flatMap((e) => edgeEnds[e]));
  const log = steps.slice(0, i + 1).flatMap((s, si) => s.msgs.map((m) => ({ m, si })));
  const tokens = 3200 + est(steps.slice(0, i + 1).flatMap((s) => s.msgs));
  const tone = {
    user: "bg-white border-neutral-300",
    assistant: "bg-white border-ink",
    tool_use: "bg-ink text-cream border-ink font-mono text-[12.5px]",
    tool_result: "bg-green-50 border-green-300 font-mono text-[12.5px]",
    ui: "bg-amber-50 border-amber-300",
  };
  const roleName = { user: "You", assistant: "Claude says", tool_use: "Claude requests a tool", tool_result: "Tool result (sent back to Claude)", ui: "Claude Code (the app)" };

  return (
    <figure className="rounded-2xl border border-neutral-300 bg-cream p-4 md:p-6 my-10 font-sans text-[15px]">
      <figcaption className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Interactive · follow one request through Claude Code</figcaption>

      <p className="text-center mb-2">
        <span className="inline-block rounded-full border border-leaf bg-cream text-leaf text-sm font-semibold px-4 py-1">{cur.label}</span>
      </p>
      <div className="max-w-[700px] mx-auto">
        <svg viewBox={`0 0 ${L.w} ${L.h}`} className="w-full h-auto" role="img" aria-label="Claude Code tool-calling loop">
          {Object.keys(edgeEnds).map((e) => {
            const on = cur.edges.includes(e);
            return <path key={e} d={edgePath(L, e)} fill="none" strokeWidth="2.5" stroke={on ? "#1A8917" : "#cfcabd"} className={on ? "flow" : ""} style={{ transition: "stroke 0.3s" }} />;
          })}
          {Object.entries(L.pos).map(([id, [x, y]]) => {
            const on = activeNodes.has(id);
            return (
              <g key={id}>
                {on && <rect className="pulse-ring" x={x - L.nw / 2 - 3} y={y - L.nh / 2 - 3} width={L.nw + 6} height={L.nh + 6} rx="16" fill="none" stroke="#1A8917" strokeWidth="2" />}
                <rect x={x - L.nw / 2} y={y - L.nh / 2} width={L.nw} height={L.nh} rx="14" fill={on ? "#191919" : "#fff"} stroke="#191919" strokeWidth="1.5" style={{ transition: "fill 0.3s" }} />
                <text x={x} y={y - 3} textAnchor="middle" fontSize="15" fontWeight="600" fontFamily="Inter, sans-serif" fill={on ? "#F7F4ED" : "#191919"}>{labels[id][0]}</text>
                <text x={x} y={y + 15} textAnchor="middle" fontSize="11" fontFamily="Inter, sans-serif" fill={on ? "#bbb" : "#777"}>{labels[id][1]}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <button onClick={() => { setPlaying(false); setI(Math.max(0, i - 1)); }} disabled={i === 0} className="rounded-full border border-ink px-4 py-1.5 disabled:opacity-30">← Back</button>
        <button onClick={() => { if (i >= last && !atGate) reset(); setPlaying(!playing); }} className="rounded-full bg-ink text-white px-5 py-1.5">{playing ? "Pause" : i >= last ? "Replay" : "Play"}</button>
        <button onClick={() => { setPlaying(false); setI(Math.min(last, i + 1)); }} disabled={i >= last || (atGate && !choice)} className="rounded-full border border-ink px-4 py-1.5 disabled:opacity-30">Next →</button>
        <span className="ml-auto text-neutral-500">Step {i + 1}{choice ? ` of ${steps.length}` : "+"} · <b className="text-ink">{cur.title}</b></span>
      </div>

      <div className="mt-4 rounded-xl bg-white border border-neutral-200 p-4">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <p className="text-xs uppercase tracking-widest text-leaf">What is happening</p>
          {cur.stop && <span className="rounded-full bg-ink text-cream font-mono text-xs px-2.5 py-0.5">stop_reason: {cur.stop}</span>}
        </div>
        <p className="font-serif text-lg leading-snug">{cur.why}</p>
        {cur.tools && (
          <div className="flex flex-wrap gap-2 mt-3">
            {["read_file", "grep", "edit", "bash"].map((t) => <span key={t} className="rounded-md border border-ink font-mono text-[12.5px] px-2 py-0.5">{t}</span>)}
            <span className="text-sm text-neutral-500 self-center">← the tool menu (simplified)</span>
          </div>
        )}
        {atGate && (
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button onClick={() => decide("approve")} className="rounded-full bg-leaf text-white px-5 py-2">Approve edit</button>
            <button onClick={() => decide("deny")} className="rounded-full border border-red-700 text-red-700 px-5 py-2">Deny</button>
            {choice && <span className="text-sm text-neutral-600">You chose: <b>{choice}</b>. Click Next to continue.</span>}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-[1fr_220px] gap-4 mt-4">
        <div className="rounded-xl bg-white border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">The transcript Claude re-reads every turn</p>
          <ul ref={logRef} className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {log.length === 0 && <li className="text-neutral-400">Empty. Press Next.</li>}
            {log.map(({ m, si }, k) => (
              <li key={k} className={`rounded-lg border p-2.5 leading-snug transition-opacity ${tone[m[0]]} ${si === i ? "opacity-100" : "opacity-55"}`}>
                <span className="block text-[11px] uppercase tracking-wider opacity-60 mb-0.5 font-sans">{roleName[m[0]]}</span>
                {m[1]}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-white border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Context size</p>
          <p className="font-mono text-2xl">~{tokens.toLocaleString()}</p>
          <p className="text-sm text-neutral-500 mb-3">tokens, illustrative</p>
          <div className="h-2.5 rounded-full bg-neutral-200 overflow-hidden"><div className="h-full bg-leaf transition-all duration-500" style={{ width: `${Math.min(100, (tokens / 5000) * 100)}%` }} /></div>
          <p className="text-sm text-neutral-600 mt-3 leading-snug">Every tool call and result is added to the transcript, so the context grows with each step.</p>
        </div>
      </div>
    </figure>
  );
}
