'use client'

import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import AdSenseSlot from './AdSenseSlot'
import SearchBar from './SearchBar'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-md backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      {/* AdSense Slot - Header */}
      <div className="hidden md:block py-2">
        <AdSenseSlot 
          slotId="header-ad"
          style={{ display: 'block', textAlign: 'center' }}
          format="auto"
        />
      </div>

      <div className="container mx-auto px-3 md:px-4 py-5 md:py-6">
        <div className="flex items-center justify-between gap-4">
          <Link 
            href="/" 
            className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 flex-shrink-0"
          >
            React हिंदी
          </Link>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 flex-1 justify-center">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 font-medium"
            >
              होम
            </Link>
            <Link 
              href="/categories" 
              className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 font-medium"
            >
              श्रेणियाँ
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 font-medium"
            >
              हमारे बारे में
            </Link>
          </nav>

          <div className="flex items-center space-x-3 md:space-x-4 flex-shrink-0">
            <SearchBar />
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Theme toggle"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

