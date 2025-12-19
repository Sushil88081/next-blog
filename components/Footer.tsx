import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">React हिंदी</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              React.js के बारे में हिंदी में सीखें। State, Hooks, Components और बहुत कुछ के बारे में विस्तृत गाइड।
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">लिंक</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  होम
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  श्रेणियाँ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  हमारे बारे में
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">संपर्क</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              हमसे संपर्क करने के लिए सोशल मीडिया पर फॉलो करें।
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} React हिंदी. सभी अधिकार सुरक्षित.</p>
        </div>
      </div>
    </footer>
  )
}

