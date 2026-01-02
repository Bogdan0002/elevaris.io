# Quick Setup Checklist

## ✅ COMPLETED:
- ✅ `.env.local` file created with all credentials
- ✅ Environment variables configured
- ✅ Ops key set: `elevaris-ops-2025-secure-key`

## ⚠️ ACTION REQUIRED:

### 1. Run Database Migration (CRITICAL)
1. Go to: https://supabase.com/dashboard/project/wsadfvwiqrrowxmhbbij/sql
2. Click **"New query"**
3. Open file: `supabase/migrations/001_client_previews.sql`
4. Copy **ALL** contents
5. Paste into SQL Editor
6. Click **"Run"** (or Ctrl+Enter)
7. ✅ You should see: "Success. No rows returned"

**Verify:** Go to Table Editor → you should see `client_previews` table

### 2. Test the System
```bash
npm run dev
```

Then visit:
- **Ops Console:** `http://localhost:3000/preview?key=elevaris-ops-2025-secure-key`
- **List View:** `http://localhost:3000/preview/list?key=elevaris-ops-2025-secure-key`

### 3. Generate Your First Preview
1. Fill out the form in ops console
2. Click "Generate Preview"
3. Copy the preview URL
4. Visit it to see your preview!

