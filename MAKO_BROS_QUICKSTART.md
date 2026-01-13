# 🦈 Mako Bros - Quick Start

## Instant Preview (Zero Setup!)

```bash
npm run dev
```

Then visit: **http://localhost:3000/p/mako-bros-window-cleaning-test**

---

## Create Permanent Preview

### Option 1: HTML Interface (Easiest)

1. Open: `scripts/create-mako-bros.html` in browser
2. Click: "Create Preview"
3. Done! ✅

### Option 2: API Call

```bash
curl -X POST http://localhost:3000/api/previews/create \
  -H "Content-Type: application/json" \
  -d @scripts/mako-bros-config.json
```

### Option 3: Manual DB Insert

1. Open Supabase dashboard
2. Go to `client_previews` table
3. Insert row with JSON from `scripts/mako-bros-config.json`

---

## Access Preview

**Test (Static)**: `/p/mako-bros-window-cleaning-test`  
**Live (Database)**: `/p/mako-bros-window-cleaning`

---

## Brand Colors

- Primary: `#1B8CA8` (Teal)
- Accent: `#0D3B52` (Navy)

---

## Files Created

- ✅ `app/api/previews/create/route.ts` - API endpoint
- ✅ `app/p/mako-bros-window-cleaning-test/page.tsx` - Test page
- ✅ `scripts/create-mako-bros-preview.ts` - Script
- ✅ `scripts/create-mako-bros.html` - HTML interface
- ✅ `scripts/mako-bros-config.json` - Config
- ✅ `scripts/MAKO_BROS_SETUP.md` - Full docs
- ✅ `MAKO_BROS_SUMMARY.md` - Complete overview

---

**That's it!** 🎉

See `MAKO_BROS_SUMMARY.md` for full details.

