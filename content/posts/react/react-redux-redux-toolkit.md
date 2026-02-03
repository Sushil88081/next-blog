---
title: "React-Redux & Redux Toolkit - Complete Guide"
date: "2026-02-03"
description: "Master state management with React-Redux and Redux Toolkit. Learn how to manage global state efficiently with real-world examples and a complete project."
category: "React Advanced"
tags: ["react", "redux", "redux-toolkit", "state-management", "rtk"]
image: "/images/react-redux.jpg"
author: "Sushil Kumar"
---

# React-Redux & Redux Toolkit - Complete Guide

Managing state in React applications can become challenging as your app grows. When you have data that needs to be shared across multiple components, passing props down through many levels (prop drilling) becomes messy and hard to maintain. This is where Redux comes in!

## What is Redux?

Redux is a predictable state container for JavaScript applications. It helps you manage global state in a centralized store, making it accessible to any component in your application without prop drilling.

## Why Use Redux?

Imagine you're building an e-commerce app. You need to share the shopping cart data between:
- The product listing page
- The product detail page
- The cart icon in the header
- The checkout page

Without Redux, you'd need to lift state up to a common parent and pass it down through many components. With Redux, any component can directly access the cart data from the store.

## Redux Toolkit: The Modern Way

Redux Toolkit (RTK) is the official, recommended way to write Redux logic. It simplifies Redux by:
- Reducing boilerplate code
- Providing better defaults
- Including useful utilities out of the box
- Making Redux easier to learn and use

## Core Concepts

### 1. Store
The store is a single source of truth that holds your entire application state.

### 2. Actions
Actions are plain JavaScript objects that describe what happened in your app.

### 3. Reducers
Reducers are pure functions that specify how the state changes in response to actions.

### 4. Dispatch
Dispatch is a function used to send actions to the store.

## Installation

First, install Redux Toolkit and React-Redux:

```bash
npm install @reduxjs/toolkit react-redux
```

## Setting Up Redux Store

Let's create a store using Redux Toolkit:

```jsx
// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Creating a Slice

A slice is a collection of Redux reducer logic and actions for a single feature. Here's how to create one:

```jsx
// store/slices/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;
export default counterSlice.reducer;
```

## Connecting Redux to React

Wrap your app with the Provider component:

```jsx
// app/layout.tsx or main.jsx
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <YourApp />
    </Provider>
  );
}
```

## Using Redux in Components

### Reading State with useSelector

```jsx
import { useSelector } from 'react-redux';

function CounterDisplay() {
  const count = useSelector((state) => state.counter.value);
  
  return <div>Count: {count}</div>;
}
```

### Dispatching Actions with useDispatch

```jsx
import { useDispatch } from 'react-redux';
import { increment, decrement } from '../store/slices/counterSlice';

function CounterButtons() {
  const dispatch = useDispatch();
  
  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
```

## Real-World Example: Shopping Cart

Let's build a shopping cart feature that demonstrates Redux in a real application:

### Cart Slice

```jsx
// store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      state.itemCount += 1;
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    removeItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        state.itemCount -= item.quantity;
        state.total -= item.price * item.quantity;
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      
      if (item) {
        const oldQuantity = item.quantity;
        item.quantity = quantity;
        state.itemCount += quantity - oldQuantity;
        state.total = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

### Product Component

```jsx
// components/Product.jsx
import { useDispatch } from 'react-redux';
import { addItem } from '../store/slices/cartSlice';

function Product({ product }) {
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addItem(product));
  };
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
```

### Cart Component

```jsx
// components/Cart.jsx
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../store/slices/cartSlice';

function Cart() {
  const { items, total, itemCount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  if (items.length === 0) {
    return <div>Your cart is empty</div>;
  }
  
  return (
    <div className="cart">
      <h2>Shopping Cart ({itemCount} items)</h2>
      
      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <h4>{item.name}</h4>
          <p>${item.price} x {item.quantity}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              dispatch(
                updateQuantity({
                  id: item.id,
                  quantity: parseInt(e.target.value) || 1,
                })
              )
            }
            min="1"
          />
          <button onClick={() => dispatch(removeItem(item.id))}>
            Remove
          </button>
        </div>
      ))}
      
      <div className="cart-total">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
      
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    </div>
  );
}
```

### Cart Icon Component

```jsx
// components/CartIcon.jsx
import { useSelector } from 'react-redux';

function CartIcon() {
  const itemCount = useSelector((state) => state.cart.itemCount);
  
  return (
    <div className="cart-icon">
      <span>🛒</span>
      {itemCount > 0 && <span className="badge">{itemCount}</span>}
    </div>
  );
}
```

## Async Operations with createAsyncThunk

For API calls and async operations, use `createAsyncThunk`:

```jsx
// store/slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://api.example.com/products');
    return response.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
```

### Using Async Thunk in Component

```jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productsSlice';

function ProductsList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {items.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## Complete Project: Task Management App

Let's build a complete task management application using Redux Toolkit:

### Project Structure

```
src/
├── store/
│   ├── store.js
│   └── slices/
│       └── tasksSlice.js
├── components/
│   ├── TaskList.jsx
│   ├── TaskItem.jsx
│   ├── AddTask.jsx
│   └── TaskFilters.jsx
└── App.jsx
```

### Tasks Slice

```jsx
// store/slices/tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filter: 'all', // 'all', 'active', 'completed'
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const { id, text } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.text = text;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.tasks = state.tasks.filter((task) => !task.completed);
    },
  },
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  editTask,
  setFilter,
  clearCompleted,
} = tasksSlice.actions;

// Selectors
export const selectFilteredTasks = (state) => {
  const { tasks, filter } = state.tasks;
  switch (filter) {
    case 'active':
      return tasks.filter((task) => !task.completed);
    case 'completed':
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
};

export const selectTaskStats = (state) => {
  const tasks = state.tasks.tasks;
  return {
    total: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  };
};

export default tasksSlice.reducer;
```

### Store Configuration

```jsx
// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
```

### Add Task Component

```jsx
// components/AddTask.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/slices/tasksSlice';

function AddTask() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTask(input.trim()));
      setInput('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className="task-input"
      />
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  );
}

export default AddTask;
```

### Task Item Component

```jsx
// components/TaskItem.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask, editTask } from '../store/slices/tasksSlice';

function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const dispatch = useDispatch();
  
  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      dispatch(editTask({ id: task.id, text: editText.trim() }));
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };
  
  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };
  
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleTask(task.id))}
      />
      
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
            autoFocus
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="task-content">
          <span className="task-text">{task.text}</span>
          <div className="task-actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => dispatch(deleteTask(task.id))}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
```

### Task List Component

```jsx
// components/TaskList.jsx
import { useSelector } from 'react-redux';
import { selectFilteredTasks, selectTaskStats } from '../store/slices/tasksSlice';
import TaskItem from './TaskItem';

function TaskList() {
  const tasks = useSelector(selectFilteredTasks);
  const stats = useSelector(selectTaskStats);
  
  return (
    <div className="task-list">
      <div className="task-stats">
        <p>Total: {stats.total} | Active: {stats.active} | Completed: {stats.completed}</p>
      </div>
      
      {tasks.length === 0 ? (
        <p className="empty-message">No tasks found</p>
      ) : (
        <div className="tasks">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
```

### Task Filters Component

```jsx
// components/TaskFilters.jsx
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, clearCompleted } from '../store/slices/tasksSlice';

function TaskFilters() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);
  
  return (
    <div className="task-filters">
      <div className="filter-buttons">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => dispatch(setFilter('all'))}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => dispatch(setFilter('active'))}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => dispatch(setFilter('completed'))}
        >
          Completed
        </button>
      </div>
      
      <button
        className="clear-completed"
        onClick={() => dispatch(clearCompleted())}
      >
        Clear Completed
      </button>
    </div>
  );
}

export default TaskFilters;
```

### Main App Component

```jsx
// App.jsx
import { Provider } from 'react-redux';
import { store } from './store/store';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header>
          <h1>Task Manager</h1>
        </header>
        <main>
          <AddTask />
          <TaskFilters />
          <TaskList />
        </main>
      </div>
    </Provider>
  );
}

export default App;
```

## Best Practices

### 1. Use Selectors
Create reusable selectors to compute derived data:

```jsx
// In your slice
export const selectActiveTasks = (state) =>
  state.tasks.tasks.filter((task) => !task.completed);
```

### 2. Normalize State Shape
Keep your state normalized (flat structure):

```jsx
// Good
{
  users: {
    byId: {
      1: { id: 1, name: 'John' },
      2: { id: 2, name: 'Jane' }
    },
    allIds: [1, 2]
  }
}

// Avoid nested structures
```

### 3. Keep Reducers Pure
Reducers should be pure functions - no side effects:

```jsx
// Good
increment: (state) => {
  state.value += 1;
}

// Bad - don't do API calls in reducers
increment: (state) => {
  fetch('/api/increment').then(...);
  state.value += 1;
}
```

### 4. Use TypeScript for Type Safety
If using TypeScript, create typed hooks:

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Redux DevTools

Redux DevTools is automatically configured with Redux Toolkit. Install the browser extension to:
- Inspect state changes
- Time-travel debugging
- View action history
- Export/import state

## When to Use Redux

Use Redux when:
- ✅ State needs to be shared across many components
- ✅ State updates are complex
- ✅ You need time-travel debugging
- ✅ You're building a large application

Don't use Redux when:
- ❌ Your app is small
- ❌ State is mostly local
- ❌ You can solve it with Context API
- ❌ You're just starting to learn React

## Common Patterns

### Combining Multiple Slices

```jsx
// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
```

### Accessing Multiple State Values

```jsx
const { items, total } = useSelector((state) => ({
  items: state.cart.items,
  total: state.cart.total,
}));
```

## Frequently Asked Questions (FAQ)

### Q1: Do I need Redux for every React app?

**A:** No! Redux is useful for complex state management. For simple apps, useState and Context API are often sufficient. Use Redux when you have complex state logic or need to share state across many components.

### Q2: What's the difference between Redux and Redux Toolkit?

**A:** Redux Toolkit is the modern, recommended way to use Redux. It reduces boilerplate, provides better defaults, and includes utilities like `createSlice` and `createAsyncThunk`. Always use Redux Toolkit for new projects.

### Q3: Can I use Redux with class components?

**A:** Yes, but it's more verbose. Redux works best with functional components and hooks (useSelector, useDispatch). If you're using class components, you'll need to use `connect()` from react-redux.

### Q4: How do I handle API calls with Redux?

**A:** Use `createAsyncThunk` from Redux Toolkit. It handles loading states, success, and error cases automatically. You can also use libraries like RTK Query for more advanced API management.

### Q5: Should I store all state in Redux?

**A:** No! Only store global state that needs to be shared. Local component state (like form inputs, UI toggles) should stay in component state with useState.

### Q6: How do I persist Redux state?

**A:** Use `redux-persist` library to save state to localStorage. This is useful for maintaining state across page refreshes.

### Q7: What are selectors and why use them?

**A:** Selectors are functions that extract and compute derived data from the Redux state. They help with:
- Reusability
- Performance (memoization)
- Separation of concerns

### Q8: Can I have multiple stores?

**A:** Technically yes, but it's not recommended. Redux follows a single store pattern. If you need to separate concerns, use multiple slices in the same store.

### Q9: How do I test Redux code?

**A:** Test reducers, actions, and selectors as pure functions. Use `@reduxjs/toolkit` testing utilities or mock the store in component tests.

### Q10: What's RTK Query?

**A:** RTK Query is a powerful data fetching and caching solution built on top of Redux Toolkit. It's great for API-heavy applications and eliminates the need to write thunks for data fetching.

## Visual Explanation: Redux Flow

```
Component
    │
    │ dispatch(action)
    ▼
Action Creator
    │
    │ returns action object
    ▼
Store
    │
    │ calls reducer
    ▼
Reducer
    │
    │ returns new state
    ▼
Store (updated state)
    │
    │ notifies subscribers
    ▼
Component (re-renders)
```

## Redux Toolkit vs Plain Redux

```
Plain Redux (Old Way):
┌─────────────────────────────────────┐
│ const INCREMENT = 'INCREMENT';      │
│                                     │
│ function increment() {              │
│   return { type: INCREMENT };       │
│ }                                   │
│                                     │
│ function counterReducer(state,      │
│   action) {                         │
│   switch(action.type) {             │
│     case INCREMENT:                 │
│       return { ...state,            │
│         count: state.count + 1 };   │
│     default: return state;          │
│   }                                 │
│ }                                   │
└─────────────────────────────────────┘

Redux Toolkit (Modern Way):
┌─────────────────────────────────────┐
│ const counterSlice = createSlice({  │
│   name: 'counter',                  │
│   initialState: { count: 0 },       │
│   reducers: {                       │
│     increment: (state) => {         │
│       state.count += 1;             │
│     }                               │
│   }                                 │
│ });                                 │
│                                     │
│ // Actions auto-generated!          │
└─────────────────────────────────────┘
```

## Next Steps

Now that you understand React-Redux and Redux Toolkit, here's what to learn next:

- **Next:** Explore [RTK Query](/react/rtk-query) - Advanced data fetching with Redux Toolkit
- Learn about [Redux Middleware](/react/redux-middleware) - Extend Redux functionality
- Master [Redux Best Practices](/react/redux-best-practices) - Build scalable Redux apps
- Check out [State Management Comparison](/react/state-management-comparison) - Redux vs Context API vs Zustand

---

## Summary

Redux Toolkit makes state management in React applications much simpler and more maintainable. By centralizing your state in a store, you can:

- ✅ Share state across components easily
- ✅ Debug state changes with DevTools
- ✅ Write predictable, testable code
- ✅ Scale your application efficiently

Remember: Start simple with useState and Context API. Add Redux when your state management needs become complex. Happy coding!

