import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-full hover:bg-muted">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Terms of Service</h1>
      </header>

      <div className="px-5 py-6 max-w-2xl mx-auto space-y-6 text-foreground/80 text-sm leading-relaxed">
        <p className="text-muted-foreground text-xs">Last updated: March 17, 2026</p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>By downloading, installing, or using Aura News & Prep ("the App"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the App.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">2. Description of Service</h2>
          <p>Aura News & Prep provides news aggregation, exam preparation materials, daily quizzes, coding practice, and educational content. Content is sourced from public RSS feeds and AI-generated educational material.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">3. User Accounts</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>You must provide accurate information when creating an account</li>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You must be at least 13 years old to use the App</li>
            <li>One account per person is permitted</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">4. Content & Intellectual Property</h2>
          <p>News content is aggregated from public sources and belongs to their respective publishers. Educational content is generated for learning purposes only. You may not reproduce, distribute, or commercially use any content from the App without permission.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use the App for any unlawful purpose</li>
            <li>Attempt to manipulate quiz scores or leaderboards</li>
            <li>Scrape or automated access of the App's content</li>
            <li>Impersonate others or provide false information</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">6. Disclaimer</h2>
          <p>The App is provided "as is" without warranties. News content is sourced from third parties and we do not guarantee its accuracy. Educational content is supplementary and should not replace formal education.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">7. Limitation of Liability</h2>
          <p>We are not liable for any indirect, incidental, or consequential damages arising from your use of the App. Our total liability shall not exceed the amount you paid for premium features, if any.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">8. Changes to Terms</h2>
          <p>We may update these terms at any time. Continued use of the App after changes constitutes acceptance of the new terms.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">9. Governing Law</h2>
          <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in India.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">10. Contact</h2>
          <p>For questions about these Terms, contact us at <span className="text-primary font-medium">support@auranewsprep.com</span></p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
