# Preview System Setup Guide

## Required Information from Supabase

From your Supabase dashboard, you need:

1. **Project URL** (you have this): `https://wsadfvwiqrrowxmhbbij.supabase.co`
2. **Publishable API Key** (you have this): `sb_publishable_c-ltzrlt5LVISMEsM4X4wg_cODtXi2l`
3. **Service Role Key** (you need this): 
   - Go to: Settings → API → Project API keys
   - Find "service_role" key (secret, never expose in client)
   - Copy it

## Optional (for Mapbox map feature):
- **Mapbox Access Token**: Get from https://account.mapbox.com/access-tokens/

## Step 1: Create Environment Variables File

Create `.env.local` in the root of your project with:

```env
# Supabase - Server-side (for API routes and server components)
SUPABASE_URL=https://wsadfvwiqrrowxmhbbij.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Supabase - Client-side (for browser)
NEXT_PUBLIC_SUPABASE_URL=https://wsadfvwiqrrowxmhbbij.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_c-ltzrlt5LVISMEsM4X4wg_cODtXi2l

# Ops Console Access Key (create a secure random string)
NEXT_PUBLIC_OPS_KEY=your_secure_random_key_here

# Mapbox (optional - for service area maps)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```

## Step 2: Run Database Migration ⚠️ IMPORTANT

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/wsadfvwiqrrowxmhbbij
2. Navigate to: **SQL Editor** (left sidebar)
3. Click **"New query"**
4. Copy the ENTIRE contents of `supabase/migrations/001_client_previews.sql`
5. Paste into the SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. You should see: "Success. No rows returned" - this means it worked!

**Verify it worked:**
- Go to: **Table Editor** (left sidebar)
- You should see a new table called `client_previews`

This will create:
- `client_previews` table
- Indexes for performance
- Auto-update trigger for `updated_at`

## Step 3: Test the System

### Test Ops Console:
1. Start dev server: `npm run dev`
2. Visit: `http://localhost:3000/preview?key=YOUR_OPS_KEY`
3. Fill out the form and generate a preview

### Test Preview:
1. After generating, copy the preview URL
2. Visit the preview URL (should be like `http://localhost:3000/p/your-slug`)
3. Verify the preview renders correctly

### Test List:
1. Visit: `http://localhost:3000/preview/list?key=YOUR_OPS_KEY`
2. Verify you can see generated previews

## Troubleshooting

### "Missing SUPABASE_URL environment variable"
- Make sure `.env.local` exists in the root directory
- Restart your dev server after creating/updating `.env.local`

### "Failed to create preview"
- Check that the migration ran successfully
- Verify Service Role Key is correct
- Check Supabase dashboard for any errors

### Preview not found
- Verify the slug was created in the database
- Check Supabase dashboard → Table Editor → `client_previews`

## Production Deployment

When deploying to production (Vercel, etc.):

1. Add all environment variables to your hosting platform
2. Make sure `NEXT_PUBLIC_*` variables are set (they're exposed to the browser)
3. Keep `SUPABASE_SERVICE_ROLE_KEY` secret (server-only)
4. Run the migration on your production Supabase instance

