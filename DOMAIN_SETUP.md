# Domain & Subdomain Setup Guide

## Issues Found

1. **Subdomains not working** (`p.elevaris.app`, `ops.elevaris.app`)
2. **Unauthorized access** on main domain

## Solution

### For Subdomains to Work:

The middleware is correct, but you need to configure DNS and Vercel:

#### Step 1: Add Domains in Vercel

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add these domains:
   - `elevaris.app` (main)
   - `p.elevaris.app` (preview subdomain)
   - `ops.elevaris.app` (ops console subdomain)

#### Step 2: Configure DNS at Your Domain Provider (Simply.com)

Add these DNS records:

**For Main Domain:**
- Type: `CNAME` or `A` record
- Name: `@` (or root)
- Value: Vercel's provided value (check Vercel dashboard)

**For Preview Subdomain:**
- Type: `CNAME`
- Name: `p`
- Value: `cname.vercel-dns.com` (or what Vercel provides)

**For Ops Subdomain:**
- Type: `CNAME`
- Name: `ops`
- Value: `cname.vercel-dns.com` (or what Vercel provides)

**Important:** Keep your existing MX records for email (don't delete them!)

### For Ops Console Access:

The key `elevaris-ops-2025-secure-key` is correct in your `.env.local`, but you need to add it to **Vercel's environment variables**:

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add:
   - `NEXT_PUBLIC_OPS_KEY` = `elevaris-ops-2025-secure-key`
3. Make sure it's set for **Production**, **Preview**, and **Development**
4. Redeploy your project

### Testing URLs:

Once DNS propagates (can take 24-48 hours):

- **Main site:** `https://elevaris.app`
- **Ops console:** `https://ops.elevaris.app/preview?key=elevaris-ops-2025-secure-key`
- **Preview:** `https://p.elevaris.app/your-slug`
- **List previews:** `https://ops.elevaris.app/preview/list?key=elevaris-ops-2025-secure-key`

### Temporary Workaround (Until DNS Propagates):

You can still access via main domain:
- `https://elevaris.app/preview?key=elevaris-ops-2025-secure-key`
- `https://elevaris.app/p/your-slug`

But make sure `NEXT_PUBLIC_OPS_KEY` is set in Vercel!

## Quick Checklist

- [ ] Added all 3 domains in Vercel (elevaris.app, p.elevaris.app, ops.elevaris.app)
- [ ] Added DNS CNAME records for `p` and `ops` subdomains
- [ ] Added `NEXT_PUBLIC_OPS_KEY` to Vercel environment variables
- [ ] Redeployed after adding env vars
- [ ] Waited for DNS propagation (check with `nslookup p.elevaris.app`)

