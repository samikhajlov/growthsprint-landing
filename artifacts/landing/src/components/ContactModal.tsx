import { X, CheckCircle2, Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { contactSchema, type ContactFormData, useSubmitContact } from "@/hooks/use-contact";
import { useLang } from "@/hooks/useLang";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInterest?: "ops" | "landing" | "both" | "undecided";
}

export function ContactModal({ isOpen, onClose, defaultInterest = "undecided" }: ContactModalProps) {
  const { t } = useLang();
  const c = t.contact;
  const { mutate, isPending, isSuccess, error, reset } = useSubmitContact();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { sprintInterest: defaultInterest },
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      resetForm({ sprintInterest: defaultInterest });
      reset();
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, defaultInterest]);

  const onSubmit = (data: ContactFormData) => mutate(data);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4 md:p-0"
          >
            <div className="relative overflow-hidden rounded-2xl bg-card shadow-2xl border border-border">
              <div className="absolute right-4 top-4 z-10">
                <button onClick={onClose} className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                    <CheckCircle2 className="h-20 w-20 text-primary mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">{c.success}</h3>
                  <button
                    onClick={onClose}
                    className="mt-6 px-8 py-3 rounded-xl font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="p-6 md:p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">{c.title}</h2>
                    <p className="text-muted-foreground text-sm">{c.subtitle}</p>
                  </div>

                  {error && (
                    <div className="mb-6 p-4 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">{c.error}</div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-foreground">
                        {c.interest} <span className="text-destructive">*</span>
                      </label>
                      <select
                        {...register("sprintInterest")}
                        className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                      >
                        <option value="undecided">{c.undecided}</option>
                        <option value="ops">{c.ops}</option>
                        <option value="landing">{c.cvr}</option>
                        <option value="both">{c.both}</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-foreground">
                          {c.company} <span className="text-destructive">*</span>
                        </label>
                        <input
                          {...register("company")}
                          placeholder={c.companyPh}
                          className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                        />
                        {errors.company && <p className="mt-1.5 text-sm text-destructive">{errors.company.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-foreground">
                          {c.name} <span className="text-destructive">*</span>
                        </label>
                        <input
                          {...register("name")}
                          placeholder={c.namePh}
                          className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                        />
                        {errors.name && <p className="mt-1.5 text-sm text-destructive">{errors.name.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-foreground">
                        {c.email} <span className="text-destructive">*</span>
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder={c.emailPh}
                        className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                      />
                      {errors.email && <p className="mt-1.5 text-sm text-destructive">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-foreground">{c.message}</label>
                      <textarea
                        {...register("message")}
                        rows={3}
                        placeholder={c.messagePh}
                        className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 mt-4 rounded-xl font-bold text-white bg-gradient-premium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isPending ? (
                        <><Loader2 className="w-5 h-5 animate-spin" />{c.submitting}</>
                      ) : (
                        <><Send className="w-5 h-5" />{c.submit}</>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
