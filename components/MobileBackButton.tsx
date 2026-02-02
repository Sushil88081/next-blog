"use client";

import { useRouter, usePathname } from "next/navigation";

export default function MobileBackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show on home page
  if (pathname === "/") {
    return null;
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="md:hidden fixed bottom-6 right-6 z-50 bg-primary-600 dark:bg-primary-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
      aria-label="Go back"
    >
      <svg
        className="w-6 h-6 transition-transform group-hover:-translate-x-1"
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
  );
}

