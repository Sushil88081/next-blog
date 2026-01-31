// Quick script to check database connection and table structure
require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

async function checkDatabase() {
  console.log('Checking database connection...\n');
  console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));
  console.log('');

  try {
    // Test connection
    const testResult = await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful');
    console.log('Current time:', testResult.rows[0].now);
    console.log('');

    // Check if comments table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'comments'
      )
    `);

    if (!tableCheck.rows[0].exists) {
      console.log('❌ Comments table does not exist!');
      console.log('\nTo create the table, run:');
      console.log('  psql -U postgres -h localhost -d blog_comments -f lib/db-schema.sql');
      console.log('\nOr create it manually with:');
      console.log(`
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_slug VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  comment TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);
      await pool.end();
      process.exit(1);
    }

    console.log('✅ Comments table exists');
    console.log('');

    // Get table structure
    const columns = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'comments'
      ORDER BY ordinal_position
    `);

    console.log('Table structure:');
    columns.rows.forEach(col => {
      console.log(`  - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'}`);
    });
    console.log('');

    // Test insert
    console.log('Testing INSERT...');
    const testInsert = await pool.query(`
      INSERT INTO comments (post_slug, name, email, comment)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `, ['test-slug', 'Test User', 'test@example.com', 'Test comment']);

    console.log('✅ INSERT test successful, ID:', testInsert.rows[0].id);

    // Clean up test data
    await pool.query('DELETE FROM comments WHERE post_slug = $1', ['test-slug']);
    console.log('✅ Test data cleaned up');
    console.log('');

    console.log('✅ All checks passed!');
    await pool.end();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    if (error.detail) {
      console.error('Detail:', error.detail);
    }
    await pool.end();
    process.exit(1);
  }
}

checkDatabase();

