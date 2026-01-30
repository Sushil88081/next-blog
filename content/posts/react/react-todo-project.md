---
title: "Build a Todo App in React - Complete Project Tutorial"
date: "2025-02-13"
description: "Learn React by building a complete Todo application. This hands-on tutorial covers useState, components, props, events, and more React concepts."
category: "React Projects"
tags: ["react", "todo", "project", "tutorial", "useState", "components"]
image: "/assets/images/react.jpg"
author: "Sushil Kumar"
---

# Build a Todo App in React - Complete Project Tutorial

Building a Todo app is the perfect way to learn React! In this tutorial, we'll build a complete, working Todo application step by step. You'll use everything you've learned: components, state, props, events, and more!

## What We'll Build

We're going to create a Todo app with these features:
- Add new todos
- Mark todos as complete
- Delete todos
- Filter todos (All, Active, Completed)
- Count remaining todos
- Save todos to localStorage

## Project Setup

First, let's set up a new React project:

```bash
npx create-react-app todo-app
cd todo-app
npm start
```

## Step 1: Create the Basic Structure

Let's start with a simple component structure:

```jsx
// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  return (
    <div className="App">
      <h1>My Todo App</h1>
      <div className="todo-container">
        {/* Todo input and list will go here */}
      </div>
    </div>
  );
}

export default App;
```

## Step 2: Add Input Form

Create a form to add new todos:

```jsx
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  return (
    <div className="App">
      <h1>My Todo App</h1>
      
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Add Todo
        </button>
      </form>

      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <span>{todo.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Step 3: Create TodoItem Component

Let's extract the todo item into its own component:

```jsx
// TodoItem.js
import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      <span className="todo-text">{todo.text}</span>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-button"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
```

## Step 4: Complete App Component

Now let's complete the App component with all functionality:

```jsx
// App.js
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  const handleToggle = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="App">
      <div className="todo-app">
        <h1>My Todo App</h1>
        
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          <button type="submit" className="add-button">
            Add
          </button>
        </form>

        <div className="filter-buttons">
          <button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'active' : ''}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={filter === 'active' ? 'active' : ''}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'active' : ''}
          >
            Completed
          </button>
        </div>

        <div className="todo-stats">
          <span>{activeTodosCount} items left</span>
          {todos.some(todo => todo.completed) && (
            <button onClick={handleClearCompleted} className="clear-button">
              Clear Completed
            </button>
          )}
        </div>

        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <p className="empty-message">No todos found. Add one above!</p>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
```

## Step 5: Add Styling

Create a nice-looking CSS file:

```css
/* App.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.todo-app {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5rem;
}

.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.todo-input:focus {
  outline: none;
  border-color: #667eea;
}

.add-button {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.add-button:hover {
  background: #5568d3;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.filter-buttons button {
  padding: 8px 16px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-buttons button.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.todo-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 5px;
}

.clear-button {
  padding: 6px 12px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 5px;
  border-left: 4px solid #667eea;
  transition: all 0.3s;
}

.todo-item:hover {
  background: #f0f0f0;
  transform: translateX(5px);
}

.todo-item.completed {
  opacity: 0.6;
  border-left-color: #4caf50;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.delete-button {
  padding: 6px 12px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.delete-button:hover {
  background: #ee5a5a;
}

.empty-message {
  text-align: center;
  color: #999;
  padding: 40px;
  font-size: 18px;
}
```

## Step 6: Enhanced Features

Let's add some extra features:

### Edit Todo Functionality

```jsx
// TodoItem.js - Enhanced version
import React, { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim() !== '') {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(!isEditing);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyPress}
          className="edit-input"
          autoFocus
        />
      ) : (
        <span 
          className="todo-text"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}
      
      <button
        onClick={() => setIsEditing(true)}
        className="edit-button"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-button"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
```

Add edit handler to App.js:

```jsx
const handleEdit = (id, newText) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, text: newText } : todo
  ));
};

// Pass to TodoItem
<TodoItem
  key={todo.id}
  todo={todo}
  onToggle={handleToggle}
  onDelete={handleDelete}
  onEdit={handleEdit}
/>
```

## Visual Explanation: Todo App Structure

Here's how our Todo app is organized:

```
App Component
┌─────────────────────────────┐
│ State:                      │
│ - todos[]                   │
│ - input                     │
│ - filter                    │
├─────────────────────────────┤
│ Components:                 │
│ - TodoForm                  │
│ - FilterButtons             │
│ - TodoStats                 │
│ - TodoList                  │
│   └─ TodoItem (multiple)    │
└─────────────────────────────┘
```

## Data Flow

```
User Action Flow:
┌──────────────┐
│ User Types   │
│ in Input     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ setInput()   │
│ Updates      │
│ State        │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ User         │
│ Submits      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ handleSubmit │
│ Creates      │
│ New Todo     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ setTodos()   │
│ Updates      │
│ State        │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Component    │
│ Re-renders   │
│ Shows New    │
│ Todo         │
└──────────────┘
```

## Complete Working Example

Here's the complete, working Todo app:

```jsx
// App.js - Complete Version
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setTodos([...todos, {
      id: Date.now(),
      text: input.trim(),
      completed: false
    }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="App">
      <div className="todo-app">
        <h1>✨ My Todo App</h1>
        
        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          <button type="submit" className="add-button">Add</button>
        </form>

        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active ({activeCount})
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed ({todos.length - activeCount})
          </button>
        </div>

        <div className="todo-stats">
          <span>{activeCount} items left</span>
          {todos.some(t => t.completed) && (
            <button onClick={clearCompleted} className="clear-button">
              Clear Completed
            </button>
          )}
        </div>

        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <p className="empty-message">
              {filter === 'all' 
                ? "No todos yet. Add one above! 🎉"
                : `No ${filter} todos.`}
            </p>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
```

## What You Learned

This project taught you:
- ✅ **useState** - Managing todo list and input state
- ✅ **useEffect** - Saving to localStorage
- ✅ **Components** - Breaking code into TodoItem component
- ✅ **Props** - Passing data and functions to components
- ✅ **Events** - Handling clicks, form submission, input changes
- ✅ **Conditional Rendering** - Showing different content based on state
- ✅ **Lists and Keys** - Rendering todo list with proper keys
- ✅ **State Updates** - Immutable state updates with spread operator

## Visual Explanation: Component Hierarchy

```
App (Main Component)
├── TodoForm
│   ├── Input (controlled)
│   └── Submit Button
├── FilterButtons
│   ├── All Button
│   ├── Active Button
│   └── Completed Button
├── TodoStats
│   └── Clear Completed Button
└── TodoList
    └── TodoItem (multiple)
        ├── Checkbox
        ├── Text/Edit Input
        ├── Edit Button
        └── Delete Button
```

## Frequently Asked Questions (FAQ)

### Q1: Why use Date.now() for IDs?

**A:** It's simple and creates unique IDs. For production apps, use UUID library, but Date.now() works fine for learning!

### Q2: Why use spread operator when updating state?

**A:** React needs a new array reference to detect changes. Spread operator creates a new array:

```jsx
// Wrong - mutates original
todos.push(newTodo);

// Right - creates new array
setTodos([...todos, newTodo]);
```

### Q3: Why use localStorage?

**A:** localStorage persists data in browser. When user refreshes page, todos are still there! Perfect for learning.

### Q4: Can I use a database instead?

**A:** Yes! For production, use a backend API with a database. localStorage is just for learning and simple apps.

### Q5: Why extract TodoItem into separate component?

**A:** It makes code:
- More organized
- Easier to maintain
- Reusable
- Easier to test

### Q6: How do I add more features?

**A:** You can add:
- Due dates
- Categories/tags
- Priority levels
- Drag and drop reordering
- Search functionality

### Q7: Why use filter state?

**A:** Filter state controls which todos to show. It's separate from todos state for better organization.

### Q8: Can I use Redux for state management?

**A:** Yes! But for this project, useState is perfect. Use Redux when state gets complex or shared across many components.

### Q9: How do I deploy this app?

**A:** 
1. Build: `npm run build`
2. Deploy to Vercel, Netlify, or GitHub Pages
3. Your Todo app is live!

### Q10: What's next after this project?

**A:** Try building:
- Weather app (API integration)
- Calculator app
- Blog with CMS
- E-commerce product list
- Social media feed

Keep practicing with more projects!

---

## Next Steps

Now that you've built a Todo app, here's what to learn next:

- **Next:** Learn about [React Hooks](/react/react-hooks) - Master all React hooks
- Explore [React Forms](/react/react-forms) - Build more complex forms
- Understand [React Context API](/react/react-context-api) - Share state across components
- Master [React Performance Tips](/react/react-performance-tips) - Optimize your apps

Congratulations! You've built a complete Todo app. This is a great foundation for learning React. Keep building more projects to get better!

