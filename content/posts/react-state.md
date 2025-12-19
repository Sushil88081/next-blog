---
title: "React में State क्या होता है?"
date: "2025-01-20"
description: "React में State का उपयोग कैसे करें, पूरी गाइड। useState hook, state management और best practices के बारे में जानें।"
category: "React Basics"
tags: ["react", "state", "hooks", "useState", "हिंदी"]
image: "/images/react-state.jpg"
author: "आपका नाम"
---

# React में State क्या होता है?

State React में एक बहुत महत्वपूर्ण concept है। State component का internal data है जो समय के साथ बदल सकता है। जब state बदलता है, तो component automatically re-render होता है।

## State क्यों जरूरी है?

State component को dynamic बनाता है। बिना state के, components static रहते हैं और user interaction के साथ change नहीं कर सकते।

## useState Hook

React Hooks में, `useState` hook का उपयोग state बनाने के लिए किया जाता है।

### Basic Syntax

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}
```

### useState कैसे काम करता है?

1. `useState(0)` - initial value 0 के साथ state बनाता है
2. `count` - current state value
3. `setCount` - state को update करने का function

## State के उदाहरण

### Counter Example

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

### Form Input Example

```jsx
function NameInput() {
  const [name, setName] = useState('');

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="अपना नाम दर्ज करें"
      />
      <p>नमस्ते, {name}!</p>
    </div>
  );
}
```

## Multiple State Variables

आप एक component में multiple state variables use कर सकते हैं:

```jsx
function UserProfile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="नाम"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="उम्र"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ईमेल"
      />
    </div>
  );
}
```

## State Update Best Practices

### 1. Functional Updates

जब previous state पर depend करना हो:

```jsx
setCount(prevCount => prevCount + 1);
```

### 2. Object State Updates

```jsx
const [user, setUser] = useState({ name: '', age: 0 });

// Correct way
setUser({ ...user, name: 'John' });

// Wrong way
user.name = 'John';
setUser(user);
```

### 3. Array State Updates

```jsx
const [items, setItems] = useState([]);

// Add item
setItems([...items, newItem]);

// Remove item
setItems(items.filter(item => item.id !== id));
```

## State vs Props

| State | Props |
|-------|-------|
| Component के अंदर बनता है | Parent से pass होता है |
| Change हो सकता है | Read-only है |
| Component को re-render करता है | Props change होने पर re-render |

## निष्कर्ष

State React में dynamic components बनाने का मुख्य तरीका है। `useState` hook का उपयोग करके आप easily state manage कर सकते हैं।

## अगले कदम

- useEffect Hook सीखें
- State management patterns जानें
- Context API के बारे में पढ़ें

