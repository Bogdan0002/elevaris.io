# Local Dev Guide - Creating Custom Preview Pages

## Quick Start

### 1. Create a Custom Preview Page

Create a new file at:
```
app/dev/previews/your-company-name/page.tsx
```

### 2. Copy the Base Template

Copy the structure from `app/dev/previews/[slug]/page.tsx` and customize it.

### 3. Edit the Config

Modify the `SAMPLE_CONFIG` object with your company's information:

```typescript
const SAMPLE_CONFIG: Partial<CleaningPreviewConfig> = {
  business: {
    name: 'Your Company Name',
    city: 'Your City',
    state: 'CA',
    phone: '+1 555-123-4567',
  },
  // ... customize colors, services, etc.
}
```

### 4. Customize the Layout

You can:
- **Reorder sections**: Move `<HeroSection />`, `<ServicesSection />`, etc.
- **Add custom sections**: Create new components or add inline JSX
- **Modify styling**: Add Tailwind classes, wrap in custom containers
- **Create different layouts**: Make each slug unique

### 5. Access Your Preview

Visit: `http://localhost:3000/dev/previews/your-company-name`

## Example: Custom Layout

```tsx
export default function CustomPreview() {
  const config = applyDefaults(SAMPLE_CONFIG)
  
  return (
    <div className="min-h-screen">
      <Navbar config={config} />
      
      {/* Custom hero with different styling */}
      <div className="py-32 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            {config.business.name}
          </h1>
          <p className="text-xl text-white/90">
            Custom hero section!
          </p>
        </div>
      </div>
      
      <ServicesSection config={config} />
      <ContactSection config={config} />
      <FooterSection config={config} />
    </div>
  )
}
```

## Available Sections

Import from `@/components/templates/cleaning/v1/sections/`:

- `Navbar` - Navigation bar
- `HeroSection` - Hero/landing section  
- `AboutSection` - About us section
- `ServicesSection` - Services grid
- `WhyUsSection` - Why choose us
- `AreasSection` - Service areas with map
- `ReviewsSection` - Customer reviews
- `ContactSection` - Contact form
- `FooterSection` - Footer
- `GallerySection` - Image gallery
- `PricingSection` - Pricing tiers
- `TransformationSection` - Before/after

## File Structure

```
app/dev/previews/
├── README.md
├── [slug]/
│   └── page.tsx (base template - copy this)
├── company-a/
│   └── page.tsx (your custom preview)
├── company-b/
│   └── page.tsx (another custom preview)
└── ...
```

## Tips

1. **Start with the base template** - Copy `[slug]/page.tsx` as your starting point
2. **Test locally** - Use `npm run dev` and visit your preview URL
3. **Version control** - Commit your custom previews to git
4. **Reuse sections** - Import and reuse sections across different previews
5. **Experiment freely** - This is your local dev space, try anything!

## Accessing Generated Previews

All previews generated via the ops console are stored in Supabase and accessible at:
- Preview URL: `https://p.elevaris.app/[slug]`
- Review URL: Generated from Place ID

You can see recent previews in the ops console main page, or view all at:
`ops.elevaris.app/preview/list?key=your-key`

