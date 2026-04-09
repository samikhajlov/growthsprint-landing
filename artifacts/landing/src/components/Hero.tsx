import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero({ onOpenContact }: { onOpenContact: (type: "ops" | "landing" | "undecided") => void }) {
  const { t } = useLang();
  const h = t.hero;

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden hero-bg">

      {/* Animated glowing orbs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[8%] w-80 h-80 rounded-full bg-primary/25 blur-[100px] animate-blob" />
        <div className="absolute top-[40%] right-[5%] w-72 h-72 rounded-full bg-accent/20 blur-[90px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[10%] left-[35%] w-64 h-64 rounded-full bg-primary/15 blur-[80px] animate-blob animation-delay-4000" />
      </div>

      {/* Floating particles */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { cx: "12%", cy: "30%", cls: "dot-float" },
          { cx: "88%", cy: "20%", cls: "dot-float-delay" },
          { cx: "70%", cy: "75%", cls: "dot-float-delay2" },
          { cx: "25%", cy: "70%", cls: "dot-float" },
          { cx: "55%", cy: "15%", cls: "dot-float-delay2" },
        ].map((p, i) => (
          <span key={i} className={`absolute w-1.5 h-1.5 rounded-full bg-primary/50 ${p.cls}`} style={{ left: p.cx, top: p.cy }} />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(hsl(174,60%,70%) 1px, transparent 1px), linear-gradient(90deg, hsl(174,60%,70%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-primary/90 text-xs sm:text-sm font-bold uppercase tracking-widest">
              {h.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.2] sm:leading-[1.12]"
          >
            {h.h1a}
            <br />
            <span className="text-gradient-animated">{h.h1b}</span>
          </motion.h1>

          {/* Agitate */}
          <motion.p variants={item} className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed">
            {h.sub}
            <span className="text-white/90 font-semibold">{h.subBold}</span>
            {h.subEnd}
          </motion.p>

          {/* Bridge */}
          <motion.p variants={item} className="text-sm sm:text-base text-primary font-bold mb-10 tracking-wide">
            {h.bridge}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => onOpenContact("undecided")}
              className="btn-glow relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base bg-gradient-premium text-white overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {h.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <a
              href="#pain"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/50 hover:text-white/90 transition-colors duration-200"
            >
              {h.secondaryCta}
              <ArrowDown className="w-4 h-4 animate-float" />
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={item}
            className="inline-flex flex-wrap items-center justify-center gap-0 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md overflow-hidden"
          >
            {h.stats.map((s, i) => (
              <div key={i} className={`px-6 py-4 text-center ${i < h.stats.length - 1 ? "border-r border-white/10" : ""}`}>
                <div className="text-xl font-black text-white mb-0.5">{s.value}</div>
                <div className="text-xs text-white/50 font-medium sm:whitespace-nowrap">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Trust */}
          <motion.p variants={item} className="mt-5 text-xs text-white/30">
            {h.trust}
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
}
