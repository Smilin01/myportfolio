import { useState } from "react";
import AgentGraph from "./AgentGraph";
import { useIsWide } from "../agentLayout";

const info = {
  brain: { who: "The project manager", job: "Talks to you, decides who works next, and puts the pieces back together. It is the only agent that speaks to the user.", gets: "Your request, plus a report from every other agent.", makes: "Instructions for the team and the final answer.", tools: "Almost none. Its power is deciding, not doing.", risk: "If it does the work itself, the team has no reason to exist. Keep it a manager." },
  explorer: { who: "The scout", job: "Looks around the existing project before anyone touches it: how it is organised, what style it uses, which files matter.", gets: "A question from the Main Brain, like “how does theming work here?”", makes: "A short context report: relevant files, conventions, things to avoid breaking.", tools: "List files, read files, search code. Read-only.", risk: "Reading too much. A good explorer returns a summary, not the whole repo." },
  planner: { who: "The architect", job: "Turns the request and the explorer's report into a numbered plan. Each step names who does it and how we will know it is done.", gets: "The request and the context report.", makes: "An ordered plan with owners (frontend or backend) and a “done when…” check for each step.", tools: "None needed. It only thinks and writes.", risk: "Vague plans. “Improve the settings” is useless; “add a theme field to the settings endpoint” is a plan." },
  fe: { who: "The UI specialist", job: "Builds the part of the plan that users see: components, styling, interactions.", gets: "Its steps from the plan and the relevant files.", makes: "Code changes for the frontend.", tools: "Read and write files, formatter.", risk: "Drifting into backend work. Narrow scope keeps its prompt small and its output sharp." },
  be: { who: "The server specialist", job: "Builds the part users don't see: APIs, data models, business logic.", gets: "Its steps from the plan and the relevant files.", makes: "Code changes for the backend.", tools: "Read and write files, run scripts.", risk: "Changing an API shape without telling the frontend. The plan is the contract between the two builders." },
  verifier: { who: "The tester", job: "Checks the work before it is returned: runs tests, linters and builds, and compares the result to each step's “done when”.", gets: "The plan and the finished changes.", makes: "A pass or fail report with reasons.", tools: "Run tests, linter, type checker and build.", risk: "Being too polite. A verifier that approves everything is decoration." },
};

export default function TeamExplorer() {
  const [sel, setSel] = useState("brain");
  const wide = useIsWide();
  const d = info[sel];
  return (
    <figure className="rounded-2xl border border-neutral-300 bg-cream p-4 md:p-6 my-10 font-sans">
      <figcaption className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Interactive · click any agent</figcaption>
      <div className="max-w-[760px] mx-auto"><AgentGraph wide={wide} selected={sel} onSelect={setSel} /></div>
      <div className="mt-5 rounded-xl bg-white border border-neutral-200 p-5 text-[15px] leading-relaxed">
        <p className="text-xs uppercase tracking-widest text-leaf mb-1">{d.who}</p>
        <p className="font-serif text-lg mb-3">{d.job}</p>
        <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-neutral-700">
          <div><dt className="font-semibold text-ink">Receives</dt><dd>{d.gets}</dd></div>
          <div><dt className="font-semibold text-ink">Produces</dt><dd>{d.makes}</dd></div>
          <div><dt className="font-semibold text-ink">Tools</dt><dd>{d.tools}</dd></div>
          <div><dt className="font-semibold text-ink">Watch out for</dt><dd>{d.risk}</dd></div>
        </dl>
      </div>
    </figure>
  );
}
