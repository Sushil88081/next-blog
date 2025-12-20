import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our mission to provide quality programming tutorials and guides. We are committed to helping developers learn and grow.',
  openGraph: {
    title: 'About Us | Programming Blog',
    description: 'Learn about our mission to provide quality programming tutorials and guides.',
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        About Us
      </h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Who We Are
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Welcome to Programming Blog!My name is Sushil Kumar I'm a passionate software engineer currently working at 
            <strong className="text-primary-600 dark:text-primary-400"> Dhriti Enterprises</strong>, 
            dedicated to sharing knowledge and helping fellow developers on their coding journey.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            This blog was created with a simple mission: to provide high-quality, easy-to-understand 
            programming tutorials and guides. Whether you're a beginner just starting out or an 
            experienced developer looking to expand your skills, you'll find valuable content here.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our goal is to make programming accessible to everyone. We believe that learning to code 
            should be straightforward, practical, and enjoyable. Every tutorial is crafted with care 
            to ensure clarity and real-world applicability.
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 space-y-2 mb-4">
            <li>Provide comprehensive and up-to-date programming tutorials</li>
            <li>Share practical examples and best practices</li>
            <li>Support developers at all skill levels</li>
            <li>Foster a community of continuous learning</li>
          </ul>
        </section>

        {/* Content Topics */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            What We Cover
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our blog covers a wide range of programming topics, including:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Frontend Development</h3>
              <p className="text-gray-700 dark:text-gray-300">React, JavaScript, HTML, CSS, and modern web technologies</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Backend Development</h3>
              <p className="text-gray-700 dark:text-gray-300">Go, Python, Node.js, and server-side programming</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Best Practices</h3>
              <p className="text-gray-700 dark:text-gray-300">Code quality, design patterns, and industry standards</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Tutorials & Guides</h3>
              <p className="text-gray-700 dark:text-gray-300">Step-by-step guides for building real-world applications</p>
            </div>
          </div>
        </section>

        {/* Monetization Section */}
        <section className="mb-12 bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg border border-primary-200 dark:border-primary-800">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Supporting This Blog
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            This blog is supported through advertising and affiliate partnerships. When you click on 
            ads or purchase products through our affiliate links, you help us continue creating 
            free, high-quality content for developers worldwide.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            <strong>We maintain editorial independence</strong> - all recommendations and tutorials 
            are based on our genuine experience and expertise. Advertisements are clearly marked 
            and do not influence our content quality or recommendations.
          </p>
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              💡 <strong>Tip:</strong> If you find our content helpful, consider disabling your 
              ad blocker or clicking on relevant ads. Your support helps us keep this resource 
              free and accessible to everyone!
            </p>
          </div>
        </section>

        {/* Privacy Policy Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Privacy Policy
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Data Collection
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              <strong>We do not collect, store, or process any personal data.</strong> This blog 
              does not require user registration, login, or any form of account creation. You can 
              browse all content anonymously without providing any personal information.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Third-Party Services
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              This website uses third-party services for advertising and analytics:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li><strong>Google AdSense:</strong> Displays advertisements. Google may use cookies 
              to serve personalized ads based on your browsing history. You can opt out of 
              personalized advertising in your Google account settings.</li>
              <li><strong>Analytics:</strong> We may use analytics services to understand website 
              traffic patterns. This data is anonymized and aggregated.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Cookies
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              This website may use cookies for:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>Displaying advertisements (via Google AdSense)</li>
              <li>Remembering your theme preference (light/dark mode)</li>
              <li>Analytics and website performance monitoring</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              You can control cookies through your browser settings. Note that disabling cookies 
              may affect some website functionality.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              No User Accounts
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              This blog does <strong>not</strong> have:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li>User registration or login systems</li>
              <li>Comment systems that require personal information</li>
              <li>Newsletter subscriptions</li>
              <li>Contact forms that store data</li>
              <li>Any database storing user information</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Your Rights
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Since we don't collect personal data, there's no personal information to access, 
              modify, or delete. You can browse this website freely without any privacy concerns 
              related to data collection.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Changes to This Policy
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              We may update this privacy policy from time to time. Any changes will be posted on 
              this page with an updated "Last Updated" date.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Contact
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              If you have any questions about this privacy policy, please feel free to reach out 
              through our social media channels.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Have questions, suggestions, or feedback? We'd love to hear from you! Connect with 
            us on social media or reach out through your preferred channel.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Thank you for being part of our community. Happy coding! 🚀
          </p>
        </section>
      </div>
    </div>
  )
}
