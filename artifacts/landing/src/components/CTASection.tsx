import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";

export function CTASection({ onOpenContact }: { onOpenContact: () => void }) {
  const { t } = useLang();
  const c = t.cta;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-secondary border-t border-border/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary via-[#0a1922] to-[#040d12]"></div>
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 mix-blend-screen filter blur-[100px] animate-blob"></div>
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-accent/20 mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 md:mb-8 text-white tracking-tight"
        >
          {c.h2}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {c.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 md:px-12 py-5 md:py-6 rounded-2xl font-bold text-lg md:text-xl text-white bg-primary hover:bg-primary/90 shadow-[0_0_40px_rgba(0,180,180,0.3)] hover:shadow-[0_0_60px_rgba(0,180,180,0.5)] hover:-translate-y-1 transition-all duration-300 border border-primary/50"
          >
            <MessageCircle className="w-6 h-6" />
            {c.btn}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-xs md:text-sm text-white/40 max-w-2xl mx-auto leading-relaxed"
        >
          {c.disclaimer}
        </motion.p>
      </div>
    </section>
  );
}
