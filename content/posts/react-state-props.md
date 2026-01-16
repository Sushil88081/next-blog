---
title: "State vs Props"
date: "2026-01-17"
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

## Conclusion

State is changeable data. Props are read-only data. Both are important in React.

---

## Next Steps

Now that you understand the difference between state and props, here's what to explore next:

- Learn about [State Management in React](/react/react-state) - Deep dive into managing state with useState hook
- Understand [Props in React](/react/react-props) - Learn more about passing data through props
- Explore [React Hooks](/react/react-hooks) - Discover other hooks that work with state and props
- Read about [Context API](/react/react-context-api) - Share state across components without prop drilling
- Study [Component Lifecycle](/react/react-components) - Understand when components update and re-render
