'use client'

import { useEffect } from 'react'

interface AdSenseSlotProps {
  slotId: string
  style?: React.CSSProperties
  format?: string
  responsive?: boolean
}

export default function AdSenseSlot({ 
  slotId, 
  style = { display: 'block' },
  format = 'auto',
  responsive = true 
}: AdSenseSlotProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  )
}

