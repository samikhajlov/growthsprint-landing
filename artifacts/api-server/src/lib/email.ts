import { Resend } from "resend";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — email sending disabled");
    return null;
  }
  return new Resend(apiKey);
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "contact@stanislav.jp";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "GrowthSprint <noreply@stanislav.jp>";

const SPRINT_LABELS: Record<string, { ja: string; short: string }> = {
  ops:       { ja: "Ops & CRM Sprint（¥450,000）",        short: "Ops & CRM Sprint" },
  landing:   { ja: "Landing & CVR Sprint（¥500,000）",    short: "Landing & CVR Sprint" },
  both:      { ja: "両方気になる",                          short: "両方" },
  undecided: { ja: "まだ決めていない（相談して決めたい）",   short: "未定" },
};

interface ContactData {
  name: string;
  company: string;
  email: string;
  sprintInterest: string;
  message?: string | null;
}

const FONT_STACK   = "'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Meiryo', Arial, sans-serif";
const BRAND_TEAL   = "#0d9488";
const BRAND_DARK   = "#134e4a";
const TEXT_MAIN    = "#1e293b";
const TEXT_MUTED   = "#64748b";
const BG_PAGE      = "#f1f5f9";
const BG_CARD      = "#ffffff";
const BORDER_COLOR = "#e2e8f0";

export async function sendAdminNotification(contact: ContactData) {
  const resend = getResend();
  if (!resend) return;

  const sprint = SPRINT_LABELS[contact.sprintInterest] ?? { ja: contact.sprintInterest, short: contact.sprintInterest };
  const now = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo", dateStyle: "long", timeStyle: "short" });

  const subject = `📋 新規相談 — ${contact.company} / ${sprint.short}`;

  const html = `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BG_PAGE};font-family:${FONT_STACK};color:${TEXT_MAIN};">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_PAGE};padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <tr>
    <td style="background:${BRAND_DARK};border-radius:10px 10px 0 0;padding:24px 32px;">
      <p style="margin:0 0 6px;color:#99f6e4;font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:600;">GrowthSprint · 新規お問い合わせ</p>
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;line-height:1.4;">
        ${contact.company}<br>
        <span style="color:#5eead4;font-size:16px;font-weight:500;">${contact.name}様</span>
      </h1>
    </td>
  </tr>

  <tr>
    <td style="background:${BG_CARD};padding:32px;border-left:1px solid ${BORDER_COLOR};border-right:1px solid ${BORDER_COLOR};">

      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdfa;border-left:4px solid ${BRAND_TEAL};border-radius:0 6px 6px 0;margin-bottom:28px;">
        <tr>
          <td style="padding:16px 20px;">
            <p style="margin:0 0 4px;font-size:11px;color:${TEXT_MUTED};letter-spacing:0.5px;text-transform:uppercase;">興味のある Sprint</p>
            <p style="margin:0;font-size:16px;font-weight:700;color:${BRAND_DARK};">${sprint.ja}</p>
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:12px 16px;background:#f8fafc;font-size:11px;font-weight:700;color:${TEXT_MUTED};text-transform:uppercase;letter-spacing:0.5px;width:110px;border-bottom:1px solid ${BORDER_COLOR};">会社名</td>
          <td style="padding:12px 16px;background:#f8fafc;font-size:15px;color:${TEXT_MAIN};border-bottom:1px solid ${BORDER_COLOR};">${contact.company}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;font-size:11px;font-weight:700;color:${TEXT_MUTED};text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid ${BORDER_COLOR};">お名前</td>
          <td style="padding:12px 16px;font-size:15px;color:${TEXT_MAIN};border-bottom:1px solid ${BORDER_COLOR};">${contact.name}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;background:#f8fafc;font-size:11px;font-weight:700;color:${TEXT_MUTED};text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid ${BORDER_COLOR};">メール</td>
          <td style="padding:12px 16px;background:#f8fafc;font-size:15px;border-bottom:1px solid ${BORDER_COLOR};">
            <a href="mailto:${contact.email}" style="color:${BRAND_TEAL};text-decoration:none;font-weight:600;">${contact.email}</a>
          </td>
        </tr>
        ${contact.message ? `
        <tr>
          <td style="padding:12px 16px;font-size:11px;font-weight:700;color:${TEXT_MUTED};text-transform:uppercase;letter-spacing:0.5px;vertical-align:top;">メッセージ</td>
          <td style="padding:12px 16px;font-size:14px;color:${TEXT_MAIN};line-height:1.8;">${contact.message.replace(/\n/g, "<br>")}</td>
        </tr>` : ""}
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
        <tr>
          <td align="center">
            <a href="mailto:${contact.email}?subject=Re%3A%20GrowthSprint%E3%81%B8%E3%81%AE%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B%EF%BC%88${encodeURIComponent(contact.company)}%EF%BC%89"
               style="display:inline-block;background:${BRAND_TEAL};color:#fff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:8px;">
              ✉ ${contact.name}様に返信する
            </a>
          </td>
        </tr>
      </table>

    </td>
  </tr>

  <tr>
    <td style="background:#f8fafc;border:1px solid ${BORDER_COLOR};border-top:none;border-radius:0 0 10px 10px;padding:14px 32px;text-align:center;">
      <p style="margin:0;font-size:12px;color:${TEXT_MUTED};">${now} · GrowthSprint お問い合わせフォームからの自動通知</p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    replyTo: contact.email,
    subject,
    html,
  });
}

export async function sendUserConfirmation(contact: ContactData) {
  const resend = getResend();
  if (!resend) return;

  const sprint = SPRINT_LABELS[contact.sprintInterest] ?? { ja: contact.sprintInterest, short: contact.sprintInterest };

  const SPRINT_VALUE_LINES: Record<string, string> = {
    ops:       "営業・追客の詰まりを14日でクリアにして、チームが自走できる状態をつくります。",
    landing:   "LPの問い合わせが増えない理由を突き止め、14日でCVRを改善します。",
    both:      "営業・LP、両方の詰まりをヒアリングで整理し、優先すべき1点をご提案します。",
    undecided: "まずは現状をお聞きして、一番効果の出る改善ポイントをご提案します。",
  };

  const valueLine = SPRINT_VALUE_LINES[contact.sprintInterest] ?? "現状をお聞きして、最適な改善をご提案します。";
  const subject = `${contact.name}様、ご連絡をお待ちしています — GrowthSprint`;

  const html = `<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BG_PAGE};font-family:${FONT_STACK};color:${TEXT_MAIN};">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_PAGE};padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <tr>
    <td style="background:linear-gradient(135deg,${BRAND_DARK} 0%,#0e7490 100%);border-radius:10px 10px 0 0;padding:40px 32px;text-align:center;">
      <p style="margin:0 0 12px;font-size:32px;">✅</p>
      <h1 style="margin:0 0 8px;color:#ffffff;font-size:22px;font-weight:700;line-height:1.4;">
        ご連絡ありがとうございます
      </h1>
      <p style="margin:0;color:#99f6e4;font-size:15px;">${contact.name}様のお申し込みを受け付けました</p>
    </td>
  </tr>

  <tr>
    <td style="background:${BG_CARD};padding:36px 32px;border-left:1px solid ${BORDER_COLOR};border-right:1px solid ${BORDER_COLOR};">

      <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:${TEXT_MAIN};">${contact.name}様</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.85;color:${TEXT_MAIN};">
        GrowthSprintへのお問い合わせ、ありがとうございます。<br>
        内容を確認次第、<strong>1営業日以内</strong>にこのメールへご返信いたします。
      </p>

      <table width="100%" cellpadding="0" cellspacing="0"
             style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:8px;margin-bottom:28px;">
        <tr>
          <td style="padding:20px 24px;">
            <p style="margin:0 0 6px;font-size:11px;color:${BRAND_TEAL};font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">ご検討中のサービス</p>
            <p style="margin:0 0 10px;font-size:16px;font-weight:700;color:${BRAND_DARK};">${sprint.ja}</p>
            <p style="margin:0;font-size:14px;color:#0f766e;line-height:1.7;">${valueLine}</p>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 16px;font-size:15px;font-weight:700;color:${TEXT_MAIN};">ヒアリング（15分）でお伝えすること</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
        <tr>
          <td style="padding:8px 0;vertical-align:top;width:28px;font-size:18px;">🔍</td>
          <td style="padding:8px 0 8px 8px;font-size:14px;color:${TEXT_MAIN};line-height:1.7;">貴社で今一番「詰まっている箇所」をヒアリングで特定</td>
        </tr>
        <tr>
          <td style="padding:8px 0;vertical-align:top;font-size:18px;">💡</td>
          <td style="padding:8px 0 8px 8px;font-size:14px;color:${TEXT_MAIN};line-height:1.7;">14日間で改善できる具体的な仮説をその場でご提示</td>
        </tr>
        <tr>
          <td style="padding:8px 0;vertical-align:top;font-size:18px;">📋</td>
          <td style="padding:8px 0 8px 8px;font-size:14px;color:${TEXT_MAIN};line-height:1.7;">Sprint の進め方・費用・スケジュール感のご説明</td>
        </tr>
      </table>

      <p style="margin:0 0 24px;font-size:14px;color:${TEXT_MUTED};line-height:1.75;border-top:1px solid ${BORDER_COLOR};padding-top:20px;">
        ヒアリングはオンライン通話15分程度です。<br>
        費用・契約の義務は一切ありません。お気軽にどうぞ。
      </p>

    </td>
  </tr>

  <tr>
    <td style="background:#f8fafc;border:1px solid ${BORDER_COLOR};border-top:none;padding:24px 32px;">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:middle;">
            <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:${TEXT_MAIN};">Mikhailov Stanislav</p>
            <p style="margin:0 0 2px;font-size:12px;color:${TEXT_MUTED};">GrowthSprint Consulting</p>
            <p style="margin:0;font-size:12px;"><a href="mailto:${ADMIN_EMAIL}" style="color:${BRAND_TEAL};text-decoration:none;">${ADMIN_EMAIL}</a></p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr>
    <td style="background:#fff;border:1px solid ${BORDER_COLOR};border-top:none;border-radius:0 0 10px 10px;padding:16px 32px;text-align:center;">
      <p style="margin:0;font-size:11px;color:${TEXT_MUTED};">
        このメールは自動送信です。ご返信はこちらへ：<a href="mailto:${ADMIN_EMAIL}" style="color:${BRAND_TEAL};text-decoration:none;">${ADMIN_EMAIL}</a><br>
        心当たりのない場合はこのメールを無視してください。
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: contact.email,
    replyTo: ADMIN_EMAIL,
    subject,
    html,
  });
}
