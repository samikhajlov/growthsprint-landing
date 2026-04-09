import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Users, Clock, Zap, Target } from "lucide-react";
import { useLang } from "@/hooks/useLang";

function SprintCard({
  variant,
  onOpenContact,
}: {
  variant: "ops" | "landing";
  onOpenContact: (type: "ops" | "landing") => void;
}) {
  const { t } = useLang();
  const s = t.services;
  const d = variant === "ops" ? s.ops : s.cvr;
  const isFeatured = variant === "landing";

  const gradFrom = variant === "ops" ? "from-[hsl(174,60%,28%)]" : "from-[hsl(185,70%,24%)]";
  const gradTo = variant === "ops" ? "to-[hsl(220,40%,18%)]" : "to-[hsl(174,60%,28%)]";
  const accentText = variant === "ops" ? "text-[hsl(174,80%,60%)]" : "text-[hsl(185,90%,65%)]";
  const checkColor = "text-emerald-400";
  const Icon = variant === "ops" ? Zap : Target;
  const price = variant === "ops" ? s.priceOps : s.priceCvr;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: variant === "ops" ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
      className={`relative flex flex-col rounded-2xl overflow-hidden transition-shadow duration-300 ${
        isFeatured
          ? "shadow-[0_8px_60px_-8px_hsl(174,60%,40%,0.35)] hover:shadow-[0_20px_70px_-8px_hsl(174,60%,40%,0.5)] ring-2 ring-[hsl(174,60%,40%)]"
          : "shadow-[0_8px_40px_-8px_rgba(0,0,0,0.18)] hover:shadow-[0_20px_50px_-8px_rgba(0,0,0,0.28)]"
      }`}
    >
      {isFeatured && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold tracking-wide">
          {s.popular}
        </div>
      )}

      {/* Dark gradient header */}
      <div className={`relative bg-gradient-to-br ${gradFrom} ${gradTo} px-8 pt-8 pb-10 shimmer`}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-semibold mb-5">
          <Icon className="w-4 h-4" />
          {d.tag}
        </div>
        <h3 className="text-white text-2xl font-extrabold mb-5 leading-tight">{d.title}</h3>
        <div className="flex items-end gap-2 mb-4 flex-wrap">
          <span className="text-white text-4xl sm:text-5xl font-black tracking-tight leading-none whitespace-nowrap shrink-0">{price}</span>
          <div className="flex flex-col pb-1 gap-0.5">
            <span className="text-white/70 text-xs font-medium">{s.exclTax}</span>
            <span className="text-white/70 text-xs font-medium">{s.sprintDuration}</span>
          </div>
        </div>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 ${accentText} text-xs font-bold`}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          {s.outcomeLabel}{d.outcome}
        </div>
      </div>

      {/* White body */}
      <div className="flex flex-col flex-grow bg-white px-8 pt-7 pb-8">
        <p className="text-sm text-muted-foreground leading-relaxed mb-7 border-l-2 border-primary pl-3">
          {d.purpose}
        </p>

        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{s.painsLabel}</p>
          <ul className="space-y-2.5">
            {d.pains.map((p, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-dashed border-border mb-7" />

        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{s.deliverablesLabel}</p>
          <ul className="space-y-2.5">
            {d.deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm font-medium text-foreground">
                <CheckCircle2 className={`w-4 h-4 ${checkColor} shrink-0 mt-0.5`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-dashed border-border mb-7" />

        <div className="grid grid-cols-2 gap-3 mb-7">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{s.mtgValue}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span>{s.capacityValue}</span>
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => onOpenContact(variant)}
            className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl bg-gradient-to-r ${gradFrom} ${gradTo} text-white`}
          >
            {s.ctaText}
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-center text-xs text-muted-foreground mt-3">{s.trustLine}</p>
        </div>
      </div>

      {/* Not included */}
      <details className="bg-muted/60 border-t border-border group">
        <summary className="px-8 py-3 text-xs text-muted-foreground font-medium cursor-pointer select-none list-none flex items-center justify-between hover:text-foreground transition-colors">
          <span>{s.notIncludedLabel}</span>
          <span className="group-open:rotate-180 transition-transform">▾</span>
        </summary>
        <p className="px-8 pb-4 text-xs text-muted-foreground leading-relaxed">{d.notIncluded}</p>
      </details>
    </motion.div>
  );
}

export function ServiceComparison({ onOpenContact }: { onOpenContact: (type: "ops" | "landing") => void }) {
  const { t } = useLang();
  const s = t.services;

  return (
    <section id="services" className="py-20 md:py-28 bg-muted/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              {s.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">{s.h2}</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">{s.sub}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          <SprintCard variant="ops" onOpenContact={onOpenContact} />
          <SprintCard variant="landing" onOpenContact={onOpenContact} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          {s.note}
        </motion.p>
      </div>
    </section>
  );
}
