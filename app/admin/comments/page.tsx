"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

interface Comment {
  id: number;
  post_slug: string;
  name: string;
  email: string;
  comment: string;
  status: "pending" | "approved" | "rejected" | "spam";
  created_at: string;
  updated_at: string;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"pending" | "approved" | "rejected" | "spam">("pending");
  const [error, setError] = useState<string>("");

  const fetchComments = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/aprove?status=${statusFilter}`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data.comments || []);
    } catch (err: any) {
      setError(err.message || "Failed to load comments");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [statusFilter]);

  const updateCommentStatus = async (id: number, newStatus: "approved" | "rejected" | "spam") => {
    try {
      const response = await fetch("/api/aprove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update comment");
      }

      // Refresh comments list
      fetchComments();
    } catch (err: any) {
      alert(err.message || "Failed to update comment");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "spam":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Comment Moderation
      </h1>

      {/* Status Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {(["pending", "approved", "rejected", "spam"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({comments.length})
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">Loading comments...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Comments List */}
      {!loading && !error && (
        <>
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No {statusFilter} comments found.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                          {comment.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                            comment.status
                          )}`}
                        >
                          {comment.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {comment.email}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        Post: <span className="font-mono">{comment.post_slug}</span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {format(new Date(comment.created_at), "MMMM dd, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {comment.comment}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {comment.status === "pending" && (
                    <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => updateCommentStatus(comment.id, "approved")}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => updateCommentStatus(comment.id, "rejected")}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        ❌ Reject
                      </button>
                      <button
                        onClick={() => updateCommentStatus(comment.id, "spam")}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                      >
                        🚫 Mark as Spam
                      </button>
                    </div>
                  )}

                  {comment.status === "approved" && (
                    <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => updateCommentStatus(comment.id, "rejected")}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        ❌ Reject
                      </button>
                      <button
                        onClick={() => updateCommentStatus(comment.id, "spam")}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                      >
                        🚫 Mark as Spam
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

