import { Router, type IRouter } from "express";
import { db, contactsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";
import { sendAdminNotification, sendUserConfirmation } from "../lib/email.js";

const router: IRouter = Router();

router.post("/contacts", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "入力内容に誤りがあります。" });
    return;
  }

  const { name, company, email, sprintInterest, message } = parsed.data;

  try {
    const [contact] = await db
      .insert(contactsTable)
      .values({ name, company, email, sprintInterest, message: message ?? null })
      .returning({ id: contactsTable.id });

    const contactData = { name, company, email, sprintInterest, message };

    Promise.all([
      sendAdminNotification(contactData).catch((err) =>
        console.error("[email] admin notification failed:", err)
      ),
      sendUserConfirmation(contactData).catch((err) =>
        console.error("[email] user confirmation failed:", err)
      ),
    ]);

    res.status(201).json({ id: contact.id, message: "お問い合わせを受け付けました。" });
  } catch (err) {
    console.error("Contact insert error:", err);
    res.status(500).json({ error: "サーバーエラーが発生しました。再度お試しください。" });
  }
});

export default router;
