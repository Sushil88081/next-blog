---
title: "State vs Props"
date: "2025-01-09"
description: "Learn difference between state and props(properties)."
category: "React Basics"
tags: ["react", "state", "hooks", "useState"]
image: "/images/react-state.jpg"
author: "Sushil Kumar"
---

# State vs Props

Understanding the difference between state and props is fundamental to React development. Both are ways to manage and pass data in React components, but they serve different purposes and have distinct characteristics. Let's explore what makes them different and when to use each one.

---

## What is State in React?

State is data of the component itself. It can change with time. When state changes, component re-renders.

### State Points

- State is inside the component
- State can change
- State is used for dynamic data
- User action can change state

### Example

```jsx
const Counter = () => {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
};
```

---

## What are Props?

Props means properties. Props are used to send data from parent to child component. Props are read only.

### Props Points

- Props come from parent
- Props cannot change inside child
- Props make component reusable
- Data flows parent to child

### Example

```jsx
const Welcome = ({ name }) => {
  return <h1>Hello {name}</h1>;
};

// Called component here and pass to the parent
<Welcome name="Sushil" />;
```

---

## When to use State?

Use state when:

- Data changes
- User clicks or types
- Component behavior changes

**Example**: counter, form input, loading

---

## When to use Props?

Use props when:

- Data send parent to child
- Same component used many times

**Example**: username, title, color

---

## Simple Example

- **Props** → Given by parent
- **State** → Controlled by component

---

## Visual Explanation: State vs Props Flow

Here's how data flows with state and props:

```
Props Flow (Parent → Child):
┌─────────────────────────────┐
│ Parent Component            │
│ const name = "John"         │
│                             │
│ <Child name={name} /> ────┼───┐
└─────────────────────────────┘   │
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Child Component  │
                         │ ({ name })       │
                         │                 │
                         │ name = "John"   │
                         │ (read-only)     │
                         └─────────────────┘

State Flow (Inside Component):
┌─────────────────────────────┐
│ Component                   │
│ const [count, setCount] =   │
│   useState(0)               │
│                             │
│ count = 0 (can change)     │
│                             │
│ User clicks button          │
│ setCount(1)                 │
│                             │
│ count = 1 (updated!)       │
│ Component re-renders        │
└─────────────────────────────┘
```

## State vs Props Comparison Chart

```
┌─────────────────┬─────────────────┐
│      STATE      │      PROPS      │
├─────────────────┼─────────────────┤
│ Managed inside  │ Passed from     │
│ component       │ parent          │
│                 │                 │
│ Can change      │ Read-only       │
│ (mutable)       │ (immutable)     │
│                 │                 │
│ useState()      │ Function        │
│                 │ parameters      │
│                 │                 │
│ Triggers        │ Causes          │
│ re-render       │ re-render       │
│                 │                 │
│ Use for:        │ Use for:        │
│ - User input    │ - Configuration │
│ - Dynamic data  │ - Static data   │
│ - Component     │ - Reusability   │
│   behavior      │                 │
└─────────────────┴─────────────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: Can I change props in a child component?

**A:** No! Props are read-only. If you need to change data, lift the state up to the parent component and pass down a function to update it.

### Q2: What happens if I try to modify props?

**A:** React will warn you, and the change won't work. Props are immutable - you can't change them directly.

### Q3: Can state be passed as props?

**A:** Yes! State from parent can be passed as props to child:

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  return <Child count={count} />; // State becomes prop
}
```

### Q4: What's the difference between state and props?

**A:** 
- **State** - Owned by component, can change, triggers re-render
- **Props** - Owned by parent, read-only, causes re-render when changed

### Q5: Can I use both state and props in one component?

**A:** Yes! Most components use both:

```jsx
function Component({ initialCount }) { // Props
  const [count, setCount] = useState(initialCount); // State
  return <div>{count}</div>;
}
```

### Q6: When should I use state vs props?

**A:** 
- **State** - For data that changes within component
- **Props** - For data passed from parent or configuration

### Q7: Can props trigger state updates?

**A:** Yes! Use useEffect to sync props to state:

```jsx
useEffect(() => {
  setCount(props.initialCount);
}, [props.initialCount]);
```

### Q8: What if I need to update parent's state from child?

**A:** Pass a function as prop:

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  return <Child onUpdate={setCount} />;
}

function Child({ onUpdate }) {
  return <button onClick={() => onUpdate(5)}>Update</button>;
}
```

### Q9: Can I have default props?

**A:** Yes! Use default parameters:

```jsx
function Component({ name = 'Guest' }) {
  return <div>Hello {name}</div>;
}
```

### Q10: Do state and props both cause re-renders?

**A:** Yes! Both trigger re-renders:
- **State change** - Component re-renders
- **Props change** - Component re-renders

React is smart and only re-renders when necessary!

---

## Conclusion

State is changeable data. Props are read-only data. Both are important in React. Understanding when to use each is key to writing good React code!

---

## Next Steps

Now that you understand the difference between state and props, here's what to explore next:

- **Next:** Learn about [Event Handling in React](/react/react-events) - Make your components interactive
- Explore [Conditional Rendering](/react/react-conditional-rendering) - Show different content based on state
- Master [useEffect Hook](/react/react-useeffect-explained) - Handle side effects in your components
- Understand [Props in React](/react/react-props) - Learn more about passing data through props
- Explore [React Hooks](/react/react-hooks) - Discover other hooks that work with state and props
- Read about [Context API](/react/react-context-api) - Share state across components without prop drilling
- Study [Component Lifecycle](/react/react-components) - Understand when components update and re-render
