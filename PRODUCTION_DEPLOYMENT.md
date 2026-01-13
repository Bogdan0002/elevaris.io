# 🚀 Production Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in all required values:

```bash
cp .env.example .env.local
```

**Required Variables:**
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`
- ✅ `NEXT_PUBLIC_MAPBOX_TOKEN`

**Optional Variables:**
- `OPENAI_API_KEY` (for AI features)
- `NEXT_PUBLIC_APP_URL` (defaults to elevaris.app)
- `NEXT_PUBLIC_PREVIEW_URL` (defaults to p.elevaris.app)

### 2. Database Setup

Ensure your Supabase database has the `client_previews` table:

```sql
CREATE TABLE IF NOT EXISTS client_previews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  niche TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'preview',
  config JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_client_previews_slug ON client_previews(slug);
CREATE INDEX idx_client_previews_status ON client_previews(status);
CREATE INDEX idx_client_previews_niche ON client_previews(niche);
```

### 3. Vercel Project Setup

1. **Import your repository** to Vercel
2. **Configure domains:**
   - Main: `elevaris.app` → Production
   - Preview: `p.elevaris.app` → Production
   - Ops: `ops.elevaris.app` → Production

3. **Add environment variables** in Vercel dashboard:
   - Go to Settings → Environment Variables
   - Add all variables from `.env.example`
   - Apply to: Production, Preview, Development

4. **Configure DNS** (in your domain registrar):
   ```
   A     @              76.76.21.21
   CNAME www            cname.vercel-dns.com
   CNAME p              cname.vercel-dns.com
   CNAME ops            cname.vercel-dns.com
   ```

### 4. Mapbox Setup

1. Go to [Mapbox Account](https://account.mapbox.com/)
2. Create a new token with these scopes:
   - ✅ `styles:read`
   - ✅ `fonts:read`
   - ✅ `datasets:read`
3. Add restrictions (optional but recommended):
   - URL: `https://elevaris.app/*`, `https://p.elevaris.app/*`
4. Copy token to `NEXT_PUBLIC_MAPBOX_TOKEN`

## Deployment Steps

### Step 1: Final Code Check

```bash
# Run linter
npm run lint

# Build locally to catch errors
npm run build

# Test production build locally
npm run start
```

### Step 2: Create Mako Bros Preview

Before deploying, create the Mako Bros preview in your production database:

**Option A: Using Supabase UI**
1. Go to Supabase dashboard
2. Open `client_previews` table
3. Click "Insert row"
4. Copy JSON from `scripts/mako-bros-config.json`
5. Paste into `config` field
6. Set `slug`: `mako-bros-window-cleaning`
7. Set `niche`: `cleaning`
8. Set `status`: `preview`
9. Click "Save"

**Option B: Using Production API** (after initial deployment)
```bash
curl -X POST https://elevaris.app/api/previews/create \
  -H "Content-Type: application/json" \
  -d @scripts/mako-bros-config.json
```

### Step 3: Deploy to Vercel

```bash
# Commit all changes
git add .
git commit -m "Production ready: Mako Bros Window Cleaning preview"

# Push to main branch (triggers Vercel deployment)
git push origin main
```

### Step 4: Verify Deployment

Once deployed, check these URLs:

1. **Main site**: `https://elevaris.app` ✅
2. **Mako Bros preview**: `https://p.elevaris.app/mako-bros-window-cleaning` ✅
3. **Test page**: `https://p.elevaris.app/mako-bros-window-cleaning-test` ✅
4. **Ops dashboard**: `https://ops.elevaris.app` ✅

### Step 5: Test Everything

- [ ] Main homepage loads
- [ ] Mako Bros preview loads with correct colors
- [ ] All sections render (navbar, hero, services, etc.)
- [ ] Contact form works
- [ ] Phone number links work (click-to-call)
- [ ] Map displays correctly
- [ ] Mobile responsive (test on phone)
- [ ] Floating CTA buttons appear on mobile
- [ ] Reviews display correctly
- [ ] Service areas show on map

## Post-Deployment

### Update Google Place ID

The config currently has a placeholder Place ID. Update it with the real one:

1. Get real Place ID from [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Search: "Mako Bros Window Cleaning, Orlando, FL"
3. Update via API or Supabase:

```bash
# Via API
curl -X PUT https://elevaris.app/api/previews/update/mako-bros-window-cleaning \
  -H "Content-Type: application/json" \
  -d '{"placeId": "ChIJ_REAL_PLACE_ID_HERE"}'

# Or update directly in Supabase
```

### Share with Client

Send client the preview URL:
```
https://p.elevaris.app/mako-bros-window-cleaning
```

### Monitor Performance

Check Vercel Analytics:
- Page load times
- Error rates
- API response times
- Geographic distribution

## Troubleshooting

### Preview Not Loading?

1. Check Vercel logs: `vercel logs`
2. Verify environment variables are set
3. Check database connection
4. Verify slug exists in database

### Map Not Showing?

1. Verify Mapbox token is set
2. Check token permissions
3. Check browser console for errors
4. Verify URL restrictions (if set)

### Colors Look Wrong?

1. Clear browser cache
2. Check config in database: `primaryColor`, `accentColor`
3. Verify colors are valid hex codes

### 404 on Subdomain?

1. Verify DNS is configured correctly
2. Check Vercel domain settings
3. Wait for DNS propagation (can take up to 48 hours)
4. Test with `dig p.elevaris.app` or `nslookup p.elevaris.app`

## Rollback Plan

If something goes wrong:

```bash
# Revert to previous deployment in Vercel
vercel rollback

# Or redeploy a specific commit
git revert HEAD
git push origin main
```

## Performance Optimization

After deployment, consider:

1. **Enable Vercel Speed Insights**
   ```bash
   npm install @vercel/speed-insights
   ```

2. **Add Vercel Analytics**
   ```bash
   npm install @vercel/analytics
   ```

3. **Enable Image Optimization**
   - Already configured in `next.config.js`
   - Use Next.js `<Image />` component

4. **Monitor Core Web Vitals**
   - Check in Vercel dashboard
   - Aim for green scores

## Security Checklist

- [x] Environment variables in Vercel (not in code)
- [x] HTTPS enabled (automatic with Vercel)
- [x] Security headers configured (`vercel.json`)
- [x] API routes protected
- [x] No sensitive data in client code
- [x] Supabase RLS policies configured (check your policies)

## Support

If you need help:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Review error messages in browser console
4. Check middleware logs (development mode)

---

## Quick Reference

### URLs
- **Main**: https://elevaris.app
- **Preview**: https://p.elevaris.app/[slug]
- **Ops**: https://ops.elevaris.app
- **Test Page**: https://p.elevaris.app/mako-bros-window-cleaning-test

### Commands
```bash
# Local development
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Deploy to Vercel
git push origin main

# View logs
vercel logs
```

### Files Modified
- ✅ `vercel.json` - Subdomain routing & security headers
- ✅ `.env.example` - Environment variable template
- ✅ `middleware.ts` - Subdomain handling (already configured)
- ✅ `app/api/previews/create/route.ts` - Preview creation API
- ✅ `app/p/mako-bros-window-cleaning-test/page.tsx` - Test page

---

**Ready to deploy!** 🚀

Run: `git push origin main`

