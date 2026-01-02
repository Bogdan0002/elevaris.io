export default function PreviewIndexPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B0B] p-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-3xl font-bold text-foreground">Preview System</h1>
        <p className="text-foreground-secondary">
          Access preview pages using: <code className="text-primary">p.elevaris.app/your-slug</code>
        </p>
        <p className="text-sm text-foreground-muted">
          Replace <code>your-slug</code> with the actual preview slug.
        </p>
      </div>
    </div>
  )
}

