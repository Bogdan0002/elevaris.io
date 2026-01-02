# Verify Setup - Quick Checklist

## ✅ Step 1: Environment Variables
Check that `.env.local` exists and has:
- ✅ `SUPABASE_URL`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `NEXT_PUBLIC_OPS_KEY`

## ✅ Step 2: Database Migration
1. Go to: https://supabase.com/dashboard/project/wsadfvwiqrrowxmhbbij/sql
2. Run the migration from `supabase/migrations/001_client_previews.sql`
3. Verify: Go to Table Editor → you should see `client_previews` table

## ✅ Step 3: Test the System

### Start Dev Server:
```bash
npm run dev
```

### Test Ops Console:
Visit: `http://localhost:3000/preview?key=elevaris-ops-2025-secure-key`

You should see the preview generator form.

### Test Creating a Preview:
1. Fill out the form in ops console
2. Click "Generate Preview"
3. Copy the preview URL
4. Visit the preview URL (should be like `http://localhost:3000/p/your-slug`)

### Test List View:
Visit: `http://localhost:3000/preview/list?key=elevaris-ops-2025-secure-key`

You should see a list of all generated previews.

## 🐛 Troubleshooting

### "Missing SUPABASE_URL environment variable"
- Make sure `.env.local` is in the root directory
- Restart your dev server: `npm run dev`

### "Table does not exist"
- Run the migration in Supabase SQL Editor
- Check Table Editor to verify `client_previews` exists

### Preview not found
- Check Supabase Table Editor → `client_previews` table
- Verify the slug exists in the database

### Ops console shows "Unauthorized"
- Make sure the `?key=` parameter matches `NEXT_PUBLIC_OPS_KEY` in `.env.local`
- Current key: `elevaris-ops-2025-secure-key`

