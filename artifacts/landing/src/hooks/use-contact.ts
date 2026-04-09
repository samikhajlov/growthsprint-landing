import { useState } from "react";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "お名前を入力してください"),
  company: z.string().min(2, "会社名を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  sprintInterest: z.enum(["ops", "landing", "both", "undecided"]).default("undecided"),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export function useSubmitContact() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (data: ContactFormData) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "送信に失敗しました。");
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "送信に失敗しました。時間をおいて再度お試しください。";
      setError(msg);
    } finally {
      setIsPending(false);
    }
  };

  const reset = () => {
    setIsSuccess(false);
    setError(null);
  };

  return { mutate, isPending, isSuccess, error, reset };
}
