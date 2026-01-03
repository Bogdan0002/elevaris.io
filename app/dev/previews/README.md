# Local Dev Preview Pages

This folder is for creating **custom preview pages locally** on your laptop.

## How to Use

### 1. Create a New Preview Page

Create a new folder with your preview name:

```
app/dev/previews/my-company-name/page.tsx
```

### 2. Copy the Template Structure

You can:
- Copy `app/dev/previews/[slug]/page.tsx` as a starting point
- Import sections from `components/templates/cleaning/v1/sections/`
- Create completely custom layouts

### 3. Customize the Config

Edit the `SAMPLE_CONFIG` object in your page to match the company:

```typescript
const SAMPLE_CONFIG: Partial<CleaningPreviewConfig> = {
  business: {
    name: 'Your Company Name',
    city: 'Your City',
    state: 'CA',
    phone: '+1 555-123-4567',
  },
  // ... rest of config
}
```

### 4. Customize the Layout

- **Reorder sections**: Move `<HeroSection />`, `<ServicesSection />`, etc. around
- **Add custom sections**: Create new components or add inline JSX
- **Modify styling**: Add custom Tailwind classes, wrap in custom containers
- **Create different layouts**: Make each slug have a unique layout

### 5. Access Your Preview

Visit: `http://localhost:3000/dev/previews/your-slug`

## Examples

### Example 1: Simple Custom Layout

```tsx
export default function CustomPreview() {
  const config = applyDefaults(SAMPLE_CONFIG)
  
  return (
    <div className="min-h-screen">
      <Navbar config={config} />
      <HeroSection config={config} />
      {/* Your custom section */}
      <div className="py-20 bg-blue-500">
        <h1>Custom Content</h1>
      </div>
      <FooterSection config={config} />
    </div>
  )
}
```

### Example 2: Different Layout for Different Slug

```tsx
export default function DevPreviewPage({ params }: DevPreviewPageProps) {
  const { slug } = use(params)
  const config = applyDefaults(SAMPLE_CONFIG)
  
  if (slug === 'luxury-version') {
    return <LuxuryLayout config={config} />
  }
  
  if (slug === 'minimal-version') {
    return <MinimalLayout config={config} />
  }
  
  return <DefaultLayout config={config} />
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

## Tips

1. **Start Simple**: Copy the base template and modify one section at a time
2. **Test Locally**: Use `npm run dev` and visit your preview URL
3. **Save Configs**: Create JSON files for different companies
4. **Version Control**: Commit your custom previews to git
5. **Reuse Sections**: Import and reuse sections across different previews

## File Structure

```
app/dev/previews/
├── README.md (this file)
├── [slug]/
│   └── page.tsx (base template - copy this)
├── company-a/
│   └── page.tsx (your custom preview)
├── company-b/
│   └── page.tsx (another custom preview)
└── ...
```

