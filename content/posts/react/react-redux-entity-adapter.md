---
title: "React-Redux Entity Adapter - Advanced State Management"
date: "2026-02-03"
description: "Learn how to use createEntityAdapter from Redux Toolkit to manage normalized state efficiently. Master CRUD operations with real-world examples and a complete project."
category: "React Advanced"
tags: ["react", "redux", "redux-toolkit", "entity-adapter", "normalized-state"]
image: "/images/react-entity-adapter.jpg"
author: "Sushil Kumar"
---

# React-Redux Entity Adapter - Advanced State Management

When building complex applications with Redux, managing collections of entities (like users, posts, products) can become tedious. Writing reducers for adding, updating, and deleting items requires repetitive boilerplate code. Redux Toolkit's `createEntityAdapter` solves this problem by providing a standardized way to manage normalized state.

## What is createEntityAdapter?

`createEntityAdapter` is a utility from Redux Toolkit that generates a set of pre-built reducers and selectors for managing a collection of entities in a normalized state structure. It automatically handles common operations like adding, updating, removing, and sorting entities.

## Why Use Entity Adapter?

Imagine you're building a blog application. You need to manage:
- Blog posts
- Comments on each post
- User profiles
- Categories

Without Entity Adapter, you'd write repetitive code for each collection:

```jsx
// Without Entity Adapter - Lots of boilerplate!
const postsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [...state, action.payload];
    case 'UPDATE_POST':
      return state.map(post => 
        post.id === action.payload.id ? action.payload : post
      );
    case 'DELETE_POST':
      return state.filter(post => post.id !== action.payload);
    case 'SET_POSTS':
      return action.payload;
    // ... more cases
  }
};
```

With Entity Adapter, you get all these operations automatically!

## Benefits of Entity Adapter

1. **Less Boilerplate** - Pre-built reducers for common operations
2. **Normalized State** - Automatically structures data efficiently
3. **Performance** - Optimized selectors for fast lookups
4. **Consistency** - Standardized way to manage collections
5. **Type Safety** - Works great with TypeScript

## Normalized State Structure

Entity Adapter stores data in a normalized format:

```jsx
// Normalized structure (what Entity Adapter creates)
{
  ids: [1, 2, 3],           // Array of IDs in order
  entities: {                // Lookup object by ID
    1: { id: 1, title: 'Post 1', ... },
    2: { id: 2, title: 'Post 2', ... },
    3: { id: 3, title: 'Post 3', ... }
  }
}

// vs Array structure (inefficient for lookups)
[
  { id: 1, title: 'Post 1', ... },
  { id: 2, title: 'Post 2', ... },
  { id: 3, title: 'Post 3', ... }
]
```

The normalized structure makes lookups by ID extremely fast (O(1) instead of O(n)).

## Basic Setup

Let's create a simple example with blog posts:

```jsx
// store/slices/postsSlice.js
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// Create entity adapter
const postsAdapter = createEntityAdapter({
  // Optional: specify ID field (default is 'id')
  selectId: (post) => post.id,
  
  // Optional: sort comparer function
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = postsAdapter.getInitialState({
  // Additional state fields can go here
  loading: false,
  error: null,
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Entity Adapter provides these automatically:
    // addOne, addMany, setAll, setOne, setMany,
    // updateOne, updateMany, upsertOne, upsertMany,
    // removeOne, removeMany, removeAll
    
    addPost: postsAdapter.addOne,
    updatePost: postsAdapter.updateOne,
    deletePost: postsAdapter.removeOne,
    setPosts: postsAdapter.setAll,
    
    // You can also add custom reducers
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addPost, updatePost, deletePost, setPosts, setLoading, setError } = 
  postsSlice.actions;

// Export selectors
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectTotal: selectTotalPosts,
} = postsAdapter.getSelectors((state) => state.posts);

export default postsSlice.reducer;
```

## CRUD Operations Explained

### Create (Add)

```jsx
// Add single post
dispatch(addPost({ 
  id: 1, 
  title: 'New Post', 
  content: 'Post content...' 
}));

// Add multiple posts
dispatch(addMany([
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
]));
```

### Read (Select)

```jsx
import { useSelector } from 'react-redux';
import { selectAllPosts, selectPostById, selectTotalPosts } from '../store/slices/postsSlice';

function PostsList() {
  // Get all posts as array
  const allPosts = useSelector(selectAllPosts);
  
  // Get specific post by ID
  const post = useSelector((state) => selectPostById(state, 1));
  
  // Get total count
  const total = useSelector(selectTotalPosts);
  
  // Get all IDs
  const postIds = useSelector(selectPostIds);
  
  return (
    <div>
      <p>Total Posts: {total}</p>
      {allPosts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

### Update

```jsx
// Update one post
dispatch(updatePost({ 
  id: 1, 
  changes: { title: 'Updated Title' } 
}));

// Update multiple posts
dispatch(updateMany([
  { id: 1, changes: { title: 'Updated 1' } },
  { id: 2, changes: { title: 'Updated 2' } },
]));

// Upsert (update if exists, add if not)
dispatch(upsertOne({ id: 1, title: 'Post', content: '...' }));
```

### Delete

```jsx
// Delete one post
dispatch(deletePost(1)); // Just pass the ID

// Delete multiple posts
dispatch(removeMany([1, 2, 3])); // Array of IDs

// Delete all posts
dispatch(removeAll());
```

## Entity Adapter Methods (add/set/update/upsert/remove) - Explained in Detail

Entity adapters give you a complete toolbox for working with collections. The key idea: **choose the method that matches your intent** (add vs replace vs patch vs remove).

### Quick mental model

- **add***: Add new entities (won't overwrite existing ones with the same id)
- **set***: Replace entities (overwrite existing ones with the same id)
- **update***: Patch existing entities using `{ id, changes }` (does nothing if the id doesn't exist)
- **upsert***: “Update if exists, otherwise insert” (safe for sync-with-server workflows)
- **remove***: Delete entities by id

### Methods and their payload shapes

```jsx
// These methods exist on every adapter:
// addOne(entity)
// addMany(entities[])
//
// setOne(entity)
// setMany(entities[])
// setAll(entities[])
//
// updateOne({ id, changes })
// updateMany([{ id, changes }])
//
// upsertOne(entity)
// upsertMany(entities[])
//
// removeOne(id)
// removeMany(ids[])
// removeAll()
```

### addOne vs setOne vs upsertOne (most common confusion)

```jsx
// addOne: adds only if the id doesn't exist (otherwise ignored)
dispatch(postsSlice.actions.addPost({ id: 10, title: 'Hello' }));

// setOne: always writes the entity (overwrite if it already exists)
dispatch(postsSlice.actions.setOne({ id: 10, title: 'Hello v2' }));

// upsertOne: insert if missing, update/replace if present (best for server sync)
dispatch(postsSlice.actions.upsertOne({ id: 10, title: 'Hello from API' }));
```

### addMany vs setAll (load-more vs replace list)

Use **`setAll`** when you fetched the “truth” from the server and want to replace the list (like opening a page and loading the latest posts). Use **`addMany`** when you’re appending (like infinite scroll or “load more”).

```jsx
// Replace everything (fresh fetch)
dispatch(postsSlice.actions.setPosts(fetchedPosts));

// Append new page (load more)
dispatch(postsSlice.actions.addMany(nextPagePosts));
```

### updateOne/updateMany (patch only what changed)

`updateOne` expects `{ id, changes }`. It **patches** the entity (merges fields) instead of replacing the entire object.

```jsx
// Patch only some fields
dispatch(postsSlice.actions.updatePost({
  id: 10,
  changes: { title: 'New title', updatedAt: new Date().toISOString() },
}));

// Patch many at once (bulk edit)
dispatch(postsSlice.actions.updateMany([
  { id: 10, changes: { category: 'tech' } },
  { id: 11, changes: { category: 'tech' } },
]));
```

**Important:** `changes` is a normal object merge. If you need to update something nested, you typically update the full nested object/array:

```jsx
// Example: patch nested object by replacing the whole nested object
dispatch(postsSlice.actions.updatePost({
  id: 10,
  changes: { author: { id: 1, name: 'Sushil' } },
}));
```

### upsertMany (best for syncing batches)

If your API returns a mixed list of “new + updated” entities, `upsertMany` is the cleanest option.

```jsx
dispatch(postsSlice.actions.upsertMany(apiResponsePosts));
```

### removeOne/removeMany/removeAll

```jsx
dispatch(postsSlice.actions.removeOne(10));
dispatch(postsSlice.actions.removeMany([10, 11, 12]));
dispatch(postsSlice.actions.removeAll());
```

### Practical “which method should I use?” cheatsheet

- **Initial load (replace list)**: `setAll`
- **Pagination / infinite scroll**: `addMany`
- **Edit a single item (patch fields)**: `updateOne`
- **Save form where you have full entity object**: `setOne` (overwrite) or `upsertOne` (safer)
- **Sync a batch from server**: `upsertMany`
- **Delete**: `removeOne` / `removeMany`

## Real-World Example: Blog Management System

Let's build a complete blog management system using Entity Adapter:

### Posts Slice with Entity Adapter

```jsx
// store/slices/postsSlice.js
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = postsAdapter.getInitialState({
  loading: false,
  error: null,
  filters: {
    category: 'all',
    search: '',
  },
});

// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetch('/api/posts');
    return response.json();
  }
);

// Async thunk for creating post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    return response.json();
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: postsAdapter.addOne,
    updatePost: postsAdapter.updateOne,
    deletePost: postsAdapter.removeOne,
    setPosts: postsAdapter.setAll,
    
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
    },
    clearFilters: (state) => {
      state.filters = { category: 'all', search: '' };
    },
    
    togglePostLike: (state, action) => {
      const post = state.entities[action.payload];
      if (post) {
        post.likes = (post.likes || 0) + 1;
        post.isLiked = !post.isLiked;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        postsAdapter.addOne(state, action.payload);
      });
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
  setPosts,
  setCategoryFilter,
  setSearchFilter,
  clearFilters,
  togglePostLike,
} = postsSlice.actions;

// Base selectors
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectTotal: selectTotalPosts,
} = postsAdapter.getSelectors((state) => state.posts);

// Custom selectors
export const selectFilteredPosts = (state) => {
  const allPosts = selectAllPosts(state);
  const { category, search } = state.posts.filters;
  
  return allPosts.filter((post) => {
    const matchesCategory = category === 'all' || post.category === category;
    const matchesSearch = 
      search === '' || 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
};

export const selectPostsByCategory = (state, category) => {
  return selectAllPosts(state).filter((post) => post.category === category);
};

export const selectPostLoading = (state) => state.posts.loading;
export const selectPostError = (state) => state.posts.error;

export default postsSlice.reducer;
```

### Store Configuration

```jsx
// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import commentsReducer from './slices/commentsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});
```

### Posts List Component

```jsx
// components/PostsList.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost, setSearchFilter, setCategoryFilter } from '../store/slices/postsSlice';
import { selectFilteredPosts, selectPostLoading } from '../store/slices/postsSlice';
import PostCard from './PostCard';

function PostsList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectFilteredPosts);
  const loading = useSelector(selectPostLoading);
  
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  
  const handleSearch = (e) => {
    dispatch(setSearchFilter(e.target.value));
  };
  
  const handleCategoryChange = (category) => {
    dispatch(setCategoryFilter(category));
  };
  
  if (loading) {
    return <div>Loading posts...</div>;
  }
  
  return (
    <div className="posts-list">
      <div className="filters">
        <input
          type="text"
          placeholder="Search posts..."
          onChange={handleSearch}
          className="search-input"
        />
        <select onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="tech">Tech</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="travel">Travel</option>
        </select>
      </div>
      
      <div className="posts-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default PostsList;
```

### Post Card Component

```jsx
// components/PostCard.jsx
import { useDispatch } from 'react-redux';
import { deletePost, togglePostLike } from '../store/slices/postsSlice';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  const dispatch = useDispatch();
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(post.id));
    }
  };
  
  const handleLike = () => {
    dispatch(togglePostLike(post.id));
  };
  
  return (
    <div className="post-card">
      <Link to={`/posts/${post.id}`}>
        <h3>{post.title}</h3>
        <p className="post-excerpt">{post.excerpt}</p>
      </Link>
      
      <div className="post-meta">
        <span className="category">{post.category}</span>
        <span className="date">{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      
      <div className="post-actions">
        <button onClick={handleLike} className={post.isLiked ? 'liked' : ''}>
          ❤️ {post.likes || 0}
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default PostCard;
```

### Post Detail Component

```jsx
// components/PostDetail.jsx
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostById } from '../store/slices/postsSlice';

function PostDetail() {
  const { id } = useParams();
  const post = useSelector((state) => selectPostById(state, parseInt(id)));
  
  if (!post) {
    return <div>Post not found</div>;
  }
  
  return (
    <div className="post-detail">
      <h1>{post.title}</h1>
      <div className="post-meta">
        <span>Category: {post.category}</span>
        <span>Published: {new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="post-content">{post.content}</div>
    </div>
  );
}

export default PostDetail;
```

## Advanced Example: User Management System

Let's create a more complex example managing users with relationships:

### Users Slice

```jsx
// store/slices/usersSlice.js
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = usersAdapter.getInitialState({
  currentUserId: null,
  selectedUserIds: [],
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: usersAdapter.addOne,
    addUsers: usersAdapter.addMany,
    updateUser: usersAdapter.updateOne,
    updateUsers: usersAdapter.updateMany,
    deleteUser: usersAdapter.removeOne,
    deleteUsers: usersAdapter.removeMany,
    setUsers: usersAdapter.setAll,
    
    setCurrentUser: (state, action) => {
      state.currentUserId = action.payload;
    },
    
    toggleUserSelection: (state, action) => {
      const userId = action.payload;
      const index = state.selectedUserIds.indexOf(userId);
      if (index === -1) {
        state.selectedUserIds.push(userId);
      } else {
        state.selectedUserIds.splice(index, 1);
      }
    },
    
    selectAllUsers: (state) => {
      state.selectedUserIds = state.ids;
    },
    
    clearSelection: (state) => {
      state.selectedUserIds = [];
    },
    
    updateUserRole: (state, action) => {
      const { userId, role } = action.payload;
      const user = state.entities[userId];
      if (user) {
        user.role = role;
      }
    },
  },
});

export const {
  addUser,
  addUsers,
  updateUser,
  updateUsers,
  deleteUser,
  deleteUsers,
  setUsers,
  setCurrentUser,
  toggleUserSelection,
  selectAllUsers,
  clearSelection,
  updateUserRole,
} = usersSlice.actions;

// Base selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors((state) => state.users);

// Custom selectors
export const selectCurrentUser = (state) => {
  const currentUserId = state.users.currentUserId;
  return currentUserId ? selectUserById(state, currentUserId) : null;
};

export const selectSelectedUsers = (state) => {
  return state.users.selectedUserIds.map((id) => 
    selectUserById(state, id)
  ).filter(Boolean);
};

export const selectUsersByRole = (state, role) => {
  return selectAllUsers(state).filter((user) => user.role === role);
};

export const selectActiveUsers = (state) => {
  return selectAllUsers(state).filter((user) => user.isActive);
};

export default usersSlice.reducer;
```

### User Management Component

```jsx
// components/UserManagement.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllUsers,
  selectSelectedUsers,
  deleteUsers,
  updateUserRole,
  toggleUserSelection,
  selectAllUsers as selectAllAction,
  clearSelection,
} from '../store/slices/usersSlice';

function UserManagement() {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const selectedUsers = useSelector(selectSelectedUsers);
  const [roleFilter, setRoleFilter] = useState('all');
  
  const handleSelectAll = () => {
    dispatch(selectAllAction());
  };
  
  const handleClearSelection = () => {
    dispatch(clearSelection());
  };
  
  const handleBulkDelete = () => {
    if (selectedUsers.length > 0 && window.confirm('Delete selected users?')) {
      const ids = selectedUsers.map((user) => user.id);
      dispatch(deleteUsers(ids));
      dispatch(clearSelection());
    }
  };
  
  const handleBulkRoleUpdate = (newRole) => {
    selectedUsers.forEach((user) => {
      dispatch(updateUserRole({ userId: user.id, role: newRole }));
    });
    dispatch(clearSelection());
  };
  
  const filteredUsers = roleFilter === 'all' 
    ? users 
    : users.filter((user) => user.role === roleFilter);
  
  return (
    <div className="user-management">
      <div className="toolbar">
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
        </select>
        
        {selectedUsers.length > 0 && (
          <div className="bulk-actions">
            <span>{selectedUsers.length} selected</span>
            <button onClick={handleBulkDelete}>Delete</button>
            <select onChange={(e) => handleBulkRoleUpdate(e.target.value)}>
              <option value="">Change Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
            </select>
            <button onClick={handleClearSelection}>Clear</button>
          </div>
        )}
        
        <button onClick={handleSelectAll}>Select All</button>
      </div>
      
      <table className="users-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedUsers.length === filteredUsers.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserRow({ user }) {
  const dispatch = useDispatch();
  const selectedUsers = useSelector(selectSelectedUsers);
  const isSelected = selectedUsers.some((u) => u.id === user.id);
  
  const handleToggleSelection = () => {
    dispatch(toggleUserSelection(user.id));
  };
  
  const handleRoleChange = (newRole) => {
    dispatch(updateUserRole({ userId: user.id, role: newRole }));
  };
  
  return (
    <tr className={isSelected ? 'selected' : ''}>
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleToggleSelection}
        />
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <select value={user.role} onChange={(e) => handleRoleChange(e.target.value)}>
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </td>
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  );
}

export default UserManagement;
```

## Complete Project: E-Commerce Product Management

Let's build a complete e-commerce product management system:

### Products Slice

```jsx
// store/slices/productsSlice.js
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

const productsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = productsAdapter.getInitialState({
  loading: false,
  error: null,
  filters: {
    category: 'all',
    priceRange: [0, 1000],
    inStock: null, // null, true, or false
  },
  sortBy: 'newest', // newest, oldest, price-low, price-high
});

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('/api/products');
    return response.json();
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    return response.json();
  }
);

export const updateProductStock = createAsyncThunk(
  'products/updateStock',
  async ({ productId, quantity }) => {
    const response = await fetch(`/api/products/${productId}/stock`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    });
    return response.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: productsAdapter.addOne,
    updateProduct: productsAdapter.updateOne,
    deleteProduct: productsAdapter.removeOne,
    setProducts: productsAdapter.setAll,
    
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setStockFilter: (state, action) => {
      state.filters.inStock = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        category: 'all',
        priceRange: [0, 1000],
        inStock: null,
      };
    },
    
    incrementProductViews: (state, action) => {
      const product = state.entities[action.payload];
      if (product) {
        product.views = (product.views || 0) + 1;
      }
    },
    
    toggleProductFavorite: (state, action) => {
      const product = state.entities[action.payload];
      if (product) {
        product.isFavorite = !product.isFavorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        productsAdapter.addOne(state, action.payload);
      })
      .addCase(updateProductStock.fulfilled, (state, action) => {
        productsAdapter.updateOne(state, {
          id: action.payload.id,
          changes: { stock: action.payload.stock },
        });
      });
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  setProducts,
  setCategoryFilter,
  setPriceRange,
  setStockFilter,
  setSortBy,
  clearFilters,
  incrementProductViews,
  toggleProductFavorite,
} = productsSlice.actions;

// Base selectors
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state) => state.products);

// Custom selectors
export const selectFilteredProducts = (state) => {
  const allProducts = selectAllProducts(state);
  const { category, priceRange, inStock } = state.products.filters;
  
  return allProducts.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesPrice = 
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesStock = 
      inStock === null || 
      (inStock === true && product.stock > 0) ||
      (inStock === false && product.stock === 0);
    
    return matchesCategory && matchesPrice && matchesStock;
  });
};

export const selectSortedProducts = (state) => {
  const filtered = selectFilteredProducts(state);
  const sortBy = state.products.sortBy;
  
  const sorted = [...filtered];
  
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
    case 'oldest':
      return sorted.sort((a, b) => 
        new Date(a.createdAt) - new Date(b.createdAt)
      );
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
};

export const selectProductsByCategory = (state, category) => {
  return selectAllProducts(state).filter((product) => product.category === category);
};

export const selectLowStockProducts = (state, threshold = 10) => {
  return selectAllProducts(state).filter((product) => 
    product.stock > 0 && product.stock <= threshold
  );
};

export const selectFavoriteProducts = (state) => {
  return selectAllProducts(state).filter((product) => product.isFavorite);
};

export const selectProductLoading = (state) => state.products.loading;
export const selectProductError = (state) => state.products.error;

export default productsSlice.reducer;
```

### Product List Component

```jsx
// components/ProductList.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setCategoryFilter, setPriceRange, setSortBy } from '../store/slices/productsSlice';
import { selectSortedProducts, selectProductLoading } from '../store/slices/productsSlice';
import ProductCard from './ProductCard';

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectSortedProducts);
  const loading = useSelector(selectProductLoading);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  if (loading) {
    return <div>Loading products...</div>;
  }
  
  return (
    <div className="product-list">
      <ProductFilters />
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductFilters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);
  const sortBy = useSelector((state) => state.products.sortBy);
  
  return (
    <div className="product-filters">
      <select
        value={filters.category}
        onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
      </select>
      
      <input
        type="range"
        min="0"
        max="1000"
        value={filters.priceRange[1]}
        onChange={(e) => 
          dispatch(setPriceRange([filters.priceRange[0], parseInt(e.target.value)]))
        }
      />
      <span>Max Price: ${filters.priceRange[1]}</span>
      
      <select
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
}

export default ProductList;
```

## Best Practices

### 1. Use Custom Selectors

Create reusable selectors for computed values:

```jsx
// Good - Reusable selector
export const selectExpensiveProducts = (state) => {
  return selectAllProducts(state).filter((product) => product.price > 100);
};

// Bad - Computing in component
const expensiveProducts = products.filter((p) => p.price > 100);
```

### 2. Normalize Related Data

When dealing with relationships, normalize them:

```jsx
// Good - Normalized
{
  posts: { ids: [1, 2], entities: {...} },
  comments: { ids: [1, 2], entities: {...} },
  users: { ids: [1, 2], entities: {...} }
}

// Bad - Nested
{
  posts: [
    { id: 1, comments: [{ id: 1, user: {...} }] }
  ]
}
```

### 3. Use Sort Comparer

Set default sorting in the adapter:

```jsx
const adapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});
```

### 4. Combine with Async Thunks

Use Entity Adapter with async operations:

```jsx
extraReducers: (builder) => {
  builder
    .addCase(fetchItems.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload);
    })
    .addCase(createItem.fulfilled, (state, action) => {
      adapter.addOne(state, action.payload);
    });
}
```

### 5. TypeScript Support

Entity Adapter works great with TypeScript:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});
```

## Performance Considerations

Entity Adapter is optimized for performance:

1. **Fast Lookups** - O(1) lookup by ID using entities object
2. **Efficient Updates** - Only updates changed entities
3. **Memoized Selectors** - Selectors are memoized automatically
4. **Normalized Structure** - Prevents data duplication

## Common Patterns

### Pattern 1: Pagination

```jsx
const initialState = adapter.getInitialState({
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
});

// Selector for paginated items
export const selectPaginatedItems = (state) => {
  const allItems = selectAllItems(state);
  const { currentPage, pageSize } = state.items;
  const start = (currentPage - 1) * pageSize;
  return allItems.slice(start, start + pageSize);
};
```

### Pattern 2: Search and Filter

```jsx
export const selectFilteredItems = (state) => {
  const allItems = selectAllItems(state);
  const searchTerm = state.items.search.toLowerCase();
  
  return allItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm)
  );
};
```

### Pattern 3: Relationships

```jsx
// Select posts with their authors
export const selectPostsWithAuthors = (state) => {
  const posts = selectAllPosts(state);
  return posts.map((post) => ({
    ...post,
    author: selectUserById(state, post.authorId),
  }));
};
```

## Frequently Asked Questions (FAQ)

### Q1: When should I use Entity Adapter?

**A:** Use Entity Adapter when you have collections of entities (users, posts, products) that need CRUD operations. It's especially useful when you have many entities and need fast lookups by ID.

### Q2: Can I use Entity Adapter with nested data?

**A:** Entity Adapter works best with normalized (flat) data. If you have nested relationships, normalize them into separate slices. For example, keep posts and comments in separate adapters.

### Q3: How do I handle relationships between entities?

**A:** Store relationships using IDs. For example, a post might have `authorId` and `commentIds`. Use selectors to combine related data when needed.

### Q4: Can I customize the ID field?

**A:** Yes! Use the `selectId` option:

```jsx
const adapter = createEntityAdapter({
  selectId: (item) => item.customId, // or item.uuid, etc.
});
```

### Q5: How do I sort entities differently?

**A:** You can:
1. Set a default `sortComparer` in the adapter
2. Create custom selectors that sort differently
3. Use `selectAll` and sort in the component (less efficient)

### Q6: What's the difference between `setAll` and `addMany`?

**A:** 
- `setAll` - Replaces all entities (useful for initial load)
- `addMany` - Adds new entities without removing existing ones

### Q7: How do I handle loading and error states?

**A:** Add them to your initial state:

```jsx
const initialState = adapter.getInitialState({
  loading: false,
  error: null,
});
```

### Q8: Can I use Entity Adapter with TypeScript?

**A:** Absolutely! Entity Adapter has excellent TypeScript support. Define your entity interface and pass it as a type parameter.

### Q9: How do I update nested properties?

**A:** Use `updateOne` with the `changes` object. Typically you update nested data by **replacing the nested object/array** (or by keeping nested data normalized in its own slice).

```jsx
dispatch(updateOne({
  id: 1,
  changes: {
    // Replace the nested object (recommended)
    user: { id: 5, name: 'New Name' },
  }
}));
```

### Q10: Is Entity Adapter better than manual reducers?

**A:** For collections with CRUD operations, yes! It reduces boilerplate, ensures consistency, and provides optimized selectors. For simple state, regular reducers might be sufficient.

## Visual Explanation: Entity Adapter Structure

```
Before Entity Adapter:
┌─────────────────────────────────────┐
│ state.posts = [                    │
│   { id: 1, title: 'Post 1' },      │
│   { id: 2, title: 'Post 2' },      │
│   { id: 3, title: 'Post 3' }       │
│ ]                                   │
│                                     │
│ // To find post by ID: O(n)        │
│ const post = posts.find(p =>       │
│   p.id === 1                        │
│ );                                  │
└─────────────────────────────────────┘

After Entity Adapter:
┌─────────────────────────────────────┐
│ state.posts = {                     │
│   ids: [1, 2, 3],                   │
│   entities: {                       │
│     1: { id: 1, title: 'Post 1' }, │
│     2: { id: 2, title: 'Post 2' }, │
│     3: { id: 3, title: 'Post 3' }  │
│   }                                 │
│ }                                   │
│                                     │
│ // To find post by ID: O(1)        │
│ const post = state.posts.entities[1]│
└─────────────────────────────────────┘
```

## Comparison: With vs Without Entity Adapter

```
Without Entity Adapter:
┌─────────────────────────────────────┐
│ // Reducer                          │
│ case 'ADD_POST':                    │
│   return [...state, action.payload];│
│                                     │
│ case 'UPDATE_POST':                 │
│   return state.map(post =>          │
│     post.id === action.payload.id   │
│       ? action.payload : post       │
│   );                                │
│                                     │
│ case 'DELETE_POST':                 │
│   return state.filter(post =>       │
│     post.id !== action.payload      │
│   );                                │
│                                     │
│ // Selector                         │
│ const post = state.posts.find(p => │
│   p.id === id                       │
│ );                                  │
└─────────────────────────────────────┘

With Entity Adapter:
┌─────────────────────────────────────┐
│ // Reducer                          │
│ addPost: adapter.addOne,            │
│ updatePost: adapter.updateOne,      │
│ deletePost: adapter.removeOne,      │
│                                     │
│ // Selector                         │
│ const post = selectPostById(state, │
│   id                                │
│ );                                  │
└─────────────────────────────────────┘
```

## Next Steps

Now that you understand Entity Adapter, here's what to learn next:

- **Next:** Explore [RTK Query](/react/rtk-query) - Advanced data fetching with caching
- Learn about [Redux Middleware](/react/redux-middleware) - Extend Redux functionality
- Master [Normalized State Patterns](/react/normalized-state) - Advanced state management
- Check out [Redux Performance Optimization](/react/redux-performance) - Optimize large Redux apps

---

## Summary

`createEntityAdapter` is a powerful tool that simplifies managing collections in Redux. It provides:

- ✅ Pre-built reducers for CRUD operations
- ✅ Optimized normalized state structure
- ✅ Fast O(1) lookups by ID
- ✅ Consistent patterns across your app
- ✅ Less boilerplate code

Use Entity Adapter when you have collections of entities that need CRUD operations. It will make your Redux code cleaner, more maintainable, and more performant. Happy coding!

