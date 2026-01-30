import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ)",
  description:
    "Find answers to common questions about programming, React, Go, Python, TypeScript, and web development. Get help with your coding journey.",
  keywords: [
    "faq",
    "frequently asked questions",
    "programming help",
    "coding questions",
    "react faq",
    "golang faq",
    "python faq",
    "typescript faq",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/faq`,
    siteName: "Programming Blog",
    title: "Frequently Asked Questions (FAQ)",
    description: "Find answers to common programming questions.",
  },
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
};

export default function FAQPage() {
  const faqs = [
    {
      category: "General Programming",
      questions: [
        {
          q: "Which programming language should I learn first?",
          a: "For beginners, Python is often recommended because it's easy to learn and has a simple syntax. However, JavaScript is great if you want to build web applications. Choose based on what you want to build!",
        },
        {
          q: "How long does it take to learn programming?",
          a: "It depends on your goals and practice time. Basics can be learned in 1-2 months, but becoming proficient takes 6-12 months of regular practice. The key is consistent practice and building projects.",
        },
        {
          q: "Do I need a computer science degree to become a programmer?",
          a: "No! Many successful programmers are self-taught. While a degree helps, what matters most is your ability to code, solve problems, and build projects. Practice and build a portfolio.",
        },
      ],
    },
    {
      category: "React",
      questions: [
        {
          q: "Is React hard to learn?",
          a: "React has a learning curve, but it's not too hard if you know JavaScript well. Start with basics like components, props, and state. Practice by building small projects, and you'll get comfortable quickly.",
        },
        {
          q: "Do I need to know JavaScript before learning React?",
          a: "Yes! React is built on JavaScript. You should understand JavaScript basics like variables, functions, arrays, objects, and ES6 features before learning React. Knowing JavaScript well makes learning React much easier.",
        },
        {
          q: "What's the difference between React and React Native?",
          a: "React is for building web applications (runs in browsers), while React Native is for building mobile apps (iOS and Android). They share similar concepts, but React Native uses native mobile components instead of web components.",
        },
        {
          q: "Should I learn Redux with React?",
          a: "Not initially! Start with React's built-in state management (useState, Context API). Learn Redux later if you need it for complex state management. Many apps work fine without Redux.",
        },
      ],
    },
    {
      category: "Go (Golang)",
      questions: [
        {
          q: "Is Go hard to learn?",
          a: "Go is designed to be simple. If you know any programming language, you can learn Go in a few weeks. The syntax is clean and straightforward. It's easier than C++ but more structured than Python for backend development.",
        },
        {
          q: "What is Go used for?",
          a: "Go is mainly used for backend web development, building APIs and microservices, DevOps tools (like Docker and Kubernetes), cloud applications, and command-line tools. It's great for building fast, scalable services.",
        },
        {
          q: "Is Go faster than Python?",
          a: "Yes! Go is compiled to machine code, so it runs much faster than Python. Go is often 10-100x faster than Python for many tasks. However, Python is easier to write and better for data science.",
        },
        {
          q: "Can I build web applications with Go?",
          a: "Absolutely! Go has excellent web frameworks like Gin, Echo, and the built-in net/http package. Many companies use Go for their web backends because it's fast and efficient.",
        },
      ],
    },
    {
      category: "Python",
      questions: [
        {
          q: "Is Python good for beginners?",
          a: "Yes! Python is often recommended as the first programming language because it has simple syntax, readable code, lots of learning resources, and a helpful community. It's perfect for learning programming concepts.",
        },
        {
          q: "What can I build with Python?",
          a: "Python can build web applications (Django, Flask), data science projects, artificial intelligence and machine learning models, automation scripts, games, desktop applications, and much more!",
        },
        {
          q: "How long does it take to learn Python?",
          a: "Basics can be learned in 1-2 weeks, intermediate level takes 1-3 months, and advanced takes 6-12 months. With regular practice, you can start building projects in a few weeks!",
        },
        {
          q: "Can I get a job with Python?",
          a: "Absolutely! Python developers are in high demand. Jobs include Web Developer, Data Scientist, Machine Learning Engineer, Automation Engineer, and Backend Developer. Python skills are valuable in the job market.",
        },
      ],
    },
    {
      category: "TypeScript",
      questions: [
        {
          q: "Do I need to know JavaScript to learn TypeScript?",
          a: "Yes! TypeScript is JavaScript with types. You should know JavaScript basics first. But if you know JavaScript, learning TypeScript is easy - you're just adding type annotations.",
        },
        {
          q: "Is TypeScript worth learning?",
          a: "Yes! TypeScript is becoming the standard for large JavaScript projects. Many companies use TypeScript, so learning it opens up job opportunities. It makes JavaScript development safer and more maintainable.",
        },
        {
          q: "Can I use TypeScript with React?",
          a: "Absolutely! TypeScript works great with React. Many React projects use TypeScript for better type safety. You get autocomplete, error checking, and better IDE support.",
        },
        {
          q: "What's the difference between TypeScript and JavaScript?",
          a: "TypeScript is JavaScript with static typing. JavaScript has dynamic typing (errors show at runtime), while TypeScript has static typing (errors show during compilation). TypeScript compiles to JavaScript.",
        },
      ],
    },
    {
      category: "Getting Started",
      questions: [
        {
          q: "What tools do I need to start programming?",
          a: "You need a code editor (VS Code is popular and free), the programming language installed, and a computer. That's it! You can start coding right away.",
        },
        {
          q: "How do I practice programming?",
          a: "Practice by building projects! Start with small projects like calculators or todo apps, then work your way up. Also solve coding challenges on sites like LeetCode or HackerRank. The key is consistent practice.",
        },
        {
          q: "Where can I get help when stuck?",
          a: "You can ask questions on Stack Overflow, join programming communities on Reddit (r/learnprogramming), watch YouTube tutorials, read documentation, or ask in our blog comments!",
        },
        {
          q: "How do I stay motivated while learning?",
          a: "Set small goals, build projects you're interested in, join a community, celebrate small wins, and remember that every programmer was once a beginner. Keep practicing and don't give up!",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Frequently Asked Questions
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
        Find answers to common questions about programming and our tutorials.
      </p>

      <div className="space-y-12">
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border-b border-gray-200 dark:border-gray-700 pb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              {category.category}
            </h2>
            <div className="space-y-6">
              {category.questions.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {faq.q}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          Still have questions?
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Can't find the answer you're looking for? Feel free to contact us or check out our detailed tutorials!
        </p>
        <div className="flex gap-4">
          <a
            href="/contact"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Contact Us
          </a>
          <a
            href="/"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Browse Tutorials
          </a>
        </div>
      </div>
    </div>
  );
}

