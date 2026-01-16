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

So you want to learn about state in React? Well, state is basically like the memory of your component. It's data that lives inside your component and can change over time. When the state changes, React will automatically update what you see on the screen.

The cool thing about state is that it's different from props. Props come from the parent component, but state is created and managed right inside the component itself. This is what makes your components interactive - they can respond to what users do, update data, and change what's displayed.

---

## Why is State Important?

Without state, your components are just static - they always show the same thing. But with state, you can do all kinds of stuff:

- Track what users type in forms
- Show or hide things like modals or menus
- Make counters and timers work
- Store and manage your app data
- Make things interactive

Basically, state is what makes your React components come alive. It turns boring static components into something that actually responds to users.

---

## Understanding useState Hook

The `useState` hook is how you add state to your functional components. It's pretty simple actually - it gives you two things: the current value of your state, and a function to change it.

### Basic Syntax

```jsx
const [counter, setCounter] = useState(0);
```

So here, `counter` is the first variable that contains the initial value which is 0. If you want to update the counter value, you have to use the `setCounter` method to update it.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increase</button>
    </div>
  );
}
```

### How useState Works

Let me explain what's going on here:

- **`useState(0)`** - This creates a new state variable and sets it to 0 initially
- **`count`** - This is the current value of your state (starts at 0)
- **`setCount`** - This is the function you use to update the state
- **Array destructuring** - The `[count, setCount]` part just gets both values from the hook

You can name these whatever you want, but most people use something like `[value, setValue]` or `[name, setName]`. It's just a convention that makes sense.

---

## Types of State in React

State can hold different types of data. Let me show you the main ones you'll use.

### 1. Primitive State (Numbers, Strings, Booleans)

This is the simplest type - just one value like a number, string, or true/false.

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
  const [name, setName] = useState("");

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
      <button onClick={() => setIsOn(!isOn)}>{isOn ? "ON" : "OFF"}</button>
      <p>Status: {isOn ? "Active" : "Inactive"}</p>
    </div>
  );
}
```

---

### 2. Object State

Sometimes you need to store multiple things together. That's when you use object state.

```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    age: 0,
    email: "",
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

**Important thing to remember**: When you update object state, always create a new object using the spread operator (`...`). Don't try to change the existing object directly - React won't like that!

---

### 3. Array State

Arrays are perfect for lists - like todos, products, or any collection of stuff.

#### Basic Array Operations

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Add item to array
  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  // Remove item from array
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Update item in array
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
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
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => toggleComplete(todo.id)}>
              {todo.completed ? "Undo" : "Complete"}
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

Here are some common things you'll do with arrays:

```jsx
const [items, setItems] = useState([]);

// Add item to end
setItems([...items, newItem]);

// Add item to beginning
setItems([newItem, ...items]);

// Remove item by id
setItems(items.filter((item) => item.id !== idToRemove));

// Update item in array
setItems(
  items.map((item) =>
    item.id === idToUpdate ? { ...item, ...updatedFields } : item
  )
);

// Clear all items
setItems([]);
```

---

### 4. Complex/Nested State

Sometimes you need to store objects that have arrays inside them, or arrays with objects. It can get complicated, but here's how you handle it:

```jsx
function ShoppingCart() {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
    discount: 0,
  });

  const addItem = (product) => {
    const updatedItems = [...cart.items, product];
    const newTotal = updatedItems.reduce((sum, item) => sum + item.price, 0);

    setCart({
      ...cart,
      items: updatedItems,
      total: newTotal,
    });
  };

  const removeItem = (itemId) => {
    const updatedItems = cart.items.filter((item) => item.id !== itemId);
    const newTotal = updatedItems.reduce((sum, item) => sum + item.price, 0);

    setCart({
      ...cart,
      items: updatedItems,
      total: newTotal,
    });
  };

  const applyDiscount = (discountPercent) => {
    setCart({
      ...cart,
      discount: discountPercent,
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

You can use multiple `useState` hooks in one component. Sometimes this is cleaner than putting everything in one object:

```jsx
function UserForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
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
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```

**When should you use multiple state variables vs object state?**

- Use multiple variables when each value changes on its own
- Use object state when the values are related and you often update them together

---

## State Update Best Practices

### 1. Functional Updates

If your new state depends on the old state, use a function. This makes sure you're working with the latest value:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // Good - Uses previous state
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Also good for multiple updates
  const incrementByTwo = () => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
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

Always make a new object when updating. Never change the old one directly:

```jsx
const [user, setUser] = useState({ name: "", age: 0, email: "" });

// ✅ Correct - Creates new object
setUser({ ...user, name: "John" });

// ✅ Also correct - Multiple updates
setUser({ ...user, name: "John", age: 25 });

// ❌ Wrong - Don't do this!
user.name = "John";
setUser(user);
```

### 3. Array State Updates

Same thing with arrays - always make a new array:

```jsx
const [items, setItems] = useState([]);

// ✅ Add item
setItems([...items, newItem]);

// ✅ Remove item
setItems(items.filter((item) => item.id !== id));

// ✅ Update item
setItems(
  items.map((item) => (item.id === id ? { ...item, ...updates } : item))
);

// ❌ Wrong - Don't do this!
items.push(newItem);
setItems(items);
```

### 4. Lazy Initial State

If calculating the initial state is expensive, you can pass a function to `useState`:

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
const [user, setUser] = useState({ name: "John" });
user.name = "Jane"; // Don't do this!
setUser(user);

// ✅ Correct
setUser({ ...user, name: "Jane" });
```

### Not Using Functional Updates

```jsx
// ❌ Wrong - Might not work right
setCount(count + 1);
setCount(count + 1); // Uses old count value

// ✅ Correct
setCount((prev) => prev + 1);
setCount((prev) => prev + 1); // Uses latest value
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

---

## Conclusion

State is what makes React components dynamic and interactive. It lets you handle user input, update data, and make your UI respond to changes. Once you get the hang of `useState` and understand the different types of state, you can build some really cool stuff.

Just remember:

- Always create new objects/arrays when updating state
- Use functional updates when new state depends on old state
- Pick the right state structure for what you need
- Keep it simple - don't make it more complicated than it needs to be

---

## Next Steps

Now that you understand state, here's what you should check out next:

- Learn about [React Hooks](/react/react-hooks) - There are other hooks like useEffect, useContext, and more
- Understand [Props in React](/react/react-props) - See how props and state work together
- Explore [Context API](/react/react-context-api) - Share state across components without passing it through every level
- Read about [Event Handling](/react/react-events) - See how state changes when users interact with your app
- Study [Component Lifecycle](/react/react-components) - Learn when components update and re-render
