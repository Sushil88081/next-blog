# Fix: getaddrinfo ENOTFOUND Error

## The Problem

The error `getaddrinfo ENOTFOUND db.hlbznyxykegqxdbvzjrv.supabase.co` means the DNS lookup for your Supabase hostname is failing. The hostname cannot be resolved.

## Most Common Cause: Supabase Project is Paused

**Free tier Supabase projects automatically pause after 7 days of inactivity.**

## How to Fix

### Step 1: Check Your Supabase Project Status

1. Go to https://supabase.com/dashboard
2. Log in to your account
3. Find your project (look for the project with hostname `db.hlbznyxykegqxdbvzjrv.supabase.co`)
4. Check the project status:
   - **Active** ✅ - Project is running
   - **Paused** ⏸️ - Project is paused (this is likely your issue!)

### Step 2: Restore Your Supabase Project (if paused)

1. Click on your paused project
2. Click the **"Restore"** or **"Resume"** button
3. Wait a few minutes for the project to restart
4. The hostname should become available again

### Step 3: Get the Correct Connection String

1. In Supabase Dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection string**
3. Select the **URI** tab
4. Copy the connection string
5. It should look like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.hlbznyxykegqxdbvzjrv.supabase.co:5432/postgres
   ```

### Step 4: Update Vercel Environment Variable

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Find `DATABASE_URL` or create it if it doesn't exist
3. Paste the connection string from Supabase
4. **Important:** If your password contains special characters, URL-encode them:
   - Your password: `Infantksmr@1`
   - Encoded: `Infantksmr%401` (the `@` becomes `%40`)
5. Full connection string should be:
   ```
   postgresql://postgres:Infantksmr%401@db.hlbznyxykegqxdbvzjrv.supabase.co:5432/postgres
   ```
6. Make sure it's set for **Production** environment
7. Click **Save**
8. **Redeploy** your application

## Alternative: Use Supabase Connection Pooler

If the direct connection still doesn't work, try using Supabase's connection pooler:

1. In Supabase Dashboard → **Settings** → **Database**
2. Scroll to **Connection pooling**
3. Select **Transaction** mode
4. Copy the connection string (it will have a different hostname)
5. It will look like:
   ```
   postgresql://postgres.hlbznyxykegqxdbvzjrv:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
6. Update `DATABASE_URL` in Vercel with this connection string
7. Redeploy

## Verify the Fix

After updating and redeploying:

1. Test your API endpoint: `https://learn-code-easy.vercel.app/api/routes`
2. Check Vercel function logs - you should see:
   ```
   ✅ Database connection test successful
   ```
3. If you still see errors, check the logs for the specific error message

## Prevention

To prevent your Supabase project from pausing:

1. **Upgrade to Pro plan** (if you need 24/7 availability)
2. **Keep the project active** by using it regularly
3. **Set up a cron job** to ping your database periodically (if on free tier)

## Still Having Issues?

1. Verify the connection string format is correct
2. Check Supabase project logs for any errors
3. Try the connection pooler instead of direct connection
4. Contact Supabase support if the project appears active but connection fails

