import { useState } from "react";

const modes = [
  { id: "ask", name: "Ask first", note: "The careful default. Reading is free; changing things needs your OK." },
  { id: "edits", name: "Accept edits", note: "File edits go through. Commands still ask." },
  { id: "plan", name: "Plan only", note: "Read-only. Claude can look and plan, but not change anything." },
  { id: "skip", name: "Skip prompts", note: "Everything runs without asking. Only for sandboxes you trust." },
];
const calls = [
  { id: "read", label: "Read src/auth.ts", kind: "read" },
  { id: "edit", label: "Edit src/auth.ts", kind: "edit" },
  { id: "test", label: "Run npm test", kind: "cmd", rule: "Bash(npm test)" },
  { id: "rm", label: "Run rm -rf build", kind: "cmd", rule: "Bash(rm *)" },
];

function decide(mode, call, allowTest, denyRm) {
  if (call.id === "rm" && denyRm) return ["blocked", "A deny rule matches, and deny rules always win."];
  if (mode === "skip") return ["auto", "Prompts are off, so it runs."];
  if (call.kind === "read") return ["auto", "Reading doesn't change anything."];
  if (mode === "plan") return ["blocked", "Plan mode is read-only."];
  if (call.kind === "edit") return mode === "edits" ? ["auto", "Edits are pre-approved in this mode."] : ["ask", "Changes a file, so Claude Code asks."];
  if (call.id === "test" && allowTest) return ["auto", "An allow rule matches, so no prompt."];
  return ["ask", "Runs a command on your machine, so Claude Code asks."];
}

const badge = {
  auto: "bg-green-100 text-green-800",
  ask: "bg-amber-100 text-amber-800",
  blocked: "bg-red-100 text-red-800",
};
const word = { auto: "Runs automatically", ask: "Asks you first", blocked: "Blocked" };

export default function PermissionGate() {
  const [mode, setMode] = useState("ask");
  const [allowTest, setAllowTest] = useState(false);
  const [denyRm, setDenyRm] = useState(false);
  const m = modes.find((x) => x.id === mode);
  return (
    <figure className="rounded-2xl border border-neutral-300 bg-cream p-4 md:p-6 my-10 font-sans text-[15px]">
      <figcaption className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Interactive · the permission gate</figcaption>
      <div className="flex flex-wrap gap-2 mb-2">
        {modes.map((x) => (
          <button key={x.id} onClick={() => setMode(x.id)} className={`rounded-full border px-4 py-1.5 transition-colors ${x.id === mode ? "bg-ink text-white border-ink" : "bg-white border-neutral-300 hover:border-ink"}`}>{x.name}</button>
        ))}
      </div>
      <p className="text-neutral-600 mb-4">{m.note}</p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={allowTest} onChange={(e) => setAllowTest(e.target.checked)} className="accent-[#1A8917]" />Allow rule: <code className="font-mono text-[13px]">Bash(npm test)</code></label>
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={denyRm} onChange={(e) => setDenyRm(e.target.checked)} className="accent-[#b42318]" />Deny rule: <code className="font-mono text-[13px]">Bash(rm *)</code></label>
      </div>
      <ul className="space-y-2">
        {calls.map((c) => {
          const [state, why] = decide(mode, c, allowTest, denyRm);
          return (
            <li key={c.id} className="rounded-xl bg-white border border-neutral-200 p-3 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-mono text-[13px] min-w-[10rem]">{c.label}</span>
              <span className={`rounded-full px-3 py-0.5 text-sm font-medium ${badge[state]}`}>{word[state]}</span>
              <span className="text-neutral-600 text-sm">{why}</span>
            </li>
          );
        })}
      </ul>
      <p className="text-xs text-neutral-500 mt-3">Simplified model of how permission modes and rules behave. Exact options vary by version, so check the Claude Code docs.</p>
    </figure>
  );
}
