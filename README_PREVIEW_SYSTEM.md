# Preview System - Ready to Use! 🚀

## ✅ Setup Complete

Your `.env.local` file has been created with:
- ✅ Supabase credentials configured
- ✅ Ops console access key set
- ✅ All environment variables ready

## 🎯 Next Steps

### 1. Run Database Migration (REQUIRED)

**Go to Supabase SQL Editor:**
https://supabase.com/dashboard/project/wsadfvwiqrrowxmhbbij/sql

**Steps:**
1. Click "New query"
2. Open `supabase/migrations/001_client_previews.sql`
3. Copy entire file contents
4. Paste into SQL Editor
5. Click "Run"
6. ✅ Should see "Success. No rows returned"

**Verify:** Table Editor → `client_previews` table exists

### 2. Start Development Server

```bash
npm run dev
```

### 3. Access Ops Console

Visit: `http://localhost:3000/preview?key=elevaris-ops-2025-secure-key`

### 4. Generate Your First Preview

1. Fill out the form:
   - Business name, city, state, phone
   - Google Place ID
   - Offer text
   - Services (one per line)
   - Areas served (one per line)
   - Colors, etc.

2. Click "Generate Preview"

3. Copy the preview URL and visit it!

## 📍 Important URLs

- **Ops Console:** `/preview?key=elevaris-ops-2025-secure-key`
- **List Previews:** `/preview/list?key=elevaris-ops-2025-secure-key`
- **Preview:** `/p/{slug}` (generated automatically)

## 🔐 Security Note

The ops key `elevaris-ops-2025-secure-key` is set for development. 
**Change it to something more secure before production!**

## 🗺️ Optional: Mapbox Setup

For the service area map feature:
1. Get token from: https://account.mapbox.com/access-tokens/
2. Add to `.env.local`: `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token`

## 🐛 Troubleshooting

See `VERIFY_SETUP.md` for detailed troubleshooting steps.

