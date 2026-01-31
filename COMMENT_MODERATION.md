# Comment Moderation Guide

## How to Approve Comments

When users submit comments, they are automatically set to `pending` status. You need to approve them before they appear publicly.

## Method 1: Using the API Endpoint

### Get All Pending Comments

```bash
GET https://learn-code-easy.vercel.app/api/aprove?status=pending
```

This returns all pending comments with their details.

### Approve a Comment

```bash
POST https://learn-code-easy.vercel.app/api/aprove
Content-Type: application/json

{
  "id": 123,
  "status": "approved"
}
```

### Reject a Comment

```bash
POST https://learn-code-easy.vercel.app/api/aprove
Content-Type: application/json

{
  "id": 123,
  "status": "rejected"
}
```

### Mark as Spam

```bash
POST https://learn-code-easy.vercel.app/api/aprove
Content-Type: application/json

{
  "id": 123,
  "status": "spam"
}
```

## Method 2: Using cURL

### Get Pending Comments

```bash
curl https://learn-code-easy.vercel.app/api/aprove?status=pending
```

### Approve a Comment

```bash
curl -X POST https://learn-code-easy.vercel.app/api/aprove \
  -H "Content-Type: application/json" \
  -d '{"id": 123, "status": "approved"}'
```

## Method 3: Using JavaScript/Fetch

```javascript
// Get pending comments
const response = await fetch('https://learn-code-easy.vercel.app/api/aprove?status=pending');
const data = await response.json();
console.log(data.comments); // Array of pending comments

// Approve a comment
const approveResponse = await fetch('https://learn-code-easy.vercel.app/api/aprove', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: 123,
    status: 'approved'
  })
});
const result = await approveResponse.json();
console.log(result);
```

## Method 4: Direct Database Access (Supabase)

1. Go to your Supabase Dashboard
2. Navigate to **Table Editor** → **comments**
3. Find the comment you want to approve
4. Click on the row to edit
5. Change `status` from `pending` to `approved`
6. Save

## Comment Statuses

- **pending** - New comment, awaiting moderation (default)
- **approved** - Comment approved and visible to users
- **rejected** - Comment rejected (not visible)
- **spam** - Marked as spam (not visible)

## API Endpoints Summary

### GET `/api/aprove?status=pending`
Get all comments with a specific status.

**Query Parameters:**
- `status` - Comment status: `pending`, `approved`, `rejected`, or `spam` (default: `pending`)
- `limit` - Number of comments to return (default: 50)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "comments": [
    {
      "id": 1,
      "post_slug": "react-introduction",
      "name": "John Doe",
      "email": "john@example.com",
      "comment": "Great article!",
      "status": "pending",
      "created_at": "2026-01-31T10:00:00Z",
      "updated_at": "2026-01-31T10:00:00Z"
    }
  ],
  "total": 5,
  "limit": 50,
  "offset": 0
}
```

### POST `/api/aprove`
Update comment status (approve, reject, or mark as spam).

**Request Body:**
```json
{
  "id": 123,
  "status": "approved"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Comment approved successfully",
  "comment": {
    "id": 123,
    "post_slug": "react-introduction",
    "name": "John Doe",
    "comment": "Great article!",
    "status": "approved",
    "created_at": "2026-01-31T10:00:00Z",
    "updated_at": "2026-01-31T10:05:00Z"
  }
}
```

## Quick Approval Workflow

1. **Check pending comments:**
   ```bash
   curl https://learn-code-easy.vercel.app/api/aprove?status=pending
   ```

2. **Approve a comment:**
   ```bash
   curl -X POST https://learn-code-easy.vercel.app/api/aprove \
     -H "Content-Type: application/json" \
     -d '{"id": 123, "status": "approved"}'
   ```

3. **Verify it's approved:**
   ```bash
   curl https://learn-code-easy.vercel.app/api/routes?slug=react-introduction
   ```
   The approved comment should now appear in the list.

## Notes

- Only `approved` and `pending` comments are shown to users
- `rejected` and `spam` comments are hidden from public view
- Comments are automatically set to `pending` when submitted
- The `updated_at` timestamp is automatically updated when status changes

