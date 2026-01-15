# 🦈 Mako Bros - Architecture & Flow

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    MAKO BROS PREVIEW SYSTEM                 │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│   Test Page (NOW)    │ ← Access immediately, no DB needed
│  /p/mako-bros-test   │
└──────────────────────┘
          │
          ├──→ Uses applyDefaults()
          ├──→ Loads CleaningTemplate
          └──→ Applies shark colors (#1B8CA8, #0D3B52)


┌──────────────────────────────────────────────────────────────┐
│                  PERMANENT PREVIEW CREATION                   │
└──────────────────────────────────────────────────────────────┘

  Option 1: HTML Interface
  ┌────────────────────┐
  │ create-mako-bros   │
  │     .html          │ ─────┐
  └────────────────────┘      │
                               │
  Option 2: API Call           ├──→ POST /api/previews/create
  ┌────────────────────┐      │         │
  │  curl + JSON       │ ─────┘         │
  └────────────────────┘                 │
                                         ↓
  Option 3: Manual               ┌──────────────┐
  ┌────────────────────┐        │  Supabase    │
  │  Supabase UI       │ ────→  │  Database    │
  └────────────────────┘        │ client_      │
                                │  previews    │
                                └──────────────┘
                                       │
                                       ↓
                          ┌─────────────────────┐
                          │ /p/mako-bros-       │
                          │  window-cleaning    │
                          └─────────────────────┘
```

## Data Flow

```
┌───────────────────┐
│  User Visits      │
│  /p/[slug]        │
└─────────┬─────────┘
          │
          ↓
┌───────────────────────────────────┐
│ app/(previews)/p/[slug]/page.tsx  │
│                                   │
│ 1. Extract slug from URL          │
│ 2. Call getPreviewBySlug(slug)    │
└─────────┬─────────────────────────┘
          │
          ↓
┌───────────────────────────────────┐
│ lib/previews/repo.ts              │
│                                   │
│ 1. Query Supabase                 │
│ 2. Return ClientPreviewRow        │
└─────────┬─────────────────────────┘
          │
          ↓
┌───────────────────────────────────┐
│ lib/previews/helpers.ts           │
│                                   │
│ 1. applyDefaults(config)          │
│ 2. validateConfigSafe()           │
└─────────┬─────────────────────────┘
          │
          ↓
┌───────────────────────────────────┐
│ lib/templates/render.ts           │
│                                   │
│ 1. Switch on templateId           │
│ 2. Return <CleaningTemplate />    │
└─────────┬─────────────────────────┘
          │
          ↓
┌───────────────────────────────────┐
│ components/templates/cleaning/    │
│   v1/Template.tsx                 │
│                                   │
│ 1. Apply branding colors          │
│ 2. Render all sections:           │
│    - Navbar                       │
│    - Hero                         │
│    - About                        │
│    - Services                     │
│    - Transformation               │
│    - Gallery                      │
│    - WhyUs                        │
│    - Areas                        │
│    - Reviews                      │
│    - Contact                      │
│    - Footer                       │
└───────────────────────────────────┘
```

## Config Structure

```json
{
  "slug": "mako-bros-window-cleaning",
  "niche": "cleaning",
  "templateId": "cleaning-v1",
  "business": {
    "name": "Mako Bros Window Cleaning",
    "city": "Orlando",
    "state": "FL",
    "phone": "+1 407-883-2877"
  },
  "branding": {
    "primaryColor": "#1B8CA8",  ← Shark teal
    "accentColor": "#0D3B52"     ← Shark navy
  },
  "services": [...],              ← 8 services
  "areasServed": [...],           ← 10 cities
  "sampleReviews": [...]          ← 3 real reviews
}
```

## Template Sections Map

```
┌────────────────────────────────────────────────────────┐
│ NAVBAR (Sticky)                                        │
│ • Logo: "Mako Bros Window Cleaning"                    │
│ • Phone: +1 407-883-2877                              │
│ • CTA: "Get Free Quote"                               │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ HERO                                                   │
│ • Headline: "Professional Window Cleaning"            │
│ • Subheadline: "Get Your Sharky Shine Today!"        │
│ • Primary CTA: Call/Quote                             │
│ • Background: Shark theme colors                      │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ ABOUT                                                  │
│ • Company description                                  │
│ • Years in business                                    │
│ • Service philosophy                                   │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ SERVICES (8 cards)                                     │
│ 1. Residential Window Cleaning                         │
│ 2. Commercial Window Cleaning                          │
│ 3. Pressure Washing                                    │
│ 4. 2-Story Window Cleaning                            │
│ 5. Hard Water Stain Removal                           │
│ 6. Driveway & Sidewalk Cleaning                       │
│ 7. Fence Cleaning                                      │
│ 8. Roof Drainage Cleaning                             │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ TRANSFORMATION                                         │
│ • Before/After gallery                                 │
│ • Image showcase                                       │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ GALLERY                                                │
│ • Work examples                                        │
│ • Project photos                                       │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ WHY CHOOSE US                                          │
│ • Value propositions                                   │
│ • Trust signals                                        │
│ • Differentiators                                      │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ SERVICE AREAS (Map + List)                             │
│ • Interactive map centered on Orlando                  │
│ • 25-mile radius                                       │
│ • 10 cities listed                                     │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ REVIEWS (3 testimonials)                               │
│ ★★★★★ Nina Ahumada                                    │
│ ★★★★★ Jaudon Marlette                                │
│ ★★★★★ T P                                            │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ CONTACT FORM                                           │
│ • Name, Email, Phone                                   │
│ • Service Selection                                    │
│ • Message                                              │
│ • Submit → Lead Capture                               │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ FOOTER                                                 │
│ • Quick Links                                          │
│ • Contact Info                                         │
│ • Service Areas                                        │
│ • Social Media                                         │
│ • Copyright                                            │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ FLOATING CTA (Mobile)                                  │
│ • Call Now button                                      │
│ • Free Quote button                                    │
│ • Sticky bottom bar                                    │
└────────────────────────────────────────────────────────┘
```

## Color System

```
Primary Color: #1B8CA8 (Teal Blue)
├─→ Used for: CTAs, links, accents
├─→ Hover: Darker shade
└─→ Opacity variants: 0.1, 0.2, 0.8

Accent Color: #0D3B52 (Navy Blue)
├─→ Used for: Secondary buttons, borders
├─→ Hover: Lighter shade
└─→ Opacity variants: 0.1, 0.2, 0.8

Applied via CSS variables:
--primary-color: #1B8CA8
--accent-color: #0D3B52
--primary-rgb: 27, 140, 168
--accent-rgb: 13, 59, 82
```

## URL Structure

```
Domain: elevaris.app
Subdomain: p (previews)

Full URL Pattern:
https://elevaris.app/p/[slug]

Examples:
✅ https://elevaris.app/p/mako-bros-window-cleaning
✅ http://localhost:3000/p/mako-bros-window-cleaning
✅ http://localhost:3000/p/mako-bros-window-cleaning-test (static test)

Middleware handles:
- elevaris.app/p → routes to app/(previews)/p/[slug]
- Domain verification
- SSL/Security
```

## Database Schema

```sql
Table: client_previews

Columns:
- id (uuid, primary key)
- slug (text, unique)
- niche (text)
- status (text) → 'preview', 'active', 'archived'
- config (jsonb) → Full CleaningPreviewConfig
- created_at (timestamp)
- updated_at (timestamp)

Indexes:
- slug (unique)
- status
- niche

Example Row:
{
  id: "abc-123-def-456",
  slug: "mako-bros-window-cleaning",
  niche: "cleaning",
  status: "preview",
  config: { ... CleaningPreviewConfig ... },
  created_at: "2024-01-13T10:00:00Z",
  updated_at: "2024-01-13T10:00:00Z"
}
```

## API Endpoints

```
POST /api/previews/create
Body: CleaningPreviewConfig
Response: { success: true, preview: {...}, url: "..." }

GET /api/previews/list
Query: ?search=mako&limit=10
Response: ClientPreviewRow[]

PUT /api/previews/update/[slug]
Body: Partial<CleaningPreviewConfig>
Response: { success: true, preview: {...} }
```

---

**Architecture is clean, modular, and scalable!** ✨


