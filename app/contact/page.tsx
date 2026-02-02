import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Programming Blog. Connect with us on social media, send feedback, ask questions, or collaborate. We'd love to hear from you!",
  openGraph: {
    title: "Contact Us | Programming Blog",
    description:
      "Get in touch with Programming Blog. Connect with us on social media or reach out through your preferred channel.",
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Contact Us
      </h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/* Introduction Section */}
        <section className="mb-12">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            We'd love to hear from you! Whether you have questions about our
            tutorials, suggestions for new content, feedback on existing posts,
            or opportunities for collaboration, we're here to help. Connect with
            us through any of the channels below.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Your feedback helps us improve and create better content for the
            developer community. Don't hesitate to reach out!
          </p>
        </section>

        {/* Social Media Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Connect on Social Media
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Follow us on social media to stay updated with the latest tutorials,
            programming tips, and tech news. We regularly share valuable content
            and engage with our community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sushil-kumar-86b133242/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    LinkedIn
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Professional Network
                  </p>
                </div>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Sushil88081?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white dark:text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    GitHub
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Code & Projects
                  </p>
                </div>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/_sushil_kumar24/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Instagram
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    @yourusername
                  </p>
                </div>
              </div>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61587129599762"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Facebook
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Connect with Us
                  </p>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* Ways to Connect Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Ways to Connect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-primary-600 dark:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Questions & Feedback
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Have questions about our tutorials or want to provide feedback?
                Reach out to us on social media or through the channels above.
                We typically respond within 24-48 hours.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-primary-600 dark:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Content Suggestions
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Have an idea for a tutorial or guide you'd like to see? We're
                always looking for new topics that would benefit our community.
                Share your suggestions with us!
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-primary-600 dark:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Collaboration
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Interested in collaborating on a project, guest posting, or
                partnership opportunities? We're open to discussing how we can
                work together to create valuable content.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-primary-600 dark:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Technical Support
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Found an error in our code examples or tutorials? Let us know!
                We appreciate your help in keeping our content accurate and
                up-to-date.
              </p>
            </div>
          </div>
        </section>

        {/* Response Time Section */}
        <section className="mb-12 bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg border border-primary-200 dark:border-primary-800">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Response Time
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            We aim to respond to all inquiries within 24-48 hours during
            weekdays. For urgent matters, please reach out via social media
            where we're most active. Thank you for your patience!
          </p>
        </section>

        {/* Community Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The best way to stay connected is by following us on social media
            and engaging with our content. We regularly share:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 space-y-2 mb-4">
            <li>New tutorial announcements and updates</li>
            <li>Programming tips and best practices</li>
            <li>Industry news and trends</li>
            <li>Behind-the-scenes content</li>
            <li>Interactive discussions and Q&A sessions</li>
          </ul>
        </section>

        {/* Blog Information Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            About This Blog
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Programming Blog is a comprehensive resource for developers of all skill levels. We publish
              detailed tutorials, guides, and articles covering a wide range of programming topics including
              React, JavaScript, TypeScript, Go (Golang), Python, and more.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Our mission is to make programming education accessible and practical. We believe that everyone
              should have the opportunity to learn coding, regardless of their background or experience level.
              That's why all our content is free and designed to be beginner-friendly while still providing
              value to experienced developers.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We regularly publish new tutorials and update existing content to ensure it remains current with
              the latest industry standards and best practices. Our content is written by experienced developers
              who understand the challenges of learning to code and the importance of clear, practical examples.
            </p>
          </div>
        </section>

        {/* Thank You Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Thank You for Your Support!
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Your engagement, feedback, and support help us continue creating
              free, high-quality programming content. We appreciate every
              follower, reader, and community member. Together, we're building a
              better learning experience for developers worldwide. 🚀
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
