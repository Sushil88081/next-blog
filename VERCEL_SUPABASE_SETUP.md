# Vercel + Supabase Setup Guide

## ⚠️ Important: Use Connection Pooler for Vercel

**Vercel runs on IPv4 networks, but Supabase's direct connection requires IPv6.** You **MUST** use the **Connection Pooler** instead of the direct connection.

## Step-by-Step Setup

### Step 1: Get the Connection Pooler String from Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **Database**
4. Scroll down to **Connection string** section
5. Click on the **"Connection String"** tab
6. Set the dropdowns:
   - **Type:** `URI`
   - **Source:** `Connection Pooler` (NOT "Primary Database")
   - **Method:** `Session` or `Transaction` (both work, Session is recommended)
7. Copy the connection string - it will look like:
   ```
   postgresql://postgres.hlbznyxykegqxdbvzjrv:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
   Notice the differences:
   - Hostname: `aws-0-us-east-1.pooler.supabase.com` (NOT `db.hlbznyxykegqxdbvzjrv.supabase.co`)
   - Port: `6543` (NOT `5432`)
   - Username: `postgres.hlbznyxykegqxdbvzjrv` (includes project reference)

### Step 2: URL-Encode Your Password

Your password is: `Infantksmr@1`

Special characters need to be URL-encoded:
- `@` becomes `%40`
- So `Infantksmr@1` becomes `Infantksmr%401`

### Step 3: Construct the Full Connection String

Replace `[YOUR-PASSWORD]` with your URL-encoded password:

```
postgresql://postgres.hlbznyxykegqxdbvzjrv:Infantksmr%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Important:** 
- Use the **pooler hostname** (aws-0-*.pooler.supabase.com)
- Use port **6543** (not 5432)
- Use the **pooler username** format (postgres.PROJECT_REF)

### Step 4: Set in Vercel Environment Variables

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: `learn-code-easy`
3. Go to **Settings** → **Environment Variables**
4. Add or update the variable:
   - **Key:** `DATABASE_URL`
   - **Value:** Paste your complete connection string with URL-encoded password:
     ```
     postgresql://postgres.hlbznyxykegqxdbvzjrv:Infantksmr%401@aws-0-us-east-1.pooler.supabase.com:6543/postgres
     ```
   - **Environment:** Select all (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** your application (or wait for automatic redeploy)

### Step 5: Verify the Connection

After redeploying, test your API:
- URL: `https://learn-code-easy.vercel.app/api/routes`
- Method: POST
- Check Vercel function logs - you should see:
  ```
  ✅ Database connection test successful
  ```

## Why Connection Pooler?

- ✅ **IPv4 compatible** - Works with Vercel's network
- ✅ **Better for serverless** - Handles connection pooling automatically
- ✅ **More reliable** - Designed for cloud/serverless environments
- ✅ **No IPv4 add-on needed** - Free solution

## Troubleshooting

### Still getting ENOTFOUND error?

1. **Verify you're using the pooler connection string:**
   - Hostname should contain `pooler.supabase.com`
   - Port should be `6543`
   - Username should be `postgres.PROJECT_REF`

2. **Check password encoding:**
   - Make sure `@` is encoded as `%40`
   - Test with: `node -e "console.log(encodeURIComponent('Infantksmr@1'))"`

3. **Verify in Vercel:**
   - Go to Settings → Environment Variables
   - Make sure `DATABASE_URL` is set for **Production**
   - Check the value matches exactly (no extra spaces or quotes)

4. **Check Supabase project status:**
   - Make sure your project is **Active** (not paused)
   - Go to Supabase Dashboard to verify

## Quick Reference

**Direct Connection (DON'T USE for Vercel):**
```
postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
❌ Not IPv4 compatible
```

**Connection Pooler (USE for Vercel):**
```
postgresql://postgres.xxxxx:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
✅ IPv4 compatible
```

