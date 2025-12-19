---
title: "React में Conditional Rendering"
date: "2025-02-15"
description: "React में conditional rendering कैसे करें? if/else, ternary operator, && operator और switch statements के बारे में जानें।"
category: "React Basics"
tags: ["react", "conditional", "rendering", "हिंदी"]
image: "/images/react-conditional.jpg"
author: "आपका नाम"
---

# React में Conditional Rendering

Conditional rendering React में elements को conditionally render करने का तरीका है। यह user experience को improve करता है।

## if/else Statement

```jsx
function UserGreeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>नमस्ते, आपका स्वागत है!</h1>;
  } else {
    return <h1>कृपया लॉगिन करें</h1>;
  }
}
```

## Ternary Operator

Ternary operator inline conditional rendering के लिए perfect है:

```jsx
function UserStatus({ isLoggedIn, userName }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>नमस्ते, {userName}!</h1>
      ) : (
        <h1>कृपया लॉगिन करें</h1>
      )}
    </div>
  );
}
```

## Logical && Operator

जब आपको केवल true condition पर render करना हो:

```jsx
function Notification({ message, show }) {
  return (
    <div>
      {show && <div className="notification">{message}</div>}
    </div>
  );
}
```

## Multiple Conditions

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

या ternary के साथ:

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

## Switch Statement

Complex conditions के लिए:

```jsx
function StatusMessage({ status }) {
  switch (status) {
    case 'loading':
      return <div>लोड हो रहा है...</div>;
    case 'success':
      return <div>सफल!</div>;
    case 'error':
      return <div>त्रुटि हुई</div>;
    default:
      return <div>अज्ञात स्थिति</div>;
  }
}
```

## Early Return Pattern

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

## Conditional Classes

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

या template literals के साथ:

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

## Conditional Attributes

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

## Lists में Conditional Rendering

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.length > 0 ? (
        todos.map(todo => <li key={todo.id}>{todo.text}</li>)
      ) : (
        <li>कोई todos नहीं हैं</li>
      )}
    </ul>
  );
}
```

## Complex Example

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

## Best Practices

### 1. Readable Conditions

```jsx
// Good
const isUserLoggedIn = user && user.isAuthenticated;
if (isUserLoggedIn) { }

// Avoid
if (user && user.isAuthenticated && user.role === 'admin') { }
```

### 2. Extract Complex Logic

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

### 3. Use Early Returns

```jsx
// Good
function Component({ data }) {
  if (!data) return null;
  // Rest of component
}

// Avoid
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

## निष्कर्ष

Conditional rendering React में powerful feature है जो dynamic UIs बनाने में मदद करता है।

## अगले कदम

- Lists और keys के बारे में जानें
- Advanced rendering patterns सीखें
- Performance optimization techniques explore करें

