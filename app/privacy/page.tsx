import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — 1stvibe.ai",
  description: "Privacy Policy for 1stvibe.ai — how we handle your information.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
      <div className="mb-10">
        <Link href="/about" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
          ← Back to About
        </Link>
      </div>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-12">Last updated: February 26, 2026</p>

      <div className="prose prose-gray max-w-none space-y-10 text-gray-700 text-base leading-relaxed">

        <p>
          1stvibe.ai (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) provides educational content and tools
          that help people learn how to build websites and software applications using AI coding
          tools. This Privacy Policy explains how we handle information when you use our website
          located at <a href="https://1stvibe.ai">https://1stvibe.ai</a> (the &ldquo;Site&rdquo;).
        </p>
        <p>By using the Site, you agree to the practices described in this Privacy Policy.</p>

        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We aim to collect and store only the minimum information necessary to provide and
            improve the Site.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">1.1 Information You Provide to Us</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              <strong>Email address:</strong> If you choose to create an account or sign in using
              a &ldquo;magic link,&rdquo; we collect your email address for authentication and account
              access purposes.
            </li>
            <li>
              <strong>Communications:</strong> If you contact us (for example, by email or through
              a form on the Site), we may receive information you choose to share in that
              communication.
            </li>
          </ul>
          <p className="mb-6">
            We do not intentionally collect sensitive personal information (such as government IDs,
            health data, or financial account numbers) and ask that you do not submit such
            information through the Site.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">1.2 Information Collected Automatically</h3>
          <p className="mb-3">
            When you use the Site, we may automatically collect limited technical information to
            ensure the Site functions correctly and securely, such as:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Browser type and version</li>
            <li>Device type and operating system</li>
            <li>IP address (or truncated/hashed form)</li>
            <li>Referring/exit pages and URLs</li>
            <li>Date and time of visits</li>
            <li>Basic usage data (e.g., pages viewed, clicks, time on page)</li>
          </ul>
          <p className="mt-3">
            This information is generally aggregated and used to maintain and improve the Site.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Cookies and Similar Technologies</h2>
          <p className="mb-4">We use cookies and similar technologies primarily to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Maintain your session while you use the Site</li>
            <li>Support magic link login and account access</li>
            <li>Remember basic settings or preferences</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">2.1 Types of Cookies We Use</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              <strong>Strictly necessary cookies:</strong> Required for core functionality such as
              session management, security, and logging in via magic link. The Site cannot function
              properly without these cookies.
            </li>
            <li>
              <strong>Functional or performance cookies (if used):</strong> May help us understand
              how the Site is used so we can improve content and features. Where possible, we use
              aggregated or de-identified information.
            </li>
          </ul>
          <p className="mb-6">We do not use cookies for targeted advertising based on individual user behavior.</p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">2.2 Managing Cookies</h3>
          <p>
            Most web browsers allow you to control cookies through their settings. If you disable
            cookies, some features of the Site (including logging in) may not work properly.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
          <p className="mb-3">We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide, operate, and maintain the Site</li>
            <li>To authenticate you via email magic link and manage your account</li>
            <li>To secure the Site, detect misuse, and prevent fraud or abuse</li>
            <li>To understand how the Site is used and to improve our content and features</li>
            <li>
              To communicate with you about the Site, respond to your inquiries, or provide
              important updates (such as changes to this policy)
            </li>
          </ul>
          <p className="mt-4">
            We do not sell your personal information and do not use it to create individual
            advertising profiles.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Make Money (Referral Links)</h2>
          <p className="mb-4">
            1stvibe.ai is an educational site. We do not charge users for access; instead, we may
            earn revenue when you click on certain links on the Site and sign up for or purchase
            third-party services or tools.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              These are referral or affiliate links to third-party products or services related to
              AI, coding, or software development.
            </li>
            <li>
              When you click such a link, the third party may know that you came from our Site and
              may track your activity on their services under their own privacy policy.
            </li>
            <li>
              We do not share your personal information (such as your email) with these third
              parties for the purpose of referral tracking.
            </li>
          </ul>
          <p>
            We encourage you to review the privacy policies of any third-party sites or services
            you visit.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. How We Share Information</h2>
          <p className="mb-4">We do not sell or rent your personal information to third parties.</p>
          <p className="mb-3">We may share limited information in the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong>Service providers:</strong> We may use third-party service providers to help
              us operate the Site (for example, hosting, email delivery, logging, analytics). These
              providers may have access to information solely to perform services on our behalf and
              are expected to protect it appropriately.
            </li>
            <li>
              <strong>Legal obligations and protection:</strong> We may disclose information if
              required by law or in good faith belief that such action is necessary to comply with
              legal obligations, protect our rights, investigate fraud, or ensure the safety of
              users or the public.
            </li>
            <li>
              <strong>Business transfers:</strong> If we are involved in a merger, acquisition, or
              other business transfer, information may be transferred as part of that transaction.
              We will take reasonable steps to ensure the continued protection of your information.
            </li>
          </ul>
          <p>
            We do not share personal information with third parties for their own direct marketing
            or advertising purposes.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
          <p className="mb-3">We retain information only for as long as necessary to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Provide and maintain the Site</li>
            <li>Comply with our legal obligations</li>
            <li>Resolve disputes</li>
            <li>Enforce our agreements</li>
          </ul>
          <p>
            We may retain aggregated or de-identified information (which does not identify you
            personally) for analytics or business purposes.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Security</h2>
          <p className="mb-4">
            We use reasonable technical and organizational measures to protect your information
            against accidental or unlawful destruction, loss, alteration, unauthorized disclosure,
            or access.
          </p>
          <p>
            However, no method of transmission over the internet or method of electronic storage is
            completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Choices and Rights</h2>
          <p className="mb-3">
            Depending on your jurisdiction, you may have certain rights regarding your personal
            information, such as:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Accessing the personal information we hold about you</li>
            <li>Requesting correction or deletion of your personal information</li>
            <li>Objecting to or restricting certain processing</li>
            <li>Withdrawing consent (where processing is based on consent)</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, please contact us using the contact information below. We may
            need to verify your identity before fulfilling certain requests.
          </p>
          <p>
            If you no longer wish to use the Site, you may stop visiting the Site at any time and,
            where applicable, request deletion of your account.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children&apos;s Privacy</h2>
          <p className="mb-4">
            The Site is intended for individuals who are at least 16 years old (or the minimum age
            of digital consent in their jurisdiction). We do not knowingly collect personal
            information from children under this age.
          </p>
          <p>
            If you believe a child has provided us with personal information, please contact us so
            we can take appropriate steps to remove such information.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Users</h2>
          <p className="mb-4">
            The Site may be accessed from countries around the world. By using the Site, you
            understand that your information may be processed and stored in countries that may have
            different data protection laws than your country of residence.
          </p>
          <p>
            We will take appropriate steps to ensure that transfers of personal information comply
            with applicable data protection laws.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Additional Information for Users in the US and EU/EEA</h2>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">11.1 European Union / European Economic Area (GDPR)</h3>
          <p className="mb-4">
            If you are located in the European Union or European Economic Area, the processing of
            your personal data is subject to the EU General Data Protection Regulation
            (&ldquo;GDPR&rdquo;).
          </p>

          <p className="font-medium text-gray-800 mb-2">Legal bases for processing</p>
          <p className="mb-3">We rely on one or more of the following legal bases:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Performance of a contract (e.g., to provide access to the Site and your account).</li>
            <li>Legitimate interests (e.g., to secure and improve the Site, prevent misuse, and understand aggregated usage).</li>
            <li>Compliance with legal obligations.</li>
            <li>Your consent (where required, for example, for certain non-essential cookies or optional communications).</li>
          </ul>

          <p className="font-medium text-gray-800 mb-2">Your GDPR rights</p>
          <p className="mb-3">Subject to certain conditions and exceptions, you have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate or incomplete personal data.</li>
            <li>Request deletion of your personal data (&ldquo;right to be forgotten&rdquo;).</li>
            <li>Object to or request restriction of processing in certain circumstances.</li>
            <li>
              Receive a copy of your personal data in a structured, commonly used, and
              machine-readable format and request that we transfer it to another controller where
              technically feasible (&ldquo;data portability&rdquo;).
            </li>
            <li>
              Withdraw your consent at any time where processing is based on consent (this will
              not affect the lawfulness of processing prior to withdrawal).
            </li>
          </ul>
          <p className="mb-6">
            To exercise these rights, please contact us at{" "}
            <a href="mailto:legal@1stvibe.ai">legal@1stvibe.ai</a>. We may need to verify your
            identity before responding.
          </p>

          <p className="font-medium text-gray-800 mb-2">Supervisory authority</p>
          <p className="mb-8">
            You also have the right to lodge a complaint with your local data protection authority
            if you believe that our processing of your personal data violates applicable law. A
            list of EU/EEA data protection authorities is available on the European Data Protection
            Board&apos;s website.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">11.2 United States – California (CCPA/CPRA)</h3>
          <p className="mb-4">
            If you are a resident of California, you may have certain rights under the California
            Consumer Privacy Act (&ldquo;CCPA&rdquo;), as amended by the California Privacy Rights Act
            (&ldquo;CPRA&rdquo;).
          </p>
          <p className="mb-4">
            For purposes of the CCPA/CPRA, we are generally considered a &ldquo;business.&rdquo; We do not
            sell your personal information and do not share it for cross-context behavioral
            advertising.
          </p>

          <p className="font-medium text-gray-800 mb-2">Categories of personal information collected</p>
          <p className="mb-3">As described above, we may collect:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Identifiers (e.g., email address).</li>
            <li>Internet or other electronic network activity information (e.g., usage data, IP address, device information).</li>
            <li>Inferences drawn from the above, but only in aggregated or de-identified form to improve the Site.</li>
          </ul>

          <p className="font-medium text-gray-800 mb-2">Your California rights</p>
          <p className="mb-3">Subject to certain exceptions, California residents have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              Know the categories and specific pieces of personal information we have collected
              about them, the categories of sources, the purposes for which we use it, and the
              categories of third parties to whom we disclose it.
            </li>
            <li>Request deletion of their personal information.</li>
            <li>Correct inaccurate personal information.</li>
            <li>Not be discriminated against for exercising any of these rights.</li>
          </ul>
          <p className="mb-4">
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:legal@1stvibe.ai">legal@1stvibe.ai</a> with &ldquo;California Privacy
            Request&rdquo; in the subject line. We may need to verify your identity before fulfilling
            your request.
          </p>
          <p>
            We do not knowingly sell or share the personal information of consumers under 16 years
            of age.
          </p>
        </section>

        {/* Section 12 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. When we do, we will revise the
            &ldquo;Last updated&rdquo; date at the top of this page.
          </p>
          <p>
            If we make material changes, we may provide additional notice (such as by posting a
            prominent notice on the Site or sending an email, where appropriate). Your continued
            use of the Site after any changes to this Privacy Policy constitutes your acceptance of
            the updated policy.
          </p>
        </section>

        {/* Section 13 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy or our practices,
            please contact us at:
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
