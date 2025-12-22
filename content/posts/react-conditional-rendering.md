---
title: "Conditional Rendering in React"
date: "2025-02-15"
description: "Learn how to conditionally render content in React using if/else, ternary operator, logical operators, and switch statements. Master dynamic UI rendering techniques."
category: "React Basics"
tags: ["react", "conditional", "rendering", "jsx"]
image: "/images/react-conditional.jpg"
author: "Sushil Kumar"
---

# Conditional Rendering in React

Conditional rendering is a powerful technique in React that allows you to show or hide elements based on certain conditions. It's like having a smart UI that adapts to different situations - showing a login button when the user isn't logged in, or displaying user data when they are. This makes your applications more interactive and user-friendly.

---

## Understanding Conditional Rendering

At its core, conditional rendering is about making decisions in your components. Instead of always showing the same content, you can make your components smart enough to display different things based on props, state, or other conditions. This is what makes React applications feel dynamic and responsive.

---

## Using if/else Statements

The most straightforward way to conditionally render content is using if/else statements. This works great when you want to return completely different JSX based on a condition:

```jsx
function UserGreeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please log in</h1>;
  }
}
```

This approach is clean and easy to read, especially when you have clear true/false scenarios. The component will render one thing if the user is logged in, and something completely different if they're not.

---

## Ternary Operator

The ternary operator is perfect for inline conditional rendering. It's concise and works great when you want to conditionally render something directly in your JSX:

```jsx
function UserStatus({ isLoggedIn, userName }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Hello, {userName}!</h1>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
}
```

The syntax is: `condition ? (if true) : (if false)`. It's like a mini if/else statement that fits right into your JSX. Many developers prefer this for simple conditions because it keeps everything in one place.

---

## Logical && Operator

When you only need to render something when a condition is true (and show nothing when it's false), the logical AND operator (`&&`) is your best friend:

```jsx
function Notification({ message, show }) {
  return (
    <div>
      {show && <div className="notification">{message}</div>}
    </div>
  );
}
```

This is super useful for things like error messages, notifications, or optional UI elements. If `show` is `true`, the notification appears. If it's `false`, nothing renders at all.

---

## Handling Multiple Conditions

Sometimes you need to check multiple conditions and render different content for each. Here are a couple of ways to handle this:

### Using if/else if

```jsx
function UserRole({ role }) {
  if (role === 'admin') {
    return <AdminPanel />;
  } else if (role === 'user') {
    return <UserPanel />;
  } else {
    return <GuestPanel />;
  }
}
```

### Using Nested Ternary Operators

You can also chain ternary operators, though be careful - too many nested ternaries can make code hard to read:

```jsx
function UserRole({ role }) {
  return (
    <div>
      {role === 'admin' ? (
        <AdminPanel />
      ) : role === 'user' ? (
        <UserPanel />
      ) : (
        <GuestPanel />
      )}
    </div>
  );
}
```

---

## Switch Statements

For complex conditions with many possible values, a switch statement can be cleaner and more readable:

```jsx
function StatusMessage({ status }) {
  switch (status) {
    case 'loading':
      return <div>Loading...</div>;
    case 'success':
      return <div>Success!</div>;
    case 'error':
      return <div>An error occurred</div>;
    default:
      return <div>Unknown status</div>;
  }
}
```

Switch statements are great when you have multiple specific values to check. They're easier to read than long chains of if/else statements.

---

## Early Return Pattern

The early return pattern is a clean way to handle multiple conditions. Instead of nesting everything, you check conditions and return early if needed:

```jsx
function UserProfile({ user }) {
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

This pattern reduces nesting and makes your code easier to follow. Each condition is checked, and if it's true, the function returns early. Otherwise, it continues to the main content.

---

## Conditional CSS Classes

Often, you'll want to apply different CSS classes based on conditions. Here's how to do it:

### Simple Conditional Classes

```jsx
function Button({ isActive, children }) {
  return (
    <button
      className={`btn ${isActive ? 'btn-active' : 'btn-inactive'}`}
    >
      {children}
    </button>
  );
}
```

### Multiple Conditional Classes

For more complex scenarios with multiple conditions, you can build an array of classes and filter out falsy values:

```jsx
function Button({ variant, size, disabled }) {
  const classes = [
    'btn',
    variant && `btn-${variant}`,
    size && `btn-${size}`,
    disabled && 'btn-disabled'
  ].filter(Boolean).join(' ');

  return <button className={classes}>Click me</button>;
}
```

This approach is flexible and handles multiple optional classes elegantly. The `filter(Boolean)` removes any falsy values, and `join(' ')` combines them into a single string.

---

## Conditional Attributes

You can also conditionally add attributes to elements. Here's a common pattern:

```jsx
function Input({ required, disabled }) {
  return (
    <input
      type="text"
      required={required || undefined}
      disabled={disabled || undefined}
    />
  );
}
```

By using `|| undefined`, if the prop is `false`, React won't add the attribute at all. This is cleaner than conditionally including the entire attribute.

---

## Conditional Rendering in Lists

When rendering lists, you often need to handle empty states or filter items conditionally:

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.length > 0 ? (
        todos.map(todo => <li key={todo.id}>{todo.text}</li>)
      ) : (
        <li>No todos available</li>
      )}
    </ul>
  );
}
```

This pattern ensures you always show something meaningful, even when the list is empty. It's a great way to improve user experience!

---

## Real-World Example: Dashboard Component

Let's put it all together with a practical example that combines multiple conditional rendering techniques:

```jsx
function Dashboard({ user, data, isLoading, error }) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!user) {
    return <LoginPrompt />;
  }

  if (!data || data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <DataTable data={data} />
    </div>
  );
}
```

This component handles multiple scenarios:
- Shows a loading spinner while data is being fetched
- Displays an error message if something goes wrong
- Prompts for login if no user is present
- Shows an empty state if there's no data
- Finally, renders the actual dashboard content

This is a common pattern in real applications - checking conditions in order of priority and returning early when needed.

---

## Best Practices

Here are some tips to make your conditional rendering cleaner and more maintainable:

### Make Conditions Readable

Extract complex conditions into well-named variables:

```jsx
// Good - Clear and readable
const isUserLoggedIn = user && user.isAuthenticated;
if (isUserLoggedIn) { }

// Avoid - Hard to read
if (user && user.isAuthenticated && user.role === 'admin') { }
```

### Extract Complex Logic

Move complex conditional logic outside of JSX:

```jsx
function Component({ user }) {
  const canEdit = user && user.role === 'admin' && user.isActive;
  
  return (
    <div>
      {canEdit && <EditButton />}
    </div>
  );
}
```

### Use Early Returns

Prefer early returns over deeply nested conditionals:

```jsx
// Good - Clean and easy to follow
function Component({ data }) {
  if (!data) return null;
  // Rest of component logic
}

// Avoid - Deeply nested and harder to read
function Component({ data }) {
  return (
    <div>
      {data && (
        // Complex nested JSX
      )}
    </div>
  );
}
```

### Keep It Simple

- Use ternary operators for simple true/false conditions
- Use if/else for multiple return statements
- Use switch for many specific values
- Use early returns to reduce nesting

---

## Common Pitfalls to Avoid

- **Don't use `&&` with numbers**: `{count && <div>{count}</div>}` will show `0` if count is 0. Use `{count > 0 && ...}` instead
- **Don't nest too many ternaries**: After 2-3 levels, switch to if/else or extract logic
- **Don't forget keys in lists**: Always include unique keys when conditionally rendering list items
- **Don't render `undefined`**: Make sure your conditions return `null` or valid JSX, not `undefined`

---

## Conclusion

Conditional rendering is one of the most important concepts in React. It's what makes your applications dynamic and responsive to different states and user interactions. By mastering these techniques, you'll be able to build UIs that adapt to any situation.

Remember, the best approach depends on your specific use case. Start simple, and as you get more comfortable, you'll develop a sense for which pattern works best in each situation.

---

## Next Steps

Now that you understand conditional rendering, here's what to explore next:

- Learn about [Lists and Keys in React](/react/react-lists-keys) - Discover how to render dynamic lists efficiently
- Explore [State Management](/react/react-state) - Learn how to manage component state for dynamic rendering
- Understand [React Hooks](/react/react-hooks) - Master hooks like useState and useEffect for conditional logic
- Read about [Event Handling](/react/react-events) - Learn how user interactions trigger conditional rendering
- Study [Component Composition](/react/react-components) - See how conditional rendering fits into larger component structures
