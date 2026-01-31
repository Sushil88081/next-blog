import { Pool } from "pg";

// This module is server-only and should never be imported in client components

let pool: Pool | null = null;

function getPool(): Pool {
  // Lazy initialization - only create pool when actually needed
  if (pool) {
    return pool;
  }

  // Check if DATABASE_URL is available
  // This will only be checked when the pool is actually used (at runtime)
  if (!process.env.DATABASE_URL) {
    // Check if we're in build phase - if so, return a dummy pool
    // This allows the module to be imported during build without errors
    const isBuildPhase = 
      process.env.NEXT_PHASE === 'phase-production-build' ||
      process.env.NEXT_PHASE === 'phase-development-build' ||
      process.env.NEXT_PHASE === 'phase-export';
    
    if (isBuildPhase) {
      // During build, return a dummy pool that won't cause errors
      return new Proxy({} as Pool, {
        get(_target, prop) {
          // Only throw when methods are actually called
          if (typeof prop === 'string') {
            const methodNames = ['query', 'connect', 'end', 'on', 'once', 'removeListener'];
            if (methodNames.includes(prop)) {
              return () => {
                throw new Error(
                  `Database connection is not available during build. ` +
                  `DATABASE_URL is only needed at runtime for API routes.`
                );
              };
            }
          }
          return undefined;
        }
      }) as Pool;
    }
    
    // At runtime, DATABASE_URL is required
    throw new Error(
      "DATABASE_URL environment variable is required. " +
      "Please set it in your Vercel environment variables. " +
      "Go to Settings → Environment Variables and add DATABASE_URL."
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

  return pool;
}

// Use a Proxy to make the pool lazy - it's only initialized when actually accessed
// This prevents initialization during build time
// The Proxy will only call getPool() when a property is accessed
const poolProxy = new Proxy({} as Pool, {
  get(_target, prop) {
    try {
      // Only initialize pool when actually accessed (not during build analysis)
      const actualPool = getPool();
      const value = (actualPool as any)[prop];
      return typeof value === 'function' ? value.bind(actualPool) : value;
    } catch (error: any) {
      // If there's an error getting the pool, provide helpful context
      console.error('Error accessing database pool:', error.message);
      console.error('NEXT_PHASE:', process.env.NEXT_PHASE);
      console.error('NODE_ENV:', process.env.NODE_ENV);
      console.error('DATABASE_URL set:', !!process.env.DATABASE_URL);
      throw error;
    }
  }
});

export default poolProxy;