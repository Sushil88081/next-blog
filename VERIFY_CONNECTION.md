# Verify Your Database Connection Setup

## Quick Checklist

### ✅ Step 1: Verify Connection String Format

Your connection string should look like this:
```
postgresql://postgres.hlbznyxykegqxdbvzjrv:Infantksmr%401@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres
```

**Check these parts:**
- ✅ Hostname contains `pooler.supabase.com` (NOT `db.xxxxx.supabase.co`)
- ✅ Port is `6543` (NOT `5432`)
- ✅ Username is `postgres.hlbznyxykegqxdbvzjrv` (includes project reference)
- ✅ Password is URL-encoded: `Infantksmr%401` (the `@` is `%40`)

### ✅ Step 2: Verify in Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Find `DATABASE_URL`
3. Click to view/edit it
4. Verify it matches exactly:
   ```
   postgresql://postgres.hlbznyxykegqxdbvzjrv:Infantksmr%401@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres
   ```
5. Make sure it's set for **Production** environment
6. **Save** if you made changes

### ✅ Step 3: Redeploy

After updating the environment variable:
1. Go to **Deployments** tab in Vercel
2. Click **"Redeploy"** on the latest deployment
3. OR push a new commit to trigger a new deployment

### ✅ Step 4: Check Vercel Logs

After redeploying, check the logs:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Go to **Functions** tab
4. Click on a function log
5. Look for these messages:

**✅ Good signs:**
```
🔌 Initializing database pool
   Host: aws-1-ap-northeast-1.pooler.supabase.com
   Port: 6543
   Using Pooler: Yes ✅
✅ Database connection test successful
```

**❌ Bad signs:**
```
   Host: db.hlbznyxykegqxdbvzjrv.supabase.co  ← Wrong! Using direct connection
   Port: 5432  ← Wrong port
   Using Pooler: No ❌  ← Not using pooler
```

### ✅ Step 5: Verify Supabase Project Status

1. Go to https://supabase.com/dashboard
2. Check if your project shows **"Active"** (not "Paused")
3. If paused, click **"Restore"** and wait a few minutes

## Common Mistakes

### ❌ Mistake 1: Using Direct Connection
```
postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
```
**Problem:** Direct connection is IPv6 only, not compatible with Vercel

**Fix:** Use pooler connection instead

### ❌ Mistake 2: Wrong Password Encoding
```
postgresql://postgres:Infantksmr@1@pooler...  ← Wrong! @ not encoded
```
**Problem:** The `@` in password breaks the URL

**Fix:** Encode as `Infantksmr%401`

### ❌ Mistake 3: Not Redeploying
**Problem:** Updated environment variable but didn't redeploy

**Fix:** Redeploy after updating environment variables

### ❌ Mistake 4: Wrong Environment
**Problem:** Set DATABASE_URL only for Preview, not Production

**Fix:** Make sure it's set for **Production** environment

## Test Your Connection

After redeploying, test your API:
```bash
curl -X POST https://learn-code-easy.vercel.app/api/routes \
  -H "Content-Type: application/json" \
  -d '{
    "post_slug": "test",
    "name": "Test User",
    "comment": "This is a test comment"
  }'
```

Or use your browser/Postman to POST to the endpoint.

## Still Not Working?

1. **Check Vercel logs** - Look for the exact error message
2. **Verify connection string** - Copy it exactly from Supabase dashboard
3. **Check Supabase project** - Make sure it's active
4. **Try different pooler method** - Switch between "Session" and "Transaction" in Supabase

