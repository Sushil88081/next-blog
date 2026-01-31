"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Link from "next/link";

interface Comment {
  id: number;
  name: string;
  comment: string;
  created_at: string;
  post_slug: string;
  status?: string;
  updated_at?: string;
}

interface CommentSectionProps {
  postSlug: string;
  postCategory?: string;
}

export default function CommentSection({
  postSlug,
  postCategory = "react",
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load comments from API on mount - fetch all comments (pending and approved)
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        // Fetch all comments (both pending and approved)
        const response = await fetch(`/api/routes?slug=${encodeURIComponent(postSlug)}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          let errorMessage = "Failed to fetch comments";
          try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.error || errorMessage;
          } catch {
            // If response is not JSON, use the text or default message
            errorMessage = errorText || errorMessage;
          }
          throw new Error(errorMessage);
        }
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format from server");
        }
        
        const text = await response.text();
        if (!text) {
          setComments([]);
          setError(null);
          return;
        }
        
        const data = JSON.parse(text);
        setComments(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err: any) {
        console.error("Error loading comments:", err);
        setError(err.message || "Failed to load comments. Please try again later.");
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.comment.trim()) {
      setError("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    // Check privacy policy acceptance
    if (!acceptedPolicy) {
      setError("Please accept the Privacy Policy to submit your comment");
      setIsSubmitting(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit comment to API
      const response = await fetch("/api/routes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_slug: postSlug,
          name: formData.name.trim(),
          email: formData.email.trim(),
          comment: formData.comment.trim(),
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(text || "Invalid response from server");
      }

      const text = await response.text();
      if (!text) {
        throw new Error("Empty response from server");
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        throw new Error("Invalid JSON response from server");
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit comment");
      }

      // Reset form
      setFormData({ name: "", email: "", comment: "" });
      setAcceptedPolicy(false);
      setShowSuccess(true);
      setSuccessMessage(data.message || "Thank you! Your comment has been submitted and is pending moderation.");
      
      // Log the response for debugging
      console.log("Comment submitted successfully:", data);

      // Refresh comments list
      const commentsResponse = await fetch(`/api/routes?slug=${encodeURIComponent(postSlug)}`);
      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json();
        setComments(commentsData || []);
      }

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setSuccessMessage("");
      }, 5000);
    } catch (err: any) {
      console.error("Error submitting comment:", err);
      setError(err.message || "Failed to submit comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Comments ({comments.length})
      </h2>

      {/* Comment Form */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Leave a Comment
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
            >
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-transparent focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
              placeholder="Share your thoughts..."
            />
          </div>
          <div className="flex items-start">
            <input
              type="checkbox"
              id="privacy-policy"
              checked={acceptedPolicy}
              onChange={(e) => setAcceptedPolicy(e.target.checked)}
              required
              className="mt-1 mr-3 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="privacy-policy"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              I agree to the{" "}
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                Privacy Policy
              </Link>{" "}
              and consent to the storage and processing of my personal data (name
              and email) for the purpose of displaying my comment on this blog.
              <span className="text-red-500 ml-1">*</span>
            </label>
          </div>
          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          {showSuccess && (
            <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg">
              {successMessage || "Thank you! Your comment has been submitted."}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !acceptedPolicy}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Post Comment"}
          </button>
        </form>
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>Loading comments...</p>
        </div>
      ) : error && comments.length === 0 ? (
        <div className="text-center py-8 text-red-500 dark:text-red-400">
          <p>{error}</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className={`bg-white dark:bg-gray-800 rounded-lg p-6 border ${
                comment.status === 'pending'
                  ? 'border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {comment.name}
                    </h4>
                    {comment.status === 'pending' && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-full">
                        Pending
                      </span>
                    )}
                    {comment.status === 'approved' && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full">
                        Approved
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(comment.created_at), "MMMM dd, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

