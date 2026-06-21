"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";

const ServiceAreaMap = dynamic(() => import("./ServiceAreaMap"), { ssr: false });
import {
  ArrowRight,
  Target,
  Eye,
  Scale,
  UserCheck,
  Users,
  Award,
  MapPin,
  Heart,
} from "lucide-react";

// Editable copy
const HERO_EYEBROW = "501(c)(3) NONPROFIT ORGANIZATION";
const HERO_HEADLINE = "Building Brighter Futures for Houston's Students";
const HERO_SUB =
  "Marber Learning Foundation is dedicated to closing academic gaps for K–12 students across Alief, Stafford, Sugar Land, Richmond, and Missouri City through personalized tutoring and family support.";

const STORY_TITLE = "Our Story";
const STORY_BODY =
  "Marber Learning Foundation was founded with a single belief: every child deserves access to the support they need to succeed. Serving the communities of Alief, Stafford, Sugar Land, Richmond, and Missouri City, we work hand-in-hand with local families and schools to create lasting pathways to academic achievement and lifelong success. We provide personalized tutoring during a child's most formative K–12 years, laying a permanent foundation in reading, math, and self-assurance.";

const MISSION = {
  title: "Our Mission",
  body: "To empower K–12 students in Alief, Stafford, Sugar Land, Richmond, and Missouri City through high-quality tutoring and enrichment. We build academic excellence, foster self-confidence, and ignite a lifelong passion for learning by bridging the gap between home and school to ensure every child has the tools they need to thrive.",
};

const VISION = {
  title: "Our Vision",
  body: "We envision a future where all children throughout Alief, Stafford, and the surrounding communities have equitable access to the resources and mentorship needed to excel academically, socially, and emotionally — regardless of their background or circumstances.",
};

const VALUES_TITLE = "Our Core Values";
const VALUES = [
  {
    icon: Scale,
    title: "Equity",
    description:
      "Every child deserves equal access to quality education, regardless of background or circumstance.",
  },
  {
    icon: UserCheck,
    title: "Personalization",
    description:
      "We meet each student where they are, crafting learning plans tailored to their unique needs.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We partner with families and schools to strengthen the communities we serve.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in teaching, mentorship, and student outcomes.",
  },
];

const COMMUNITIES = ["Alief", "Stafford", "Sugar Land", "Richmond", "Missouri City"];

const MAP_TITLE = "Our Service Area";
const MAP_SUB = "Serving families across the Greater Houston area and Fort Bend County.";

const CEO_EYEBROW = "MEET OUR FOUNDER";
const CEO_NAME = "Marla Cortes";
const CEO_TITLE = "Founder & Executive Director";
const CEO_BIO = [
  "As the Founder of the Marber Learning Foundation, Marla Cortes is dedicated to closing academic gaps for K–12 students across Alief, Stafford, Sugar Land, Richmond, and Missouri City. A seasoned educator with over 20 years of experience in secondary mathematics and ESL, Marla built the foundation on the belief that every child deserves a solid foundation in reading, math, and self-assurance, regardless of background.",
  "Marla earned her B.S. in Math from the University of St. Thomas and holds a Region IV certification (Grades 6–12). Her seven years of classroom instruction span the core high school curriculum, including Algebra I, Geometry, and Algebra II. She is particularly known for her work in Mathematical Models with Applications (MMA), where she helps students connect complex concepts to real-world scenarios such as personal finance and statistics — transforming \"classroom math\" into essential life skills.",
  "With 15 years of leadership as an ESL Department Chair and Specialist, Marla has a unique ability to identify knowledge gaps caused by language barriers or \"math anxiety.\" This expertise is central to the Marber Learning Foundation's mission: providing high-quality, personalized tutoring that bridges the gap between home and school.",
  "Marla is driven by the \"light bulb\" moment — the instant a student moves from frustration to mastery. Her goal is to ensure that families throughout Fort Bend County and the Greater Houston area have equitable access to the mentorship and resources needed for their children to excel academically, socially, and emotionally.",
];
const CEO_QUOTE =
  "Watching a student gain the confidence to thrive is my greatest professional satisfaction. At Marber, we aren't just tutoring; we are building pathways to lifelong success.";

const CTA_HEADLINE = "Ready to Make a Difference?";
const CTA_SUB =
  "Join us in our mission to empower the next generation of learners across Greater Houston.";
const CTA_LABEL = "Get Started Today";

const BLOBS = [
  { left: "5%", top: "20%", size: 180, color: "#8B7AAB", opacity: 0.08, duration: 5, delay: 0 },
  { left: "80%", top: "10%", size: 120, color: "#5BA89A", opacity: 0.07, duration: 6, delay: 0.8 },
  { left: "65%", top: "70%", size: 150, color: "#8B7AAB", opacity: 0.06, duration: 7, delay: 1.6 },
];

export default function AboutContent() {
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

      {/* ── Our Story ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent-mint font-semibold text-sm tracking-widest uppercase mb-3">
                WHO WE ARE
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mb-6">
                {STORY_TITLE}
              </h2>
              <p className="text-text-muted text-lg leading-relaxed">{STORY_BODY}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              <div className="rounded-2xl bg-bg-soft border border-primary/20 p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart size={28} className="text-primary" strokeWidth={1.6} />
                </div>
                <div>
                  <p className="font-bold text-text-dark text-lg">501(c)(3) Nonprofit</p>
                  <p className="text-text-muted text-sm">All donations are tax-deductible.</p>
                </div>
              </div>

              <div className="rounded-2xl bg-bg-soft border border-accent-mint/20 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={18} className="text-accent-mint" />
                  <p className="font-bold text-text-dark">
                    Proudly Serving Alief, Stafford &amp; Fort Bend
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {COMMUNITIES.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 rounded-full bg-accent-mint/10 text-accent-mint text-sm font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Service Area Map ── */}
      <section className="bg-bg-soft py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mb-3">
              {MAP_TITLE}
            </h2>
            <p className="text-text-muted text-lg">{MAP_SUB}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl overflow-hidden shadow-sm border border-primary/10"
          >
            <ServiceAreaMap />
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="bg-bg-cream py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark">
              Mission &amp; Vision
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Target, label: MISSION.title, body: MISSION.body, color: "text-primary" },
              { icon: Eye, label: VISION.title, body: VISION.body, color: "text-accent-mint" },
            ].map(({ icon: Icon, label, body, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-primary/10"
              >
                <div className="w-14 h-14 rounded-full bg-bg-soft flex items-center justify-center mb-5">
                  <Icon size={28} className={color} strokeWidth={1.6} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-text-dark mb-4">{label}</h3>
                <p className="text-text-muted leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark">
              {VALUES_TITLE}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {VALUES.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="text-center flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 rounded-full bg-bg-soft flex items-center justify-center shadow-sm flex-shrink-0">
                  <Icon size={34} className="text-primary" strokeWidth={1.6} />
                </div>
                <h3 className="font-heading text-xl font-bold text-text-dark">{title}</h3>
                <p className="text-text-muted leading-relaxed text-sm max-w-xs mx-auto">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder ── */}
      <section className="bg-bg-soft py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-accent-mint font-semibold text-sm tracking-widest uppercase mb-8 text-center">
              {CEO_EYEBROW}
            </p>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm flex flex-col gap-8">
              <div className="flex items-center gap-5">
                <div className="w-40 h-40 rounded-full border-4 border-primary/20 flex-shrink-0 overflow-hidden">
                  <img
                    src="/marlaphoto.jpeg"
                    alt="Marla Cortes, Founder & Executive Director"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-dark mb-1">
                    {CEO_NAME}
                  </h3>
                  <p className="text-primary font-semibold">{CEO_TITLE}</p>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-3 mb-5">
                  {CEO_BIO.map((para, i) => (
                    <p key={i} className="text-text-muted leading-relaxed text-sm">{para}</p>
                  ))}
                </div>
                <blockquote className="border-l-4 border-primary pl-4 italic text-text-dark leading-relaxed">
                  &ldquo;{CEO_QUOTE}&rdquo;
                </blockquote>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── School Visits ── */}
      <section id="visits" className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-accent-mint font-semibold text-sm tracking-widest uppercase mb-3">
              OUTREACH
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-dark mb-4">
              Schools We've Visited
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Building relationships with local schools is at the heart of what we do. Here's a look at some of the campuses we've had the privilege to visit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { src: "/colony%20meadows%20elementary%20visit.jpg", label: "Colony Meadows Elementary" },
              { src: "/commonwealth%20elementary%20hall%20visit.jpg", label: "Commonwealth Elementary" },
              { src: "/sartartia%20middle%20school%20visit.jpg", label: "Sartartia Middle School" },
              { src: "/first%20colony%20middle%20school%20visit.jpg", label: "First Colony Middle School" },
              { src: "/fort%20bend%20christian%20academy%20visit.jpg", label: "Fort Bend Christian Academy" },
              { src: "/St.%20Francis%20de%20Sales%20School%20Stocking%20the%20Fridge.JPG", label: "St. Francis de Sales — Stocking the Fridge" },
              { src: "/St.%20Francis%20de%20Sales%20Teacher's%20Apprciation%20Week.jpeg", label: "St. Francis de Sales — Teacher Appreciation Week" },
            ].map(({ src, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
              >
                <img
                  src={src}
                  alt={label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text-dark/65 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-white font-semibold text-sm leading-tight">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-primary-light to-primary">
        <div
          className="absolute top-8 left-10 w-36 h-36 rounded-full bg-white pointer-events-none"
          style={{ opacity: 0.06 }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-10 right-16 w-52 h-52 rounded-full bg-white pointer-events-none"
          style={{ opacity: 0.05 }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            {CTA_HEADLINE}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/85 text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {CTA_SUB}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary hover:bg-bg-cream px-10 py-4 rounded-full font-bold text-base transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              {CTA_LABEL}
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
