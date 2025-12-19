export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        हमारे बारे में
      </h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          React हिंदी एक ऐसा ब्लॉग है जो React.js के बारे में हिंदी भाषा में विस्तृत जानकारी प्रदान करता है।
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          हमारा उद्देश्य है कि हिंदी भाषी डेवलपर्स को React.js सीखने में मदद मिले। हम State, Hooks, Components, 
          और React.js की अन्य महत्वपूर्ण अवधारणाओं के बारे में विस्तृत गाइड और ट्यूटोरियल प्रदान करते हैं।
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
          हमारा मिशन
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          हमारा मिशन है कि हिंदी भाषी डेवलपर्स को React.js सीखने में आसानी हो। हम चाहते हैं कि भाषा 
          एक बाधा न बने, और सभी को React.js सीखने का मौका मिले।
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
          संपर्क करें
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          अगर आपके कोई सवाल या सुझाव हैं, तो कृपया हमसे संपर्क करें।
        </p>
      </div>
    </div>
  )
}

