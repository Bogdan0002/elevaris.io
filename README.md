# Elevaris Next.js Website

A modern, pixel-perfect recreation of the Elevaris homepage built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Custom glow-themed design system
- 🚀 Next.js 14 with App Router
- 💅 Tailwind CSS with custom design tokens
- 🎭 Framer Motion animations
- 📱 Fully responsive design
- ♿ Accessible components (shadcn/ui primitives)
- ✅ Form validation with react-hook-form + Zod
- 🎯 SOLID principles and clean code architecture

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
elevaris.io/
├── app/                    # Next.js App Router pages
│   ├── home/              # Main homepage
│   ├── api/               # API routes
│   └── [routes]/          # Other pages
├── components/
│   ├── brand/             # Custom brand components
│   │   ├── GlowCard.tsx
│   │   ├── GlowButton.tsx
│   │   ├── FloatingCard.tsx
│   │   └── BlobImage.tsx
│   ├── site/              # Site-wide components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Container.tsx
│   │   └── SectionHeading.tsx
│   ├── home/              # Homepage sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Work.tsx
│   │   ├── ProcessTimeline.tsx
│   │   ├── About.tsx
│   │   ├── Testimonials.tsx
│   │   ├── ContactSection.tsx
│   │   └── FAQ.tsx
│   └── ui/                # shadcn/ui primitives
├── lib/
│   ├── utils.ts           # Utility functions
│   ├── constants/         # Constants and data
│   └── validation/        # Zod schemas
└── app/globals.css        # Global styles and design tokens
```

## Design System

### Colors
- Background: `#0B0B0B`
- Background Soft: `#111111`
- Primary Accent: `#FF6A55`
- Primary Soft: `#FF836F`
- Card Base: `#3A1F1A` with gradient

### Components

#### Custom Brand Components
- **GlowCard**: Reusable card with glow border and hover effects
- **GlowButton**: Pill button with glow styling (primary/outline variants)
- **FloatingCard**: Animated card with floating motion
- **BlobImage**: Image with organic blob/oval mask
- **Container**: Centered container with max-width
- **SectionHeading**: Section heading with overline and highlight word

#### shadcn/ui Primitives
- Accordion, Sheet, Input, Textarea, Checkbox, NavigationMenu
- Used as accessible primitives, styled with Elevaris theme

## Development Principles

This project follows:
- **SOLID principles** for clean, maintainable code
- **Single Responsibility** - Each component has one clear purpose
- **DRY (Don't Repeat Yourself)** - Reusable components and utilities
- **Type Safety** - Full TypeScript coverage
- **Accessibility** - ARIA labels, keyboard navigation, reduced motion support

## API Routes

### `/api/lead`
POST endpoint for lead form submissions with:
- Zod validation
- Honeypot spam protection
- Error handling

## Environment Variables

No environment variables required for basic functionality. Add your own for:
- Database connections
- Email service (SendGrid, etc.)
- Analytics

## Building for Production

```bash
npm run build
npm start
```

## License

Copyright, Elevaris Web Solutions, 2025. All rights reserved.

