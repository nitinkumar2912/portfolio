"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, CalendarDays, CheckCircle2, Github, Linkedin, Loader2, Mail, Send, X } from "lucide-react";

import { personal } from "@/data/portfolio";

const fieldClassName =
  "w-full min-w-0 border-0 border-b border-rose-700/70 bg-transparent px-1.5 py-2 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 invalid:border-rose-700/70 valid:border-emerald-500 focus:invalid:border-rose-400 focus:valid:border-emerald-400 sm:py-2.5";

const contactMethods = [
  {
    title: "Book a quick chat",
    description: "Discuss code, projects, or just say hello",
    href: "https://cal.com/nitin-chat/30min",
    icon: CalendarDays,
  },
  {
    title: "Write an email",
    description: "For collaborations or quick questions",
    href: `mailto:${personal.email}`,
    icon: Mail,
  },
  {
    title: "GitHub",
    description: "View projects and contribution work",
    href: personal.github,
    icon: Github,
  },
  {
    title: "LinkedIn",
    description: "Connect professionally",
    href: personal.linkedin,
    icon: Linkedin,
  },
] as const;

type SubmitState = "idle" | "sending" | "success" | "error";

async function readContactResponse(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return (await response.json()) as { error?: string };
  }

  return {
    error: response.ok
      ? undefined
      : "Contact API did not return JSON. Restart the dev server or redeploy so /api/contact is available.",
  };
}

export function ContactPanel() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitState("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await readContactResponse(response);

      if (!response.ok) {
        throw new Error(result.error ?? "Could not send message right now. Please try again later.");
      }

      form.reset();
      setSubmitState("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not send message right now. Please try again later.");
      setSubmitState("error");
    }
  }

  return (
    <div className="relative z-10">
      <div className="mb-4 flex min-w-0 items-center gap-2.5 sm:mb-6 sm:gap-3">
        <span className="h-8 w-1.5 shrink-0 rounded-full bg-zinc-100/90 sm:h-10" aria-hidden="true" />
        <h2 className="min-w-0 text-xl font-semibold tracking-normal text-zinc-100 sm:text-3xl">Let's Work Together</h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2 sm:gap-4">
        <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.025] p-3 sm:rounded-2xl sm:p-6">
          <h3 className="text-base font-semibold text-zinc-100 sm:text-xl">Get in touch</h3>
          <p className="mt-1.5 max-w-md text-xs leading-5 text-zinc-400 sm:mt-2 sm:text-sm">
            Choose your preferred method to connect and let's discuss your project.
          </p>

          <div className="mt-3 space-y-2 sm:mt-5 sm:space-y-2.5">
            {contactMethods.map((method) => {
              const Icon = method.icon;

              return (
                <a
                  key={method.title}
                  className="group flex min-w-0 items-center gap-2.5 rounded-lg border border-white/10 bg-zinc-950/50 p-2.5 transition hover:border-white/20 hover:bg-white/[0.045] sm:gap-3 sm:rounded-xl sm:p-3"
                  href={method.href}
                  target={method.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={method.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.035] text-zinc-400 transition group-hover:text-zinc-100 sm:h-10 sm:w-10">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-medium text-zinc-100 sm:text-sm">{method.title}</span>
                    <span className="mt-0.5 hidden truncate text-xs text-zinc-500 min-[380px]:block">{method.description}</span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-zinc-600 transition group-hover:text-zinc-200 sm:h-4 sm:w-4" />
                </a>
              );
            })}
          </div>

          <p className="mt-3 text-[11px] text-zinc-500 sm:mt-5 sm:text-xs">Response within 24 hours • Available for hire</p>
        </div>

        <form className="min-w-0 rounded-xl border border-white/10 bg-white/[0.025] p-3 sm:rounded-2xl sm:p-6" onSubmit={handleSubmit}>
          <h3 className="text-base font-semibold text-zinc-100 sm:text-xl">Send a message</h3>
          <p className="mt-1.5 max-w-md text-xs leading-5 text-zinc-400 sm:mt-2 sm:text-sm">
            Prefer to write? Fill out the form and I'll get back to you within 24 hours.
          </p>

          <div className="mt-3 space-y-3 sm:mt-6 sm:space-y-4">
            <input
              className={fieldClassName}
              name="name"
              placeholder="Name"
              pattern="[A-Za-z][A-Za-z\s.'-]{1,}"
              type="text"
              title="Enter a valid name using at least 2 letters."
              required
            />
            <input
              className={fieldClassName}
              name="email"
              placeholder="Email"
              type="email"
              required
            />
            <textarea
              className={`${fieldClassName} min-h-16 resize-y sm:min-h-20`}
              name="message"
              placeholder="Message"
              minLength={5}
              required
            />
          </div>

          {submitState === "error" ? <p className="mt-2 text-[11px] leading-4 text-rose-300 sm:mt-3 sm:text-xs sm:leading-5">{errorMessage}</p> : null}

          <button
            className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm font-medium text-zinc-100 transition hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-5 sm:h-11 sm:rounded-xl sm:px-4"
            type="submit"
            disabled={submitState === "sending"}
          >
            {submitState === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send Message
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>
      </div>

      {submitState === "success" ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-950 p-6 text-center shadow-2xl shadow-black/50">
            <button
              className="ml-auto grid h-9 w-9 place-items-center rounded-full text-zinc-500 transition hover:bg-white/[0.06] hover:text-zinc-100"
              type="button"
              onClick={() => setSubmitState("idle")}
              aria-label="Close message sent popup"
            >
              <X className="h-4 w-4" />
            </button>
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
            <h3 className="mt-4 text-xl font-semibold text-zinc-100">Thanks for sending message</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Your message has been sent to my email. I will reply soon.</p>
            <button
              className="mt-5 h-10 rounded-full bg-zinc-100 px-5 text-sm font-medium text-zinc-950 transition hover:bg-white"
              type="button"
              onClick={() => setSubmitState("idle")}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
