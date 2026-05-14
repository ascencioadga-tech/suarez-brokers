"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type ContactT = {
  eyebrow: string;
  heading: string;
  sub: string;
  fields: { name: string; company: string; email: string; phone: string; commodity: string; message: string };
  submit: string;
  dryEmail: string;
  produceEmail: string;
  phone: string;
  hq: string;
};

export function Contact({ t }: { t: ContactT }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="eyebrow text-cobalt/70"
            >
              <span className="mr-3 inline-block h-px w-8 align-middle bg-amber" />
              {t.eyebrow}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="mt-5 font-display text-[34px] leading-[1.05] tracking-tight text-cobalt-ink md:text-[44px]"
            >
              {t.heading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-md text-base leading-relaxed text-cobalt-ink/75 md:text-[17px]"
            >
              {t.sub}
            </motion.p>

            <div className="mt-10 space-y-5 text-[14px]">
              <ContactRow label="DRY GOODS" value={t.dryEmail} href={`mailto:${t.dryEmail}`} />
              <ContactRow label="PRODUCE" value={t.produceEmail} href={`mailto:${t.produceEmail}`} />
              <ContactRow label="PHONE" value={t.phone} href={`tel:${t.phone.replace(/[^0-9+]/g, "")}`} />
              <ContactRow label="HQ" value={t.hq} />
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 0.8, 0.32, 1] }}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="relative overflow-hidden rounded-2xl border border-line-soft bg-ivory p-7 md:p-10"
          >
            <span
              aria-hidden="true"
              className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber/15 blur-3xl"
            />

            <div className="grid gap-5 md:grid-cols-2">
              <Field label={t.fields.name} name="name" required />
              <Field label={t.fields.company} name="company" />
              <Field label={t.fields.email} name="email" type="email" required />
              <Field label={t.fields.phone} name="phone" type="tel" />
              <Field
                label={t.fields.commodity}
                name="commodity"
                full
              />
              <Field label={t.fields.message} name="message" textarea full />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="group/cta relative mt-8 inline-flex items-center justify-center overflow-hidden rounded-full bg-cobalt px-7 py-3.5 text-sm font-medium text-ivory transition disabled:opacity-60"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-amber transition-transform duration-500 group-hover/cta:scale-x-100"
              />
              <span className="relative z-10 transition-colors group-hover/cta:text-cobalt-ink">
                {submitted ? "✓" : t.submit}
              </span>
              {!submitted && (
                <span className="relative z-10 ml-2 transition-transform group-hover/cta:translate-x-0.5">
                  →
                </span>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const inner = (
    <>
      <span className="block w-24 text-[10px] font-medium uppercase tracking-[0.22em] text-cobalt/60">
        {label}
      </span>
      <span className="text-[15px] text-cobalt-ink/85 group-hover:text-cobalt">
        {value}
      </span>
    </>
  );
  if (href) {
    return (
      <a href={href} className="group flex items-center gap-4 border-b border-line-soft pb-4">
        {inner}
      </a>
    );
  }
  return <div className="flex items-center gap-4 border-b border-line-soft pb-4">{inner}</div>;
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  full,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  full?: boolean;
}) {
  const base =
    "peer w-full border-b border-cobalt/20 bg-transparent pb-2.5 pt-5 text-[15px] text-cobalt-ink outline-none transition-colors focus:border-amber";
  return (
    <label className={`relative block ${full ? "md:col-span-2" : ""}`}>
      <span className="pointer-events-none absolute left-0 top-2 text-[10px] font-medium uppercase tracking-[0.22em] text-cobalt/60 transition-colors peer-focus:text-amber">
        {label}{required && <span className="text-amber"> *</span>}
      </span>
      {textarea ? (
        <textarea name={name} rows={3} required={required} className={base} />
      ) : (
        <input name={name} type={type} required={required} className={base} />
      )}
    </label>
  );
}
