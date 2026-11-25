'use client'

import { useEffect, useState } from 'react'

export function PreviewSalesCta({ attributionId }: { attributionId?: string }) {
  const [href, setHref] = useState('/cleaning')

  useEffect(() => {
    const ref = attributionId || ''
    setHref(ref ? `/cleaning?ref=${encodeURIComponent(ref)}` : '/cleaning')
    if (!ref) return
    const controller = new AbortController()
    fetch('/api/preview-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'preview_viewed', attributionId: ref, path: window.location.pathname }),
      signal: controller.signal,
    }).catch(() => undefined)
    return () => controller.abort()
  }, [attributionId])

  return (
    <a
      href={href}
      onClick={() => {
        if (!attributionId) return
        navigator.sendBeacon?.(
          '/api/preview-events',
          new Blob([JSON.stringify({ event: 'cta_clicked', attributionId, path: window.location.pathname })], { type: 'application/json' })
        )
      }}
      className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-left shadow-2xl shadow-slate-900/10 backdrop-blur md:px-5"
    >
      <span className="text-sm leading-snug text-slate-700">
        <span className="font-semibold text-slate-900">Like your new website?</span> We&apos;ll customize it, connect your domain, host it and manage everything for you. $99/month. No setup fee. Cancel anytime.
      </span>
      <span className="shrink-0 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white">See Plans &amp; Launch</span>
    </a>
  )
}
