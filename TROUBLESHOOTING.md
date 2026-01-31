# Troubleshooting Database Connection Issues

## Error: getaddrinfo ENOTFOUND

This error means the DNS lookup for your Supabase hostname is failing. The hostname cannot be resolved.

### Possible Causes:

1. **Supabase Project is Paused**
   - Free tier Supabase projects pause after inactivity
   - Go to your Supabase dashboard and check project status
   - If paused, click "Restore" to reactivate

2. **Incorrect Hostname**
   - Verify the hostname in your connection string matches your Supabase project
   - Get the correct connection string from: Supabase Dashboard → Settings → Database → Connection String

3. **Project Deleted or Moved**
   - Check if your Supabase project still exists
   - Verify you're using the correct project

4. **Network/DNS Issues**
   - Vercel might have temporary DNS issues
   - Try redeploying after a few minutes

### How to Fix:

#### Step 1: Verify Your Supabase Project

1. Go to https://supabase.com/dashboard
2. Check if your project is active (not paused)
3. If paused, click "Restore" to reactivate

#### Step 2: Get the Correct Connection String

1. In Supabase Dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection string**
3. Select **URI** tab
4. Copy the connection string
5. It should look like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

#### Step 3: Update Vercel Environment Variable

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `DATABASE_URL` with the correct connection string
3. Make sure to URL-encode special characters in the password:
   - `@` → `%40`
   - `#` → `%23`
   - etc.
4. Redeploy your application

#### Step 4: Test the Connection

You can test locally:
```bash
DATABASE_URL="your-connection-string" node check-db.js
```

### Alternative: Use Supabase Connection Pooling

If direct connection doesn't work, you can use Supabase's connection pooler:

1. In Supabase Dashboard → Settings → Database
2. Find **Connection pooling**
3. Use the **Transaction** mode connection string
4. It will have a different port (usually 6543) and format:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

### Verify Connection String Format

Your connection string should be:
```
postgresql://postgres:Infantksmr%401@db.hlbznyxykegqxdbvzjrv.supabase.co:5432/postgres
```

Make sure:
- Protocol: `postgresql://` (not `postgres://`)
- Username: `postgres`
- Password: URL-encoded (your password `Infantksmr@1` becomes `Infantksmr%401`)
- Host: `db.hlbznyxykegqxdbvzjrv.supabase.co`
- Port: `5432`
- Database: `postgres`

### Check Supabase Project Status

1. Go to https://supabase.com/dashboard
2. Find your project
3. Check if it shows "Active" or "Paused"
4. If paused, restore it

### Still Having Issues?

1. Check Vercel function logs for detailed error messages
2. Verify the connection string in Supabase dashboard matches what you set in Vercel
3. Try using the connection pooler instead of direct connection
4. Contact Supabase support if the project appears active but connection fails

