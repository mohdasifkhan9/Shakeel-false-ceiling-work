"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, LoaderCircle, Paperclip } from "lucide-react";
import { useRef, useState } from "react";
import { EASE } from "@/lib/anim";
import { services } from "@/data/services";
import { hasWhatsapp, whatsappHref, WA_DEFAULT_MSG } from "@/data/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const inputBase =
  "w-full bg-transparent pt-6 pb-3 text-[15px] outline-none border-b transition-colors placeholder:text-transparent peer";
const labelBase =
  "pointer-events-none absolute top-6 left-0 text-[13px] transition-all duration-300 peer-focus:top-0 peer-focus:text-[9px] peer-focus:tracking-[0.25em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:tracking-[0.25em] peer-[:not(:placeholder-shown)]:uppercase";

export function QuoteForm({ dark = false }: { dark?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  const ink = dark ? "text-ivory" : "text-ink";
  const mute = dark ? "text-mute-light" : "text-mute";
  const border = dark ? "border-ivory/25" : "border-ink/20";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);

    // honeypot — silently accept & discard bots
    if (fd.get("company")) {
      setStatus("success");
      return;
    }

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      location: String(fd.get("location") ?? "").trim(),
      propertyType: String(fd.get("propertyType") ?? "").trim(),
      service: String(fd.get("service") ?? "").trim(),
      area: String(fd.get("area") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      attachmentName: fileName,
    };

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
      setFileName(null);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex min-h-[26rem] flex-col items-start justify-center py-10"
            role="status"
          >
            <span className={cn("mb-8 rounded-full border p-3", border)}>
              <Check className="size-5" strokeWidth={1.5} aria-hidden />
            </span>
            <h3 className={cn("font-serif text-5xl tracking-tight md:text-6xl", ink)}>THANK YOU.</h3>
            <p className={cn("mt-5 max-w-md text-[15px] leading-relaxed", mute)}>
              Your enquiry has been received. We&apos;ll review the details and
              get back to you shortly.
            </p>
            {hasWhatsapp && (
              <a
                href={whatsappHref(WA_DEFAULT_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-6 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase"
              >
                Continue on WhatsApp <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            )}
            <button
              onClick={() => setStatus("idle")}
              className={cn("link-underline mt-8 text-[11px] font-semibold tracking-[0.3em] uppercase", mute)}
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE }}
            className={cn("grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2", ink)}
            noValidate={false}
          >
            {/* honeypot */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className={cn("field relative", dark ? "text-ivory" : "")}>
              <input id="qf-name" name="name" required placeholder="Name" autoComplete="name" className={cn(inputBase, border, ink)} />
              <label htmlFor="qf-name" className={cn(labelBase, mute)}>Name *</label>
            </div>

            <div className="field relative">
              <input id="qf-phone" name="phone" type="tel" required minLength={8} placeholder="Phone" autoComplete="tel" className={cn(inputBase, border, ink)} />
              <label htmlFor="qf-phone" className={cn(labelBase, mute)}>Phone number *</label>
            </div>

            <div className="field relative">
              <input id="qf-location" name="location" placeholder="Location in Hyderabad" autoComplete="address-level2" className={cn(inputBase, border, ink)} />
              <label htmlFor="qf-location" className={cn(labelBase, mute)}>Location in Hyderabad</label>
            </div>

            <div className="field relative">
              <select id="qf-property" name="propertyType" defaultValue="" className={cn(inputBase, border, ink, "appearance-none", dark && "[&_option]:bg-ink [&_option]:text-ivory")}>
                <option value="" disabled hidden></option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Other">Other</option>
              </select>
              <label htmlFor="qf-property" className={cn(labelBase, mute)}>Property type</label>
              <span className={cn("pointer-events-none absolute top-7 right-0 text-[10px]", mute)} aria-hidden>▾</span>
            </div>

            <div className="field relative">
              <select id="qf-service" name="service" defaultValue="" className={cn(inputBase, border, ink, "appearance-none", dark && "[&_option]:bg-ink [&_option]:text-ivory")}>
                <option value="" disabled hidden></option>
                {services.map((s) => (
                  <option key={s.slug} value={s.title}>{s.title}</option>
                ))}
                <option value="Not sure yet">Not sure yet</option>
              </select>
              <label htmlFor="qf-service" className={cn(labelBase, mute)}>Service required</label>
              <span className={cn("pointer-events-none absolute top-7 right-0 text-[10px]", mute)} aria-hidden>▾</span>
            </div>

            <div className="field relative">
              <input id="qf-area" name="area" placeholder="Approx. area (sq ft)" inputMode="numeric" className={cn(inputBase, border, ink)} />
              <label htmlFor="qf-area" className={cn(labelBase, mute)}>Approx. area (sq ft)</label>
            </div>

            <div className="field relative sm:col-span-2">
              <textarea id="qf-message" name="message" rows={3} placeholder="Tell us about your space" className={cn(inputBase, border, ink, "resize-none")} />
              <label htmlFor="qf-message" className={cn(labelBase, mute)}>Tell us about your space</label>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="qf-attachment"
                className={cn(
                  "mt-2 inline-flex cursor-pointer items-center gap-3 border border-dashed px-5 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors",
                  border,
                  mute,
                  dark ? "hover:border-ivory/60 hover:text-ivory" : "hover:border-ink/50 hover:text-ink",
                )}
              >
                <Paperclip className="size-3.5" aria-hidden />
                {fileName ? fileName : "Attach a photo of the space (optional)"}
              </label>
              <input
                id="qf-attachment"
                name="attachment"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
              <p className={cn("mt-2 text-[10px] tracking-[0.12em]", mute)}>
                The photo name is noted with your enquiry — you can share the
                image itself when we connect.
              </p>
            </div>

            {status === "error" && (
              <p role="alert" className="text-sm text-bronze sm:col-span-2">
                {errorMsg}
              </p>
            )}

            <div className="mt-6 sm:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                data-cursor="open"
                className={cn(
                  "group inline-flex w-full items-center justify-center gap-3 px-8 py-5 text-[11px] font-semibold tracking-[0.3em] uppercase transition-colors duration-500 sm:w-auto",
                  dark
                    ? "bg-ivory text-ink hover:bg-bronze hover:text-ivory"
                    : "bg-ink text-ivory hover:bg-bronze",
                  status === "sending" && "opacity-70",
                )}
              >
                {status === "sending" ? (
                  <>
                    Sending
                    <LoaderCircle className="size-3.5 animate-spin" aria-hidden />
                  </>
                ) : (
                  <>
                    Start a conversation
                    <span className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden>→</span>
                  </>
                )}
              </button>
              <p className={cn("mt-4 text-[10px] tracking-[0.14em]", mute)}>
                No spam, no obligation — just a clear conversation about your ceiling.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
