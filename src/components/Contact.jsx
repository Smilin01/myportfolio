import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { profile } from "../data/content";
import Reveal from "./Reveal";

const field =
  "w-full border-b border-neutral-400 bg-transparent py-3 text-lg outline-none focus:border-ink transition-colors placeholder:text-neutral-500";

export default function Contact() {
  const form = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const send = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .sendForm("service_393q3br", "template_rnr5pdk", form.current, { publicKey: "3D04E7m3TtBzuRTI2" })
      .then(
        () => { setStatus("sent"); form.current.reset(); },
        (err) => { console.error("EmailJS failed", err.text); setStatus("error"); },
      );
  };

  return (
    <section id="contact">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28 grid md:grid-cols-2 gap-12">
        <Reveal>
          <h2 className="font-serif text-5xl md:text-7xl tracking-[-0.03em] leading-[1]">Let&apos;s build something.</h2>
          <p className="text-xl text-neutral-700 mt-6">
            Working on agents, RAG or an LLM product?{" "}
            <a href={`mailto:${profile.email}`} className="underline underline-offset-4">{profile.email}</a>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <form ref={form} onSubmit={send} className="space-y-5">
            <input className={field} name="user_name" placeholder="Your name" required />
            <input className={field} type="email" name="user_email" placeholder="Your email" required />
            <textarea className={field} name="message" rows={4} placeholder="Message" required />
            <div className="flex items-center gap-4 pt-2">
              <button type="submit" disabled={status === "sending"}
                className="rounded-full bg-ink text-white px-7 py-3 hover:bg-neutral-700 disabled:opacity-50 transition-colors">
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              <p role="status" className="text-sm text-neutral-600">
                {status === "sent" && "Thanks, your message was sent."}
                {status === "error" && "Something went wrong. Please email me directly."}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
