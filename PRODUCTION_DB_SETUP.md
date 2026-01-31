# Production Database Setup Guide

## Problem
Your live site on Vercel cannot connect to `localhost:5432` because:
- Vercel servers are in the cloud
- They cannot access your local machine's database
- You need a cloud database accessible from the internet

## Solution: Use Cloud PostgreSQL

You need a cloud PostgreSQL database that both:
1. **Vercel** can connect to (for production)
2. **DBeaver** can connect to (for viewing/managing data)

## Recommended Cloud PostgreSQL Providers

### Option 1: Supabase (Free Tier - Recommended)
- **Free tier:** 500MB database, 2GB bandwidth
- **URL:** https://supabase.com
- **Setup:**
  1. Sign up at https://supabase.com
  2. Create a new project
  3. Go to Settings → Database
  4. Copy the connection string

### Option 2: Neon (Free Tier)
- **Free tier:** 3GB storage, unlimited projects
- **URL:** https://neon.tech
- **Setup:**
  1. Sign up at https://neon.tech
  2. Create a new project
  3. Copy the connection string from dashboard

### Option 3: Railway (Free Trial)
- **URL:** https://railway.app
- **Setup:**
  1. Sign up at https://railway.app
  2. Create PostgreSQL service
  3. Get connection string

### Option 4: Render (Free Tier)
- **Free tier:** 90 days free, then $7/month
- **URL:** https://render.com
- **Setup:**
  1. Sign up at https://render.com
  2. Create PostgreSQL database
  3. Get connection string

## Step-by-Step Setup (Using Supabase as Example)

### 1. Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub/Google
4. Click "New Project"
5. Fill in:
   - **Name:** blog-comments
   - **Database Password:** (choose a strong password)
   - **Region:** Choose closest to you
6. Wait for project to be created (2-3 minutes)

### 2. Get Connection String

1. Go to **Settings** → **Database**
2. Scroll to **Connection string**
3. Select **URI** tab
4. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

### 3. Create Tables in Cloud Database

1. Go to **SQL Editor** in Supabase
2. Run this SQL (from `create-comments-table.sql`):

```sql
-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  post_slug VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  comment TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_comments_post_slug ON comments(post_slug);
CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
CREATE TRIGGER update_comments_updated_at 
  BEFORE UPDATE ON comments
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

### 4. Set Environment Variable in Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Select your project (`blog` or similar)
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `DATABASE_URL`
   - **Value:** Your Supabase connection string
   - **Environment:** Production, Preview, Development (select all)
5. Click **Save**
6. **Redeploy** your application (important!)

### 5. Connect DBeaver to Cloud Database

1. Open DBeaver
2. **New Database Connection** (Ctrl+Shift+N)
3. Select **PostgreSQL**
4. Enter details from your Supabase connection string:
   - **Host:** `db.xxxxx.supabase.co` (from connection string)
   - **Port:** `5432`
   - **Database:** `postgres` (usually)
   - **Username:** `postgres`
   - **Password:** Your Supabase database password
5. Click **Test Connection**
6. If successful, click **Finish**

### 6. Verify Connection

In DBeaver, run:
```sql
SELECT COUNT(*) FROM comments;
```

## Environment Variables Summary

### For Local Development (.env.local):
```env
DATABASE_URL=postgresql://postgres:root@localhost:5432/comments
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### For Production (Vercel):
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
NEXT_PUBLIC_SITE_URL=https://learn-code-easy.vercel.app
NODE_ENV=production
```

## Important Notes

1. **Never commit `.env.local`** to git (it's already in .gitignore)
2. **Use different databases** for development and production (recommended)
3. **Backup regularly** - Cloud databases can be backed up
4. **Monitor usage** - Free tiers have limits
5. **Security** - Keep your database password secure

## Testing Production Connection

After setup, test by:
1. Deploy to Vercel
2. Submit a comment on your live site
3. Check in DBeaver (connected to cloud DB) - you should see the comment

## Troubleshooting

### Connection Refused
- Check firewall settings in cloud provider
- Verify connection string is correct
- Check if database is paused (some providers pause inactive databases)

### Authentication Failed
- Verify password is correct
- Check if IP whitelist is enabled (disable for Vercel)

### Table Not Found
- Run the SQL schema in cloud database
- Verify you're connected to correct database

