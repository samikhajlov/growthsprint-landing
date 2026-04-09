import { motion } from "framer-motion";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const rowVariant = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

interface PainColumnProps {
  label: string;
  color: "primary" | "accent";
  pains: readonly string[];
  btnLabel: string;
  onSelect: () => void;
  delay?: number;
}

function PainColumn({ label, color, pains, btnLabel, onSelect, delay = 0 }: PainColumnProps) {
  const isPrimary = color === "primary";
  const borderClass = isPrimary ? "border-primary/20" : "border-accent/20";
  const textClass = isPrimary ? "text-primary" : "text-accent";
  const dotClass = isPrimary ? "bg-primary" : "bg-accent";
  const btnBg = isPrimary
    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
    : "bg-accent hover:bg-accent/90 text-accent-foreground";
  const hoverGlow = isPrimary
    ? "hover:shadow-[0_8px_30px_hsl(174,60%,40%,0.25)]"
    : "hover:shadow-[0_8px_30px_hsl(185,70%,35%,0.25)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`flex flex-col rounded-2xl border ${borderClass} bg-card shadow-sm ${hoverGlow} transition-all duration-300 overflow-hidden`}
    >
      <div className={`h-1 w-full ${isPrimary ? "bg-gradient-to-r from-primary to-accent" : "bg-gradient-to-r from-accent to-primary"}`} />
      <div className="p-7 md:p-8 flex flex-col flex-grow">
        <p className={`text-xs font-bold uppercase tracking-widest ${textClass} mb-6`}>{label}</p>
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-4 flex-grow mb-8"
        >
          {pains.map((pain, i) => (
            <motion.li key={i} variants={rowVariant} className="flex items-start gap-3 group/item">
              <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${dotClass} opacity-60 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all`} />
              <span className="text-sm text-foreground/75 leading-snug group-hover/item:text-foreground transition-colors">{pain}</span>
            </motion.li>
          ))}
        </motion.ul>
        <motion.button
          onClick={onSelect}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-colors duration-200 ${btnBg} shadow-md`}
        >
          {btnLabel}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export function PainSection({ onOpenContact }: { onOpenContact: (type: "ops" | "landing") => void }) {
  const { t } = useLang();
  const p = t.pain;

  return (
    <section id="pain" className="py-16 md:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold uppercase tracking-widest mb-5">
            <AlertCircle className="w-3.5 h-3.5" />
            {p.badge}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">{p.h2}</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">{p.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <PainColumn label={p.opsLabel} color="primary" pains={p.opsPains} btnLabel={p.opsBtn} onSelect={() => onOpenContact("ops")} delay={0} />
          <PainColumn label={p.cvrLabel} color="accent" pains={p.cvrPains} btnLabel={p.cvrBtn} onSelect={() => onOpenContact("landing")} delay={0.12} />
        </div>

        <motion.div
          className="mt-8 p-5 rounded-xl bg-muted/60 border border-border text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            {p.callout}
            <span className="font-bold text-foreground">{p.calloutBold}</span>
            {p.calloutEnd}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
