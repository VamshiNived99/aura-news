import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-full hover:bg-muted">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Privacy Policy</h1>
      </header>

      <div className="px-5 py-6 max-w-2xl mx-auto space-y-6 text-foreground/80 text-sm leading-relaxed">
        <p className="text-muted-foreground text-xs">Last updated: March 17, 2026</p>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">1. Information We Collect</h2>
          <p>We collect information you provide directly, including your name, email address, and preferences when you create an account. We also automatically collect device information, usage data, and approximate location (with your permission) to deliver local news content.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide personalized news and exam preparation content</li>
            <li>Deliver local news in your regional language</li>
            <li>Improve our services and user experience</li>
            <li>Send notifications about updates and relevant content</li>
            <li>Track quiz scores and leaderboard rankings</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">3. Location Data</h2>
          <p>We request location access to provide local news in your regional language. Location data is processed on-device and is not stored on our servers. You can deny location access and manually select your region.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">4. Data Storage & Security</h2>
          <p>Your data is stored securely using industry-standard encryption. We use secure cloud infrastructure to protect your personal information. We do not sell your personal data to third parties.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">5. Third-Party Services</h2>
          <p>We use third-party services for news aggregation, text-to-speech, and analytics. These services have their own privacy policies. We use Google News RSS feeds for content delivery.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">6. Children's Privacy</h2>
          <p>Our app is suitable for users aged 13 and above. We do not knowingly collect personal information from children under 13.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">7. Your Rights</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access and download your personal data</li>
            <li>Request deletion of your account and data</li>
            <li>Opt out of notifications</li>
            <li>Withdraw location permission at any time</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">8. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, contact us at <span className="text-primary font-medium">support@auranewsprep.com</span></p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
