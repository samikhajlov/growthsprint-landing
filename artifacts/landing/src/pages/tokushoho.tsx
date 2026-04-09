import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Tokushoho() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-foreground">特定商取引法に基づく表記</h1>
        <p className="text-sm text-muted-foreground mb-8">最終更新日：2026年3月</p>
        <div className="bg-card border rounded-2xl p-8 space-y-4 text-sm text-foreground">
          {[
            { label: "販売業者", value: "GrowthSprint Consulting" },
            { label: "代表責任者", value: "Mikhailov Stanislav" },
            { label: "所在地", value: "〒353-0007 埼玉県志木市柏町6-10-22" },
            { label: "電話番号", value: "お問い合わせいただいた際に開示いたします" },
            { label: "メールアドレス", value: "contact@stanislav.jp" },
            { label: "ウェブサイト", value: "http://stanislav.jp", link: "http://stanislav.jp" },
            { label: "サービス料金", value: "Ops & CRM Sprint：¥450,000（税別）/ Landing & CVR Sprint：¥500,000（税別）" },
            { label: "支払方法", value: "銀行振込（原則前払い100%、または50/50）" },
            { label: "支払時期", value: "契約締結後、開始日確定後にご案内いたします" },
            { label: "サービス提供時期", value: "お支払い確認後、14日間のSprintを開始します" },
            { label: "返品・キャンセル", value: "サービスの性質上、開始後のキャンセル・返金は原則承っておりません" },
          ].map((row: { label: string; value: string; link?: string }, i, arr) => (
            <div key={row.label} className={`grid grid-cols-3 gap-4 ${i < arr.length - 1 ? "border-b pb-4" : ""}`}>
              <div className="font-semibold text-muted-foreground">{row.label}</div>
              <div className="col-span-2">
                {row.link ? (
                  <a href={row.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
