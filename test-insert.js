// Direct database insert test
require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

async function testInsert() {
  console.log('Testing direct database insert...\n');
  console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'));
  console.log('');

  try {
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful\n');

    // Check current count
    const countBefore = await pool.query('SELECT COUNT(*) FROM comments');
    console.log('Comments before insert:', countBefore.rows[0].count);

    // Insert test comment
    console.log('\nInserting test comment...');
    const result = await pool.query(
      `INSERT INTO comments (post_slug, name, email, comment)
       VALUES ($1, $2, $3, $4)
       RETURNING id, post_slug, name, status, created_at`,
      ['test-slug', 'Test User', 'test@example.com', 'This is a test comment from direct insert']
    );

    console.log('✅ Insert successful!');
    console.log('Inserted comment:', result.rows[0]);

    // Check count after
    const countAfter = await pool.query('SELECT COUNT(*) FROM comments');
    console.log('\nComments after insert:', countAfter.rows[0].count);

    // Verify it's in the database
    const verify = await pool.query('SELECT * FROM comments WHERE id = $1', [result.rows[0].id]);
    console.log('\n✅ Verified in database:', verify.rows[0] ? 'YES' : 'NO');

    if (verify.rows[0]) {
      console.log('Comment details:', {
        id: verify.rows[0].id,
        post_slug: verify.rows[0].post_slug,
        name: verify.rows[0].name,
        status: verify.rows[0].status,
        created_at: verify.rows[0].created_at
      });
    }

    // Clean up
    await pool.query('DELETE FROM comments WHERE post_slug = $1', ['test-slug']);
    console.log('\n✅ Test comment cleaned up');

    await pool.end();
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code) console.error('Error code:', error.code);
    if (error.detail) console.error('Detail:', error.detail);
    await pool.end();
    process.exit(1);
  }
}

testInsert();

