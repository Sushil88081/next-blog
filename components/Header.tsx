"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;
  const showBackButton = pathname !== "/" && pathname.split("/").filter(Boolean).length > 0;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-md">
      <div className="container mx-auto px-3 md:px-4 py-5 md:py-6">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Back Button */}
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 active:scale-95"
              aria-label="Go back"
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
          )}

          <Link
            href="/"
            className="group flex flex-col leading-tight transition-all duration-300 hover:scale-[1.02] flex-1 md:flex-none"
          >
            <span className="text-md md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              CodePathIndia
            </span>
            <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              Programming Blog
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 flex-1 justify-center">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium relative group ${isActive("/")
                ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30"
                : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              Home
              {isActive("/") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full" />
              )}
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium relative group ${isActive("/about")
                ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30"
                : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              About
              {isActive("/about") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full" />
              )}
            </Link>
            <Link
              href="/contact"
              className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium relative group ${isActive("/contact")
                ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30"
                : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              Contact
              {isActive("/contact") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full" />
              )}
            </Link>
            <Link
              href="/faq"
              className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium relative group ${isActive("/faq")
                ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30"
                : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              FAQ
              {isActive("/faq") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full" />
              )}
            </Link>
          </nav>

          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
              aria-label="Theme toggle"
            >
              {theme === "light" ? (
                <svg
                  className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
