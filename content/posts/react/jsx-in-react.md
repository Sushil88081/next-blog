---
title: "Jsx"
date: "2025-01-03"
description: "What is JSX,Learn about the JSX."
category: "React Basics"
tags: ["react", "jsx"]
image: "image "
author: "Sushil kumar"
---

# What is jsx?

JSX is also called JavaScript XML. It's a syntax extension for JavaScript that allows you to write HTML-like code directly in JavaScript files. Think of it as a way to write HTML inside your JavaScript, which makes building React components much more intuitive and readable.

---

## Examples

Let's look at some practical examples to understand how JSX works:

### 1. Returning a single JSX element

When you want to return just one JSX element, you can use React Fragments (the `<>...</>` syntax) or a single element:

```jsx
function Test() {
  return <> Hello world! </>;      //jsx
}
```

### 2. Rendering multiple JSX elements

If you want to render multiple JSX elements, you need to wrap them in a parent element or React Fragment:

```jsx
function Test(){
   return (
    <div>hello1</div>       //jsx
    <div>hello2</div>      //jsx
    <div>hello3</div>     //jsx
   );
}
```

### 3. Using JavaScript variables in JSX

To use JavaScript variables or expressions in JSX, you need to wrap them in curly braces `{}`. This is how you embed dynamic content:

```jsx
function Test(){
    var a =10;
   return (
       <div>hello1{a}</div>        //jsx with javascript variable
       <div>hello2{a}</div>       //jsx with javascript variable
       <div>hello3{a}</div>       //jsx with javascript variable
   );
}
```

### 4. Writing attributes in JSX

When writing attributes in JSX, remember to follow camelCase convention. For example, `class` becomes `className`, `onclick` becomes `onClick`, and so on:

```jsx
function Test() {
  const handleClick = () => {
    alert('clicked!');
  };
  
  return (
    <div className="container" onClick={handleClick} tabIndex="1">
      Content Here..
    </div>
  );
}
```

### 5. Conditional rendering

There are several ways to conditionally render content in JSX. Here are three common approaches:

```jsx
function Test({ isLoggedIn, userName }) {
  return (
   <div>
      {/*  1: Ternary operator */}
      {isLoggedIn ? (
        <h1>Welcom, {userName}!</h1>
      ) : (
        <button>Login</button>
      )}
      
      {/* 2: Logical AND */}
      {isLoggedIn && <p>You are logged In</p>}
      
      {/* 3: Store in variable */}
      {(() => {
        if (isLoggedIn) return <Dashboard />;
        return <LoginForm />;
      })()}
    </div>
  );
}
```

### 6. List rendering

When rendering lists in React, you use the `map()` function. Always remember to use a unique `key` prop for each item to avoid warnings in React:

```jsx
function Test() {
    const students = [
    { id: 1, name: 'Amit', grade: 'A' },
    { id: 2, name: 'Sonam', grade: 'B' },
    { id: 3, name: 'Rahul', grade: 'A+' }
  ];
  return (
   <div>
      <ul>
      {students.map(student => (
                               //  always use unique key to avoid warnings in reactjs.
        <li key={student.id}>          
          {student.name} - Grade: {student.grade}
        </li>
      ))}
    </ul>
    </div>
  );
}
```

---

## Visual Explanation: JSX Transformation

Here's how JSX gets converted to JavaScript:

```
JSX Code:
┌─────────────────────────────┐
│ <div>                       │
│   <h1>Hello {name}</h1>     │
│   <button onClick={handle}> │
│     Click                   │
│   </button>                  │
│ </div>                       │
└──────────────┬──────────────┘
               │
               ▼
JavaScript (React.createElement):
┌─────────────────────────────┐
│ React.createElement(        │
│   'div',                    │
│   null,                     │
│   React.createElement(      │
│     'h1',                   │
│     null,                   │
│     'Hello ', name          │
│   ),                        │
│   React.createElement(      │
│     'button',               │
│     { onClick: handle },   │
│     'Click'                 │
│   )                         │
│ )                           │
└─────────────────────────────┘
```

## JSX vs HTML Comparison

```
HTML:
<div class="container">
  <h1>Title</h1>
  <label for="input">Name</label>
</div>

JSX:
<div className="container">
  <h1>Title</h1>
  <label htmlFor="input">Name</label>
</div>

Key Differences:
- class → className
- for → htmlFor
- camelCase for attributes
```

## Frequently Asked Questions (FAQ)

### Q1: Is JSX required for React?

**A:** Technically no, but practically yes! You can use `React.createElement()` directly, but JSX makes code much more readable and easier to write. Almost everyone uses JSX.

### Q2: Can I use regular HTML in JSX?

**A:** Mostly yes, but some differences:
- `class` → `className`
- `for` → `htmlFor`
- Attributes use camelCase
- Self-closing tags need `/` (like `<img />`)

### Q3: Why do I need to wrap multiple elements?

**A:** React components must return a single element. Use a `<div>`, Fragment (`<>...</>`), or wrap in an array with keys.

### Q4: Can I use JavaScript expressions in JSX?

**A:** Yes! Use `{}` to embed JavaScript:

```jsx
<div>{name}</div>
<div>{2 + 2}</div>
<div>{isLoggedIn ? 'Welcome' : 'Login'}</div>
```

### Q5: Can I use comments in JSX?

**A:** Yes, but syntax is different:

```jsx
{/* This is a comment */}
```

Regular `//` comments don't work inside JSX tags.

### Q6: Do I need to import React to use JSX?

**A:** In React 17+, no! The new JSX transform handles it automatically. But older versions require `import React from 'react'`.

### Q7: Can I use if-else in JSX?

**A:** Not directly! Use ternary operator or logical AND:

```jsx
{condition ? <Component1 /> : <Component2 />}
{condition && <Component />}
```

### Q8: How do I add CSS classes conditionally?

**A:** Use template literals or libraries:

```jsx
<div className={`base ${isActive ? 'active' : ''}`}>
```

### Q9: Can I use HTML entities in JSX?

**A:** Yes, but you can also use Unicode or the actual character:

```jsx
<div>&copy; 2025</div>
<div>© 2025</div> {/* Both work */}
```

### Q10: What happens if I return undefined from JSX?

**A:** React will render nothing. Make sure your component always returns JSX (or null).

---

## Conclusion

JSX is a fundamental part of React development. It acts as a bridge between HTML and JavaScript, making code easier to write and read. At first, it may feel a bit unusual, but with regular practice, it becomes second nature. Once you get comfortable with JSX, you'll find it makes building React components much more enjoyable!

---

## Next Steps

Now that you understand JSX, here's what to learn next:

- **Next:** Learn about [React Components](/react/react-components) - Start building reusable UI components
- Understand [Props in React](/react/react-props) - Learn how to pass data between components
- Explore [State Management](/react/react-state) - Learn how to manage dynamic data
