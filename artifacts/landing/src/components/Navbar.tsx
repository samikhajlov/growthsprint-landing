import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, X } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navbar({ onOpenContact }: { onOpenContact: () => void }) {
  const { t } = useLang();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-md border-b border-border/50 py-3"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2 group z-50 relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-premium flex items-center justify-center shadow-md">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="font-display font-bold text-xl tracking-tight group-hover:opacity-80 transition-opacity">
                Growth<span className="text-primary">Sprint</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-6 mr-2 text-sm font-bold text-muted-foreground">
                <a href="#services" className="hover:text-primary transition-colors">{t.navbar.services}</a>
                <a href="#process" className="hover:text-primary transition-colors">{t.navbar.process}</a>
              </div>
              <LanguageSwitcher />
              <button
                onClick={onOpenContact}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.navbar.cta}</span>
              </button>
            </div>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <button
                className="p-2 -mr-2 z-50 relative text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pt-24 pb-8 px-6 flex flex-col md:hidden"
          >
            <div className="flex flex-col gap-6 mt-8">
              <a href="#services" onClick={closeMobileMenu} className="text-2xl font-bold py-4 border-b border-border/50 text-foreground">
                {t.navbar.services}
              </a>
              <a href="#process" onClick={closeMobileMenu} className="text-2xl font-bold py-4 border-b border-border/50 text-foreground">
                {t.navbar.process}
              </a>
              <div className="mt-8">
                <button
                  onClick={() => { closeMobileMenu(); onOpenContact(); }}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg bg-primary text-primary-foreground shadow-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>{t.navbar.cta}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
