import { useEffect, useMemo, useRef, useState } from "react";
import AgentGraph from "./AgentGraph";
import { useIsWide, meta } from "../agentLayout";

const E = { be: "brain-explorer", ep: "explorer-planner", pf: "planner-fe", pb: "planner-be", fv: "fe-verifier", bv: "be-verifier" };

function buildSteps(fail) {
  const steps = [
    { title: "You ask", active: ["brain"], edges: {}, msgs: [["You", "Main Brain", "Add a dark-mode toggle that remembers my choice."]], set: { request: "Add dark-mode toggle, remember choice" } },
    { title: "Brain sends the scout", active: ["explorer"], edges: { [E.be]: "active" }, msgs: [["Main Brain", "Explorer", "Find out how theming and user settings work in this project."]], set: { status: "exploring" } },
    { title: "Scout reports back", active: ["planner"], edges: { [E.be]: "done", [E.ep]: "active" }, msgs: [["Explorer", "Planner", "Colours live in theme.css. User settings are saved by the settings API. No toggle exists yet."]], set: { context: "theme.css · settings API · no toggle yet" } },
    { title: "Planner writes the plan", active: ["planner"], edges: { [E.be]: "done", [E.ep]: "done" }, msgs: [["Planner", "Everyone", "1) Frontend: add a toggle button and switch the theme class. 2) Backend: store a theme field in user settings. Done when: choice survives a page reload."]], set: { plan: "FE toggle · BE theme field · persists on reload", status: "planned" } },
    { title: "Two builders, in parallel", active: ["fe", "be"], edges: { [E.be]: "done", [E.ep]: "done", [E.pf]: "active", [E.pb]: "active" }, msgs: [["Planner", "Frontend Builder", "Your part: the toggle and the theme switch."], ["Planner", "Backend Builder", "Your part: the theme field in settings."]], set: { status: "building" } },
    { title: "Work handed to the tester", active: ["verifier"], edges: { [E.be]: "done", [E.ep]: "done", [E.pf]: "done", [E.pb]: "done", [E.fv]: "active", [E.bv]: "active" }, msgs: [["Frontend Builder", "Verifier", "Toggle component ready."], ["Backend Builder", "Verifier", fail ? "Theme field added." : "Theme field added and saved."]], set: { changes: fail ? "toggle + theme field (needs check)" : "toggle + theme field", status: "verifying" } },
  ];
  const all = { [E.be]: "done", [E.ep]: "done", [E.pf]: "done", [E.pb]: "done", [E.fv]: "done", [E.bv]: "done" };
  if (fail) {
    steps.push(
      { title: "Tests fail", active: ["verifier"], back: "active", edges: all, msgs: [["Verifier", "Main Brain", "Fail: after reload the theme resets. The settings endpoint rejects the new field."]], set: { verdict: "FAIL — settings endpoint rejects theme", status: "repairing" } },
      { title: "Brain sends it back", active: ["brain"], edges: all, msgs: [["Main Brain", "Backend Builder", "Fix the settings endpoint so it accepts and saves the theme field. Re-check after."]], set: { plan: "FE toggle · BE theme field (fix validation) · persists on reload" } },
      { title: "Builder fixes it", active: ["be"], edges: { ...all, [E.pb]: "active" }, msgs: [["Backend Builder", "Verifier", "Allowed the theme field in validation."]], set: { changes: "toggle + theme field + validation fix" } },
    );
  }
  steps.push(
    { title: "Tests pass", active: ["verifier"], back: "active", edges: all, ok: true, msgs: [["Verifier", "Main Brain", "Pass: choice survives a reload. All checks green."]], set: { verdict: "PASS", status: "verified" } },
    { title: "You get the answer", active: ["brain"], edges: all, msgs: [["Main Brain", "You", "Done. The dark-mode toggle is in and your choice is remembered."]], set: { status: "done" } },
  );
  return steps;
}

const keys = ["request", "context", "plan", "changes", "verdict", "status"];

export default function FlowPlayer() {
  const [fail, setFail] = useState(false);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const wide = useIsWide();
  const logRef = useRef(null);
  const steps = useMemo(() => buildSteps(fail), [fail]);
  const last = steps.length - 1;

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => (i >= last ? setPlaying(false) : setI(i + 1)), 2400);
    return () => clearTimeout(id);
  }, [playing, i, last]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [i, fail]);

  const toggleFail = (v) => { setFail(v); setI(0); setPlaying(false); };
  const cur = steps[i];
  const state = {};
  const changedNow = Object.keys(cur.set);
  steps.slice(0, i + 1).forEach((s) => Object.assign(state, s.set));
  const log = steps.slice(0, i + 1).flatMap((s, si) => s.msgs.map((m) => ({ m, si })));
  const backState = cur.back === "active" && !cur.ok ? "active" : cur.ok ? "done" : "off";

  return (
    <figure className="rounded-2xl border border-neutral-300 bg-cream p-4 md:p-6 my-10 font-sans text-[15px]">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <span className="text-xs uppercase tracking-widest text-neutral-500">Interactive · watch one task travel through the team</span>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={fail} onChange={(e) => toggleFail(e.target.checked)} className="accent-[#b42318]" />
          Make the tests fail
        </label>
      </figcaption>

      <div className="max-w-[760px] mx-auto">
        <AgentGraph wide={wide} active={cur.active} edges={cur.edges} back={backState} showAll={false} />
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <button onClick={() => { setPlaying(false); setI(Math.max(0, i - 1)); }} disabled={i === 0} className="rounded-full border border-ink px-4 py-1.5 disabled:opacity-30">← Back</button>
        <button onClick={() => { if (i >= last) setI(0); setPlaying(!playing); }} className="rounded-full bg-ink text-white px-5 py-1.5">{playing ? "Pause" : i >= last ? "Replay" : "Play"}</button>
        <button onClick={() => { setPlaying(false); setI(Math.min(last, i + 1)); }} disabled={i === last} className="rounded-full border border-ink px-4 py-1.5 disabled:opacity-30">Next →</button>
        <span className="ml-auto text-neutral-500">Step {i + 1} of {steps.length} · <b className="text-ink">{cur.title}</b></span>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="rounded-xl bg-white border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Messages</p>
          <ul ref={logRef} className="space-y-2 max-h-64 overflow-y-auto">
            {log.map(({ m, si }, k) => (
              <li key={k} className={`leading-snug transition-opacity ${si === i ? "opacity-100" : "opacity-45"}`}>
                <span className="font-semibold">{m[0]}</span> <span className="text-neutral-400">→</span> <span className="font-semibold">{m[1]}</span>
                <span className="block text-neutral-700">{m[2]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-white border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Shared notebook (the team&apos;s memory)</p>
          <dl className="space-y-1.5 font-mono text-[13px]">
            {keys.map((k) => (
              <div key={k} className={`rounded px-2 py-1 transition-colors ${changedNow.includes(k) ? "bg-green-100" : ""}`}>
                <dt className="inline text-neutral-500">{k}: </dt>
                <dd className={`inline ${String(state[k]).startsWith("FAIL") ? "text-red-700" : ""}`}>{state[k] ?? "—"}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <p className="text-xs text-neutral-500 mt-3">Example scenario for illustration. {meta.brain[0]} never writes code, and the notebook is how agents share what they know.</p>
    </figure>
  );
}
