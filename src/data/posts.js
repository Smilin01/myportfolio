// Starter drafts — edit freely. Block types: p, h2, quote, ul, code.
export const posts = [
  {
    slug: "why-one-agent-is-not-enough",
    title: "Why one agent isn't enough: designing a six-agent coding system",
    subtitle: "Splitting a coding agent into specialists made it easier to reason about, debug and trust.",
    date: "2026-09-18",
    readTime: 6,
    tag: "Agents",
    body: [
      { type: "p", text: "The first version of most coding agents is a single, very long prompt: read the repo, make a plan, write the code, check it, fix it. It works for demos. It falls apart on real tasks, because one context window ends up doing six different jobs and none of them particularly well." },
      { type: "h2", text: "Give each job an owner" },
      { type: "p", text: "The system I work on splits the job across six agents. A Main Brain owns the conversation and delegates. An Explorer maps the codebase. A Planner turns the request into ordered steps. A Frontend Builder and a Backend Builder implement the work. A Verifier checks it before anything goes back to the user." },
      { type: "ul", items: [
        "Smaller prompts: each agent only sees what its job needs.",
        "Better failures: when something breaks you know which role to look at.",
        "Parallelism: the two builders can work at the same time.",
        "Honest output: nothing is returned until the Verifier has looked at it."
      ] },
      { type: "h2", text: "The loop matters more than the agents" },
      { type: "p", text: "Specialists alone don't help. What makes the system work is the loop around them: a failed check goes back to the Main Brain, which decides whether to re-plan or simply retry the build. That feedback edge is the difference between a pipeline and an agent." },
      { type: "quote", text: "A multi-agent system is a graph with a feedback loop, not a chain with more steps." },
      { type: "h2", text: "What I'd tell my past self" },
      { type: "p", text: "Start with the verifier. It's the cheapest agent to build and it gives you a signal for everything else. Then add the explorer, because most bad code comes from agents that never looked at the codebase. Only then split the builders." },
    ],
  },
  {
    slug: "langgraph-vs-langchain",
    title: "LangGraph vs LangChain: when a chain stops being enough",
    subtitle: "Chains are great until you need a loop. Here is the moment I reach for a graph.",
    date: "2026-08-30",
    readTime: 5,
    tag: "LangGraph",
    body: [
      { type: "p", text: "LangChain gives you composable building blocks: models, prompts, retrievers, tools and output parsers. For a linear flow — retrieve, prompt, answer — a chain is exactly right, and anything heavier is over-engineering." },
      { type: "h2", text: "The moment you need a loop" },
      { type: "p", text: "The trouble starts when the flow needs to branch or repeat: retry a failed step, route to a different specialist, pause for a human. Encoding that in a chain turns into nested conditionals. LangGraph models it directly as a graph of nodes and edges over a shared state." },
      { type: "code", lang: "python", text: "from typing import TypedDict\nfrom langgraph.graph import StateGraph, START, END\n\nclass State(TypedDict):\n    task: str\n    code: str\n    passed: bool\n\ndef build(state: State) -> dict:\n    return {\"code\": write_code(state[\"task\"])}\n\ndef verify(state: State) -> dict:\n    return {\"passed\": run_checks(state[\"code\"])}\n\ndef route(state: State) -> str:\n    return \"done\" if state[\"passed\"] else \"retry\"\n\ngraph = StateGraph(State)\ngraph.add_node(\"build\", build)\ngraph.add_node(\"verify\", verify)\ngraph.add_edge(START, \"build\")\ngraph.add_edge(\"build\", \"verify\")\ngraph.add_conditional_edges(\"verify\", route, {\"retry\": \"build\", \"done\": END})\n\napp = graph.compile()" },
      { type: "p", text: "The retry loop is now a single conditional edge you can see, test and trace." },
      { type: "h2", text: "My rule of thumb" },
      { type: "ul", items: [
        "Linear and stateless: use a chain.",
        "Loops, branches or parallel workers: use a graph.",
        "Needs persistence or human approval: definitely a graph.",
        "Either way, trace it. Debugging agents without traces is guesswork."
      ] },
    ],
  },
  {
    slug: "how-answer-engines-work",
    title: "How a Perplexity-style answer engine works",
    subtitle: "Search, read, rank, answer, cite. The pipeline behind Aetheron, step by step.",
    date: "2026-08-12",
    readTime: 7,
    tag: "RAG",
    body: [
      { type: "p", text: "An answer engine looks like a chatbot with a search bar, but the model is only the last step. Most of the quality comes from what you feed it. Aetheron, my open-source take on the idea, follows the same overall shape as the products it is inspired by." },
      { type: "h2", text: "1. Understand the question" },
      { type: "p", text: "Users type fragments. The first step rewrites the query into one or more standalone search queries, resolving pronouns and adding the context the search engine needs." },
      { type: "h2", text: "2. Search and read" },
      { type: "p", text: "The rewritten queries go to a web search, and the top pages are fetched and cleaned into readable text. Pages are split into passages so only relevant parts reach the model." },
      { type: "h2", text: "3. Rank what you found" },
      { type: "p", text: "Search results are noisy. Embedding similarity gets you candidates; a re-ranker orders them by how well each passage actually answers the question. This step does more for answer quality than swapping to a bigger model." },
      { type: "h2", text: "4. Answer with citations" },
      { type: "p", text: "The model is instructed to answer only from the supplied passages and to mark each claim with a source number. The answer streams to the user, and every citation links back to the page it came from." },
      { type: "quote", text: "If a claim can't point to a source, it shouldn't be in the answer." },
      { type: "p", text: "That one rule — grounded or silent — is what separates an answer engine from a chatbot that sounds confident." },
    ],
  },
];

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
