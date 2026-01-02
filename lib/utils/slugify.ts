/**
 * Creates a URL-safe slug from name, city, and state
 * Format: name-city-state (lowercase, hyphens, no special chars)
 */
export function slugify(name: string, city: string, state: string): string {
  const parts = [name, city, state]
    .map((str) => str.trim().toLowerCase())
    .filter((str) => str.length > 0)
    .map((str) =>
      str
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
        .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    )
    .filter((str) => str.length > 0)

  return parts.join('-')
}

/**
 * Validates that a slug is URL-safe
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

