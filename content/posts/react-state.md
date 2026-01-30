---
title: "What is State in React?"
date: "2025-01-07"
description: "Learn how to use State in React with the useState hook. Complete guide covering primitive state, object state, array state, and best practices for state management."
category: "React Basics"
tags: ["react", "state", "hooks", "useState"]
image: "/images/react-state.jpg"
author: "Sushil Kumar"
---

# What is State in React?

Hey there! Want to know what state is in React? Think of state as your component's personal storage box. It's where your component keeps data that can change. Every time that data changes, React automatically refreshes what shows up on your screen.

What's neat about state is how it differs from props. Props get passed down from parent components, but state is something your component creates and controls all by itself. This is the secret sauce that makes components interactive - they can react to user actions, change their data, and update what they display.

---

## Why Do We Need State?

Imagine a component without state - it's like a picture that never changes. Always the same, always boring. But add state, and suddenly you can do amazing things:

- Keep track of what people type in input fields
- Toggle visibility of popups, dropdowns, or sidebars
- Build working counters and stopwatches
- Save and update your application's data
- Create interactive experiences

In simple terms, state breathes life into your React components. It transforms them from static displays into responsive, interactive elements.

---

## Getting Started with useState Hook

The `useState` hook is your tool for adding state to function components. It's actually quite straightforward - you get two things back: the current state value, and a function to modify it.

### Basic Syntax

```jsx
const [number, setNumber] = useState(0);
```

In this example, `number` holds the initial value (which is 0 here). To change that number, you call `setNumber` with the new value.

```jsx
import { useState } from "react";

function ClickCounter() {
  const [clicks, setClicks] = useState(0);
  const onButtonClick = () => {
    setClicks(clicks + 1);
  };
  return (
    <div>
      <p>Clicks: {clicks}</p>
      <button onClick={onButtonClick}>Click Me</button>
    </div>
  );
}
```

### Breaking Down useState

Here's what each part does:

- **`useState(0)`** - Sets up a new state variable with starting value of 0
- **`clicks`** - Holds the current state value (begins at 0)
- **`setClicks`** - The function that updates your state
- **Array destructuring** - The `[clicks, setClicks]` syntax extracts both values from the hook

Feel free to name these however you like. Common patterns include `[value, setValue]` or `[item, setItem]`. It's just a naming convention that helps keep things clear.

---

## Different Kinds of State

State can store various types of data. Here are the main categories you'll work with.

### 1. Simple State (Numbers, Text, True/False)

This is the easiest type - just a single value such as a number, text string, or boolean.

#### Working with Numbers

```jsx
function ScoreBoard() {
  const [score, setScore] = useState(0);

  const addPoint = () => {
    setScore(score + 1);
  };

  const subtractPoint = () => {
    setScore(score - 1);
  };

  const resetScore = () => {
    setScore(0);
  };

  return (
    <div>
      <h2>Score: {score}</h2>
      <button onClick={addPoint}>Add</button>
      <button onClick={subtractPoint}>Subtract</button>
      <button onClick={resetScore}>Reset</button>
    </div>
  );
}
```

#### Working with Text

```jsx
function TextField() {
  const [input, setInput] = useState("");

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something"
      />
      {input && <p>You typed: {input}</p>}
    </div>
  );
}
```

#### Working with Booleans

```jsx
function LightSwitch() {
  const [isLightOn, setIsLightOn] = useState(false);

  return (
    <div>
      <button onClick={() => setIsLightOn(!isLightOn)}>
        {isLightOn ? "Turn Off" : "Turn On"}
      </button>
      <p>Light is: {isLightOn ? "On" : "Off"}</p>
    </div>
  );
}
```

---

### 2. Object State

When you need to keep track of multiple related pieces of information together, object state is your friend.

```jsx
function ProfileForm() {
  const [profile, setProfile] = useState({
    firstName: "",
    years: 0,
    contact: "",
  });

  const changeFirstName = (firstName) => {
    setProfile({ ...profile, firstName });
  };

  const changeYears = (years) => {
    setProfile({ ...profile, years: parseInt(years) || 0 });
  };

  const changeContact = (contact) => {
    setProfile({ ...profile, contact });
  };

  return (
    <div>
      <input
        value={profile.firstName}
        onChange={(e) => changeFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="number"
        value={profile.years}
        onChange={(e) => changeYears(e.target.value)}
        placeholder="Age"
      />
      <input
        type="email"
        value={profile.contact}
        onChange={(e) => changeContact(e.target.value)}
        placeholder="Email"
      />
      <div>
        <p>Name: {profile.firstName}</p>
        <p>Age: {profile.years}</p>
        <p>Email: {profile.contact}</p>
      </div>
    </div>
  );
}
```

**Key point**: When updating object state, always build a new object using the spread operator (`...`). Never modify the existing object directly - React needs a new object to detect changes!

---

### 3. Array State

Arrays work great for managing collections - shopping lists, product catalogs, or any group of items.

#### Working with Arrays

```jsx
function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Adding a new task
  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        title: newTask,
        done: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  // Removing a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggling task completion
  const markComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.done ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>
            <button onClick={() => markComplete(task.id)}>
              {task.done ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button onClick={() => deleteTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### Useful Array Patterns

Here are some patterns you'll use often with arrays:

```jsx
const [list, setList] = useState([]);

// Append to end
setList([...list, newItem]);

// Prepend to start
setList([newItem, ...list]);

// Delete by id
setList(list.filter((item) => item.id !== idToDelete));

// Modify an item
setList(
  list.map((item) => (item.id === idToChange ? { ...item, ...changes } : item))
);

// Empty the array
setList([]);
```

---

### 4. Nested/Complex State

Occasionally you'll need to manage more complex structures - objects containing arrays, or arrays of objects. Here's how to work with them:

```jsx
function OrderManager() {
  const [order, setOrder] = useState({
    products: [],
    subtotal: 0,
    savings: 0,
  });

  const addProduct = (product) => {
    const newProducts = [...order.products, product];
    const newSubtotal = newProducts.reduce(
      (total, item) => total + item.cost,
      0
    );

    setOrder({
      ...order,
      products: newProducts,
      subtotal: newSubtotal,
    });
  };

  const removeProduct = (productId) => {
    const newProducts = order.products.filter((item) => item.id !== productId);
    const newSubtotal = newProducts.reduce(
      (total, item) => total + item.cost,
      0
    );

    setOrder({
      ...order,
      products: newProducts,
      subtotal: newSubtotal,
    });
  };

  const setSavings = (savingsPercent) => {
    setOrder({
      ...order,
      savings: savingsPercent,
    });
  };

  return (
    <div>
      <h2>Your Order</h2>
      <p>Products: {order.products.length}</p>
      <p>Subtotal: ${order.subtotal}</p>
      <p>Savings: {order.savings}%</p>
      <p>Final Total: ${order.subtotal * (1 - order.savings / 100)}</p>
      {/* Product list rendering */}
    </div>
  );
}
```

---

## Using Multiple useState Hooks

You're allowed to use several `useState` hooks in a single component. This can be cleaner than cramming everything into one object:

```jsx
function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [yearsOld, setYearsOld] = useState(0);
  const [emailAddress, setEmailAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const submitForm = async () => {
    setIsProcessing(true);
    // Form submission logic
    setIsProcessing(false);
  };

  return (
    <form onSubmit={submitForm}>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="number"
        value={yearsOld}
        onChange={(e) => setYearsOld(parseInt(e.target.value) || 0)}
        placeholder="Age"
      />
      <input
        type="email"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        placeholder="Email"
      />
      <button type="submit" disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Register"}
      </button>
    </form>
  );
}
```

**When to use multiple state variables vs object state?**

- Use separate variables when each piece of data changes independently
- Use object state when the data pieces are related and usually updated together

---

## Best Practices for Updating State

### 1. Using Function Updates

When your new state value depends on the previous state, pass a function to the setter. This ensures you're always working with the most current value:

```jsx
function NumberCounter() {
  const [number, setNumber] = useState(0);

  // Good - Uses previous state
  const increase = () => {
    setNumber((previous) => previous + 1);
  };

  // Also good for multiple updates
  const increaseByTwo = () => {
    setNumber((previous) => previous + 1);
    setNumber((previous) => previous + 1);
  };

  return (
    <div>
      <p>Number: {number}</p>
      <button onClick={increase}>+1</button>
      <button onClick={increaseByTwo}>+2</button>
    </div>
  );
}
```

### 2. Updating Object State

Always create a fresh object when updating. Never modify the existing object:

```jsx
const [person, setPerson] = useState({ firstName: "", years: 0, contact: "" });

// ✅ Right way - Makes new object
setPerson({ ...person, firstName: "Alex" });

// ✅ Also right - Multiple changes
setPerson({ ...person, firstName: "Alex", years: 30 });

// ❌ Wrong way - Don't do this!
person.firstName = "Alex";
setPerson(person);
```

### 3. Updating Array State

Same principle applies to arrays - always create a new array:

```jsx
const [things, setThings] = useState([]);

// ✅ Add item
setThings([...things, newThing]);

// ✅ Remove item
setThings(things.filter((thing) => thing.id !== id));

// ✅ Update item
setThings(
  things.map((thing) => (thing.id === id ? { ...thing, ...changes } : thing))
);

// ❌ Wrong way - Don't do this!
things.push(newThing);
setThings(things);
```

### 4. Lazy Initialization

If computing the starting state is costly, pass a function to `useState`:

```jsx
// Heavy calculation
function HeavyComponent() {
  const [result, setResult] = useState(() => {
    // This function runs only once
    return performHeavyCalculation();
  });

  // Rest of component
}
```

---

## Mistakes You Should Avoid

### Directly Modifying State

```jsx
// ❌ Wrong
const [person, setPerson] = useState({ firstName: "John" });
person.firstName = "Jane"; // Don't do this!
setPerson(person);

// ✅ Right
setPerson({ ...person, firstName: "Jane" });
```

### Skipping Function Updates

```jsx
// ❌ Wrong - May cause issues
setNumber(number + 1);
setNumber(number + 1); // Uses stale number value

// ✅ Right
setNumber((previous) => previous + 1);
setNumber((previous) => previous + 1); // Uses current value
```

### Not Converting Input Types

```jsx
// ❌ Wrong - Years becomes string
<input
  type="number"
  value={years}
  onChange={(e) => setYears(e.target.value)}
/>

// ✅ Right - Converts to number
<input
  type="number"
  value={years}
  onChange={(e) => setYears(parseInt(e.target.value) || 0)}
/>
```

---

## Conclusion

State is the engine that powers dynamic React components. It enables you to capture user input, modify data, and create UIs that respond to changes. Once you master `useState` and learn the different state types, you'll be able to build impressive interactive applications.

Keep these tips in mind:

- Always create fresh objects/arrays when updating state
- Use function updates when new state depends on previous state
- Choose the state structure that fits your needs
- Keep things simple - avoid unnecessary complexity

---

## Visual Explanation: State Updates

Here's how state changes trigger re-renders:

```
Initial State:
┌─────────────────────────────┐
│ count = 0                   │
│ Component renders           │
│ Shows: "Count: 0"          │
└──────────────┬──────────────┘
               │
               │ User clicks button
               ▼
State Update:
┌─────────────────────────────┐
│ setCount(1) called          │
│                             │
│ React updates state:        │
│ count = 1                   │
│                             │
│ Component re-renders        │
│ Shows: "Count: 1"          │
└─────────────────────────────┘
```

## State vs Props Visualization

```
┌─────────────────┬─────────────────┐
│      STATE      │      PROPS      │
├─────────────────┼─────────────────┤
│ Managed inside  │ Passed from     │
│ component       │ parent          │
│                 │                 │
│ Can change      │ Read-only       │
│                 │                 │
│ Triggers        │ Causes          │
│ re-render       │ re-render      │
│                 │                 │
│ useState()      │ Function        │
│                 │ parameters      │
└─────────────────┴─────────────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: What's the difference between state and props?

**A:** 
- **State** - Data managed inside component, can change
- **Props** - Data passed from parent, read-only

State is for component's own data, props are for data from parent.

### Q2: Can I use state without useState hook?

**A:** In functional components, no! useState is the only way. In class components, you'd use `this.state`, but functional components are recommended.

### Q3: How many useState hooks can I use?

**A:** As many as you need! Each useState manages one piece of state. It's common to have multiple useState hooks in one component.

### Q4: What happens if I update state directly?

**A:** It won't work! You must use the setter function:

```jsx
// Wrong - won't trigger re-render
count = count + 1;

// Right - triggers re-render
setCount(count + 1);
```

### Q5: Can I store functions in state?

**A:** Yes, but use a function initializer:

```jsx
const [fn, setFn] = useState(() => () => console.log('Hello'));
```

### Q6: How do I update nested state?

**A:** Use spread operator to create new objects:

```jsx
setUser({ ...user, name: 'New Name' });
```

### Q7: What's the initial value in useState?

**A:** The first argument you pass:

```jsx
useState(0);        // Initial is 0
useState('');       // Initial is empty string
useState([]);       // Initial is empty array
```

### Q8: Can I use state in the dependency array?

**A:** Yes! If your effect uses state, include it:

```jsx
useEffect(() => {
  // Uses count
}, [count]); // Include state in dependencies
```

### Q9: How do I reset state to initial value?

**A:** Store initial value and reset:

```jsx
const initialValue = 0;
const [count, setCount] = useState(initialValue);

const reset = () => setCount(initialValue);
```

### Q10: Does state persist across re-renders?

**A:** Yes! State persists as long as the component exists. When component unmounts, state is lost. When component remounts, state resets to initial value.

---

## Next Steps

Now that you've learned about state, here's what to explore next:

- **Next:** Learn about [useState Hook](/react/react-usestate-basics) - Deep dive into the useState hook with examples
- Understand [State vs Props](/react/react-state-props) - See how props and state work together
- Explore [Event Handling](/react/react-events) - See how state changes when users interact with your app
- Read about [React Hooks](/react/react-hooks) - Discover other hooks like useEffect, useContext, and more
