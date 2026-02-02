import type { Metadata } from "next";
import Link from "next/link";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Programming Blog - Learn how we collect, store, and use your personal information when you interact with our blog.",
  openGraph: {
    title: "Privacy Policy - Programming Blog",
    description:
      "Learn how we collect, store, and use your personal information.",
    url: `${siteUrl}/privacy`,
  },
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            1. Introduction
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Welcome to Programming Blog. We are committed to protecting your
            privacy and ensuring transparency about how we collect, use, and
            store your personal information. This Privacy Policy explains our
            practices regarding data collection when you use our website,
            particularly when you leave comments on our blog posts.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            2. Information We Collect
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            When you interact with our blog, particularly when leaving comments,
            we collect the following information:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Name:</strong> The name you provide when submitting a
              comment
            </li>
            <li>
              <strong>Email Address:</strong> Your email address provided for
              comment submission
            </li>
            <li>
              <strong>Comment Content:</strong> The text content of your comment
            </li>
            <li>
              <strong>Timestamp:</strong> The date and time when you submitted
              your comment
            </li>
            <li>
              <strong>Post Information:</strong> The blog post on which you
              commented
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            3. How We Store Your Data
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Currently, comment data is stored locally in your browser's
            localStorage. This means:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Your comments are stored on your device's browser storage
            </li>
            <li>
              Comments are associated with specific blog posts and categories
            </li>
            <li>
              Data persists across browser sessions until you clear your browser
              data
            </li>
            <li>
              We may migrate to server-side storage in the future, at which time
              we will update this policy
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            4. How We Use Your Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            We use the information you provide solely for the following purposes:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Displaying your comments on the relevant blog posts</li>
            <li>Maintaining the comment thread and discussion</li>
            <li>Improving user experience on our blog</li>
            <li>
              Preventing spam and abuse (email addresses may be used for
              verification purposes)
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            We do not sell, rent, or share your personal information with
            third parties for marketing purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            5. Data Security
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            While we implement reasonable security measures, please note that:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Data stored in localStorage is accessible only from the same
              browser and device
            </li>
            <li>
              We recommend using secure browsers and keeping your software
              updated
            </li>
            <li>
              When we transition to server-side storage, we will implement
              appropriate encryption and security measures
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            6. Your Rights
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Access the personal information we have stored about you
            </li>
            <li>
              Request deletion of your comments and associated data (you can
              clear your browser's localStorage to remove locally stored
              comments)
            </li>
            <li>
              Withdraw consent for data processing at any time
            </li>
            <li>
              Contact us with any privacy-related concerns
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            7. Third-Party Services
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our website may use third-party services such as:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Google Analytics:</strong> To analyze website traffic and
              user behavior (see our cookie policy)
            </li>
            <li>
              <strong>Google AdSense:</strong> To display advertisements
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            These services have their own privacy policies, and we encourage you
            to review them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            8. Cookies and Local Storage
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            We use browser localStorage to store comment data. You can manage
            this by:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Clearing your browser's localStorage settings</li>
            <li>Using browser privacy modes</li>
            <li>Adjusting your browser's data storage preferences</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            9. Children's Privacy
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our website is not intended for children under the age of 13. We do
            not knowingly collect personal information from children under 13.
            If you believe we have collected information from a child under 13,
            please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            10. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date. You are advised to review
            this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            11. Contact Us
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us:
          </p>
          <ul className="list-none mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/contact"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Contact Page
              </Link>
            </li>
          </ul>
        </section>

        <section className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By using our website and submitting comments, you acknowledge that
            you have read and understood this Privacy Policy and agree to the
            collection and use of your information as described herein.
          </p>
        </section>
      </div>
    </div>
  );
}

