export const profile = {
  name: "John Smilin DS",
  role: "AI Engineer",
  company: "Atos",
  email: "johnsmilin6@gmail.com",
  github: "https://github.com/Smilin01",
  linkedin: "https://www.linkedin.com/in/johnsmilin/",
  resume: "/assets/resume.pdf",
  headline: "I build AI agents that plan, research and ship real software.",
  intro:
    "I'm an AI Engineer at Atos. I design multi-agent systems, retrieval pipelines and LLM-powered products, and I care about the unglamorous parts that make them reliable: orchestration, evaluation and observability. Before AI, I spent my time in DevOps, which is why I still treat every agent like a production service.",
};

export const projects = [
  {
    title: "Multi-Agent Coding System",
    tag: "Agents · Atos",
    date: "2026",
    summary:
      "A coding agent built as a team of six specialised agents instead of one overloaded prompt. A main brain routes work to an explorer that reads the codebase, a planner that turns the task into steps, frontend and backend builders that write the code, and a verifier that checks the result before anything is returned.",
    points: [
      "Main Brain — owns the conversation, delegates and merges results",
      "Explorer — maps the repository and gathers context",
      "Planner — breaks the request into an ordered, checkable plan",
      "Frontend Builder and Backend Builder — implement in parallel",
      "Verifier — runs checks and sends failures back for repair",
    ],
    stack: ["LangGraph", "LangChain", "Python", "Tool calling"],
  },
  {
    title: "Aetheron",
    tag: "Open source",
    date: "2026",
    summary:
      "An open-source, Perplexity-style answer engine. It takes a question, searches the web, reads and ranks the sources, and writes a grounded answer with citations you can click through and verify.",
    points: [
      "Query understanding and rewriting",
      "Web search plus retrieval and re-ranking",
      "Streaming answers with inline citations",
    ],
    stack: ["RAG", "LLMs", "Vector search", "Streaming"],
    link: "https://github.com/Smilin01",
    linkLabel: "View on GitHub",
  },
  {
    title: "ResumeNova",
    tag: "Product · Atos",
    date: "2025",
    summary:
      "An AI resume builder. It reads your experience, rewrites it against a target role, and produces a clean, ATS-friendly resume you can edit and export.",
    points: [
      "Structured extraction from raw experience",
      "Role-aware rewriting with guardrails against invented facts",
      "Live editing and export",
    ],
    stack: ["LLMs", "LangChain", "Structured output", "React"],
  },
];

export const skillGroups = [
  {
    name: "Agents and orchestration",
    items: ["LangGraph", "LangChain", "Multi-agent design", "Tool calling", "MCP", "Human-in-the-loop"],
  },
  {
    name: "LLMs and retrieval",
    items: ["RAG", "Embeddings", "Vector databases", "Re-ranking", "Prompt engineering", "Structured output"],
  },
  {
    name: "Quality and operations",
    items: ["Evals", "LangSmith tracing", "Guardrails", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    name: "Engineering",
    items: ["Python", "FastAPI", "TypeScript", "React", "AWS", "Terraform"],
  },
];

export const earlier = [
  {
    title: "Automated Cloud Infrastructure Provisioning",
    text: "Python and Boto3 tooling that provisions custom VPCs, subnets and EC2 instances.",
    link: "https://github.com/Smilin01/aws-infra-automation",
  },
  {
    title: "Serverless Event-Driven Image Pipeline",
    text: "S3 uploads trigger Lambda processing, with SNS notifications to admins.",
    link: "https://github.com/Smilin01/serverless-image-pipeline",
  },
  {
    title: "Microservices on Kubernetes",
    text: "Containerised Python services on a K8s cluster, configured with Ansible.",
    link: "https://github.com/Smilin01/k8s-microservice-deployment",
  },
];
