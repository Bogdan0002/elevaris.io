import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Preview banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500/10 border-b border-yellow-500/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-2 text-center">
          <p className="text-xs text-yellow-400/80 font-medium">
            Concept preview — not the official website.
          </p>
        </div>
      </div>
      <div className="pt-10">{children}</div>
    </>
  )
}

