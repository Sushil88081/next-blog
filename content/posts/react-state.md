---
title: "What is State in React?"
date: "2025-01-20"
description: "Learn how to use State in React with the useState hook. Complete guide covering primitive state, object state, array state, and best practices for state management."
category: "React Basics"
tags: ["react", "state", "hooks", "useState"]
image: "/images/react-state.jpg"
author: "Sushil Kumar"
---

# What is State in React?

State is one of the most fundamental concepts in React. Think of state as the component's memory - it's the internal data that can change over time. When state changes, React automatically re-renders the component to reflect those changes in the UI.

Unlike props (which come from parent components), state is created and managed within the component itself. This makes components dynamic and interactive - they can respond to user actions, update data, and change what's displayed on the screen.

---

## Why is State Important?

State is what makes React components come alive. Without state, components are static - they always display the same thing. With state, you can:

- Track user input in forms
- Toggle UI elements (like modals or menus)
- Update counters and timers
- Manage application data
- Create interactive user experiences

State transforms static components into dynamic, responsive interfaces that react to user interactions and data changes.

---

## Understanding useState Hook

The `useState` hook is React's way of adding state to functional components. It's a simple but powerful tool that returns two things: the current state value and a function to update it.

### Basic Syntax

const [counter,setCounter]=useState(0);

 ##### here counter is first variable counter is contain initial value which is 0 , if we want to update the counter value then we have to use setCounter method to update.

 
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const handleClick=()=>{
    setCount(count++)
  }
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>
        Increase
      </button>
    </div>
  );
}
```

### How useState Works

Let's break down what's happening:

- **`useState(0)`** - Creates a new state variable with an initial value of `0`
- **`count`** - The current state value (starts at `0`)
- **`setCount`** - A function to update the state value
- **Array destructuring** - `[count, setCount]` extracts both values from the hook

The naming convention is flexible - you can name them anything, but it's common to use descriptive names like `[value, setValue]` or `[name, setName]`.

---

## Types of State in React

State can hold different types of data. Understanding how to work with each type is crucial for effective React development.

### 1. Primitive State (Numbers, Strings, Booleans)

Primitive state is the simplest type - it holds a single value like a number, string, or boolean.

#### Number State

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

#### String State

```jsx
function NameInput() {
  const [name, setName] = useState('');

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      {name && <p>Hello, {name}!</p>}
    </div>
  );
}
```

#### Boolean State

```jsx
function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOn(!isOn)}>
        {isOn ? 'ON' : 'OFF'}
      </button>
      <p>Status: {isOn ? 'Active' : 'Inactive'}</p>
    </div>
  );
}
```

---

### 2. Object State

Object state allows you to store multiple related values together. This is useful when you need to track several properties at once.

#### Basic Object State

```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    age: 0,
    email: ''
  });

  const updateName = (name) => {
    setUser({ ...user, name });
  };

  const updateAge = (age) => {
    setUser({ ...user, age: parseInt(age) || 0 });
  };

  const updateEmail = (email) => {
    setUser({ ...user, email });
  };

  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => updateName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="number"
        value={user.age}
        onChange={(e) => updateAge(e.target.value)}
        placeholder="Age"
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => updateEmail(e.target.value)}
        placeholder="Email"
      />
      <div>
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
}
```

**Important**: When updating object state, always create a new object using the spread operator (`...`). Never mutate the state object directly!

---

### 3. Array State

Array state is perfect for managing lists of items - like todos, products, or any collection of data.

#### Basic Array Operations

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Add item to array
  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  // Remove item from array
  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Update item in array
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => toggleComplete(todo.id)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### Common Array Operations

```jsx
const [items, setItems] = useState([]);

// Add item to end
setItems([...items, newItem]);

// Add item to beginning
setItems([newItem, ...items]);

// Remove item by id
setItems(items.filter(item => item.id !== idToRemove));

// Update item in array
setItems(items.map(item =>
  item.id === idToUpdate
    ? { ...item, ...updatedFields }
    : item
));

// Clear all items
setItems([]);
```

---

### 4. Complex/Nested State

Sometimes you need to manage nested objects or arrays within objects. Here's how to handle complex state structures:

```jsx
function ShoppingCart() {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
    discount: 0
  });

  const addItem = (product) => {
    const updatedItems = [...cart.items, product];
    const newTotal = updatedItems.reduce((sum, item) => sum + item.price, 0);
    
    setCart({
      ...cart,
      items: updatedItems,
      total: newTotal
    });
  };

  const removeItem = (itemId) => {
    const updatedItems = cart.items.filter(item => item.id !== itemId);
    const newTotal = updatedItems.reduce((sum, item) => sum + item.price, 0);
    
    setCart({
      ...cart,
      items: updatedItems,
      total: newTotal
    });
  };

  const applyDiscount = (discountPercent) => {
    setCart({
      ...cart,
      discount: discountPercent
    });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>Items: {cart.items.length}</p>
      <p>Subtotal: ${cart.total}</p>
      <p>Discount: {cart.discount}%</p>
      <p>Total: ${cart.total * (1 - cart.discount / 100)}</p>
      {/* Cart items rendering */}
    </div>
  );
}
```

---

## Multiple State Variables

You can use multiple `useState` hooks in a single component. This is often cleaner than managing everything in one object:

```jsx
function UserForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Submit logic here
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value) || 0)}
        placeholder="Age"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

**When to use multiple state variables vs. object state:**
- Use multiple variables when values change independently
- Use object state when values are closely related and often updated together

---

## State Update Best Practices

### 1. Functional Updates

When your new state depends on the previous state, use a functional update. This ensures you're working with the latest state value:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // Good - Uses previous state
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  // Also good for multiple updates
  const incrementByTwo = () => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={incrementByTwo}>+2</button>
    </div>
  );
}
```

### 2. Object State Updates

Always create a new object when updating object state. Never mutate the existing object:

```jsx
const [user, setUser] = useState({ name: '', age: 0, email: '' });

// ✅ Correct - Creates new object
setUser({ ...user, name: 'John' });

// ✅ Also correct - Multiple updates
setUser({ ...user, name: 'John', age: 25 });

// ❌ Wrong - Mutates existing object
user.name = 'John';
setUser(user);
```

### 3. Array State Updates

Similar to objects, always create a new array when updating:

```jsx
const [items, setItems] = useState([]);

// ✅ Add item
setItems([...items, newItem]);

// ✅ Remove item
setItems(items.filter(item => item.id !== id));

// ✅ Update item
setItems(items.map(item =>
  item.id === id ? { ...item, ...updates } : item
));

// ❌ Wrong - Mutates array
items.push(newItem);
setItems(items);
```

### 4. Lazy Initial State

If computing the initial state is expensive, pass a function to `useState`:

```jsx
// Expensive computation
function ExpensiveComponent() {
  const [data, setData] = useState(() => {
    // This function runs only once
    return computeExpensiveValue();
  });
  
  // Rest of component
}
```

---

## Common Mistakes to Avoid

### Mutating State Directly

```jsx
// ❌ Wrong
const [user, setUser] = useState({ name: 'John' });
user.name = 'Jane'; // Don't do this!
setUser(user);

// ✅ Correct
setUser({ ...user, name: 'Jane' });
```

### Not Using Functional Updates

```jsx
// ❌ Wrong - May not work correctly
setCount(count + 1);
setCount(count + 1); // Uses stale count value

// ✅ Correct
setCount(prev => prev + 1);
setCount(prev => prev + 1); // Uses latest value
```

### Forgetting to Handle Input Types

```jsx
// ❌ Wrong - Age becomes string
<input
  type="number"
  value={age}
  onChange={(e) => setAge(e.target.value)}
/>

// ✅ Correct - Converts to number
<input
  type="number"
  value={age}
  onChange={(e) => setAge(parseInt(e.target.value) || 0)}
/>
```

---

## State vs Props

Understanding when to use state vs props is important:

| State | Props |
|-------|-------|
| Created inside component | Passed from parent component |
| Can be changed (mutable) | Read-only (immutable) |
| Changed using setState/useState | Cannot be modified by component |
| Causes component to re-render | Component re-renders when props change |
| Used for dynamic internal data | Used for configuration and parent data |

**Rule of thumb**: Use props for data that comes from outside, use state for data the component manages internally.

---

## Conclusion

State is the heart of dynamic React components. It enables interactivity, user input handling, and responsive UIs. By mastering the `useState` hook and understanding how to work with different state types, you'll be able to build powerful, interactive applications.

Remember:
- Always create new objects/arrays when updating state
- Use functional updates when new state depends on previous state
- Choose the right state structure for your needs
- Keep state as simple as possible - don't overcomplicate it

---

## Next Steps

Now that you understand state, here's what to explore next:

- Learn about [React Hooks](/react/react-hooks) - Discover other hooks like useEffect, useContext, and more
- Understand [Props in React](/react/react-props) - Learn how props and state work together
- Explore [Context API](/react/react-context-api) - Share state across multiple components without prop drilling
- Read about [Event Handling](/react/react-events) - See how state changes in response to user interactions
- Study [Component Lifecycle](/react/react-components) - Understand when components update and re-render
