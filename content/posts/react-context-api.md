---
title: "React Context API - State Management का आसान तरीका"
date: "2025-02-05"
description: "React Context API क्या है और इसे कैसे use करें? Props drilling से बचने के लिए Context API का उपयोग करना सीखें।"
category: "React Advanced"
tags: ["react", "context", "state-management", "हिंदी"]
image: "/images/react-context.jpg"
author: "आपका नाम"
---

# React Context API - State Management का आसान तरीका

React Context API एक powerful feature है जो आपको component tree के माध्यम से data pass करने की अनुमति देता है बिना props को हर level पर manually pass किए।

## Context API क्या है?

Context API React में state management का एक built-in तरीका है। यह आपको component tree में deeply nested components के साथ data share करने की अनुमति देता है।

## Props Drilling की समस्या

जब आपके पास nested components होते हैं और आपको data को top से bottom तक pass करना होता है, तो आपको हर level पर props pass करनी पड़ती है। इसे "props drilling" कहते हैं।

```jsx
// Props drilling का उदाहरण
function App() {
  const user = { name: "राज", age: 25 };
  return <Header user={user} />;
}

function Header({ user }) {
  return <Navbar user={user} />;
}

function Navbar({ user }) {
  return <UserProfile user={user} />;
}

function UserProfile({ user }) {
  return <div>{user.name}</div>;
}
```

## Context API का उपयोग

Context API के साथ, आप इस समस्या को solve कर सकते हैं:

### 1. Context बनाना

```jsx
import { createContext } from 'react';

const UserContext = createContext();
```

### 2. Provider बनाना

```jsx
function App() {
  const user = { name: "राज", age: 25 };
  
  return (
    <UserContext.Provider value={user}>
      <Header />
    </UserContext.Provider>
  );
}
```

### 3. Context का उपयोग करना

```jsx
import { useContext } from 'react';

function UserProfile() {
  const user = useContext(UserContext);
  return <div>{user.name}</div>;
}
```

## पूरा उदाहरण

```jsx
import { createContext, useContext, useState } from 'react';

// Context बनाएं
const ThemeContext = createContext();

// Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// उपयोग
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={theme}>
      <button onClick={toggleTheme}>
        Theme बदलें
      </button>
    </header>
  );
}
```

## Context API के फायदे

1. **Props Drilling से बचाव** - Data को directly access कर सकते हैं
2. **Code Cleanliness** - Code अधिक clean और maintainable होता है
3. **Performance** - Unnecessary re-renders को रोक सकते हैं
4. **Built-in Solution** - External library की जरूरत नहीं

## Context API के नुकसान

1. **Overuse** - हर जगह Context use करना अच्छा नहीं है
2. **Re-renders** - Context value change होने पर सभी consumers re-render होते हैं
3. **Testing** - Testing थोड़ा complex हो सकता है

## Best Practices

1. **Context को सही जगह use करें** - केवल global state के लिए
2. **Multiple Contexts** - अलग-अलग concerns के लिए अलग contexts बनाएं
3. **Memoization** - useMemo और useCallback का उपयोग करें
4. **Custom Hooks** - Context logic को custom hooks में encapsulate करें

## निष्कर्ष

Context API React में state management का एक powerful tool है। यह props drilling की समस्या को solve करता है और code को cleaner बनाता है। हालांकि, इसे wisely use करना important है।

