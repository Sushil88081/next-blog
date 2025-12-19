import Link from 'next/link'

interface AffiliateLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  rel?: string
}

export default function AffiliateLink({ 
  href, 
  children, 
  className = '',
  rel = 'nofollow sponsored'
}: AffiliateLinkProps) {
  return (
    <Link 
      href={href}
      className={`text-primary-600 dark:text-primary-400 hover:underline font-semibold ${className}`}
      rel={rel}
      target="_blank"
    >
      {children}
    </Link>
  )
}

