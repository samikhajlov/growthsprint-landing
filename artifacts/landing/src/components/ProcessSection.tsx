import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, PenTool, LineChart, TrendingUp } from "lucide-react";
import { useLang } from "@/hooks/useLang";

const ICONS = [Search, PenTool, LineChart, TrendingUp];

export function ProcessSection() {
  const { t } = useLang();
  const p = t.process;
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-20%" });

  return (
    <section id="process" className="py-20 md:py-28 bg-muted/30 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4"
          >
            {p.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold mb-4"
          >
            {p.h2}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto"
          >
            {p.sub}
          </motion.p>
        </div>

        <div className="relative" ref={lineRef}>
          {/* Animated line desktop */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-border overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary"
              initial={{ scaleX: 0, originX: 0 }}
              animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>
          {/* Animated line mobile */}
          <div className="md:hidden absolute top-10 bottom-10 left-[2rem] w-px bg-border overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-accent to-primary"
              initial={{ scaleY: 0, originY: 0 }}
              animate={lineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {p.steps.map((step, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-0 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl bg-white shadow-lg flex items-center justify-center md:mb-6 overflow-hidden ring-4 ring-background"
                  >
                    <div className="absolute inset-0 bg-gradient-premium opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 shimmer" />
                    <Icon className="relative z-10 w-6 h-6 md:w-7 md:h-7 text-white" />
                    <span className="absolute bottom-1 right-1.5 text-3xl font-black text-white/15 leading-none select-none">
                      {i + 1}
                    </span>
                  </motion.div>
                  <div className="md:text-center pt-1 md:pt-0 md:px-2">
                    <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">STEP {step.step}</p>
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
