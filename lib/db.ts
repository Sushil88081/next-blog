import { Pool } from "pg";

// This module is server-only and should never be imported in client components

let pool: Pool | null = null;

function getPool(): Pool {
  // Lazy initialization - only create pool when actually needed
  if (pool) {
    return pool;
  }

  // Check if we're in build phase or DATABASE_URL is not available
  const isBuildPhase = 
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.NEXT_PHASE === 'phase-development-build';

  if (isBuildPhase || !process.env.DATABASE_URL) {
    // During build, we can't connect to the database
    // This should only happen if API routes are being analyzed during build
    // In that case, we'll create a pool that will fail gracefully when used
    // But actually, API routes shouldn't execute during build, so this is a safety measure
    throw new Error(
      "Database connection is not available during build. " +
      "DATABASE_URL is only needed at runtime for API routes."
    );
  }

  console.log("🔌 Initializing database pool with:", 
    process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@'));

  // Determine SSL requirement based on connection string
  // Cloud databases (Supabase, Neon, etc.) require SSL
  const requiresSSL = 
    process.env.NODE_ENV === "production" || 
    process.env.DATABASE_URL.includes('supabase.co') ||
    process.env.DATABASE_URL.includes('neon.tech') ||
    process.env.DATABASE_URL.includes('railway.app') ||
    process.env.DATABASE_URL.includes('render.com');

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: requiresSSL
      ? { rejectUnauthorized: false }
      : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000, // Increased timeout for Supabase
  });

  // Test connection on startup (only at runtime, not during build)
  pool.on('connect', (client) => {
    console.log('✅ New database client connected');
  });

  pool.on('error', (err) => {
    console.error('❌ Unexpected database pool error:', err);
  });

  // Test connection asynchronously (don't block module load)
  // Only test if we have a valid connection string
  if (process.env.DATABASE_URL) {
    pool.query('SELECT current_database(), current_user')
      .then((result) => {
        console.log('✅ Database connection test successful');
        console.log('   Database:', result.rows[0].current_database);
        console.log('   User:', result.rows[0].current_user);
      })
      .catch((err) => {
        console.error('❌ Database connection test failed:', err.message);
        console.error('   Error code:', err.code);
        console.error('   Connection string format:', process.env.DATABASE_URL?.substring(0, 30) + '...');
      });
  }

  return pool;
}

// Use a Proxy to make the pool lazy - it's only initialized when actually accessed
// This prevents initialization during build time
const poolProxy = new Proxy({} as Pool, {
  get(_target, prop) {
    const actualPool = getPool();
    const value = (actualPool as any)[prop];
    return typeof value === 'function' ? value.bind(actualPool) : value;
  }
});

export default poolProxy;