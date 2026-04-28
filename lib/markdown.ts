import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeStringify from 'rehype-stringify'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  category: string
  tags: string[]
  image?: string
  author: string
  content: string
  contentHtml?: string
  /** Optional: multi-post learning series id (e.g. java-complete-learning-guide) */
  series?: string
  /** Optional: order within series; lower sorts first */
  chapter?: number
}

// Get all post slugs from all category folders
export function getPostSlugs(category?: string): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const slugs: string[] = []
  
  if (category) {
    // Get posts from specific category folder
    const categoryDir = path.join(postsDirectory, category)
    if (fs.existsSync(categoryDir)) {
      const files = fs.readdirSync(categoryDir)
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace(/\.md$/, ''))
      slugs.push(...files)
    }
  } else {
    // Get posts from all category folders
    const categories = ['react', 'golang', 'python', 'typescript', 'javascript', 'java', 'spring-boot-postgres-ai', 'agentic-ai']
    categories.forEach(cat => {
      const categoryDir = path.join(postsDirectory, cat)
      if (fs.existsSync(categoryDir)) {
        const files = fs.readdirSync(categoryDir)
          .filter(file => file.endsWith('.md'))
          .map(file => file.replace(/\.md$/, ''))
        slugs.push(...files)
      }
    })
  }

  return slugs
}

// Get post by slug and category
export async function getPostBySlug(slug: string, category?: string): Promise<Post | null> {
  try {
    let fullPath: string
    
    if (category) {
      // Look in specific category folder
      fullPath = path.join(postsDirectory, category, `${slug}.md`)
    } else {
      // Search in all category folders
      const categories = ['react', 'golang', 'python', 'typescript', 'javascript', 'java', 'spring-boot-postgres-ai', 'agentic-ai']
      fullPath = ''
      
      for (const cat of categories) {
        const testPath = path.join(postsDirectory, cat, `${slug}.md`)
        if (fs.existsSync(testPath)) {
          fullPath = testPath
          break
        }
      }
      
      if (!fullPath) {
        return null
      }
    }

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypePrettyCode, {
        /* Shiki: VS Code "Dark+" built-in (keywords, types, strings, etc.) */
        theme: 'dark-plus',
        keepBackground: true,
        defaultLang: 'text',
        bypassInlineCode: true,
      })
      .use(rehypeStringify)
      .process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      category: data.category || '',
      tags: data.tags || [],
      image: data.image,
      author: data.author || '',
      content,
      contentHtml,
      series: typeof data.series === 'string' ? data.series : undefined,
      chapter: (() => {
        if (typeof data.chapter === 'number' && !Number.isNaN(data.chapter)) {
          return data.chapter
        }
        if (typeof data.chapter === 'string' && data.chapter.trim() !== '') {
          const n = parseInt(data.chapter, 10)
          return Number.isNaN(n) ? undefined : n
        }
        return undefined
      })(),
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// Get all posts for a category
export async function getCategoryPosts(category: string): Promise<Post[]> {
  const slugs = getPostSlugs(category)
  const posts = await Promise.all(
    slugs.map(slug => getPostBySlug(slug, category))
  )
  return posts.filter((post): post is Post => post !== null)
}
