// Starter drafts — edit freely. Block types: p, h2, quote, ul, code.
export const posts = [
  {
    slug: "multi-agent-orchestration-explained",
    title: "Multi-agent orchestration, explained simply",
    subtitle: "How a team of AI agents plans, builds and checks software together, with diagrams you can click through.",
    date: "2026-10-02",
    readTime: 14,
    tag: "Agents",
    featured: true,
    body: [
      { type: "p", text: "You don't need a computer science degree to understand how a team of AI agents works. If you have ever seen a restaurant kitchen, you already know the idea. This post explains it from scratch, using the coding agent I built as the running example: six agents that together plan, write and check software." },
      { type: "callout", text: "How to read this post: the diagrams are interactive. Click the agents, press Play, and break things on purpose with the “make the tests fail” switch." },

      { type: "h2", text: "First, what is an \"agent\"?" },
      { type: "p", text: "A plain language model is like a very well-read friend who can only talk. Ask it a question and it answers. It can't open a file, run a program or look something up." },
      { type: "p", text: "An agent is that same model with three extras:" },
      { type: "ul", items: [
        "Tools: things it can do, like read a file, search the web or run a test.",
        "A loop: it can think, act, look at the result, and think again, instead of answering once.",
        "A goal: a job description that says what it is responsible for."
      ] },
      { type: "p", text: "So an agent is a model that can take actions and react to what happens. That's the whole definition. Everything else in this post is about what happens when you put several of them together." },

      { type: "h2", text: "Why not just use one agent?" },
      { type: "p", text: "You can, and for small tasks you should. But ask one agent to understand a codebase, plan a feature, write the frontend, write the backend and test everything, and a few things go wrong:" },
      { type: "ul", items: [
        "It gets overloaded. Everything it has read and written piles into one long conversation, and the model starts to lose track of earlier details.",
        "It's hard to debug. When the result is wrong, you can't tell whether it misunderstood the codebase, made a bad plan or wrote a bug.",
        "It marks its own homework. The same agent that wrote the code is the one deciding the code is fine."
      ] },
      { type: "p", text: "The fix is the same one people found long ago: split the job into roles. A kitchen has a head chef, a prep cook, a grill cook and someone who tastes every plate before it leaves. Nobody does everything." },

      { type: "h2", text: "Four ways to organise a team of agents" },
      { type: "p", text: "Before we look at my system, here are the common shapes. Click through them. Notice what each one makes easy and what it makes painful." },
      { type: "diagram", name: "patterns" },
      { type: "p", text: "My coding agent uses the third one: a manager with specialists. The key detail is that dotted red line. Work can come back to the manager when something fails. A plain pipeline can't do that." },

      { type: "h2", text: "Meet the team" },
      { type: "p", text: "The system has six agents. Click each one to see what it does, what it receives, what it produces and what usually goes wrong with it." },
      { type: "diagram", name: "team" },
      { type: "p", text: "Two design choices are worth pointing out:" },
      { type: "ul", items: [
        "The Main Brain doesn't build anything. Its only job is to decide who works next and to talk to you. This keeps its context clean.",
        "There are two builders, not one. Frontend and backend work are different enough that giving each their own focused instructions produces better code, and they can work at the same time."
      ] },

      { type: "h2", text: "How do the agents talk to each other?" },
      { type: "p", text: "This is the part most people find mysterious, so let's make it concrete. Agents don't read each other's minds. They communicate in two simple ways." },
      { type: "h3", text: "1. Messages (handoffs)" },
      { type: "p", text: "One agent finishes its job and sends a message to the next one: “here's what I found”, “here's the plan”, “here's the code”. It's like passing a note across the kitchen. The note has to be clear, because the next agent knows nothing except what's on it." },
      { type: "h3", text: "2. A shared notebook (state)" },
      { type: "p", text: "Alongside messages, the team keeps one shared notebook: a small structured record with fields like request, context, plan, changes and verdict. Each agent reads the parts it needs and writes the part it owns. Because the notebook is structured, nothing important gets lost in a long chat." },
      { type: "callout", text: "Simple rule I follow: messages say what to do next, the notebook remembers what has happened so far." },
      { type: "p", text: "Now watch both in action. Press Play and follow one task, “add a dark-mode toggle that remembers my choice”, from request to finished work. Look at the Messages box and the notebook fill up as each agent works." },
      { type: "diagram", name: "flow" },
      { type: "p", text: "Now tick “Make the tests fail” and play it again. The Verifier finds a problem and sends it to the Main Brain, who sends it back to the right builder. That loop is what makes this an agent system rather than an assembly line." },

      { type: "h2", text: "What each agent actually sees" },
      { type: "p", text: "A language model can only think about what is in front of it, its context. Giving every agent the entire history of everything is the fastest way to confuse them. So each agent receives only what its job needs:" },
      { type: "ul", items: [
        "Explorer: the question and read-only access to the project files.",
        "Planner: the request plus the Explorer's short report, not the raw files.",
        "Builders: only their own plan steps and the files those steps touch.",
        "Verifier: the plan and the changes, so it can compare the two."
      ] },
      { type: "p", text: "This is called context isolation. Smaller, focused context means cheaper calls, faster answers and fewer confused outputs. It's the same reason a plumber doesn't need the electrician's drawings." },

      { type: "h2", text: "Agreeing on a format" },
      { type: "p", text: "If the Planner writes a lovely paragraph and the Builder has to guess what it means, things break. Good systems make agents hand over structured output, for example a plan as a list where every step has an owner, a description and a “done when” check. Think of it as a form that must be filled in, instead of a free-form letter. Structure turns guessing into reading." },

      { type: "h2", text: "Doing things at the same time" },
      { type: "p", text: "The Frontend and Backend Builders don't depend on each other once the plan exists, so they run in parallel. The Verifier then waits for both to finish before it starts. In graph terms, that's a fan-out (one agent to many) followed by a join (many agents to one)." },

      { type: "h2", text: "When things go wrong" },
      { type: "p", text: "Agents make mistakes, so a good system plans for them instead of hoping:" },
      { type: "ul", items: [
        "Verify before you return. The Verifier runs real checks such as tests, linting and builds, not just “looks good to me”.",
        "Loop with a limit. A failed check goes back to the manager, who retries. But there's always a maximum number of tries, otherwise two agents can argue forever.",
        "Ask a human when stuck. After a few failed attempts, stopping to ask is cheaper than burning time and money.",
        "Keep a trace. Every message and tool call is recorded, so when something is wrong you can replay exactly what happened."
      ] },

      { type: "h2", text: "The architecture in one picture" },
      { type: "p", text: "Putting it together, a request travels like this:" },
      { type: "ul", items: [
        "You send a request to the Main Brain.",
        "The Explorer studies the existing project and writes a short report.",
        "The Planner turns request plus report into a step-by-step plan.",
        "The Frontend and Backend Builders implement their steps in parallel.",
        "The Verifier checks the result against the plan.",
        "If a check fails, the problem returns to the Main Brain, which sends the right builder back to fix it. If everything passes, the Main Brain gives you the answer."
      ] },

      { type: "h2", text: "A small code sketch" },
      { type: "p", text: "This is the same shape written with LangGraph, the library I use for this kind of system. It's simplified, but every box in the diagram above is a node and every arrow is an edge." },
      { type: "code", lang: "python", text: "from typing import TypedDict\nfrom langgraph.graph import StateGraph, START, END\n\nclass TeamState(TypedDict):\n    request: str\n    context: str\n    plan: str\n    changes: str\n    verdict: str\n    attempts: int\n\ngraph = StateGraph(TeamState)\n\ngraph.add_node(\"brain\", brain)          # decides who works next\ngraph.add_node(\"explorer\", explorer)    # reads the repo\ngraph.add_node(\"planner\", planner)      # writes the plan\ngraph.add_node(\"frontend\", frontend)    # builds the UI part\ngraph.add_node(\"backend\", backend)      # builds the server part\ngraph.add_node(\"verifier\", verifier)    # runs the checks\n\ngraph.add_edge(START, \"brain\")\ngraph.add_edge(\"brain\", \"explorer\")\ngraph.add_edge(\"explorer\", \"planner\")\n\n# fan out: both builders start after the plan\ngraph.add_edge(\"planner\", \"frontend\")\ngraph.add_edge(\"planner\", \"backend\")\n\n# join: the verifier waits for both\ngraph.add_edge([\"frontend\", \"backend\"], \"verifier\")\n\ndef after_verify(state: TeamState) -> str:\n    if state[\"verdict\"] == \"PASS\" or state[\"attempts\"] >= 3:\n        return \"finish\"\n    return \"repair\"\n\ngraph.add_conditional_edges(\n    \"verifier\", after_verify, {\"repair\": \"brain\", \"finish\": END}\n)\n\napp = graph.compile()" },
      { type: "p", text: "The loop with a limit that I described earlier is those few lines at the bottom: repair goes back to the brain, and after three attempts the run stops." },

      { type: "h2", text: "Mistakes I'd help you avoid" },
      { type: "ul", items: [
        "Too many agents too soon. Start with a builder and a verifier. Add agents only when a single one is visibly struggling.",
        "A manager that does the work. Once the Main Brain starts writing code, you've rebuilt the single overloaded agent.",
        "Vague handoffs. If the next agent can't act on a message without guessing, rewrite the message format.",
        "No verifier. The cheapest agent to add and the one that improves reliability the most.",
        "No limits. Always cap retries, steps and cost."
      ] },

      { type: "h2", text: "Quick glossary" },
      { type: "ul", items: [
        "Agent: a language model with tools, a loop and a job.",
        "Orchestrator: the manager agent that routes work.",
        "Multi-agent system: several specialised agents cooperating on one goal.",
        "State: the shared notebook of what has happened so far.",
        "Handoff: one agent passing work and context to another.",
        "Context: everything a model can see when it answers.",
        "Fan-out / join: splitting work across agents, then waiting for all of them.",
        "Trace: a recording of every step, used for debugging."
      ] },

      { type: "quote", text: "A team of agents is just a team: clear roles, clear handoffs, and someone who checks the work." },
      { type: "p", text: "If you're building something like this and want to compare notes, my contact details are at the bottom of the home page." },
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
      { type: "callout", text: "Want to see a graph like this in action? My guide to multi-agent orchestration walks through a six-agent coding system with interactive diagrams." },
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
    title: "Inside Aetheron: how an open-source answer engine works",
    subtitle: "Six steps from a question to a cited answer, and why I used keyword scoring instead of a vector database.",
    date: "2026-08-12",
    readTime: 7,
    tag: "RAG",
    body: [
      { type: "p", text: "Aetheron is an open-source, Perplexity-style search engine I built. You ask a question, it searches the live web, reads the pages and streams back an answer with citations. The code is on GitHub at Smilin01/aetheron. This post walks through exactly what happens between your question and the answer." },
      { type: "callout", text: "The short version: rewrite the question, search, remove duplicates, read the pages, pick the best passages, then let the model answer only from those passages." },
      { type: "h2", text: "Step 1: rewrite the question" },
      { type: "p", text: "People type fragments like “what about the second one?”. A search engine can't use that. Aetheron first rewrites your message into a clear standalone query, using the earlier conversation for context." },
      { type: "h2", text: "Step 2: search, with a safety net" },
      { type: "p", text: "Several searches run at the same time. Aetheron uses SearXNG, a privacy-friendly meta-search engine, and tries multiple instances. If they fail, it falls back to DuckDuckGo, so one flaky server doesn't break the whole answer." },
      { type: "h2", text: "Step 3: remove duplicates" },
      { type: "p", text: "Different searches often return the same page. Aetheron de-duplicates the URLs so the same source isn't read, or cited, twice." },
      { type: "h2", text: "Step 4: read the pages properly" },
      { type: "p", text: "Raw web pages are full of menus, ads and cookie banners. Aetheron sends the top results through Jina Reader, which returns the clean article text." },
      { type: "h2", text: "Step 5: pick the best passages" },
      { type: "p", text: "The cleaned pages are split into chunks, and each chunk is scored against your question. I chose simple keyword scoring in place of a vector database. It runs locally, needs no extra service and is fast, which keeps Aetheron easy for anyone to run. The trade-off is that it matches words, not meaning, so it can miss a passage that answers the question in different words." },
      { type: "h2", text: "Step 6: answer from the sources only" },
      { type: "p", text: "The top-scoring chunks go to the language model, a Llama model served by Groq, along with a strict instruction: answer from these passages and mark each claim with a source number. The answer streams to your screen using Server-Sent Events, so words appear as they are written." },
      { type: "quote", text: "If a claim can't point to a source, it shouldn't be in the answer." },
      { type: "h2", text: "The stack" },
      { type: "ul", items: [
        "Next.js 14 and TypeScript for the app.",
        "Tailwind CSS and Framer Motion for the interface, with light and dark modes.",
        "Vercel AI SDK for streaming.",
        "Groq for fast Llama inference.",
        "SearXNG, DuckDuckGo and Jina Reader for search and page reading.",
      ] },
      { type: "h2", text: "Privacy by design" },
      { type: "p", text: "Searches are anonymous and your chat history stays in your own browser's local storage, not on a server. If you want to run it yourself you need Node.js 18 or newer and a free Groq API key." },
    ],
  },
];

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
