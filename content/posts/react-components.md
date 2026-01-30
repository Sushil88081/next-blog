---
title: "Components , Learn about the components "
date: "2025-01-04"
description: "What are React Components? Learn about Functional and Class components, component composition and best practices."
category: "React Basics"
tags: ["react", "components", "jsx"]
image: "/images/react-components.jpg"
author: "Sushil kumar"
---

# React Components (Functional Components)

Components are the building blocks of React. They are reusable pieces of code that create UI elements. Think of them as LEGO blocks - you create small, independent pieces and combine them to build something bigger and more complex.

> **Note:** This guide focuses on **Functional Components** only, which is the modern and recommended approach in React. While React also supports Class Components, functional components are simpler, more performant, and are the standard in modern React development.

---

## What are Components?

Components are independent and reusable pieces that create UI. They are like JavaScript functions that return HTML (or more accurately, JSX). The beauty of components is that once you create one, you can use it anywhere in your application, as many times as you want!

Imagine building a website where you need the same button style in multiple places. Instead of writing the same code over and over, you create a Button component once and reuse it everywhere. That's the power of React components!

---

## Functional Components (Focus of This Guide)

**Functional components** are the most common and recommended approach in modern React development. They're simpler, easier to read, and perform better than class components. This entire guide focuses on functional components, which are JavaScript functions that return JSX. Here's how you write one:

```jsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}
```

You can also write them using arrow function syntax, which many developers prefer:

```jsx
const Welcome = () => {
  return <h1>Hello, React!</h1>;
};
```

Both approaches work exactly the same way - it's really just a matter of personal preference. Choose whichever style feels more comfortable to you!

---

## Using Components

Once you've created a component, you can use it just like an HTML tag. This is one of the coolest things about React - your custom components become part of the language:

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

See how we're using `<Welcome />` three times? Each instance is independent, and React will render all three. This reusability is what makes components so powerful!

---

## Components with Props

Props (short for properties) are a way to pass data between components. Think of props as arguments you pass to a function, but for components. This allows you to make components dynamic and reusable:

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

Now the same `Greeting` component can display different names! Notice how we're passing the `name` prop to each component instance.

### Using Destructuring

You can make your code cleaner by destructuring props directly in the function parameters:

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

This is the preferred way to write components because it's more readable and you can immediately see what props the component expects.

---

## Component Composition

One of the most powerful features of React is component composition - combining smaller components to create complex UIs. It's like building with blocks - you create small pieces and put them together:

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

Here, we've created three small components (`Header`, `Sidebar`, and `Content`) and composed them together in a `Layout` component. This makes your code more organized and easier to maintain!

---

## Conditional Rendering

Sometimes you want to show different content based on certain conditions. React makes this really easy. Here are a couple of ways to do it:

### Using If Statements

```jsx
function UserGreeting({ isLoggedIn, name }) {
  if (isLoggedIn) {
    return <h1>Hello, {name}!</h1>;
  }
  return <h1>Please log in</h1>;
}
```

This is straightforward - if the user is logged in, show a greeting. Otherwise, ask them to log in.

### Using Ternary Operator

For simpler conditions, you can use a ternary operator directly in JSX:

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

Both approaches work great - use whichever feels more natural for your situation!

---

## Lists and Components

Rendering lists of data is super common in React applications. Here's how you do it:

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

**Important:** Always remember to include a `key` prop when rendering lists. React uses keys to efficiently update the DOM when items change. Without keys, React might have trouble tracking which items have changed, added, or removed.

---

## Component Best Practices

As you start building more components, here are some best practices to keep in mind:

### 1. Single Responsibility

Each component should have a clear, single purpose. If a component is doing too many things, consider breaking it down into smaller components. This makes your code easier to understand, test, and maintain.

### 2. Reusability

Make components reusable by accepting props. The more flexible your components are, the more places you can use them. Think about what might change between different uses of the component, and make those things props.

### 3. Naming Convention

Component names should always start with a capital letter (CapitalCase). This is a React convention that helps distinguish components from regular HTML elements. For example: `Button`, `UserCard`, `NavigationBar`.

### 4. Props Validation

Use TypeScript or PropTypes to validate the props your component receives. This helps catch errors early and makes your components more self-documenting:

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

This way, if someone uses your component incorrectly, they'll get a helpful warning in the console.

---

## Component Structure Example

Here's a complete example of a well-structured component with default props:

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

Notice how we're using default parameter values (`variant = 'primary'` and `disabled = false`). This means if someone doesn't provide these props, the component will use these default values. Pretty handy!

---

## Conclusion

Components are the foundation of React. They make your code organized, reusable, and maintainable. Once you get comfortable with creating and using components, you'll see how they make building complex UIs much more manageable.

Remember, start simple and gradually build more complex components. Practice creating small, reusable components, and before you know it, you'll be building entire applications with ease!

---

## Visual Explanation: Component Structure

Here's how components are organized:

```
┌─────────────────────────────────────┐
│         App Component               │
│  (Main Container)                   │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────┐                  │
│  │   Header     │                  │
│  │  Component   │                  │
│  └──────────────┘                  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │      Main Content            │  │
│  │  ┌────────┐  ┌──────────┐   │  │
│  │  │ Article│  │ Sidebar  │   │  │
│  │  │ Comp   │  │ Component│   │  │
│  │  └────────┘  └──────────┘   │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────┐                  │
│  │   Footer     │                  │
│  │  Component   │                  │
│  └──────────────┘                  │
└─────────────────────────────────────┘
```

## Component Reusability Diagram

```
Single Button Component
┌─────────────┐
│   Button    │
│  Component  │
└──────┬──────┘
       │
       │ Used Multiple Times
       │
   ┌───┴────┬────────┬────────┐
   │        │        │        │
┌──▼──┐ ┌──▼──┐ ┌──▼──┐ ┌──▼──┐
│Submit│ │Cancel│ │Delete│ │ Edit│
│Button│ │Button│ │Button│ │Button│
└──────┘ └──────┘ └──────┘ └──────┘

Same component, different props!
```

## Frequently Asked Questions (FAQ)

### Q1: What's the difference between functional and class components?

**A:** 
- **Functional components** - Modern, simpler, use hooks (recommended)
- **Class components** - Older style, use lifecycle methods

React recommends functional components. Class components are mostly legacy code now.

### Q2: How small should components be?

**A:** Components should do one thing well. If a component is doing too much, break it down. A good rule: if it's more than 100-150 lines, consider splitting it.

### Q3: Can components have other components inside?

**A:** Yes! This is called component composition. It's one of React's most powerful features:

```jsx
function Card() {
  return (
    <div>
      <CardHeader />
      <CardBody />
      <CardFooter />
    </div>
  );
}
```

### Q4: Should I create a component for everything?

**A:** Not everything! Create components for:
- Things you'll reuse
- Complex UI pieces
- Things that make sense as separate pieces

Don't create components for tiny one-time-use elements.

### Q5: Can components return null?

**A:** Yes! Returning `null` renders nothing:

```jsx
function ConditionalComponent({ show }) {
  if (!show) return null;
  return <div>Content</div>;
}
```

### Q6: How do I name components?

**A:** Use PascalCase (capital first letter):

```jsx
// Good
function UserCard() {}
function NavigationBar() {}

// Bad
function userCard() {}
function navigation_bar() {}
```

### Q7: Can I use components inside other components?

**A:** Absolutely! This is composition:

```jsx
function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
```

### Q8: What's the difference between components and elements?

**A:**
- **Element** - `<div>Hello</div>` (JSX)
- **Component** - `function Hello() { return <div>Hello</div> }` (function that returns JSX)

### Q9: Can I export components?

**A:** Yes! Export to use in other files:

```jsx
// Component.jsx
export function Button() {
  return <button>Click</button>;
}

// App.jsx
import { Button } from './Component';
```

### Q10: How do I test components?

**A:** Use testing libraries like React Testing Library or Jest. Test that components render correctly and handle user interactions properly.

---

## Next Steps

Now that you understand React components, here's what to learn next:

- **Next:** Learn about [Props in React](/react/react-props) - Deep dive into how to pass and use props effectively
- Explore [State Management](/react/react-state) - Learn how to manage dynamic data in your components
- Understand [React Hooks](/react/react-hooks) - Modern way to add state and lifecycle features to functional components
- Learn about [Event Handling](/react/react-events) - Discover how to handle user interactions in your components
