# DBeaver Connection Guide

## Connection Details for DBeaver

### Database Information:
- **Host:** localhost (or 127.0.0.1)
- **Port:** 5432
- **Database:** comments
- **Username:** postgres
- **Password:** root
- **Schema:** public

### Connection String:
```
postgresql://postgres:root@localhost:5432/comments
```

## Steps to Connect in DBeaver:

1. **Open DBeaver**
2. **New Database Connection** (Ctrl+Shift+N)
3. **Select PostgreSQL**
4. **Enter Details:**
   - Host: `localhost`
   - Port: `5432`
   - Database: `comments`
   - Username: `postgres`
   - Password: `root`
5. **Test Connection** - Should show "Connected"
6. **Finish**

## To See Comments Table:

1. **Expand:** `comments` database → `Schemas` → `public` → `Tables`
2. **Right-click on `comments` table** → **View Data**
3. **Or run SQL:**
   ```sql
   SELECT * FROM comments ORDER BY id DESC;
   ```

## If Still Not Showing:

1. **Refresh Connection:** Right-click on database → Refresh
2. **Check Schema:** Make sure you're looking in `public` schema
3. **Run Query:**
   ```sql
   SELECT COUNT(*) FROM comments;
   ```
   Should return: 5

4. **Check Current Database:**
   ```sql
   SELECT current_database();
   ```
   Should return: `comments`

5. **List All Tables:**
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```
   Should show: `comments`

## Quick Test Query:

```sql
SELECT 
  id, 
  post_slug, 
  name, 
  LEFT(comment, 30) as comment_preview,
  status, 
  created_at 
FROM comments 
ORDER BY created_at DESC;
```

This should show all 5 comments.

