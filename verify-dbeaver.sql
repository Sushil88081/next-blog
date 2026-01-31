-- DBeaver में run करने के लिए SQL queries
-- Copy करके DBeaver में paste करें और run करें

-- IMPORTANT: Production के लिए Cloud Database use करें
-- Localhost database सिर्फ development के लिए है
-- Production के लिए Supabase/Neon जैसी cloud service use करें

-- 1. Check current database
SELECT current_database();

-- 2. Check current schema
SELECT current_schema();

-- 3. List all tables in public schema
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- 4. Count total comments
SELECT COUNT(*) as total_comments FROM comments;

-- 5. See all comments
SELECT 
  id, 
  post_slug, 
  name, 
  email,
  comment, 
  status, 
  created_at,
  updated_at
FROM comments 
ORDER BY created_at DESC;

-- 6. See comments by status
SELECT 
  status,
  COUNT(*) as count
FROM comments
GROUP BY status;

-- 7. See latest 5 comments
SELECT 
  id,
  post_slug,
  name,
  LEFT(comment, 50) as comment_preview,
  status,
  created_at
FROM comments
ORDER BY id DESC
LIMIT 5;

