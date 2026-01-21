---
title: "React में Event Handling"
date: "2025-02-10"
description: "React में events कैसे handle करें? onClick, onChange, onSubmit और अन्य events के बारे में जानें।"
category: "React Basics"
tags: ["react", "events", "onClick", "onChange", "हिंदी"]
image: "/images/react-events.jpg"
author: "Sushil Kumar"
---

# React में Event Handling

Event handling React में user interactions handle करने का तरीका है। React में events HTML events के similar हैं, लेकिन कुछ differences हैं।

## Basic Event Handling

### onClick Event

```jsx
function Button() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

Inline function के साथ:

```jsx
function Button() {
  return (
    <button onClick={() => alert('Clicked!')}>
      Click me
    </button>
  );
}
```

## Common Events

### onChange Event

```jsx
function Input() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="टाइप करें..."
    />
  );
}
```

### onSubmit Event

```jsx
function Form() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### onMouseOver और onMouseOut

```jsx
function HoverButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? 'blue' : 'gray'
      }}
    >
      Hover me
    </button>
  );
}
```

## Event Object

Event handler function को automatically event object मिलता है:

```jsx
function Input() {
  const handleChange = (e) => {
    console.log(e.target.value); // Input value
    console.log(e.target.name);  // Input name
    console.log(e.type);         // Event type
  };

  return <input onChange={handleChange} />;
}
```

## Synthetic Events

React Synthetic Events use करता है, जो native events को wrap करते हैं:

```jsx
function Button() {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event bubbling
    console.log('Clicked!');
  };

  return <button onClick={handleClick}>Click</button>;
}
```

## Passing Arguments

Event handlers में arguments pass करना:

```jsx
function TodoList({ todos }) {
  const handleDelete = (id) => {
    console.log('Deleting:', id);
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => handleDelete(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

## Event Handler Best Practices

### 1. Named Functions Use करें

```jsx
// Good
function Component() {
  const handleClick = () => { /* ... */ };
  return <button onClick={handleClick}>Click</button>;
}

// Avoid (for complex logic)
function Component() {
  return <button onClick={() => { /* complex logic */ }}>Click</button>;
}
```

### 2. useCallback for Performance

```jsx
import { useCallback } from 'react';

function Component() {
  const handleClick = useCallback(() => {
    // Handler logic
  }, []);

  return <button onClick={handleClick}>Click</button>;
}
```

### 3. Prevent Default Behavior

```jsx
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    // Form handling logic
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## Multiple Event Handlers

```jsx
function Input() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleFocus = () => {
    console.log('Input focused');
  };

  const handleBlur = () => {
    console.log('Input blurred');
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
```

## Event Bubbling

React में events bubble होते हैं:

```jsx
function Parent() {
  const handleParentClick = () => {
    console.log('Parent clicked');
  };

  return (
    <div onClick={handleParentClick}>
      <Child />
    </div>
  );
}

function Child() {
  const handleChildClick = (e) => {
    e.stopPropagation(); // Stop bubbling
    console.log('Child clicked');
  };

  return <button onClick={handleChildClick}>Click</button>;
}
```

## Common Event Types

| Event | Description |
|-------|-------------|
| `onClick` | Mouse click |
| `onChange` | Input value change |
| `onSubmit` | Form submission |
| `onFocus` | Element focused |
| `onBlur` | Element blurred |
| `onMouseOver` | Mouse enters element |
| `onMouseOut` | Mouse leaves element |
| `onKeyDown` | Key pressed |
| `onKeyUp` | Key released |

## निष्कर्ष

Event handling React में user interactions handle करने का मुख्य तरीका है। Proper event handling से interactive और responsive applications बनते हैं।

## अगले कदम

- Form handling सीखें
- Advanced event patterns explore करें
- Performance optimization के लिए events optimize करें

