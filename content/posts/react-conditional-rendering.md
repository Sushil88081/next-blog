---
title: "Conditional Rendering in React"
date: "2025-01-09"
description: "Learn how to conditionally render content in React using if/else, ternary operator, logical operators, and switch statements. Master dynamic UI rendering techniques."
category: "React Basics"
tags: ["react", "conditional", "rendering", "jsx"]
image: "/images/react-conditional.jpg"
author: "Sushil Kumar"
---

# Conditional Rendering in React

Ever wondered how websites show different things based on what's happening? That's conditional rendering! In React, you can make your components smart enough to show or hide stuff depending on conditions. Think of it like a smart door that opens when you have a key - your UI changes based on what's true or false in your app.

This is super useful for things like showing a login form when someone isn't logged in, or displaying their profile when they are. It's what makes websites feel alive and interactive.

---

## What is Conditional Rendering?

Basically, conditional rendering means your component decides what to show based on some condition. Instead of always showing the same boring content, your component can check things like "Is the user logged in?" or "Is data loading?" and then show different stuff accordingly.

This is how React apps become dynamic. Your components aren't just static anymore - they react to what's happening in your app.

---

## Using if/else Statements

The simplest way to do conditional rendering is with good old if/else statements. This is perfect when you want to return totally different JSX based on a condition:

```jsx
function WelcomeMessage({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please log in</h1>;
  }
}
```

This is really easy to understand. If the user is logged in, show one message. If not, show a different one. It's straightforward and works great for simple true/false situations.

---

## Ternary Operator

The ternary operator is awesome for doing conditional rendering right inside your JSX. It's short and sweet, perfect when you want to conditionally show something inline:

```jsx
function UserInfo({ isLoggedIn, userName }) {
  return (
    <div>
      {isLoggedIn ? <h1>Hello, {userName}!</h1> : <h1>Please log in</h1>}
    </div>
  );
}
```

The way it works is: `condition ? (show this if true) : (show this if false)`. It's basically a tiny if/else that fits right in your JSX. Lots of developers love this because everything stays in one place and it's easy to read.

---

## Logical && Operator

Sometimes you only want to show something when a condition is true, and show nothing when it's false. That's when the logical AND operator (`&&`) comes in handy:

```jsx
function Alert({ message, isVisible }) {
  return <div>{isVisible && <div className="alert">{message}</div>}</div>;
}
```

This is really handy for stuff like error messages, alerts, or any optional UI elements. If `isVisible` is `true`, the alert shows up. If it's `false`, React just doesn't render anything at all.

---

## Dealing with Multiple Conditions

Sometimes you need to check more than one condition and show different things for each. Here are a few ways to handle that:

### Using if/else if

```jsx
function AccessPanel({ userRole }) {
  if (userRole === "admin") {
    return <AdminDashboard />;
  } else if (userRole === "user") {
    return <UserDashboard />;
  } else {
    return <GuestView />;
  }
}
```

### Using Chained Ternary Operators

You can also nest ternary operators together, but watch out - too many nested ternaries can make your code confusing:

```jsx
function AccessPanel({ userRole }) {
  return (
    <div>
      {userRole === "admin" ? (
        <AdminDashboard />
      ) : userRole === "user" ? (
        <UserDashboard />
      ) : (
        <GuestView />
      )}
    </div>
  );
}
```

---

## Switch Statements

When you have lots of different values to check, a switch statement can be way cleaner and easier to read:

```jsx
function AppStatus({ status }) {
  switch (status) {
    case "loading":
      return <div>Loading...</div>;
    case "success":
      return <div>Success!</div>;
    case "error":
      return <div>Something went wrong</div>;
    default:
      return <div>Unknown status</div>;
  }
}
```

Switch statements are perfect when you have multiple specific values to check. They're much easier to read than a long chain of if/else statements.

---

## Early Return Pattern

The early return pattern is a nice way to handle multiple conditions. Instead of nesting everything, you check each condition and return early if you need to:

```jsx
function Profile({ user }) {
  if (!user) {
    return <div>User not found</div>;
  }

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

This pattern helps reduce nesting and makes your code easier to understand. You check each condition, and if it's true, you return early. If not, you keep going to the main content.

---

## Conditional CSS Classes

A lot of times you'll want to add different CSS classes based on conditions. Here's how:

### Simple Conditional Classes

```jsx
function ToggleButton({ isActive, children }) {
  return (
    <button className={`button ${isActive ? "active" : "inactive"}`}>
      {children}
    </button>
  );
}
```

### Multiple Conditional Classes

When you have multiple conditions, you can create an array of classes and remove any falsy values:

```jsx
function CustomButton({ variant, size, disabled }) {
  const classNames = [
    "button",
    variant && `button-${variant}`,
    size && `button-${size}`,
    disabled && "button-disabled",
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={classNames}>Click me</button>;
}
```

This method is really flexible and handles multiple optional classes nicely. The `filter(Boolean)` part removes any falsy values, and `join(' ')` puts them all together into one string.

---

## Conditional Attributes

You can also conditionally add attributes to elements. Here's a useful pattern:

```jsx
function TextInput({ required, disabled }) {
  return (
    <input
      type="text"
      required={required || undefined}
      disabled={disabled || undefined}
    />
  );
}
```

By using `|| undefined`, if the prop is `false`, React won't add that attribute at all. This is cleaner than conditionally including the whole attribute.

---

## Conditional Rendering with Lists

When you're rendering lists, you often need to handle empty states or filter items conditionally:

```jsx
function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.length > 0 ? (
        tasks.map((task) => <li key={task.id}>{task.text}</li>)
      ) : (
        <li>No tasks available</li>
      )}
    </ul>
  );
}
```

This pattern makes sure you always show something useful, even when the list is empty. It's a great way to make your app more user-friendly!

---

## Real Example: User Dashboard

Let's see how this all works together with a real example that uses multiple conditional rendering techniques:

```jsx
function UserDashboard({ user, data, isLoading, error }) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!user) {
    return <LoginForm />;
  }

  if (!data || data.length === 0) {
    return <NoDataMessage />;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <DataList data={data} />
    </div>
  );
}
```

This component handles several different situations:

- Shows a loading spinner while fetching data
- Shows an error message if something breaks
- Shows a login form if there's no user
- Shows a message if there's no data
- Finally shows the actual dashboard content

This is a really common pattern in real apps - you check conditions in order and return early when needed.

---

## Tips for Better Code

Here are some helpful tips to make your conditional rendering cleaner and easier to maintain:

### Make Conditions Clear

Put complex conditions into variables with good names:

```jsx
// Good - Easy to understand
const hasAccess = user && user.isAuthenticated;
if (hasAccess) {
}

// Bad - Hard to read
if (user && user.isAuthenticated && user.role === "admin") {
}
```

### Move Complex Logic Out

Take complex conditional logic out of your JSX:

```jsx
function MyComponent({ user }) {
  const canModify = user && user.role === "admin" && user.isActive;

  return <div>{canModify && <EditButton />}</div>;
}
```

### Use Early Returns

Try to use early returns instead of deeply nested conditionals:

```jsx
// Good - Simple and clear
function MyComponent({ data }) {
  if (!data) return null;
  // Rest of component
}

// Bad - Too nested and confusing
function MyComponent({ data }) {
  return (
    <div>
      {data && (
        // Lots of nested JSX
      )}
    </div>
  );
}
```

### Keep It Simple

- Use ternary operators for simple true/false checks
- Use if/else when you have multiple return statements
- Use switch when you have many specific values
- Use early returns to avoid deep nesting

---

## Things to Watch Out For

- **Be careful with `&&` and numbers**: `{count && <div>{count}</div>}` will display `0` if count is 0. Instead use `{count > 0 && ...}`
- **Don't nest too many ternaries**: After 2-3 levels, switch to if/else or move the logic out
- **Always add keys in lists**: Make sure to include unique keys when conditionally rendering list items
- **Don't return `undefined`**: Make sure your conditions return `null` or valid JSX, never `undefined`

---

## Conclusion

Conditional rendering is super important in React. It's what makes your apps feel alive and respond to different situations and user actions. Once you get comfortable with these techniques, you'll be able to build UIs that work in any situation.

Just remember, there's no one right way to do it. Pick the approach that makes sense for what you're building. Start with the simple stuff, and as you practice more, you'll figure out which pattern works best for each situation.

---

## Next Steps

Now that you know about conditional rendering, here's what to check out next:

- **Next:** Learn about [Lists and Keys in React](/react/react-lists-keys) - Find out how to render dynamic lists the right way
- Explore [Forms in React](/react/react-forms) - Build interactive forms with conditional validation
- Understand [useEffect Hook](/react/react-useeffect-explained) - Handle side effects based on conditions
