---
title: "Jsx"
date: "2025-12-22"
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

## Conclusion

JSX is a fundamental part of React development. It acts as a bridge between HTML and JavaScript, making code easier to write and read. At first, it may feel a bit unusual, but with regular practice, it becomes second nature. Once you get comfortable with JSX, you'll find it makes building React components much more enjoyable!

---

## Next Steps

- Learn about [React Components](/react/react-components)
- Understand [Props in React](/react/react-props)
- Explore [State Management](/react/react-state)
- Read about [React Hooks](/react/react-hooks)
