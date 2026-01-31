import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set in environment variables!");
  throw new Error("DATABASE_URL environment variable is required");
}

console.log("🔌 Initializing database pool with:", 
  process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@'));

// Determine SSL requirement based on connection string
// Cloud databases (Supabase, Neon, etc.) require SSL
const requiresSSL = 
  process.env.NODE_ENV === "production" || 
  process.env.DATABASE_URL?.includes('supabase.co') ||
  process.env.DATABASE_URL?.includes('neon.tech') ||
  process.env.DATABASE_URL?.includes('railway.app') ||
  process.env.DATABASE_URL?.includes('render.com');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: requiresSSL
    ? { rejectUnauthorized: false }
    : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test connection on startup
pool.on('connect', (client) => {
  console.log('✅ New database client connected');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database pool error:', err);
});

// Test connection immediately
pool.query('SELECT current_database(), current_user')
  .then((result) => {
    console.log('✅ Database connection test successful');
    console.log('   Database:', result.rows[0].current_database);
    console.log('   User:', result.rows[0].current_user);
  })
  .catch((err) => {
    console.error('❌ Database connection test failed:', err.message);
  });

export default pool;