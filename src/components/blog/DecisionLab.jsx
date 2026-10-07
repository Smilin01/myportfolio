import { useState } from "react";

const cases = [
  {
    ask: "What is 2 + 2?",
    thoughts: ["This is simple arithmetic.", "I already know the answer.", "Calling a tool would only add delay."],
    plan: [],
    verdict: "No tool. Claude just answers: 4.",
  },
  {
    ask: "What does the README say?",
    thoughts: ["The README is specific to this project, so I can't know its contents from memory.", "The read_file tool takes a path, and I know the path.", "One call is enough."],
    plan: [["read_file", "README.md"]],
    verdict: "One tool call, then a summary.",
  },
  {
    ask: "Why is login failing?",
    thoughts: ["I don't know which file handles login, so I'll search first.", "The search points to auth.ts. I need to read it.", "I think the token check is wrong. Running the test will confirm that."],
    plan: [["grep", "\"login\""], ["read_file", "src/auth.ts"], ["bash", "npm test auth"]],
    verdict: "Three tool calls in a row. Each one is chosen using the result of the one before.",
    sequential: true,
  },
  {
    ask: "Rename getUser to fetchUser everywhere",
    thoughts: ["First I need to find every place it's used.", "Three files use it, and the edits don't depend on each other.", "I can ask for all three edits in the same turn."],
    plan: [["grep", "getUser"], [["edit", "api.ts"], ["edit", "page.tsx"], ["edit", "user.test.ts"]]],
    verdict: "A search, then three edits requested at the same time (parallel tool calls).",
    sequential: true,
  },
];

export default function DecisionLab() {
  const [i, setI] = useState(2);
  const c = cases[i];
  return (
    <figure className="rounded-2xl border border-neutral-300 bg-cream p-4 md:p-6 my-10 font-sans text-[15px]">
      <figcaption className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Interactive · how does Claude decide?</figcaption>
      <div className="flex flex-wrap gap-2 mb-4">
        {cases.map((x, k) => (
          <button key={x.ask} onClick={() => setI(k)} className={`rounded-full border px-4 py-1.5 transition-colors ${k === i ? "bg-ink text-white border-ink" : "bg-white border-neutral-300 hover:border-ink"}`}>{x.ask}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-white border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Claude&apos;s reasoning (simplified)</p>
          <ol className="space-y-2 list-decimal pl-5">
            {c.thoughts.map((t) => <li key={t} className="leading-snug">{t}</li>)}
          </ol>
        </div>
        <div className="rounded-xl bg-white border border-neutral-200 p-4">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Tool calls it asks for</p>
          {c.plan.length === 0 && <p className="text-neutral-600">None.</p>}
          <div className="flex flex-col items-start gap-2">
            {c.plan.map((s, k) => (
              <div key={k} className="flex flex-col items-start gap-2">
                {k > 0 && <span className="text-neutral-400 pl-3">↓ then, using the result</span>}
                {Array.isArray(s[0]) ? (
                  <div className="flex flex-wrap gap-2 rounded-lg border border-dashed border-leaf p-2">
                    {s.map(([n, a]) => <span key={a} className="rounded-md bg-ink text-cream font-mono text-[13px] px-2.5 py-1">{n}({a})</span>)}
                    <span className="basis-full text-xs text-leaf">all at once</span>
                  </div>
                ) : (
                  <span className="rounded-md bg-ink text-cream font-mono text-[13px] px-2.5 py-1">{s[0]}({s[1]})</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 font-serif text-lg leading-snug">{c.verdict}</p>
        </div>
      </div>
    </figure>
  );
}
