'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const HIDDEN_PREFIXES = ['/p/', '/preview', '/dev/']

export function AgencyChat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const path = window.location.pathname
    const host = window.location.hostname
    const hidden = HIDDEN_PREFIXES.some((prefix) => path.startsWith(prefix))
      || host.startsWith('ops.')
      || host.startsWith('p.')
    setVisible(!hidden)
  }, [])

  if (!visible) return null

  return (
    <Script
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="6b062198e6cd500e96f6c78e"
      strategy="afterInteractive"
    />
  )
}
