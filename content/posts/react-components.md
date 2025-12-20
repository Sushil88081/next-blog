---
title: "React Components - Learn from Scratch"
date: "2025-02-01"
description: "What are React Components? Learn about Functional and Class components, component composition and best practices."
category: "React Basics"
tags: ["react", "components", "jsx"]
image: "/images/react-components.jpg"
author: "Your Name"
---

# React Components - Learn from Scratch

Components are the building blocks of React. They are reusable pieces of code that create UI elements.

## What are Components?

Components are independent and reusable pieces that create UI. They are like JavaScript functions that return HTML.

## Functional Components

Functional components are the most common and recommended approach:

```jsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}
```

Or with arrow function:

```jsx
const Welcome = () => {
  return <h1>Hello, React!</h1>;
};
```

## Using Components

Components can be used like HTML tags:

```jsx
function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
      <Welcome />
    </div>
  );
}
```

## Components with Props

Props are a way to pass data between components:

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Greeting name="John" />
      <Greeting name="Jane" />
      <Greeting name="Bob" />
    </div>
  );
}
```

With destructuring:

```jsx
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Your age is {age}</p>
    </div>
  );
}
```

## Component Composition

You can combine components to create complex UIs:

```jsx
function Header() {
  return <header>Header</header>;
}

function Sidebar() {
  return <aside>Sidebar</aside>;
}

function Content() {
  return <main>Content</main>;
}

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}
```

## Conditional Rendering

Conditional rendering in components:

```jsx
function UserGreeting({ isLoggedIn, name }) {
  if (isLoggedIn) {
    return <h1>Hello, {name}!</h1>;
  }
  return <h1>Please log in</h1>;
}
```

With ternary operator:

```jsx
function UserStatus({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <p>You are logged in</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

## Lists and Components

Rendering arrays:

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

## Component Best Practices

### 1. Single Responsibility
Each component should have a clear purpose.

### 2. Reusability
Make components reusable.

### 3. Naming Convention
Component names should be in CapitalCase.

### 4. Props Validation
Use TypeScript or PropTypes.

```jsx
import PropTypes from 'prop-types';

function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
```

## Component Structure Example

```jsx
// Button.jsx
function Button({ 
  text, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
```

## Conclusion

Components are the foundation of React. They make code organized, reusable, and maintainable.

## Next Steps

- Learn about Props and State
- Understand Component lifecycle
- Learn Advanced component patterns
