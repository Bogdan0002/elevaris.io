# 🦈 Mako Bros Window Cleaning - Preview Setup Complete

## What I Created

I've set up everything needed to create a preview homepage for **Mako Bros Window Cleaning** based on your cleaning business template.

### Files Created:

1. **`scripts/create-mako-bros-preview.ts`** - TypeScript script to create the preview
2. **`scripts/create-mako-bros.html`** - Interactive HTML page to create preview via browser
3. **`scripts/mako-bros-config.json`** - Complete configuration JSON
4. **`scripts/MAKO_BROS_SETUP.md`** - Detailed setup instructions
5. **`app/api/previews/create/route.ts`** - New API endpoint to create previews

## 🎨 Brand Colors (from shark logo)

- **Primary**: `#1B8CA8` (Teal blue)
- **Accent**: `#0D3B52` (Navy blue)

## 🚀 Quick Start

### ⚡ Instant Preview (No Setup Required!)

**Want to see it right now?**

1. Start your dev server: `npm run dev`
2. Visit: `http://localhost:3000/p/mako-bros-window-cleaning-test`
3. See the full preview with shark colors! 🦈

### 📦 Create Permanent Preview (3 Options)

### Option 1: Using the HTML Interface (Recommended)

1. Start your dev server: `npm run dev`
2. Open `scripts/create-mako-bros.html` in your browser
3. Click "Create Preview" button

### Option 2: Direct API Call

```bash
curl -X POST http://localhost:3000/api/previews/create \
  -H "Content-Type: application/json" \
  -d @scripts/mako-bros-config.json
```

### Option 3: Manual Database Insert

Copy the JSON from `scripts/mako-bros-config.json` and insert it directly into your Supabase `client_previews` table.

## 📍 Access URLs

### Test Page (Available Now - No Database Required!)
- **Test URL**: `http://localhost:3000/p/mako-bros-window-cleaning-test`
- Use this to preview the design immediately!

### Live Preview (After Creating in Database)
- **Production**: `https://p.elevaris.app/mako-bros-window-cleaning`
- **Local Dev**: `http://localhost:3000/p/mako-bros-window-cleaning`

## ✅ What's Included

### Business Info
- Name: Mako Bros Window Cleaning
- Phone: +1 407-883-2877
- Location: Orlando, FL
- Hours: Mon-Sat: 8am-7pm
- Rating: 5.0/5.0 (8 reviews)

### 8 Services
- Residential Window Cleaning
- Commercial Window Cleaning
- Pressure Washing
- 2-Story Window Cleaning
- Hard Water Stain Removal
- Driveway & Sidewalk Cleaning
- Fence Cleaning
- Roof Drainage Cleaning

### 10 Service Areas
Orlando, Winter Park, Maitland, Altamonte Springs, Lake Mary, Apopka, Oviedo, Windermere, Dr. Phillips, College Park

### 3 Real Customer Reviews
- ⭐⭐⭐⭐⭐ Nina Ahumada
- ⭐⭐⭐⭐⭐ Jaudon Marlette  
- ⭐⭐⭐⭐⭐ T P

## 🎯 Template Features

Your cleaning template (v1) will automatically render with:

✅ Sticky navigation with contact info  
✅ Hero section with shark-themed colors  
✅ About section  
✅ Services showcase (all 8 services)  
✅ Transformation gallery  
✅ Work examples gallery  
✅ Why Choose Us section  
✅ Service area map (Orlando + 10 cities)  
✅ Customer reviews (3 real reviews)  
✅ Contact form with lead capture  
✅ Professional footer  
✅ Mobile-optimized with floating CTAs  
✅ Google Maps integration  

## 📝 Important Note

The Google Place ID in the config (`ChIJMakoBrosPlaceID`) is a placeholder. You'll need to:

1. Go to [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Search for "Mako Bros Window Cleaning, Orlando, FL"
3. Copy the real Place ID
4. Update it in the config or via the update API

## 🔧 How It Works

1. The preview system uses your existing cleaning template (`components/templates/cleaning/v1`)
2. It dynamically applies the Mako Bros branding (shark colors)
3. All content is pulled from the config (business name, services, reviews, etc.)
4. The preview is hosted at a unique slug: `/p/mako-bros-window-cleaning`
5. Uses the same domain routing as your generator app

## 📂 File Locations

```
elevaris.io/
├── app/
│   ├── api/
│   │   └── previews/
│   │       └── create/
│   │           └── route.ts          ← NEW: API to create previews
│   └── (previews)/
│       └── p/
│           └── [slug]/
│               └── page.tsx           ← Existing: Renders previews
├── scripts/
│   ├── create-mako-bros-preview.ts   ← NEW: TypeScript script
│   ├── create-mako-bros.html         ← NEW: Browser interface
│   ├── mako-bros-config.json         ← NEW: Config JSON
│   └── MAKO_BROS_SETUP.md            ← NEW: Detailed docs
├── components/
│   └── templates/
│       └── cleaning/
│           └── v1/                    ← Existing: Your template
└── lib/
    └── previews/
        ├── repo.ts                    ← Existing: DB operations
        ├── helpers.ts                 ← Existing: Utilities
        └── types.ts                   ← Existing: TypeScript types
```

## 🎉 Next Steps

1. **Create the preview** using one of the 3 methods above
2. **View it** at the preview URL
3. **Get the real Google Place ID** and update it
4. **Share with client** for approval
5. **Make adjustments** if needed using the update API

## 🤝 Need Help?

Check `scripts/MAKO_BROS_SETUP.md` for:
- Detailed troubleshooting
- Step-by-step instructions
- API documentation
- Update/customization guides

---

**Tagline**: *"Professional Window Cleaning company dedicated to giving your home the Sharky Shine it deserves."* 🦈✨

