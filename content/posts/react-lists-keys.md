---
title: "React में Lists और Keys"
date: "2025-02-20"
description: "React में lists कैसे render करें? Keys क्यों जरूरी हैं और best practices के बारे में जानें।"
category: "React Basics"
tags: ["react", "lists", "keys", "map", "हिंदी"]
image: "/images/react-lists.jpg"
author: "आपका नाम"
---

# React में Lists और Keys

Lists render करना React में एक common task है। React में arrays को elements में convert करने के लिए `map()` function use होता है।

## Basic List Rendering

```jsx
function NumberList({ numbers }) {
  return (
    <ul>
      {numbers.map(number => (
        <li key={number}>{number}</li>
      ))}
    </ul>
  );
}

function App() {
  const numbers = [1, 2, 3, 4, 5];
  return <NumberList numbers={numbers} />;
}
```

## Keys क्यों जरूरी हैं?

Keys React को identify करने में मदद करती हैं कि कौन सा item change, add, या remove हुआ है। Keys unique होनी चाहिए।

### Keys के बिना (❌ Wrong)

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li>{todo.text}</li> // Warning: Missing key
      ))}
    </ul>
  );
}
```

### Keys के साथ (✅ Correct)

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

## Key Selection Rules

### 1. Unique IDs (Best Practice)

```jsx
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### 2. Index as Key (Avoid if possible)

```jsx
// Only if items don't reorder
function SimpleList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

**Note:** Index को key के रूप में use करने से problems हो सकती हैं अगर list reorder होती है।

## Complex List Example

```jsx
function ProductList({ products }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
```

## Nested Lists

```jsx
function CategoryList({ categories }) {
  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <ul>
            {category.items.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

## Filtering Lists

```jsx
function TodoList({ todos, filter }) {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <ul>
      {filteredTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

## Conditional List Rendering

```jsx
function TodoList({ todos }) {
  if (todos.length === 0) {
    return <p>कोई todos नहीं हैं</p>;
  }

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

या inline:

```jsx
function TodoList({ todos }) {
  return (
    <div>
      {todos.length > 0 ? (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      ) : (
        <p>कोई todos नहीं हैं</p>
      )}
    </div>
  );
}
```

## List में Operations

### Adding Items

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Removing Items

```jsx
function TodoList({ todos, onDelete }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

### Updating Items

```jsx
function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

## Key Best Practices

### ✅ Do's

1. **Unique और Stable Keys Use करें**
```jsx
{todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />
))}
```

2. **Meaningful Keys**
```jsx
{users.map(user => (
  <UserCard key={user.email} user={user} />
))}
```

### ❌ Don'ts

1. **Index को Key के रूप में Avoid करें** (जब items reorder हो सकती हैं)
2. **Random Values Avoid करें**
```jsx
// Bad
key={Math.random()}
```

3. **Keys को Component में Use न करें**
```jsx
// Wrong
function TodoItem({ todo }) {
  return <li key={todo.id}>{todo.text}</li>;
}

// Correct
{todos.map(todo => (
  <TodoItem key={todo.id} todo={todo} />
))}
```

## Performance Tips

### useMemo for Expensive Lists

```jsx
import { useMemo } from 'react';

function ExpensiveList({ items }) {
  const processedItems = useMemo(() => {
    return items.map(item => ({
      ...item,
      processed: expensiveOperation(item)
    }));
  }, [items]);

  return (
    <ul>
      {processedItems.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}
```

## निष्कर्ष

Lists और keys React में fundamental concepts हैं। Proper keys use करने से performance improve होती है और bugs कम होते हैं।

## अगले कदम

- Forms handling सीखें
- List optimization techniques explore करें
- Virtual scrolling के बारे में जानें

