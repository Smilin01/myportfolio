import { useEffect, useState } from "react";

const demos = {
  "What is LangGraph?": {
    answer: "LangGraph is a library for building stateful, multi-step LLM applications as graphs of nodes and edges. Unlike a linear chain, it supports loops, branching, persistence and human approval steps [1]. It is part of the LangChain ecosystem but gives you explicit control over the flow [2].",
    sources: ["Docs", "Blog", "GitHub"],
  },
  "How does RAG reduce hallucinations?": {
    answer: "Retrieval-augmented generation fetches relevant passages first and asks the model to answer only from them [1]. Because every claim can be traced to a passage, unsupported statements are easier to spot and refuse [2].",
    sources: ["Paper", "Guide", "Docs"],
  },
};
const stages = ["Rewriting the query", "Searching the web (SearXNG)", "Reading pages (Jina Reader)", "Scoring passages", "Writing the answer"];

export default function AnswerDemo() {
  const [q, setQ] = useState(null);
  const [stage, setStage] = useState(-1);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!q) return;
    const timers = [0, 1, 2, 3, 4].map((i) => setTimeout(() => setStage(i), i * 900));
    return () => timers.forEach(clearTimeout);
  }, [q]);

  useEffect(() => {
    if (stage !== 4 || !q) return;
    const total = demos[q].answer.length;
    const id = setInterval(() => setChars((c) => (c >= total ? (clearInterval(id), c) : c + 2)), 18);
    return () => clearInterval(id);
  }, [stage, q]);

  const pick = (question) => {
    setStage(-1);
    setChars(0);
    setQ(question);
  };

  const demo = q && demos[q];
  return (
    <div className="rounded-2xl border border-ink bg-white p-5 md:p-6">
      <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Try the flow · illustration, not live</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {Object.keys(demos).map((k) => (
          <button key={k} onClick={() => pick(k)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${q === k ? "bg-ink text-white border-ink" : "border-neutral-300 hover:border-ink"}`}>
            {k}
          </button>
        ))}
      </div>
      {!demo && <p className="text-neutral-500 text-sm">Pick a question to watch an answer get built.</p>}
      {demo && (
        <div>
          <ol className="space-y-1.5 mb-4 text-sm">
            {stages.map((s, i) => (
              <li key={s} className={`flex items-center gap-2 transition-opacity ${i <= stage ? "opacity-100" : "opacity-25"}`}>
                <span className={`w-2 h-2 rounded-full ${i < stage ? "bg-leaf" : i === stage ? "bg-leaf animate-pulse" : "bg-neutral-400"}`} />
                {s}
              </li>
            ))}
          </ol>
          {stage === 4 && (
            <div>
              <p className="font-serif text-lg leading-relaxed min-h-[7rem]">{demo.answer.slice(0, chars)}<span className="opacity-40">{chars < demo.answer.length ? "▍" : ""}</span></p>
              {chars >= demo.answer.length && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {demo.sources.map((s, i) => (
                    <span key={s} className="rounded-full bg-neutral-100 text-sm px-3 py-1">[{i + 1}] {s}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
