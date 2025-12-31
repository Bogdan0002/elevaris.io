# Quick Setup Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000` - it will redirect to `/home`

## Notes

- The linter may show errors for `next/image` until dependencies are installed - this is normal
- Placeholder images are used throughout - replace with actual images in production
- The API route `/api/lead` is set up but needs database integration for production use

## Customization

### Adding Images

Replace placeholder divs in:
- `components/home/Hero.tsx` - Hero image
- `components/home/About.tsx` - Team image  
- `components/home/Work.tsx` - Project images

Use the `BlobImage` component for blob-masked images:
```tsx
<BlobImage 
  src="/path/to/image.jpg" 
  alt="Description" 
  blobStyle="oval" 
/>
```

### Design Tokens

Edit `app/globals.css` and `tailwind.config.ts` to customize:
- Colors
- Glow effects
- Spacing
- Typography

## Architecture Highlights

- **SOLID Principles**: Each component has a single responsibility
- **Reusable Components**: GlowCard, GlowButton, etc. can be used anywhere
- **Type Safety**: Full TypeScript coverage
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support
- **Performance**: Next.js Image optimization, code splitting

