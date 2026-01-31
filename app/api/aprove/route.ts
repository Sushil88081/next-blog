import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Approve a comment
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['approved', 'rejected', 'spam'];
    const newStatus = status || 'approved';
    
    if (!validStatuses.includes(newStatus)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // Update the comment status
    const result = await pool.query(
      `UPDATE comments 
       SET status=$1, updated_at=CURRENT_TIMESTAMP 
       WHERE id=$2 
       RETURNING id, post_slug, name, comment, status, created_at, updated_at`,
      [newStatus, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    console.log(`✅ Comment ${id} ${newStatus} successfully`);

    return NextResponse.json({
      success: true,
      message: `Comment ${newStatus} successfully`,
      comment: result.rows[0]
    });
  } catch (error: any) {
    console.error("Error updating comment status:", error);
    return NextResponse.json(
      { error: "Failed to update comment status" },
      { status: 500 }
    );
  }
}

// Get all pending comments (for moderation)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "pending";
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected', 'spam'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // Get comments with the specified status
    const result = await pool.query(
      `SELECT id, post_slug, name, email, comment, status, created_at, updated_at
       FROM comments
       WHERE status=$1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [status, limit, offset]
    );

    // Get total count
    const countResult = await pool.query(
      `SELECT COUNT(*) as total FROM comments WHERE status=$1`,
      [status]
    );

    return NextResponse.json({
      success: true,
      comments: result.rows,
      total: parseInt(countResult.rows[0].total),
      limit,
      offset
    });
  } catch (error: any) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
