import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { isSpam } from "@/lib/spam";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  console.log("=== POST /api/routes called ===");
  
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    console.log("IP address:", ip);
    
    if (!rateLimit(ip)) {
      console.log("Rate limit exceeded for IP:", ip);
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    let body;
    try {
      body = await req.json();
      console.log("Request body received:", { 
        post_slug: body.post_slug, 
        name: body.name, 
        has_email: !!body.email,
        comment_length: body.comment?.length 
      });
    } catch (error) {
      console.error("JSON parse error:", error);
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
    }

    const { post_slug, name, email, comment } = body;

    // Validate required fields
    if (!post_slug || !name || !comment) {
      return NextResponse.json({ 
        error: "Missing required fields: post_slug, name, and comment are required" 
      }, { status: 400 });
    }

    // Validate field lengths
    if (name.trim().length < 2 || name.trim().length > 255) {
      return NextResponse.json({ error: "Name must be between 2 and 255 characters" }, { status: 400 });
    }

    if (comment.trim().length < 5) {
      return NextResponse.json({ error: "Comment must be at least 5 characters" }, { status: 400 });
    }

    // Email is optional but if provided, should be valid
    if (email && email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (isSpam(comment)) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    try {
      // Verify database connection
      const connectionTest = await pool.query('SELECT NOW()');
      console.log("Database connection verified at:", connectionTest.rows[0].now);
      
      console.log("Attempting to insert comment:", { 
        post_slug, 
        name, 
        email: email ? "***" : "missing", 
        comment_length: comment.length 
      });
      
      const insertValues = [
        post_slug.trim(), 
        name.trim(), 
        email ? email.trim() : null, 
        comment.trim()
      ];
      
      console.log("Insert values prepared:", {
        post_slug: insertValues[0],
        name: insertValues[1],
        email: insertValues[2] ? "***" : null,
        comment_length: insertValues[3].length
      });
      
      const result = await pool.query(
        `INSERT INTO comments (post_slug, name, email, comment)
         VALUES ($1, $2, $3, $4)
         RETURNING id, post_slug, name, comment, status, created_at`,
        insertValues
      );

      console.log("Query executed. Rows returned:", result.rows.length);
      console.log("Result:", result.rows);

      if (!result.rows || result.rows.length === 0) {
        console.error("INSERT query returned no rows - this should not happen with RETURNING clause");
        throw new Error("Failed to insert comment - no data returned");
      }

      const newComment = result.rows[0];
      console.log("✅ Comment inserted successfully:", { 
        id: newComment.id, 
        status: newComment.status,
        created_at: newComment.created_at
      });
      
      // Verify it was actually saved
      const verify = await pool.query('SELECT * FROM comments WHERE id = $1', [newComment.id]);
      if (verify.rows.length === 0) {
        console.error("❌ CRITICAL: Comment was not saved to database even though INSERT returned success!");
        throw new Error("Comment was not persisted to database");
      }
      console.log("✅ Verified comment exists in database with ID:", verify.rows[0].id);

      return NextResponse.json({ 
        success: true,
        message: "Your comment has been submitted successfully and is pending moderation.",
        comment: {
          id: newComment.id,
          post_slug: newComment.post_slug,
          name: newComment.name,
          comment: newComment.comment,
          status: newComment.status,
          created_at: newComment.created_at
        }
      });
    } catch (dbError: any) {
      console.error("Database error:", dbError);
      console.error("Error details:", {
        message: dbError.message,
        code: dbError.code,
        detail: dbError.detail,
        hint: dbError.hint,
        stack: dbError.stack,
      });
      
      // Return more specific error message for debugging
      // In production, still show some details to help debug connection issues
      const errorMessage = process.env.NODE_ENV === 'development' 
        ? `Database error: ${dbError.message || 'Unknown error'}`
        : `Database error: ${dbError.message || 'Connection failed. Please check your DATABASE_URL environment variable.'}`;
      
      return NextResponse.json(
        { 
          error: errorMessage,
          code: dbError.code,
          hint: dbError.hint || (dbError.code === 'ECONNREFUSED' ? 'Check if DATABASE_URL is correct and the database is accessible' : undefined)
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const status = searchParams.get("status"); // Optional status filter

    if (!slug) {
      return NextResponse.json({ error: "Slug parameter is required" }, { status: 400 });
    }

    try {
      let query: string;
      let params: any[];

      // If status is specified, filter by it; otherwise show all comments
      if (status && ['pending', 'approved', 'rejected', 'spam'].includes(status)) {
        query = `SELECT id, post_slug, name, comment, status, created_at, updated_at
                 FROM comments
                 WHERE post_slug=$1 AND status=$2
                 ORDER BY created_at DESC`;
        params = [slug, status];
      } else {
        // Show all comments (pending and approved) - exclude rejected and spam
        query = `SELECT id, post_slug, name, comment, status, created_at, updated_at
                 FROM comments
                 WHERE post_slug=$1 AND status IN ('pending', 'approved')
                 ORDER BY created_at DESC`;
        params = [slug];
      }

      console.log("Fetching comments for slug:", slug, "with status filter:", status || "all");
      const res = await pool.query(query, params);
      console.log(`Found ${res.rows.length} comments`);

      return NextResponse.json(res.rows || []);
    } catch (dbError: any) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to fetch comments" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

