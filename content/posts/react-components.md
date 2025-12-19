---
title: "React Components - शुरुआत से सीखें"
date: "2025-02-01"
description: "React Components क्या हैं? Functional और Class components, component composition और best practices के बारे में जानें।"
category: "React Basics"
tags: ["react", "components", "jsx", "हिंदी"]
image: "/images/react-components.jpg"
author: "आपका नाम"
---

# React Components - शुरुआत से सीखें

Components React की building blocks हैं। वे reusable pieces of code हैं जो UI elements बनाते हैं।

## Components क्या हैं?

Components independent और reusable pieces हैं जो UI बनाते हैं। वे JavaScript functions की तरह हैं जो HTML return करते हैं।

## Functional Components

Functional components सबसे common और recommended approach हैं:

```jsx
function Welcome() {
  return <h1>नमस्ते, React!</h1>;
}
```

या arrow function के साथ:

```jsx
const Welcome = () => {
  return <h1>नमस्ते, React!</h1>;
};
```

## Component का उपयोग

Components को HTML tags की तरह use किया जा सकता है:

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

## Props के साथ Components

Props components के बीच data pass करने का तरीका है:

```jsx
function Greeting(props) {
  return <h1>नमस्ते, {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Greeting name="राज" />
      <Greeting name="प्रिया" />
      <Greeting name="अमित" />
    </div>
  );
}
```

Destructuring के साथ:

```jsx
function Greeting({ name, age }) {
  return (
    <div>
      <h1>नमस्ते, {name}!</h1>
      <p>आपकी उम्र {age} है</p>
    </div>
  );
}
```

## Component Composition

आप components को combine करके complex UIs बना सकते हैं:

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

Components में conditional rendering:

```jsx
function UserGreeting({ isLoggedIn, name }) {
  if (isLoggedIn) {
    return <h1>नमस्ते, {name}!</h1>;
  }
  return <h1>कृपया लॉगिन करें</h1>;
}
```

Ternary operator के साथ:

```jsx
function UserStatus({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <p>आप लॉगिन हैं</p>
      ) : (
        <p>कृपया लॉगिन करें</p>
      )}
    </div>
  );
}
```

## Lists और Components

Arrays को render करना:

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
हर component का एक clear purpose होना चाहिए।

### 2. Reusability
Components को reusable बनाएं।

### 3. Naming Convention
Components के नाम CapitalCase में होने चाहिए।

### 4. Props Validation
TypeScript या PropTypes का उपयोग करें।

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

## निष्कर्ष

Components React की foundation हैं। वे code को organized, reusable, और maintainable बनाते हैं।

## अगले कदम

- Props और State के बारे में जानें
- Component lifecycle समझें
- Advanced component patterns सीखें

