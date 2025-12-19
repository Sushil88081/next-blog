'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])

  useEffect(() => {
    const article = document.querySelector('article.prose')
    if (!article) return

    const headingElements = article.querySelectorAll('h2, h3')
    const headingList: Heading[] = []

    headingElements.forEach((heading) => {
      const id = heading.textContent
        ?.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-') || ''
      
      heading.id = id
      headingList.push({
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      })
    })

    setHeadings(headingList)
  }, [])

  if (headings.length === 0) return null

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        विषय सूची
      </h3>
      <nav>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`${
                heading.level === 3 ? 'ml-4' : ''
              } text-sm`}
            >
              <a
                href={`#${heading.id}`}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

