import { Link } from "wouter";
import { useLang } from "@/hooks/useLang";

export function Footer() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer className="bg-background py-16 border-t relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/30"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-premium flex items-center justify-center shadow-sm">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-foreground">
              Growth<span className="text-primary">Sprint</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium">
            <Link href="/company" className="text-muted-foreground hover:text-primary transition-colors">
              {f.company}
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              {f.privacy}
            </Link>
            <Link href="/tokushoho" className="text-muted-foreground hover:text-primary transition-colors">
              {f.tokushoho}
            </Link>
          </div>

          <div className="text-sm text-muted-foreground/60 text-center md:text-right font-medium">
            © {new Date().getFullYear()} {f.copy}
          </div>
        </div>
      </div>
    </footer>
  );
}
