import CategoryCard from '@/components/categoryCard'
import Link from 'next/link'
import { getHomeCategoryCards } from '@/lib/homeCategories'

export default async function Home() {
  const categoryCards = getHomeCategoryCards()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          Learn Programming
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-6">
          Comprehensive guides, tutorials and examples about programming languages and technologies. 
          Start your coding journey today!
        </p>
      </div>

      {/* Main Content Section - Valuable content for AdSense */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Welcome to Your Programming Learning Journey
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Whether you're a complete beginner taking your first steps into the world of coding, 
            or an experienced developer looking to expand your skill set, you've come to the right place. 
            Our blog is dedicated to providing high-quality, easy-to-understand programming tutorials 
            that help you learn at your own pace.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            We cover a wide range of programming languages and technologies, from frontend frameworks 
            like React and JavaScript to backend languages like Go and Python. Each tutorial is carefully 
            crafted with real-world examples, best practices, and step-by-step explanations to ensure 
            you not only understand the concepts but can also apply them in your own projects.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Frontend Development
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Master modern web development with React, JavaScript, TypeScript, and more. Learn how to 
                build interactive user interfaces, manage state, handle events, and create responsive designs.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>React components and hooks</li>
                <li>JavaScript fundamentals and ES6+</li>
                <li>TypeScript for type-safe code</li>
                <li>Modern CSS and styling techniques</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Backend Development
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Build robust server-side applications with Go, Python, and Node.js. Learn about APIs, 
                databases, authentication, and deployment strategies.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>Go (Golang) for high-performance services</li>
                <li>Python for versatile development</li>
                <li>RESTful API design and implementation</li>
                <li>Database integration and management</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Why Choose Our Tutorials?
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Beginner-Friendly Approach
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Every tutorial starts from the basics, assuming no prior knowledge. We break down complex 
                  concepts into simple, digestible pieces that anyone can understand.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Practical Examples
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We don't just explain theory - every concept is demonstrated with real, working code examples 
                  that you can run and modify yourself. Learn by doing, not just reading.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Up-to-Date Content
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Programming technologies evolve rapidly. Our tutorials are regularly updated to reflect the 
                  latest best practices, features, and industry standards.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">4</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  Comprehensive Coverage
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  From installation and setup to advanced topics, we cover everything you need to become 
                  proficient in each technology. No need to jump between multiple sources.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-lg border border-blue-200 dark:border-blue-800">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Getting Started
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            New to programming? Start with our <Link href="/python" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Python tutorials</Link> - 
            Python is widely considered one of the best languages for beginners due to its simple syntax and readability.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Interested in web development? Begin with <Link href="/javascript" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">JavaScript basics</Link> 
            and then move on to <Link href="/react" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">React</Link> for building modern web applications.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Looking to build fast, scalable backend services? Check out our <Link href="/go/golang" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Go (Golang) tutorials</Link> 
            to learn how to build high-performance APIs and microservices.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Wondering how “AI that actually does things” fits next to a normal API? Our{" "}
            <Link href="/agentic-ai" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              Agentic AI introduction
            </Link>{" "}
            walks through the idea in everyday words—what changes when a model is allowed to plan steps and use tools, and where your database still keeps the final say.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Our Learning Philosophy
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            We believe that learning to code should be accessible, practical, and enjoyable. Our tutorials are 
            designed to help you build real projects, not just memorize syntax. Each guide includes:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 space-y-2 mb-4">
            <li><strong>Clear explanations</strong> - We explain the "why" behind concepts, not just the "how"</li>
            <li><strong>Code examples</strong> - Every concept is demonstrated with working code you can try yourself</li>
            <li><strong>Best practices</strong> - Learn industry-standard approaches from the start</li>
            <li><strong>Common pitfalls</strong> - Avoid mistakes that beginners often make</li>
            <li><strong>Next steps</strong> - Know where to go after mastering each topic</li>
          </ul>
        </section>
      </div>

      <CategoryCard categories={categoryCards} />
    </div>
  )
}
