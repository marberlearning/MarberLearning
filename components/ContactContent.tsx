"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from "lucide-react";

// Editable copy
const HERO_EYEBROW = "GET IN TOUCH";
const HERO_HEADLINE = "We'd Love to Hear From You";
const HERO_SUB =
  "Whether you're a school administrator looking to partner with us, a volunteer wanting to give back, or a donor supporting our mission — reach out and we'll respond within 24 hours.";

const FORM_TITLE = "Send Us a Message";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email Us",
    value: "info@marberlearning.org",
    href: "mailto:info@marberlearning.org",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "(832) 652-6072",
    href: "tel:+18326526072",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Fri, 9 am – 5 pm CST",
    href: null,
  },
  {
    icon: MapPin,
    label: "Service Area",
    value: "Alief · Stafford · Sugar Land · Richmond · Missouri City",
    href: null,
  },
];

const REASONS = [
  "School / Program Partnership",
  "Volunteer Opportunity",
  "Donation / Sponsorship",
  "General Inquiry",
  "Other",
];

const BLOBS = [
  { left: "5%", top: "20%", size: 180, color: "#8B7AAB", opacity: 0.08, duration: 5, delay: 0 },
  { left: "80%", top: "10%", size: 120, color: "#5BA89A", opacity: 0.07, duration: 6, delay: 0.8 },
  { left: "65%", top: "70%", size: 150, color: "#8B7AAB", opacity: 0.06, duration: 7, delay: 1.6 },
];

const INPUT_CLASS =
  "rounded-xl border border-primary/20 bg-bg-cream px-4 py-3 text-text-dark placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition w-full";

export default function ContactContent() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
    website: "", // honeypot — real users never fill this in
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ firstName: "", lastName: "", email: "", phone: "", reason: "", message: "", website: "" });
  };

  return (
    <main className="bg-bg-cream">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-bg-soft via-bg-cream to-bg-cream pt-32 pb-20 md:pb-28 overflow-hidden">
        {BLOBS.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              backgroundColor: b.color,
              opacity: b.opacity,
            }}
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
          />
        ))}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-accent-mint font-semibold text-sm tracking-widest uppercase mb-4"
          >
            {HERO_EYEBROW}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-dark leading-tight mb-6"
          >
            {HERO_HEADLINE}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {HERO_SUB}
          </motion.p>
        </div>
      </section>

      {/* ── Form + Contact Info ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <h2 className="font-heading text-3xl font-bold text-text-dark mb-8">{FORM_TITLE}</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center gap-5 py-16 px-8 rounded-3xl bg-bg-soft border border-primary/20 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle size={40} className="text-primary" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-text-dark">
                    Message Received!
                  </h3>
                  <p className="text-text-muted max-w-sm leading-relaxed">
                    Thank you for reaching out. We'll be in touch within 24 hours.
                  </p>
                  <button
                    onClick={reset}
                    className="mt-2 text-primary font-semibold hover:underline text-sm"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Honeypot — hidden from real users, bots often fill every field */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="firstName" className="text-sm font-semibold text-text-dark">
                        First Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Jane"
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="lastName" className="text-sm font-semibold text-text-dark">
                        Last Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-sm font-semibold text-text-dark">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@email.com"
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-sm font-semibold text-text-dark">
                        Phone{" "}
                        <span className="text-text-muted font-normal">(optional)</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(832) 652-6072"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="reason" className="text-sm font-semibold text-text-dark">
                      Reason for Contact <span className="text-primary">*</span>
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      required
                      value={form.reason}
                      onChange={handleChange}
                      className={INPUT_CLASS + " appearance-none"}
                    >
                      <option value="" disabled>
                        Select a reason…
                      </option>
                      {REASONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-sm font-semibold text-text-dark">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help…"
                      className={INPUT_CLASS + " resize-none"}
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg mt-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/40 w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                    {submitting ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 flex flex-col gap-4 lg:pt-[72px]"
            >
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-bg-soft border border-primary/10 p-5 flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={20} className="text-primary" strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="font-semibold text-text-dark text-sm mb-0.5">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-text-muted text-sm hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-text-muted text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="rounded-2xl bg-gradient-to-br from-primary-light/30 to-primary/10 border border-primary/20 p-6 mt-2">
                <p className="font-heading text-lg font-bold text-text-dark mb-2">
                  Need a quick answer?
                </p>
                <p className="text-text-muted text-sm leading-relaxed">
                  Visit our{" "}
                  <a href="/services" className="text-primary font-semibold hover:underline">
                    Services page
                  </a>{" "}
                  for details on tutoring programs, eligibility, and how to get started.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
