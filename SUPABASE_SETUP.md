# Supabase Database Setup Guide

## Connection String Format

Your Supabase connection string should be in this format:
```
postgresql://postgres:[YOUR-PASSWORD]@db.hlbznyxykegqxdbvzjrv.supabase.co:5432/postgres
```

**Important:** Replace `[YOUR-PASSWORD]` with your actual Supabase database password.

### Getting Your Supabase Password

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Database**
3. Find your database password (or reset it if needed)
4. Copy the connection string or construct it manually

### URL Encoding Special Characters

If your password contains special characters, you need to URL-encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`
- `&` becomes `%26`
- `+` becomes `%2B`
- `=` becomes `%3D`
- `?` becomes `%3F`
- `/` becomes `%2F`
- ` ` (space) becomes `%20`

**Example:**
If your password is `MyP@ss#123`, the encoded connection string would be:
```
postgresql://postgres:MyP%40ss%23123@db.hlbznyxykegqxdbvzjrv.supabase.co:5432/postgres
```

## Setting DATABASE_URL in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Key:** `DATABASE_URL`
   - **Value:** Your complete connection string (with password replaced)
4. Make sure to set it for **Production**, **Preview**, and **Development** environments
5. Redeploy your application

## Database Schema Setup

### Step 1: Create the Comments Table

Run the SQL in `create-comments-table.sql` in your Supabase SQL Editor.

### Step 2: Fix Email Column (if table already exists)

If you already created the table with email as NOT NULL, run:
```sql
ALTER TABLE comments ALTER COLUMN email DROP NOT NULL;
```

Or use the migration script: `fix-email-column.sql`

## Testing the Connection

You can test your connection using the `check-db.js` script:

```bash
DATABASE_URL="your-connection-string" node check-db.js
```

## Common Issues

### 1. Connection Timeout
- Check if your Supabase project is active
- Verify the connection string is correct
- Ensure SSL is enabled (handled automatically for Supabase)

### 2. Authentication Failed
- Verify your password is correct
- Check if special characters are URL-encoded
- Make sure you're using the `postgres` user password, not your Supabase account password

### 3. Table Not Found
- Run the `create-comments-table.sql` script in Supabase SQL Editor
- Verify the table exists: `SELECT * FROM comments LIMIT 1;`

### 4. Column Constraint Error
- If you get an error about email being required, run the migration script
- Or recreate the table with the updated schema

## Security Notes

- Never commit your connection string to Git
- Always use environment variables
- The connection string contains your database password - keep it secure
- Supabase automatically handles SSL connections

