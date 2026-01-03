# Elevaris.io - Complete Documentation

A comprehensive Next.js platform combining a marketing website, a dynamic preview generation system, and an operations console. Built with Next.js 14, TypeScript, Tailwind CSS, Supabase, and OpenAI integration.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Main Website](#main-website)
4. [Preview System (p. subdomain)](#preview-system-p-subdomain)
5. [Ops Console (ops. subdomain)](#ops-console-ops-subdomain)
6. [Template System](#template-system)
7. [AI Integration](#ai-integration)
8. [Database & Storage](#database--storage)
9. [Design System](#design-system)
10. [Technical Decisions](#technical-decisions)
11. [Deployment & Infrastructure](#deployment--infrastructure)
12. [Development Guide](#development-guide)

---

## Overview

Elevaris.io is a multi-faceted platform consisting of:

1. **Main Marketing Website** (`elevaris.app`) - The public-facing website showcasing Elevaris services
2. **Preview System** (`p.elevaris.app`) - Dynamic client preview websites generated from templates
3. **Ops Console** (`ops.elevaris.app`) - Internal tool for generating and managing previews
4. **Template System** - Modular, versioned templates for different business niches

### Key Technologies

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4o-mini for content generation
- **UI Components**: shadcn/ui primitives
- **Maps**: Mapbox GL (for service area maps)

---

## Architecture

### Project Structure

```
elevaris.io/
├── app/                          # Next.js App Router
│   ├── (ops)/                   # Ops console route group
│   │   └── preview/            # Preview generator & list
│   ├── (previews)/              # Preview pages route group
│   │   └── p/[slug]/           # Public preview pages
│   ├── dev/                     # Local development tools
│   │   └── previews/[slug]/    # Custom preview testing
│   ├── home/                    # Main homepage
│   ├── api/                     # API routes
│   │   ├── lead/               # Lead form submission
│   │   └── previews/list/      # Preview listing API
│   └── [other pages]/           # Marketing pages
├── components/
│   ├── brand/                   # Custom brand components
│   ├── home/                    # Homepage sections
│   ├── site/                    # Site-wide components
│   ├── templates/               # Preview templates
│   │   └── cleaning/v1/        # Cleaning template v1
│   └── ui/                      # shadcn/ui primitives
├── lib/
│   ├── ai/                      # OpenAI integration
│   ├── db/                      # Supabase clients
│   ├── previews/                # Preview system logic
│   ├── templates/               # Template registry & rendering
│   └── utils/                   # Utilities
├── middleware.ts                # Subdomain routing
└── supabase/migrations/         # Database migrations
```

### Route Groups

Next.js route groups (`(ops)` and `(previews)`) are used to organize routes without affecting URL structure:

- `(ops)` - Internal operations console, not publicly accessible
- `(previews)` - Public preview pages with special metadata (noindex, nofollow)

### Subdomain Routing

The `middleware.ts` file handles subdomain-based routing:

- **`p.elevaris.app/[slug]`** → Rewrites to `/p/[slug]` (preview pages)
- **`ops.elevaris.app/`** → Redirects to `/preview` (ops console)
- **`www.elevaris.app`** → Main marketing website (no rewrite)

---

## Main Website

### Purpose

The main website (`elevaris.app`) is the public-facing marketing site for Elevaris Web Solutions, showcasing services, portfolio, testimonials, and contact information.

### Key Pages

- **`/home`** - Main homepage with hero, services, work, process, about, testimonials, contact, FAQ
- **`/ux-ui-design`** - UX/UI design services page
- **`/web-development`** - Web development services page
- **`/seo-strategies`** - SEO services page
- **`/ongoing-support`** - Support services page
- **`/contact-us`** - Contact page
- **`/schedule-a-call`** - Scheduling page
- **`/privacy-policy`** - Privacy policy
- **`/terms-and-conditions`** - Terms and conditions

### Design System

#### Colors
- **Background**: `#0B0B0B` (deep black)
- **Background Soft**: `#111111` (slightly lighter)
- **Primary Accent**: `#FF6A55` (coral/orange)
- **Primary Soft**: `#FF836F` (lighter coral)
- **Card Base**: `#3A1F1A` with gradient overlays

#### Components

**Custom Brand Components:**
- `GlowCard` - Card with animated glow border and hover effects
- `GlowButton` - Pill button with glow styling (primary/outline variants)
- `FloatingCard` - Animated card with floating motion
- `BlobImage` - Image with organic blob/oval mask
- `Container` - Centered container with max-width
- `SectionHeading` - Section heading with overline and highlight word

**shadcn/ui Primitives:**
- Accordion, Sheet, Input, Textarea, Checkbox, NavigationMenu
- Used as accessible primitives, styled with Elevaris theme

### Features

- **Responsive Design** - Mobile-first, fully responsive
- **Animations** - Framer Motion for smooth, performant animations
- **Accessibility** - ARIA labels, keyboard navigation, reduced motion support
- **Form Validation** - react-hook-form + Zod validation
- **SEO Optimized** - Proper metadata, sitemap, robots.txt

### Conditional Navbar

The `ConditionalNavbar` component (`components/site/ConditionalNavbar.tsx`) intelligently hides the main site navbar on:
- Preview routes (`/p/*`)
- Ops console routes (`/preview*`)
- Dev routes (`/dev/*`)
- Preview subdomain (`p.elevaris.app`)
- Ops subdomain (`ops.elevaris.app`)

This prevents double navbars when viewing previews or using the ops console.

---

## Preview System (p. subdomain)

### Overview

The preview system allows generating dynamic, personalized websites for clients using template-based architecture. Each preview is accessible via a unique subdomain URL: `p.elevaris.app/[slug]`.

### How It Works

1. **Generation**: Ops console creates a preview configuration
2. **Storage**: Configuration stored in Supabase `client_previews` table
3. **Routing**: Middleware rewrites `p.elevaris.app/[slug]` → `/p/[slug]`
4. **Rendering**: Template renderer loads the appropriate template component
5. **Display**: Fully personalized website with client data

### URL Structure

- **Subdomain**: `p.elevaris.app/elite-cleaning-services-los-angeles-ca`
- **Main Domain**: `www.elevaris.app/p/elite-cleaning-services-los-angeles-ca`
- Both URLs work, but subdomain is preferred for client sharing

### Preview Page Flow

```
p.elevaris.app/[slug]
  ↓ (middleware rewrite)
/p/[slug]
  ↓ (page.tsx)
1. Fetch config from Supabase by slug
2. Apply defaults (ensure all fields exist)
3. Validate config (Zod schema)
4. Render template based on templateId
5. Display personalized website
```

### Metadata & SEO

- **Robots**: `noindex, nofollow` (preview pages are not indexed)
- **Banner**: Yellow banner at top: "Concept preview — not the official website"
- **Layout**: Special layout wrapper for preview pages

### Preview Configuration

Each preview stores a JSON configuration (`CleaningPreviewConfig`) with:

```typescript
{
  slug: string                    // URL-safe identifier
  niche: 'cleaning'               // Business niche
  templateId: string              // Template version (e.g., 'cleaning-v1')
  business: {
    name: string                  // Business name
    city: string                  // City
    state: string                 // State (2-letter code)
    phone: string                 // Phone number
  }
  placeId: string                 // Google Place ID (for review links)
  offer: {
    shortText: string            // Promotional offer text
  }
  branding: {
    primaryColor?: string        // Hex color
    accentColor?: string          // Hex color
  }
  services: string[]              // Array of service names
  areasServed: string[]          // Array of service areas
  hours?: string                 // Business hours
  map?: {
    lat?: number
    lng?: number
    radiusMiles?: number
  }
  sampleReviews?: Array<{
    name: string
    text: string
    stars: number
  }>
}
```

---

## Ops Console (ops. subdomain)

### Overview

The ops console is an internal tool for generating and managing client previews. Accessible at `ops.elevaris.app/preview` (or `www.elevaris.app/preview?key=...`).

### Access Control

- **Query Parameter**: `?key=[OPS_KEY]` required
- **Environment Variable**: `NEXT_PUBLIC_OPS_KEY` (set in Vercel)
- **Unauthorized Access**: Shows friendly error page with instructions

### Features

#### 1. Preview Generator (`/preview`)

**Two-Step Workflow:**

**Step 1: Company Description Input**
- Large textarea for pasting company information
- AI generates all structured content from description
- Button: "Generate Preview Content" (triggers OpenAI)

**Step 2: Generated Form (Editable)**
- All fields pre-filled by AI, but editable
- Sections:
  - **Template**: Dropdown to select template version
  - **Business Info**: Name, city, state, phone, Place ID
  - **Offer**: Promotional text
  - **Branding**: Color pickers for primary/accent colors
  - **Services**: Textarea (one per line, max 10)
  - **Areas Served**: Textarea (one per line, max 15)
  - **Optional**: Hours, lat/lng, radius
- Button: "Generate Preview" (creates preview in database)
- Button: "Regenerate" (goes back to Step 1)

**Success State:**
- Shows preview URL, review URL
- Copy buttons for both URLs
- "Open Preview" button
- Template name displayed

**Recent Previews Section:**
- Shows last 5 generated previews
- Quick access: Open, Copy links
- "View All" button → `/preview/list`

#### 2. Preview List (`/preview/list`)

**Features:**
- Table view of all previews
- Search by name, city, or slug
- Columns: Business Name, Location, Created, Status, Actions
- Actions: Open Preview, Copy Preview Link, Copy Review Link
- "Create New" button → `/preview`

### Design

- **Theme**: Dark gradient background (`#0B0B0B` → `#111111`)
- **Brand Colors**: `#FF6A55` (primary), `#7B63FF` (accent)
- **Cards**: Dark gradient cards with brand-colored borders
- **Inputs**: Dark backgrounds, white text, brand-colored focus states
- **Mobile-Friendly**: Responsive design, touch-friendly buttons

### API Integration

- **OpenAI**: Content generation from description
- **Supabase**: Preview storage and retrieval
- **Server Actions**: `createPreviewAction`, `generateFromDescriptionAction`

---

## Template System

### Architecture

The template system is modular and versioned, allowing multiple template variants for the same niche.

### Template Registry

Templates are registered in `lib/templates/registry.ts`:

```typescript
{
  id: 'cleaning-v1',           // Unique identifier
  niche: 'cleaning',           // Business niche
  name: 'Cleaning — Premium V1', // Display name
  description: 'High-converting animated landing'
}
```

### Template Structure

```
components/templates/
  └── cleaning/
      └── v1/
          ├── Template.tsx          # Main template component
          └── sections/
              ├── Navbar.tsx
              ├── HeroSection.tsx
              ├── AboutSection.tsx
              ├── ServicesSection.tsx
              ├── GallerySection.tsx
              ├── WhyUsSection.tsx
              ├── AreasSection.tsx
              ├── ReviewsSection.tsx
              ├── PricingSection.tsx
              ├── ContactSection.tsx
              └── FooterSection.tsx
```

### Template Rendering

1. **Registry Lookup**: `getTemplateById(templateId)` finds template
2. **Dynamic Import**: Template component loaded dynamically
3. **Config Injection**: Template receives `config` prop
4. **Rendering**: Template renders with personalized data

### Current Template: Cleaning V1

**Design Philosophy:**
- Premium, modern aesthetic (not WordPress-style)
- Light, clean color scheme suitable for cleaning industry
- Professional blue/teal palette (default: `#00A8E8`, `#00C896`)
- Framer Motion animations for "WOW" factor
- Mobile-first responsive design

**Sections:**

1. **Navbar** - Sticky navigation with smooth scroll behavior
2. **Hero** - Animated hero with business name, city, offer badge, CTAs
3. **About** - Company information with stats and trust indicators
4. **Services** - 6 static premium service cards (Residential, Commercial, Deep Cleaning, Move-in/Move-out, Window Cleaning, Carpet & Upholstery)
5. **Gallery** - Image gallery placeholder
6. **Why Us** - Value propositions
7. **Areas** - Service areas list + interactive map (Mapbox)
8. **Reviews** - Sample customer reviews
9. **Pricing** - 3 pricing tiers (Launch, Growth, Accelerator)
10. **Contact** - Contact form (concept - not functional)
11. **Footer** - Business info, links, copyright

**Key Features:**
- **Static Services**: 6 predefined service cards (not from config)
- **Interactive Map**: Mapbox GL with animated pins and radius circles
- **Floating Cards**: Hero section has floating badges (Book Today, 500+ Happy Clients, 5-Star Service)
- **Animations**: Section entrance, hover effects, parallax scrolling
- **Color Personalization**: Primary and accent colors from config

### Adding New Templates

1. Create template folder: `components/templates/[niche]/v[number]/`
2. Create `Template.tsx` (default export)
3. Create sections in `sections/` folder
4. Register in `lib/templates/registry.ts`
5. Add to `lib/templates/render.tsx` dynamic imports

---

## AI Integration

### Overview

OpenAI GPT-4o-mini is used to generate structured content from free-form company descriptions.

### Workflow

1. **Input**: User pastes company description in ops console
2. **AI Processing**: `generateFromDescription()` sends prompt to OpenAI
3. **Structured Output**: AI returns JSON with all required fields
4. **Validation**: System enforces strict constraints (3-6 services, 5-15 areas, etc.)
5. **Form Population**: Generated data populates editable form

### AI Function: `generateFromDescription`

**Location**: `lib/ai/generateFromDescription.ts`

**Input:**
```typescript
{
  description: string    // Free-form company description
  placeId?: string      // Optional Google Place ID
}
```

**Output:**
```typescript
{
  business: { name, city, state, phone }
  offer: { shortText }
  branding: { primaryColor, accentColor }
  services: Array<{ name, description }>  // 3-6 services
  areasServed: string[]                    // 5-15 areas
  hours?: string
  sampleReviews?: Array<{ name, text, stars }>  // 3-5 reviews
}
```

**Strict Constraints:**
- Services: **EXACTLY** 3-6 items, each with name AND description
- Areas: **EXACTLY** 5-15 items
- Reviews: **EXACTLY** 3-5 items (if generated)
- Colors: Valid hex codes
- Phone: Standard format
- State: 2 uppercase letters

**Prompt Engineering:**
- Detailed system prompt for consistent JSON output
- Strict rules and constraints in user prompt
- JSON response format enforced
- Temperature: 0.7 (balanced creativity/consistency)

### Environment Variables

- `OPENAI_API_KEY` - Required for AI content generation
- Must be set in Vercel environment variables

---

## Database & Storage

### Supabase Setup

**Database**: PostgreSQL (via Supabase)

**Table**: `client_previews`

```sql
CREATE TABLE client_previews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  niche TEXT NOT NULL DEFAULT 'cleaning',
  status TEXT NOT NULL DEFAULT 'preview',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  config JSONB NOT NULL
);
```

**Indexes:**
- `slug` (unique)
- `created_at` (for sorting)
- `config->>'business'->>'name'` (for search)
- `config->>'business'->>'city'` (for search)

### Supabase Clients

**Server Client** (`lib/db/supabaseServer.ts`):
- Uses `SUPABASE_SERVICE_ROLE_KEY`
- Full database access
- Used for: Creating, updating, listing previews

**Client-Side Client** (`lib/db/supabaseClient.ts`):
- Uses `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Limited access (if needed for future features)

### Repository Functions

**Location**: `lib/previews/repo.ts`

- `createPreview(config)` - Create new preview
- `getPreviewBySlug(slug)` - Fetch preview by slug
- `updatePreview(slug, partialConfig)` - Update existing preview
- `listPreviews(options)` - List all previews with optional search

### Data Validation

**Zod Schema** (`lib/previews/schema.ts`):
- Validates all preview configurations
- Ensures data integrity
- Type-safe TypeScript interfaces

**Default Values** (`lib/previews/helpers.ts`):
- `applyDefaults()` - Fills missing fields with sensible defaults
- Prevents template crashes from incomplete data

---

## Design System

### Main Website Design

**Color Palette:**
- Background: `#0B0B0B` (deep black)
- Background Soft: `#111111`
- Primary: `#FF6A55` (coral/orange)
- Primary Soft: `#FF836F`
- Card Base: `#3A1F1A` with gradients

**Typography:**
- Font: Inter (Google Fonts)
- Headings: Bold, large sizes
- Body: Regular weight, readable sizes

**Components:**
- Glow effects on cards and buttons
- Smooth animations with Framer Motion
- Responsive breakpoints (mobile-first)

### Preview Template Design

**Color Palette:**
- Background: Light (`white` → `slate-50`)
- Primary: Configurable (default: `#00A8E8` - blue)
- Accent: Configurable (default: `#00C896` - teal)
- Text: `slate-900` (dark) for readability

**Design Philosophy:**
- Clean, professional, modern
- Suitable for local businesses
- Not "SaaS-style" - more approachable
- Premium feel without being corporate

**Animations:**
- Section entrance animations
- Hover effects on cards
- Parallax scrolling on hero
- Floating badges in hero section
- Smooth transitions

### Ops Console Design

**Color Palette:**
- Background: Dark gradient (`#0B0B0B` → `#111111`)
- Primary: `#FF6A55` (brand coral)
- Accent: `#7B63FF` (brand purple)
- Cards: Dark gradient with brand borders
- Text: White and light gray

**UI Elements:**
- Dark theme throughout
- Brand-colored borders and focus states
- Gradient buttons
- Touch-friendly sizes
- Clear visual hierarchy

---

## Technical Decisions

### Why Next.js App Router?

- **Server Components**: Better performance, SEO
- **Route Groups**: Clean organization without URL impact
- **Server Actions**: Secure database mutations
- **Middleware**: Subdomain routing support

### Why Supabase?

- **PostgreSQL**: Robust, relational database
- **JSONB**: Flexible config storage
- **Real-time**: Future-proof for live updates
- **Managed**: No database server management
- **Free Tier**: Sufficient for MVP

### Why OpenAI?

- **Content Generation**: Reduces manual data entry
- **Structured Output**: JSON mode ensures consistency
- **Cost-Effective**: GPT-4o-mini is affordable
- **Quality**: Generates realistic, professional content

### Why Template System?

- **Modularity**: Easy to add new templates
- **Versioning**: Can maintain multiple template versions
- **Reusability**: Sections can be shared across templates
- **Scalability**: Easy to add new niches

### Why Subdomain Routing?

- **Clean URLs**: `p.elevaris.app/slug` is cleaner than `elevaris.app/p/slug`
- **Branding**: Subdomain feels more professional
- **SEO**: Can isolate preview pages from main site
- **Flexibility**: Can add more subdomains easily

### Why Framer Motion?

- **Performance**: Hardware-accelerated animations
- **Declarative**: Easy to use, React-friendly
- **Flexible**: Supports complex animations
- **Accessible**: Respects reduced motion preferences

---

## Deployment & Infrastructure

### Vercel Deployment

**Platform**: Vercel (Next.js optimized)

**Environment Variables Required:**

```env
# Supabase
SUPABASE_URL=https://[project].supabase.co
SUPABASE_SERVICE_ROLE_KEY=[service_role_key]
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon_key]

# OpenAI
OPENAI_API_KEY=sk-[key]

# Ops Console Access
NEXT_PUBLIC_OPS_KEY=[secure-key]
```

### Domain Configuration

**Main Domain**: `elevaris.app`
- A record or CNAME pointing to Vercel

**Subdomains**:
- `p.elevaris.app` - CNAME to Vercel (for previews)
- `ops.elevaris.app` - CNAME to Vercel (for ops console)

**Vercel Settings:**
- Add all domains in Vercel dashboard
- SSL certificates auto-generated
- DNS records configured at domain registrar

### Database Migrations

**Location**: `supabase/migrations/001_client_previews.sql`

**Running Migrations:**
1. Connect to Supabase dashboard
2. Go to SQL Editor
3. Run migration SQL
4. Verify table creation

### Build Configuration

**Next.js Config**: Standard Next.js 14 configuration
- No special build settings required
- Dynamic routes work out of the box
- Middleware runs on edge

---

## Development Guide

### Getting Started

1. **Clone Repository**
   ```bash
   git clone [repo-url]
   cd elevaris.io
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create `.env.local`:
   ```env
   SUPABASE_URL=...
   SUPABASE_SERVICE_ROLE_KEY=...
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   OPENAI_API_KEY=...
   NEXT_PUBLIC_OPS_KEY=...
   ```

4. **Run Database Migration**
   - Open Supabase dashboard
   - Run `supabase/migrations/001_client_previews.sql`

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Access Application**
   - Main site: `http://localhost:3000`
   - Ops console: `http://localhost:3000/preview?key=[OPS_KEY]`
   - Preview: `http://localhost:3000/p/[slug]`

### Local Development Tools

**Dev Preview Pages** (`app/dev/previews/[slug]/page.tsx`):
- Create custom preview pages locally
- Edit `SAMPLE_CONFIG` to test different companies
- All template sections auto-imported
- Access at: `http://localhost:3000/dev/previews/[slug]`

**Purpose**: Test template changes without database interaction

### Code Organization

**Components:**
- `components/brand/` - Reusable brand components
- `components/home/` - Homepage-specific sections
- `components/site/` - Site-wide components (Navbar, Footer)
- `components/templates/` - Preview templates
- `components/ui/` - shadcn/ui primitives

**Lib:**
- `lib/ai/` - OpenAI integration
- `lib/db/` - Supabase clients
- `lib/previews/` - Preview system logic
- `lib/templates/` - Template registry and rendering
- `lib/utils/` - Utility functions

**App:**
- `app/(ops)/` - Ops console routes
- `app/(previews)/` - Preview routes
- `app/dev/` - Development tools
- `app/home/` - Main homepage
- `app/api/` - API routes

### Adding a New Template

1. **Create Template Folder**
   ```
   components/templates/[niche]/v[number]/
   ```

2. **Create Template Component**
   ```typescript
   // Template.tsx
   export default function MyTemplate({ config }: { config: ConfigType }) {
     return <div>...</div>
   }
   ```

3. **Register Template**
   ```typescript
   // lib/templates/registry.ts
   {
     id: 'my-template-v1',
     niche: 'my-niche',
     name: 'My Template V1',
     description: 'Description'
   }
   ```

4. **Add to Renderer**
   ```typescript
   // lib/templates/render.tsx
   'my-template-v1': () => import('@/components/templates/my-niche/v1/Template')
   ```

### Testing

**Manual Testing:**
- Generate preview via ops console
- Verify preview renders correctly
- Test all sections and interactions
- Check mobile responsiveness

**Local Testing:**
- Use dev preview pages for rapid iteration
- Test template changes without database
- Modify `SAMPLE_CONFIG` for different scenarios

### Performance Optimization

- **Dynamic Imports**: Templates loaded on-demand
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Static Generation**: Where possible (marketing pages)
- **Dynamic Rendering**: For preview pages (force-dynamic)

---

## Environment Variables Reference

### Required for Production

```env
# Supabase
SUPABASE_URL=https://[project].supabase.co
SUPABASE_SERVICE_ROLE_KEY=[key]
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[key]

# OpenAI
OPENAI_API_KEY=sk-[key]

# Ops Console
NEXT_PUBLIC_OPS_KEY=[secure-key]
```

### Optional

```env
# Mapbox (if using maps)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=[token]
```

---

## API Routes

### `/api/lead`

**Method**: POST

**Purpose**: Handle lead form submissions from main website

**Validation**: Zod schema validation, honeypot spam protection

### `/api/previews/list`

**Method**: GET

**Purpose**: List all previews (used by ops console)

**Query Parameters**:
- `search` - Search term (optional)
- `limit` - Limit results (optional)
- `key` - Ops key for authorization

**Response**: Array of preview objects

---

## Security Considerations

### Ops Console Access

- **Query Parameter**: `?key=[OPS_KEY]` required
- **Environment Variable**: `NEXT_PUBLIC_OPS_KEY` (client-side check)
- **Note**: For production, consider server-side validation

### Preview Pages

- **No Authentication**: Preview pages are public
- **Noindex/Nofollow**: Not indexed by search engines
- **Banner Warning**: "Concept preview" banner displayed

### API Keys

- **OpenAI**: Server-side only (not exposed to client)
- **Supabase Service Role**: Server-side only
- **Supabase Anon Key**: Public (limited permissions)

---

## Future Enhancements

### Potential Features

1. **Multiple Niches**: Add templates for other industries
2. **Template Versions**: Maintain multiple versions per niche
3. **Preview Editing**: Allow editing previews after creation
4. **Analytics**: Track preview views and interactions
5. **Custom Domains**: Allow clients to use their own domain
6. **Form Functionality**: Make contact forms functional
7. **Real-time Updates**: Live preview updates via Supabase real-time
8. **Bulk Operations**: Generate multiple previews at once
9. **Template Builder**: Visual template editor
10. **A/B Testing**: Test different template variations

---

## Troubleshooting

### Common Issues

**Preview Not Found:**
- Check slug in database
- Verify middleware rewrite is working
- Check Supabase connection

**Ops Console Unauthorized:**
- Verify `NEXT_PUBLIC_OPS_KEY` is set
- Check query parameter: `?key=[key]`
- Ensure key matches environment variable

**AI Generation Fails:**
- Check `OPENAI_API_KEY` is set
- Verify API key is valid
- Check OpenAI account has credits

**Map Not Loading:**
- Verify Mapbox token is set (if using maps)
- Check browser console for errors

**Build Errors:**
- Ensure all environment variables are set
- Check TypeScript errors
- Verify all imports are correct

---

## License

Copyright, Elevaris Web Solutions, 2025. All rights reserved.

---

## Support

For questions or issues:
- Email: info@elevaris.app
- Website: https://elevaris.app

---

**Last Updated**: January 2025
