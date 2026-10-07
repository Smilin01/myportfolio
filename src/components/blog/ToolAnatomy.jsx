import { useState } from "react";

const parts = {
  name: { label: "name", text: "The label Claude writes when it wants this tool. Keep it short, clear and unique, like read_file or run_tests." },
  description: { label: "description", text: "The most important line. Claude reads it to decide WHEN to use the tool. Write it like instructions for a new teammate: what the tool does, when to use it, and when not to." },
  schema: { label: "input_schema", text: "A form Claude must fill in. Each field has a type and a short description, so the arguments come back structured and easy to check before anything runs." },
  required: { label: "required", text: "Fields that must be present. If Claude leaves one out, your code can reject the call instead of guessing." },
};

export default function ToolAnatomy() {
  const [sel, setSel] = useState("description");
  const cls = (k) => `rounded px-1 cursor-pointer transition-colors ${sel === k ? "bg-leaf text-white" : "hover:bg-neutral-200"}`;
  const p = parts[sel];
  return (
    <figure className="rounded-2xl border border-neutral-300 bg-cream p-4 md:p-6 my-10 font-sans text-[15px]">
      <figcaption className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Interactive · click a highlighted part of the tool</figcaption>
      <pre className="rounded-xl bg-white border border-neutral-200 p-4 overflow-x-auto text-[13px] leading-7 font-mono">
{"{\n  \"name\": \""}<span role="button" tabIndex={0} onClick={() => setSel("name")} className={cls("name")}>read_file</span>{"\",\n  \"description\": \""}
<span role="button" tabIndex={0} onClick={() => setSel("description")} className={cls("description")}>Read a file from the project. Use this when you need to see what a file contains. Do not use it for searching.</span>{"\",\n  \"input_schema\": {\n    \"type\": \"object\",\n    \"properties\": {\n      "}<span role="button" tabIndex={0} onClick={() => setSel("schema")} className={cls("schema")}>{"\"path\": { \"type\": \"string\", \"description\": \"File path\" }"}</span>{"\n    },\n    \"required\": ["}<span role="button" tabIndex={0} onClick={() => setSel("required")} className={cls("required")}>{"\"path\""}</span>{"]\n  }\n}"}
      </pre>
      <div className="mt-4 rounded-xl bg-white border border-neutral-200 p-4">
        <p className="text-xs uppercase tracking-widest text-leaf mb-1">{p.label}</p>
        <p className="font-serif text-lg leading-snug">{p.text}</p>
      </div>
      <p className="text-sm text-neutral-600 mt-3">Claude never sees your code. It only sees this text: a menu of tools, each with a name, a description and a form.</p>
    </figure>
  );
}
