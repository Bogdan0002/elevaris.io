# Elevaris Website - Comprehensive Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Design System](#design-system)
5. [Component Architecture](#component-architecture)
6. [Page Breakdown](#page-breakdown)
7. [Interactive Features](#interactive-features)
8. [Styling & Theming](#styling--theming)
9. [Performance Optimizations](#performance-optimizations)
10. [SEO Implementation](#seo-implementation)
11. [Deployment](#deployment)

---

## Project Overview

**Elevaris** is a premium software company website built for showcasing web development, digital marketing, and business automation services. The site emphasizes modern design, interactive user experiences, and conversion optimization.

### Business Model
- **Industry**: Software Company / Digital Agency
- **Services**: Web Development, SEO, UI/UX Design, Advertising, Ongoing Support
- **Target Audience**: Small to medium-sized businesses, cleaning companies, local service providers
- **Key Offering**: CRM-connected websites (GoHighLevel integration)

### Core Features
- Interactive 3D mockups on hero sections
- Real-time animated metrics and dashboards
- Smooth scroll animations and transitions
- Mobile-optimized responsive design
- Custom gradient scrollbar
- Lead capture forms with validation
- Embedded booking calendar
- Multi-tier pricing tables

---

## Technology Stack

### Frontend Framework
- **Next.js 14+** (App Router)
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API routes
  - File-based routing

### UI Libraries & Tools
- **React 18+**
- **TypeScript** (type safety)
- **Tailwind CSS** (utility-first styling)
- **Framer Motion** (animations)
  - 3D transforms
  - Mouse tracking
  - Parallax effects
  - Spring animations

### Component Libraries
- **Radix UI** (accessible primitives)
  - Sheet (mobile menu)
  - Accordion
  - Dialog/Modal
- **Lucide React** (icon library)
- **React Hook Form** (form management)
- **Zod** (schema validation)

### Additional Libraries
- **class-variance-authority** (CVA for component variants)
- **clsx** & **tailwind-merge** (conditional classes)
- **Spline** (3D graphics - removed for performance)

### Development Tools
- **ESLint** (code linting)
- **Prettier** (code formatting)
- **TypeScript** (type checking)

---

## Project Structure

```
elevaris.io/
├── app/
│   ├── layout.tsx                    # Root layout with metadata
│   ├── globals.css                   # Global styles
│   ├── sitemap.ts                   # Dynamic sitemap
│   ├── home/
│   │   └── page.tsx                 # Homepage
│   ├── web-development/
│   │   └── page.tsx                 # Web Dev service page
│   ├── seo-strategies/
│   │   └── page.tsx                 # SEO service page
│   ├── ux-ui-design/
│   │   └── page.tsx                 # UI/UX service page
│   ├── advertising/
│   │   └── page.tsx                 # Advertising service page
│   ├── ongoing-support/
│   │   └── page.tsx                 # Support service page
│   ├── cleaning/
│   │   └── page.tsx                 # Cleaning industry page
│   ├── contact-us/
│   │   └── page.tsx                 # Contact page
│   ├── schedule-a-call/
│   │   └── page.tsx                 # Booking page
│   ├── privacy-policy/
│   │   └── page.tsx                 # Privacy policy
│   └── terms-and-conditions/
│       └── page.tsx                 # Terms page
├── components/
│   ├── brand/                       # Brand-specific components
│   │   ├── BlobImage.tsx
│   │   ├── GlowButton.tsx           # CTA buttons with glow
│   │   └── GlowCard.tsx             # Cards with glow effect
│   ├── home/                        # Homepage components
│   │   ├── Hero.tsx                 # Homepage hero
│   │   ├── Services.tsx             # Services grid
│   │   ├── About.tsx                # About section
│   │   ├── ProcessTimeline.tsx      # Animated timeline
│   │   ├── Testimonials.tsx         # Testimonial carousel
│   │   ├── ContactSection.tsx       # Contact form
│   │   ├── Stats.tsx                # Stat counters
│   │   ├── CodeVisualization.tsx    # Code animation
│   │   └── InteractiveHeroMockup.tsx# Hero mockup
│   ├── site/                        # Site-wide components
│   │   ├── Navbar.tsx               # Navigation
│   │   ├── Footer.tsx               # Footer
│   │   ├── Container.tsx            # Max-width wrapper
│   │   ├── SectionHeading.tsx       # Section titles
│   │   └── PageLayout.tsx           # Standard page layout
│   └── ui/                          # Base UI components
│       ├── button.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── checkbox.tsx
│       ├── label.tsx
│       ├── sheet.tsx                # Mobile menu
│       ├── accordion.tsx
│       ├── glowing-effect.tsx       # Interactive glow
│       ├── sparkles.tsx             # Particle effects
│       └── bento-grid.tsx           # Service grid layout
├── lib/
│   ├── constants/
│   │   └── nav.ts                   # Navigation links
│   ├── validation/
│   │   └── leadSchema.ts            # Form validation
│   └── utils.ts                     # Helper functions
└── public/
    └── robots.txt                    # SEO robots file
```

---

## Design System

### Color Palette

#### Primary Colors
- **Primary**: `#ff6a55` (Coral Red) - Main brand color
- **Secondary**: `#7b63ff` (Purple) - Accent color
- **Tertiary**: `#3d52d5` (Blue) - Supporting accent

#### Gradient
```css
background: linear-gradient(180deg, #ff6a55 0%, #7b63ff 50%, #3d52d5 100%);
```

#### Background Colors
- **Background**: `#0b0b0b` (Near black)
- **Background Soft**: `#0f0b0e` (Slightly lighter)
- **Foreground**: `#ffffff` (White text)
- **Foreground Secondary**: `rgba(255, 255, 255, 0.7)`
- **Foreground Muted**: `rgba(255, 255, 255, 0.5)`

#### Utility Colors
- **Border**: `rgba(255, 255, 255, 0.1)`
- **Card Background**: Radial gradients with primary/secondary colors at low opacity

### Typography

#### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: system-ui, sans-serif

#### Font Sizes
- **Hero**: `text-4xl sm:text-5xl lg:text-6xl` (36-60px)
- **Heading 1**: `text-3xl sm:text-4xl lg:text-5xl` (30-48px)
- **Heading 2**: `text-2xl sm:text-3xl lg:text-4xl` (24-36px)
- **Heading 3**: `text-xl sm:text-2xl` (20-30px)
- **Body Large**: `text-lg sm:text-xl` (18-20px)
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)
- **Tiny**: `text-xs` (12px)

#### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

### Spacing System
- Uses Tailwind's default spacing scale (4px base unit)
- Common values: `4`, `6`, `8`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `64`, `80`

### Border Radius
- **Small**: `rounded-md` (6px)
- **Medium**: `rounded-lg` (8px)
- **Large**: `rounded-xl` (12px)
- **XL**: `rounded-2xl` (16px)
- **Full**: `rounded-full` (9999px)

### Shadows
```css
/* Card shadow */
shadow-[0_12px_30px_rgba(0,0,0,0.3)]

/* Glow shadow */
shadow-[0_0_24px_rgba(255,106,85,0.6)]

/* Button hover shadow */
shadow-[0_4px_12px_rgba(255,106,85,0.4)]
```

### Effects

#### Glowing Effect
- Interactive border that follows mouse position
- Used on cards, buttons, and form inputs
- Implemented via `GlowingEffect` component

#### Gradient Text
```css
bg-gradient-to-r from-primary via-[#ff7a59] to-[#7b63ff]
bg-clip-text text-transparent
```

#### Backdrop Blur
```css
backdrop-blur-lg  /* 16px blur */
backdrop-blur-sm  /* 4px blur */
```

---

## Component Architecture

### Component Patterns

#### 1. **Compound Components**
Used for complex UI patterns like `ProcessTimeline`, `Testimonials`

#### 2. **Render Props**
Used in `BentoGrid` for flexible layouts

#### 3. **Higher-Order Components**
`PageLayout` wraps pages with consistent structure

#### 4. **Custom Hooks**
- `useMotionValue`, `useSpring`, `useTransform` (Framer Motion)
- `useForm` (React Hook Form)
- `useState`, `useEffect`, `useCallback`, `useRef`

### Key Components Explained

#### GlowingEffect Component
```typescript
interface GlowingEffectProps {
  spread: number;          // Glow spread radius
  glow: boolean;          // Enable glow
  disabled: boolean;      // Disable effect
  proximity: number;      // Activation proximity
  inactiveZone: number;   // Center dead zone
  borderWidth: number;    // Border thickness
  className?: string;
}
```

**Purpose**: Creates an interactive border that glows and follows the mouse cursor.

**Usage**:
```tsx
<GlowingEffect
  spread={40}
  glow={true}
  proximity={64}
  borderWidth={2}
  className="rounded-2xl"
/>
```

#### InteractiveMockup Pattern
Used across all service pages for hero sections:

1. **InteractiveAdsMockup** - Advertising page
   - Switches between Meta, Google, TikTok platforms
   - Shows live metrics and campaign data
   - Floating notifications for conversions/leads

2. **InteractiveSEOMockup** - SEO page
   - Switches between Rankings, Analytics, Map views
   - Animated ranking changes
   - Traffic graphs and metrics

3. **InteractiveDesignMockup** - UI/UX page
   - Device mode switcher (Desktop/Tablet/Mobile)
   - Color scheme changer
   - Element selection highlighting

4. **InteractiveCodeMockup** - Web Development page
   - Real-time code typing animation
   - Terminal output simulation
   - Floating badges (Lighthouse score, deployment status)

5. **InteractiveSupportMockup** - Ongoing Support page
   - Ticket status tracker
   - Uptime percentage counter
   - Security score visualization

**Common Features**:
- Mouse tracking for 3D rotation
- Parallax floating elements
- Smooth spring animations
- Interactive tabs/buttons
- Dynamic content based on state

#### ProcessTimeline Component
**Features**:
- Vertical timeline with animated fill
- Alternating left/right cards (desktop)
- Intersection Observer for scroll-triggered animations
- Mobile-friendly vertical layout
- Glowing step indicators

#### Testimonials Component
**Features**:
- Multi-slide carousel (3 visible on desktop, 1 on mobile)
- Auto-play with 5-second intervals
- Manual navigation (arrows + dots)
- Smooth slide transitions
- Responsive card sizing

---

## Page Breakdown

### Homepage (`/home`)

#### Sections:
1. **Hero**: Interactive 3D mockup, CTA buttons, animated stats
2. **Services**: Bento grid with 5 service cards (Web Dev is main card)
3. **Process Timeline**: 4-step animated timeline
4. **About**: Creative animated design + contact cards
5. **Stats**: Animated counter section
6. **Testimonials**: 6 real client testimonials
7. **Contact**: Lead capture form

#### Key Data:
```typescript
const services = [
  { title: "Web Development", isMain: true, ... },
  { title: "SEO Strategies", ... },
  { title: "UI/UX Design", ... },
  { title: "Advertising", ... },
  { title: "Ongoing Support", ... },
]

const processSteps = [
  { num: 1, title: "Discovery & Strategy", ... },
  { num: 2, title: "Design & Development", ... },
  { num: 3, title: "Testing & Launch", ... },
  { num: 4, title: "Growth & Optimization", ... },
]
```

### Service Pages Pattern

All service pages follow this structure:

1. **Hero Section**
   - Badge/pill with service name
   - H1 with gradient keyword
   - Descriptive paragraph
   - 2 CTA buttons (primary + secondary)
   - Animated stats (4 counters)
   - Interactive mockup on right side

2. **Benefits/Features Section**
   - 3-column grid
   - Icon + title + description cards
   - Glowing effect on hover

3. **Process/How It Works**
   - Step-by-step explanation
   - Numbered cards or timeline

4. **CTA Section**
   - Large call-to-action
   - "Schedule Your Free [Service]" button

5. **Footer**
   - Consistent across all pages

#### Mobile Optimizations:
- Responsive text sizes
- Stacked layouts (grid → column)
- Shorter CTA text: "Schedule Call" (mobile) vs "Schedule Your Free Call" (desktop)
- Overflow handling for mockups
- Touch-friendly button sizes

### Contact Pages

#### `/contact-us`
- Contact information (phone, email)
- Embedded booking calendar (iframe)
- Call-to-actions

#### `/schedule-a-call`
- Benefits of scheduling
- Embedded booking calendar
- Testimonial-style benefits list

**Calendar Configuration**:
```tsx
<iframe
  src="https://link.elevaris.app/widget/booking/CE1Idz6ruqaUcAU7LYMc"
  style={{ width: '100%', height: '700px', border: 'none' }}
  scrolling="yes"
/>
```

### Legal Pages

#### `/privacy-policy` & `/terms-and-conditions`
- Hero section with smooth gradient transition
- Prose-styled content
- Organized sections with clear headings
- Responsive typography

---

## Interactive Features

### 1. Custom Scrollbar
```css
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #ff6a55 0%, #7b63ff 50%, #3d52d5 100%);
  border-radius: 10px;
}
```

### 2. Navbar Behavior
- Fixed position with backdrop blur
- Shrinks on scroll (padding: `py-5` → `py-3`)
- Width: full → `max-w-[1100px]` (desktop), `max-w-[calc(100%-2rem)]` (mobile)
- Rounded corners when scrolled
- Sparkle particle effect overlay

### 3. Mobile Menu
- Slide-in sheet from right
- Z-index hierarchy: overlay (z-105), content (z-110), above navbar (z-100)
- Gradient CTA button
- Accordion for nested links

### 4. Form Handling
```typescript
// Validation schema
const leadSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(10),
  honeypot: z.string().optional(), // Anti-spam
})

// Form submission
const onSubmit = async (data) => {
  // Check honeypot
  if (data.honeypot) return
  
  // Submit to API
  const response = await fetch("/api/lead", {
    method: "POST",
    body: JSON.stringify(data),
  })
}
```

### 5. Animated Counters
```typescript
function AnimatedCounter({ value, label }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let start = 0
    const end = parseInt(value)
    const duration = 2000
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    
    return () => clearInterval(timer)
  }, [value])
  
  return <div>{count}{label}</div>
}
```

### 6. Mouse Tracking 3D Effect
```typescript
const mouseX = useMotionValue(0)
const mouseY = useMotionValue(0)

const rotateX = useSpring(
  useTransform(mouseY, [-0.5, 0.5], [8, -8]),
  { damping: 25, stiffness: 150 }
)
const rotateY = useSpring(
  useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
  { damping: 25, stiffness: 150 }
)

const handleMouseMove = (e) => {
  const rect = containerRef.current.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  mouseX.set(x)
  mouseY.set(y)
}

<motion.div
  style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
  onMouseMove={handleMouseMove}
/>
```

---

## Styling & Theming

### Tailwind Configuration

#### Custom Colors
```javascript
colors: {
  primary: "#ff6a55",
  secondary: "#7b63ff",
  background: "#0b0b0b",
  foreground: "#ffffff",
  // ... more colors
}
```

#### Custom Utilities
```css
/* Horizontal scroll prevention */
body {
  overflow-x: hidden;
  min-height: 100vh;
}

/* Gradient text */
.gradient-text {
  @apply bg-gradient-to-r from-primary via-[#ff7a59] to-[#7b63ff] bg-clip-text text-transparent;
}
```

### Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach
All styles are mobile-first, with desktop styles added via breakpoints:

```tsx
className="text-4xl sm:text-5xl lg:text-6xl"  // Mobile → Tablet → Desktop
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"  // Responsive grid
```

---

## Performance Optimizations

### Current Optimizations
1. **Next.js Image Optimization**: Automatic image optimization
2. **Code Splitting**: Route-based code splitting
3. **Lazy Loading**: Images lazy load by default
4. **Font Optimization**: Inter font with `display: 'swap'`
5. **Reduced JavaScript**: Removed heavy Spline 3D library
6. **Overflow Control**: Prevented horizontal scroll issues

### Recommended Future Optimizations
1. **Dynamic Imports**: Lazy load interactive mockups
2. **Reduced Motion**: Respect user preferences
3. **Image Format**: Use AVIF/WebP
4. **Bundle Analysis**: Identify and optimize large dependencies
5. **Service Worker**: Cache static assets

See `PERFORMANCE_ANALYSIS.md` for detailed recommendations.

---

## SEO Implementation

### Metadata
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://elevaris.app'),
  title: {
    default: "Elevaris - Premium Web Development",
    template: "%s | Elevaris"
  },
  description: "...",
  keywords: ["web development", "SEO", ...],
  openGraph: { ... },
  twitter: { ... },
  robots: { ... },
}
```

### Structured Data
- Organization schema (recommended)
- Service schema (recommended)
- Review schema (recommended)

### Technical SEO
- ✅ Semantic HTML
- ✅ robots.txt
- ✅ Dynamic sitemap.xml
- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Mobile responsive
- ✅ Fast loading
- ✅ HTTPS (Vercel)
- ✅ Proper heading hierarchy

---

## Deployment

### Platform: Vercel

#### Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

#### Environment Variables
None required for basic deployment.

#### Custom Domain
- Set up custom domain in Vercel dashboard
- Update `metadataBase` in `app/layout.tsx`
- Update sitemap.ts with production URL

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

### Deployment Checklist
- [ ] Update metadata URLs to production domain
- [ ] Add Google Analytics tracking ID
- [ ] Verify Google Search Console
- [ ] Submit sitemap to search engines
- [ ] Test all forms and CTAs
- [ ] Check mobile responsiveness
- [ ] Verify calendar embed works
- [ ] Test all internal links
- [ ] Check 404 pages
- [ ] Enable Vercel Analytics

---

## File Management

### Important Files to Never Delete
- `app/layout.tsx` - Root layout
- `app/globals.css` - Global styles
- `components/ui/` - Base UI components
- `lib/utils.ts` - Utility functions
- `tailwind.config.ts` - Tailwind configuration
- `next.config.js` - Next.js configuration

### Files Safe to Modify
- Page content in `app/*/page.tsx`
- Component content
- Color values in Tailwind config
- Navigation links in `lib/constants/nav.ts`
- Footer data in page files

### Adding New Pages

1. Create page file:
```bash
app/new-page/page.tsx
```

2. Add metadata:
```typescript
export const metadata = {
  title: "New Page",
  description: "Description"
}
```

3. Add to navigation:
```typescript
// lib/constants/nav.ts
export const navLinks = [
  { label: "New Page", href: "/new-page" },
  // ...
]
```

4. Add to sitemap:
```typescript
// app/sitemap.ts
const routes = [
  '/new-page',
  // ...
]
```

---

## Maintenance & Updates

### Regular Tasks
- **Weekly**: Check for broken links
- **Monthly**: Update dependencies (`npm update`)
- **Quarterly**: Review and update testimonials
- **Annually**: Review and update privacy policy/terms

### Updating Content

#### Homepage Stats
```typescript
// app/home/page.tsx
const statsData = {
  clients: "XX+",
  projects: "YY+",
  satisfaction: "ZZ%",
  support: "24/7"
}
```

#### Testimonials
```typescript
// app/home/page.tsx
const testimonialsData = [
  {
    quote: "...",
    name: "Name",
    role: "Title, Company"
  }
]
```

#### Contact Information
Update in multiple locations:
- `app/home/page.tsx` (homepage footer)
- `app/contact-us/page.tsx`
- `components/site/Footer.tsx`

---

## Common Issues & Solutions

### Issue: Horizontal Scroll on Mobile
**Solution**: Ensure all containers have `overflow-x-hidden` and check for fixed-width elements.

### Issue: Animations Laggy on Mobile
**Solution**: Reduce animation complexity, use `will-change` CSS property, implement reduced motion.

### Issue: Images Not Loading
**Solution**: Check Next.js Image component configuration and ensure images are in `public/` or external URLs are allowed in `next.config.js`.

### Issue: Form Not Submitting
**Solution**: Check API route, validate schema, ensure honeypot field is handled correctly.

### Issue: Navbar Overlapping Content
**Solution**: Add `pt-32` (or navbar height) to first section of each page.

---

## Contact & Support

**Website**: https://elevaris.app  
**Email**: info@elevaris.app  
**Phone**: +1 855-532-7511

---

## Version History

### v1.0.0 (Current)
- Initial launch
- 8 main pages + 2 legal pages
- 5 interactive service mockups
- Mobile-optimized responsive design
- SEO optimized with sitemap and robots.txt
- Integrated booking calendar
- Custom gradient scrollbar
- Advanced animations with Framer Motion

---

**Last Updated**: January 2026  
**Documentation Version**: 1.0.0

