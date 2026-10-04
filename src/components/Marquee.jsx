const items = ["LangGraph", "LangChain", "RAG", "Tool calling", "MCP", "Vector search", "Evals", "LangSmith", "Python", "FastAPI", "React", "Docker", "Kubernetes", "AWS"];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="border-b border-ink overflow-hidden bg-ink text-cream py-4" aria-hidden>
      <div className="marquee flex w-max gap-10 whitespace-nowrap font-serif text-xl">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t}
            <span className="text-leaf">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
