import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-foreground">プライバシーポリシー</h1>
        <p className="text-sm text-muted-foreground mb-8">最終更新日：2026年3月</p>
        <div className="bg-card border rounded-2xl p-8 space-y-8 text-sm text-foreground leading-relaxed">
          <section>
            <h2 className="font-bold text-base mb-3">1. 個人情報の収集について</h2>
            <p>当サービスは、お問い合わせフォームを通じてお名前、会社名、メールアドレス、その他お客様が任意で入力された情報を収集します。</p>
          </section>
          <section>
            <h2 className="font-bold text-base mb-3">2. 個人情報の利用目的</h2>
            <p>収集した個人情報は、サービスに関するご連絡、お問い合わせへの対応、およびサービス改善のためにのみ利用します。第三者への提供は行いません。</p>
          </section>
          <section>
            <h2 className="font-bold text-base mb-3">3. 個人情報の管理</h2>
            <p>収集した個人情報は適切な安全管理措置を講じて保管し、不正アクセス、紛失、漏洩の防止に努めます。</p>
          </section>
          <section>
            <h2 className="font-bold text-base mb-3">4. お問い合わせ</h2>
            <p>
              個人情報の取り扱いに関するお問い合わせは、
              <a href="mailto:contact@stanislav.jp" className="text-primary hover:underline">contact@stanislav.jp</a>
              {" "}までご連絡ください。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
