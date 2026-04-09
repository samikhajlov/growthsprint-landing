import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Company() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-foreground">運営会社</h1>
        <p className="text-sm text-muted-foreground mb-8">最終更新日：2026年3月</p>
        <div className="bg-card border rounded-2xl p-8 space-y-4">
          {[
            { label: "会社名", value: "GrowthSprint Consulting" },
            { label: "代表者", value: "Mikhailov Stanislav" },
            { label: "事業内容", value: "マーケティング・CRM改善コンサルティング、LP最適化支援" },
            { label: "所在地", value: "〒353-0007 埼玉県志木市柏町6-10-22" },
            { label: "メールアドレス", value: "contact@stanislav.jp" },
            { label: "ウェブサイト", value: "http://stanislav.jp", link: "http://stanislav.jp" },
            { label: "LinkedIn", value: "linkedin.com/in/stas9002", link: "https://www.linkedin.com/in/stas9002/" },
          ].map((row, i, arr) => (
            <div key={row.label} className={`grid grid-cols-3 gap-4 ${i < arr.length - 1 ? "border-b pb-4" : ""}`}>
              <div className="text-sm font-semibold text-muted-foreground">{row.label}</div>
              <div className="col-span-2 text-sm text-foreground">
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
