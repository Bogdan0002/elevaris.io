# 🦈 Mako Bros Window Cleaning Preview Setup

This guide will help you create a preview page for **Mako Bros Window Cleaning** using your cleaning business template.

## Brand Colors (from logo)
- **Primary Color**: `#1B8CA8` (Teal Blue - shark body)
- **Accent Color**: `#0D3B52` (Navy Blue - shark outline/details)

## Method 1: Using the HTML Interface (Easiest)

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Open the HTML file:**
   - Open `scripts/create-mako-bros.html` in your browser
   - Or navigate to: `file:///C:/Users/felly/OneDrive/Desktop/elevaris.io/scripts/create-mako-bros.html`

3. **Click "Create Preview"** button

4. **Access the preview at:**
   - Production: `https://elevaris.app/p/mako-bros-window-cleaning`
   - Local: `http://localhost:3000/p/mako-bros-window-cleaning`

## Method 2: Using API with curl/Postman

**POST** to `http://localhost:3000/api/previews/create`

**Body:** Use the content from `scripts/mako-bros-config.json`

## Method 3: Manual Database Insert (Supabase)

If the above methods don't work, you can manually insert into Supabase:

1. Go to your Supabase dashboard
2. Navigate to the `client_previews` table
3. Click "Insert" → "Insert row"
4. Fill in:
   - `slug`: `mako-bros-window-cleaning`
   - `niche`: `cleaning`
   - `status`: `preview`
   - `config`: Copy the JSON from `scripts/mako-bros-config.json`

## Business Information

- **Name**: Mako Bros Window Cleaning
- **Phone**: +1 407-883-2877
- **Location**: Orlando, FL
- **Hours**: Mon-Sat: 8am-7pm
- **Rating**: 5.0 stars (8 reviews)
- **Tagline**: "Professional Window Cleaning company dedicated to giving your home the Sharky Shine it deserves."

## Services Included

- Residential Window Cleaning
- Commercial Window Cleaning
- Pressure Washing
- 2-Story Window Cleaning
- Hard Water Stain Removal
- Driveway & Sidewalk Cleaning
- Fence Cleaning
- Roof Drainage Cleaning

## Service Areas

Orlando, Winter Park, Maitland, Altamonte Springs, Lake Mary, Apopka, Oviedo, Windermere, Dr. Phillips, College Park

## Real Customer Reviews

### Nina Ahumada ⭐⭐⭐⭐⭐
"Did a great job with window cleaning and pressure washing house, sidewalk, driveway, and fences. Highly recommend based on quality work, attention to detail, and reasonable price."

### Jaudon Marlette ⭐⭐⭐⭐⭐
"Great job getting pollen and roof drainage off my 2nd story windows. They came out the same day I called and did a great job and great price. Highly recommend them to do your windows and pressure washing."

### T P ⭐⭐⭐⭐⭐
"They did great job. Took the time to get rid of some stubborn hard water stains and shined up the exterior windows. Highly recommend."

## Important Notes

1. **Update Place ID**: The current Place ID (`ChIJMakoBrosPlaceID`) is a placeholder. You need to get the actual Google Place ID for Mako Bros Window Cleaning.

2. **To get the real Place ID:**
   - Go to [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   - Search for "Mako Bros Window Cleaning, Orlando, FL"
   - Copy the Place ID and update it in the config

3. **Template Features:**
   - The cleaning template (v1) will automatically apply the shark theme colors
   - All sections (Hero, About, Services, Reviews, Contact, etc.) are included
   - Mobile-optimized with floating CTA buttons
   - Google Maps integration
   - Review request automation ready

## Customization

After creating the preview, you can update any field by using the update API:

```bash
PUT /api/previews/update/mako-bros-window-cleaning
```

## Preview URL Structure

Once created, the preview will be available at:
- **Subdomain**: `https://elevaris.app/p/mako-bros-window-cleaning`
- **Local**: `http://localhost:3000/p/mako-bros-window-cleaning`

## Template Sections

The preview will include all these sections from your cleaning template:

1. ✅ **Navbar** - Sticky header with contact info
2. ✅ **Hero** - Eye-catching intro with CTA
3. ✅ **About** - Company description
4. ✅ **Services** - All 8 services listed
5. ✅ **Transformation** - Before/after showcase
6. ✅ **Gallery** - Work examples
7. ✅ **Why Us** - Value propositions
8. ✅ **Service Areas** - Map with 10 cities
9. ✅ **Reviews** - 3 real customer reviews
10. ✅ **Contact** - Form with phone/email
11. ✅ **Footer** - Complete site footer

## Troubleshooting

- **"Missing SUPABASE_URL"**: Make sure your `.env.local` file has all Supabase credentials
- **404 on preview**: Wait a few seconds and refresh, or check the database to confirm the record was created
- **Styles not loading**: Clear browser cache or use incognito mode
- **API errors**: Check browser console and server logs for details

---

Happy previewing! 🦈✨


