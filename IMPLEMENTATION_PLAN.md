# Preview System Implementation Plan

## Current Repo Structure
- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- ShadCN UI components
- Framer Motion
- Zod validation
- No existing Supabase integration
- No middleware currently

## File Additions/Edits Required

### 1. Middleware for Subdomain Routing
**File: `middleware.ts` (root)**
- Detect subdomain (ops.elevaris.app, p.elevaris.app)
- Rewrite to route groups
- Preserve slug for preview routes

### 2. Route Groups
**Directory: `app/(ops)/preview/`**
- `page.tsx` - Internal console UI
- `layout.tsx` - Optional ops-specific layout (no Navbar)

**Directory: `app/(previews)/[slug]/`**
- `page.tsx` - Public preview page (cleaning niche, homepage template)
- `layout.tsx` - Preview-specific layout (no Navbar, minimal)

### 3. Supabase Integration
**Files:**
- `lib/db/supabaseServer.ts` - Server-side Supabase client
- `lib/db/supabaseClient.ts` - Client-side Supabase client (minimal)
- `lib/utils/slugify.ts` - Slug generation utility
- `lib/previews/types.ts` - TypeScript types
- `lib/previews/schema.ts` - Zod validation schemas
- `lib/previews/repo.ts` - Database operations
- `lib/previews/helpers.ts` - Config defaults & review URL helper

### 4. Database Migration
**File: `supabase/migrations/001_client_previews.sql`**
- Create `client_previews` table
- Index on slug

### 5. Preview Components (V1 - Cleaning Only)
**Directory: `components/previews/cleaning/`**
- `PreviewHomepage.tsx` - Main preview homepage component
- Uses existing design system (GlowCard, GlowButton, etc.)
- Place ID review button integration
- Other CTAs as anchors/placeholders

### 6. API Routes (Optional for V1)
- `app/api/previews/route.ts` - CRUD operations (if needed for console)

## Minimal Changes to Existing Code
- **NO changes** to existing marketing pages/components
- **NO changes** to existing routing structure
- Only additions via route groups and middleware

## Environment Variables Required
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=
```

## Route Structure After Implementation
```
/ (existing marketing)
/home (existing)
/cleaning (existing)
... (all existing routes unchanged)

ops.elevaris.app/preview → app/(ops)/preview/page.tsx
p.elevaris.app/<slug> → app/(previews)/[slug]/page.tsx
```

