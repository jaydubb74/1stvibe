import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — 1stvibe.ai",
  description: "Terms of Service for 1stvibe.ai.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
      <div className="mb-10">
        <Link href="/about" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
          ← Back to About
        </Link>
      </div>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-12">Last updated: February 26, 2026</p>

      <div className="space-y-10 text-gray-700 text-base leading-relaxed">

        <p>
          Welcome to 1stvibe.ai (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). These Terms of Service
          (&ldquo;Terms&rdquo;) govern your access to and use of our website located at{" "}
          <a href="https://1stvibe.ai" className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2">
            https://1stvibe.ai
          </a>{" "}
          (the &ldquo;Site&rdquo;) and any content, features, or services provided through the Site
          (collectively, the &ldquo;Services&rdquo;).
        </p>
        <p>
          By accessing or using the Site, you agree to be bound by these Terms. If you do not
          agree to these Terms, you may not use the Site.
        </p>

        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Description of the Services</h2>
          <p className="mb-4">
            1stvibe.ai provides educational content and resources to help people learn how to build
            websites and software applications using AI coding tools. We may also include links to
            third-party tools, services, or platforms that we believe may be useful to you.
          </p>
          <p>
            We may update, modify, or discontinue all or part of the Services at any time, with or
            without notice.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
          <p className="mb-4">
            You must be at least 16 years old (or the minimum age of digital consent in your
            jurisdiction) to use the Site. By using the Site, you represent and warrant that you
            meet this requirement and that you have the legal capacity to enter into these Terms.
          </p>
          <p>
            If you use the Site on behalf of an organization, you represent and warrant that you
            are authorized to accept these Terms on the organization&apos;s behalf.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Accounts and Magic Link Login</h2>
          <p className="mb-4">
            To access certain features, you may need to create an account or sign in using an
            email-based &ldquo;magic link.&rdquo;
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              You agree to provide accurate and complete information when creating or updating your
              account.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your email account and any
              access links that we send to you.
            </li>
            <li>
              You are responsible for all activities that occur under your account or via your email
              address.
            </li>
          </ul>
          <p>
            We reserve the right to suspend or terminate your access to the Site if we suspect
            unauthorized use, misuse, or any violation of these Terms.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Educational Purpose – No Professional Advice</h2>
          <p className="mb-4">
            The content on 1stvibe.ai is provided for informational and educational purposes only.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>We do not provide legal, financial, tax, or professional advice.</li>
            <li>
              Any examples of code, workflows, or tools are illustrative only and may not be
              suitable for your specific situation.
            </li>
            <li>
              You are solely responsible for how you implement any ideas, instructions, or code
              presented on the Site.
            </li>
          </ul>
          <p>
            You should independently verify any information and, where appropriate, consult with a
            qualified professional before acting.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. User Conduct</h2>
          <p className="mb-4">
            You agree to use the Site in a lawful and respectful manner. You agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Use the Site in any way that violates any applicable law or regulation.</li>
            <li>
              Attempt to gain unauthorized access to any part of the Site, other accounts, or
              systems.
            </li>
            <li>
              Interfere with or disrupt the operation of the Site (for example, by introducing
              viruses, overloading the system, or using automated tools to scrape content in a way
              that harms performance).
            </li>
            <li>
              Use the Site to harass, abuse, or harm others, or to post or transmit any content
              that is unlawful, defamatory, obscene, or otherwise objectionable.
            </li>
            <li>
              Reverse engineer, decompile, or attempt to discover the source code of any part of
              the Site, except to the extent permitted by applicable law.
            </li>
          </ul>
          <p>
            We may, in our sole discretion, suspend or terminate access to the Site for any user
            who violates these Terms or engages in behavior that we consider harmful to the Site or
            others.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
          <p className="mb-4">
            Unless otherwise indicated, all content on the Site — including text, graphics, logos,
            images, videos, code examples, and other materials — is owned by us or our licensors
            and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="mb-4">
            Subject to these Terms, we grant you a limited, non-exclusive, non-transferable,
            revocable license to access and use the Site for your personal, non-commercial,
            educational use.
          </p>
          <p className="mb-3">You may not:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              Reproduce, distribute, modify, create derivative works of, publicly display, or
              publicly perform any content from the Site except as explicitly allowed in these Terms
              or with our prior written consent.
            </li>
            <li>
              Remove or alter any copyright, trademark, or other proprietary notices on the Site.
            </li>
          </ul>
          <p>Any rights not expressly granted in these Terms are reserved.</p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Links and Services</h2>
          <p className="mb-4">
            The Site may contain links or referrals to third-party websites, tools, products, or
            services, including AI tools, hosting providers, or development platforms.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              These third-party sites and services are not controlled by us, and we are not
              responsible for their content, policies, or practices.
            </li>
            <li>
              When you click a link and visit a third-party site or sign up for a third-party
              service, you do so at your own risk and are subject to that third party&apos;s terms
              and privacy policies.
            </li>
            <li>
              We may earn a referral or affiliate fee if you click on links and purchase or sign up
              for certain third-party services. This does not affect the price you pay and does not
              change our commitment to providing honest, educational content.
            </li>
          </ul>
          <p>We do not endorse or guarantee any third-party products or services.</p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
          <p className="mb-4 uppercase font-semibold text-sm text-gray-600">
            To the fullest extent permitted by law, the Site and Services are provided on an
            &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis, without warranties of any kind, whether
            express or implied.
          </p>
          <p className="mb-3 font-medium text-gray-800">We do not warrant that:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>The Site will be uninterrupted, secure, or error-free;</li>
            <li>Any defects or errors will be corrected;</li>
            <li>
              The content or information available on or through the Site is accurate, complete,
              reliable, or current; or
            </li>
            <li>
              The Site or any server that makes it available is free of viruses or other harmful
              components.
            </li>
          </ul>
          <p className="font-medium text-gray-800">You use the Site at your own risk.</p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
          <p className="mb-4 text-sm text-gray-600">
            To the fullest extent permitted by law, in no event shall we or our affiliates,
            officers, directors, employees, or agents be liable for any indirect, incidental,
            special, consequential, or punitive damages, or any loss of profits or revenue, whether
            incurred directly or indirectly, or any loss of data, use, goodwill, or other
            intangible losses, arising out of or in connection with:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-sm text-gray-600">
            <li>
              Your access to or use of, or inability to access or use, the Site or Services;
            </li>
            <li>Any conduct or content of any third party on or related to the Site;</li>
            <li>Any content obtained from the Site; or</li>
            <li>Unauthorized access, use, or alteration of your transmissions or data.</li>
          </ul>
          <p className="mb-4 text-sm text-gray-600">
            Our total aggregate liability for all claims relating to the Site or Services shall not
            exceed the greater of (a) the amount you paid us, if any, in the 3 months preceding
            the event giving rise to the claim, or (b) USD $50.
          </p>
          <p className="text-sm text-gray-600">
            Some jurisdictions do not allow certain limitations of liability, so some of the above
            limitations may not apply to you.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
          <p className="mb-3">
            You agree to indemnify, defend, and hold harmless 1stvibe.ai and its affiliates,
            officers, directors, employees, and agents from and against any claims, liabilities,
            damages, losses, and expenses (including reasonable attorneys&apos; fees) arising out of
            or in any way related to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your use or misuse of the Site or Services;</li>
            <li>Your violation of these Terms; or</li>
            <li>Your violation of any applicable law or the rights of any third party.</li>
          </ul>
        </section>

        {/* Section 11 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to These Terms</h2>
          <p className="mb-4">
            We may update or modify these Terms from time to time. When we do, we will update the
            &ldquo;Last updated&rdquo; date at the top of this page.
          </p>
          <p className="mb-4">
            If we make material changes, we may provide additional notice (for example, by posting
            a prominent notice on the Site or sending an email, where appropriate).
          </p>
          <p>
            Your continued use of the Site after any changes to these Terms constitutes your
            acceptance of the updated Terms. If you do not agree to the updated Terms, you must
            stop using the Site.
          </p>
        </section>

        {/* Section 12 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Termination</h2>
          <p className="mb-4">
            We may suspend or terminate your access to the Site, in whole or in part, at any time
            and for any reason, including if we reasonably believe you have violated these Terms.
          </p>
          <p>
            Upon termination, your right to use the Site will immediately cease. Sections that, by
            their nature, should survive termination (such as ownership provisions, warranty
            disclaimers, and limitations of liability) shall survive.
          </p>
        </section>

        {/* Section 13 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law and Dispute Resolution</h2>
          <p className="mb-4">
            These Terms and your use of the Site shall be governed by and construed in accordance
            with the laws of California, San Francisco County, without regard to its conflict of
            law principles.
          </p>
          <p>
            Any dispute arising out of or relating to these Terms or the Site shall be resolved in
            the courts located in San Francisco County, and you consent to the personal
            jurisdiction and venue of such courts.
          </p>
        </section>

        {/* Section 14 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 text-sm space-y-1">
            <p className="font-semibold text-gray-900">1stvibe.ai</p>
            <p>
              Email:{" "}
              <a href="mailto:legal@1stvibe.ai" className="text-indigo-600 hover:text-indigo-800">
                legal@1stvibe.ai
              </a>
            </p>
            <p>
              Website:{" "}
              <a href="https://1stvibe.ai" className="text-indigo-600 hover:text-indigo-800">
                https://1stvibe.ai
              </a>
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
