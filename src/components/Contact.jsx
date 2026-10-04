import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { profile } from "../data/content";

const field =
  "w-full border-b border-neutral-300 bg-transparent py-2.5 font-serif text-lg outline-none focus:border-black transition-colors placeholder:text-neutral-400";

export default function Contact() {
  const form = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const send = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .sendForm("service_393q3br", "template_rnr5pdk", form.current, { publicKey: "3D04E7m3TtBzuRTI2" })
      .then(
        () => {
          setStatus("sent");
          form.current.reset();
        },
        (err) => {
          console.error("EmailJS failed", err.text);
          setStatus("error");
        },
      );
  };

  return (
    <section id="contact" className="py-14">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-3">Contact</h2>
      <p className="font-serif text-2xl leading-snug mb-8">
        Building something with agents or LLMs? Say hello at{" "}
        <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
          {profile.email}
        </a>
        , or use the form.
      </p>
      <form ref={form} onSubmit={send} className="space-y-5">
        <input className={field} name="user_name" placeholder="Your name" required />
        <input className={field} type="email" name="user_email" placeholder="Your email" required />
        <textarea className={field} name="message" rows={4} placeholder="Message" required />
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-black text-white text-sm px-5 py-2.5 hover:bg-neutral-700 disabled:opacity-50 transition-colors"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          <p role="status" className="text-sm text-neutral-500">
            {status === "sent" && "Thanks, your message was sent."}
            {status === "error" && "Something went wrong. Please email me directly."}
          </p>
        </div>
      </form>
    </section>
  );
}
