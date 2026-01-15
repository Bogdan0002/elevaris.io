# 🦈 Mako Bros Window Cleaning - Preview System

<div align="center">

![Mako Bros](https://img.shields.io/badge/Mako%20Bros-Window%20Cleaning-1B8CA8?style=for-the-badge&logo=windows&logoColor=white)
![Rating](https://img.shields.io/badge/Rating-5.0%20★★★★★-FFD700?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Ready%20to%20Deploy-00C896?style=for-the-badge)

**Professional Window Cleaning - Get Your Sharky Shine Today!**

[View Test Preview](#instant-preview) • [Setup Guide](#setup) • [Documentation](#documentation)

</div>

---

## ⚡ Instant Preview

```bash
npm run dev
```

**Then visit:** http://localhost:3000/p/mako-bros-window-cleaning-test

**See it live right now - no database setup required!**

---

## 🎨 Brand Colors

<table>
<tr>
<td align="center">
<img src="https://via.placeholder.com/100/1B8CA8/FFFFFF?text=Primary" width="100" height="100" />
<br />
<b>Primary</b>
<br />
<code>#1B8CA8</code>
<br />
Teal Blue
</td>
<td align="center">
<img src="https://via.placeholder.com/100/0D3B52/FFFFFF?text=Accent" width="100" height="100" />
<br />
<b>Accent</b>
<br />
<code>#0D3B52</code>
<br />
Navy Blue
</td>
</tr>
</table>

---

## 📋 Business Information

| Detail | Information |
|--------|-------------|
| **Name** | Mako Bros Window Cleaning |
| **Phone** | +1 407-883-2877 |
| **Location** | Orlando, Florida |
| **Hours** | Mon-Sat: 8am-7pm |
| **Rating** | 5.0 ★★★★★ (8 reviews) |
| **Tagline** | "Professional Window Cleaning company dedicated to giving your home the Sharky Shine it deserves." |

---

## 🛠️ Services Offered

<table>
<tr>
<td>✅ Residential Window Cleaning</td>
<td>✅ Commercial Window Cleaning</td>
</tr>
<tr>
<td>✅ Pressure Washing</td>
<td>✅ 2-Story Window Cleaning</td>
</tr>
<tr>
<td>✅ Hard Water Stain Removal</td>
<td>✅ Driveway & Sidewalk Cleaning</td>
</tr>
<tr>
<td>✅ Fence Cleaning</td>
<td>✅ Roof Drainage Cleaning</td>
</tr>
</table>

---

## 📍 Service Areas

**Orlando Metro & Surrounding Areas** (25-mile radius)

Orlando • Winter Park • Maitland • Altamonte Springs • Lake Mary  
Apopka • Oviedo • Windermere • Dr. Phillips • College Park

---

## ⭐ Customer Reviews

<details>
<summary>⭐⭐⭐⭐⭐ Nina Ahumada</summary>

> "Did a great job with window cleaning and pressure washing house, sidewalk, driveway, and fences. Highly recommend based on quality work, attention to detail, and reasonable price."

</details>

<details>
<summary>⭐⭐⭐⭐⭐ Jaudon Marlette</summary>

> "Great job getting pollen and roof drainage off my 2nd story windows. They came out the same day I called and did a great job and great price. Highly recommend them to do your windows and pressure washing."

</details>

<details>
<summary>⭐⭐⭐⭐⭐ T P</summary>

> "They did great job. Took the time to get rid of some stubborn hard water stains and shined up the exterior windows. Highly recommend."

</details>

---

## 🚀 Setup

### Option 1: HTML Interface (Recommended)

1. Open `scripts/create-mako-bros.html` in your browser
2. Click "Create Preview"
3. Access at: `https://elevaris.app/p/mako-bros-window-cleaning`

### Option 2: API Call

```bash
curl -X POST http://localhost:3000/api/previews/create \
  -H "Content-Type: application/json" \
  -d @scripts/mako-bros-config.json
```

### Option 3: Manual Database Insert

1. Open Supabase dashboard
2. Navigate to `client_previews` table
3. Insert row with JSON from `scripts/mako-bros-config.json`

---

## 📁 Files Created

### Pages & API
- ✅ `app/api/previews/create/route.ts` - Preview creation API
- ✅ `app/p/mako-bros-window-cleaning-test/page.tsx` - Test page

### Scripts & Configuration
- ✅ `scripts/create-mako-bros-preview.ts` - TypeScript script
- ✅ `scripts/create-mako-bros.html` - Browser interface
- ✅ `scripts/mako-bros-config.json` - Configuration JSON

### Documentation
- ✅ `MAKO_BROS_INDEX.md` - Documentation index
- ✅ `MAKO_BROS_QUICKSTART.md` - Quick start guide
- ✅ `MAKO_BROS_SUMMARY.md` - Complete overview
- ✅ `MAKO_BROS_ARCHITECTURE.md` - System architecture
- ✅ `scripts/MAKO_BROS_SETUP.md` - Detailed setup guide

---

## 🎯 Template Features

| Section | Description |
|---------|-------------|
| **Navbar** | Sticky header with contact info and CTA |
| **Hero** | Eye-catching intro with shark-themed colors |
| **About** | Company story and values |
| **Services** | 8 service cards with descriptions |
| **Transformation** | Before/after work showcase |
| **Gallery** | Professional work examples |
| **Why Us** | Value propositions and trust signals |
| **Service Areas** | Interactive map + 10 cities |
| **Reviews** | 3 real 5-star customer testimonials |
| **Contact** | Lead capture form with validation |
| **Footer** | Complete site navigation |
| **Mobile CTA** | Floating call/quote buttons |

---

## 📖 Documentation

Start with these docs in order:

1. **[MAKO_BROS_QUICKSTART.md](MAKO_BROS_QUICKSTART.md)** - Get started in 1 minute
2. **[MAKO_BROS_SUMMARY.md](MAKO_BROS_SUMMARY.md)** - Complete overview
3. **[scripts/MAKO_BROS_SETUP.md](scripts/MAKO_BROS_SETUP.md)** - Detailed setup
4. **[MAKO_BROS_ARCHITECTURE.md](MAKO_BROS_ARCHITECTURE.md)** - System design
5. **[MAKO_BROS_INDEX.md](MAKO_BROS_INDEX.md)** - Full documentation index

---

## 🌐 URLs

### Test Preview (Static)
- **Local**: http://localhost:3000/p/mako-bros-window-cleaning-test
- **Status**: Available immediately, no database required

### Live Preview (Database)
- **Production**: https://elevaris.app/p/mako-bros-window-cleaning
- **Local**: http://localhost:3000/p/mako-bros-window-cleaning
- **Status**: Available after creating preview in database

---

## 🔧 Technology Stack

- **Framework**: Next.js 14
- **Template**: Cleaning v1
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS + Framer Motion
- **Maps**: Mapbox GL
- **Type Safety**: TypeScript + Zod

---

## 📊 Project Stats

<table>
<tr>
<td align="center"><b>8</b><br/>Files Created</td>
<td align="center"><b>5</b><br/>Documentation Pages</td>
<td align="center"><b>8</b><br/>Services</td>
<td align="center"><b>10</b><br/>Service Areas</td>
</tr>
<tr>
<td align="center"><b>3</b><br/>Real Reviews</td>
<td align="center"><b>11</b><br/>Template Sections</td>
<td align="center"><b>5.0</b><br/>Star Rating</td>
<td align="center"><b>&lt;5 min</b><br/>Setup Time</td>
</tr>
</table>

---

## ❓ Troubleshooting

<details>
<summary><b>Can't see the test preview?</b></summary>

- Ensure dev server is running: `npm run dev`
- Clear browser cache
- Check for port conflicts (default: 3000)
- View browser console for errors

</details>

<details>
<summary><b>API endpoint not working?</b></summary>

- Verify Supabase credentials in `.env.local`
- Check server logs for errors
- Ensure database table exists: `client_previews`
- Verify slug is unique

</details>

<details>
<summary><b>Want to customize colors?</b></summary>

Edit `scripts/mako-bros-config.json`:

```json
"branding": {
  "primaryColor": "#1B8CA8",
  "accentColor": "#0D3B52"
}
```

Then recreate or update the preview.

</details>

<details>
<summary><b>Need to update Google Place ID?</b></summary>

1. Visit [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Search: "Mako Bros Window Cleaning, Orlando, FL"
3. Copy the real Place ID
4. Update in config or via API

</details>

---

## 🎉 What You Get

<table>
<tr>
<td>

**Website Features**
- ✅ Professional design
- ✅ Mobile-optimized
- ✅ SEO-ready structure
- ✅ Fast performance
- ✅ Accessibility compliant

</td>
<td>

**Business Tools**
- ✅ Lead capture form
- ✅ Click-to-call buttons
- ✅ Google Maps integration
- ✅ Review showcase
- ✅ Service area coverage

</td>
</tr>
</table>

---

## 🚀 Next Steps

1. ✅ View test preview at `/p/mako-bros-window-cleaning-test`
2. ⏳ Create permanent preview using one of 3 methods
3. ⏳ Get real Google Place ID and update
4. ⏳ Share with client for approval
5. ⏳ Deploy to production

---

## 📞 Support

Need help? Check the documentation:
- [Quick Start](MAKO_BROS_QUICKSTART.md)
- [Full Setup Guide](scripts/MAKO_BROS_SETUP.md)
- [Architecture Docs](MAKO_BROS_ARCHITECTURE.md)

---

<div align="center">

**Made with 🦈 for Mako Bros Window Cleaning**

*Professional Window Cleaning - Get Your Sharky Shine Today!*

[Test Preview](http://localhost:3000/p/mako-bros-window-cleaning-test) • [Setup Guide](MAKO_BROS_QUICKSTART.md) • [Full Docs](MAKO_BROS_INDEX.md)

</div>


