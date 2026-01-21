---
title: "Lists and Keys in React - Complete Guide"
date: "2025-02-20"
description: "Learn how to render lists in React. Understand why keys are important and best practices for working with lists and keys."
category: "React Basics"
tags: ["react", "lists", "keys", "map", "rendering"]
image: "/images/react-lists.jpg"
author: "Sushil Kumar"
---

# Lists and Keys in React - Complete Guide

Rendering lists is one of the most common things you'll do in React. When you have an array of data and want to display it, React's `map()` function is your best friend. Let me show you how it works!

## Basic List Rendering

Here's the simplest way to render a list:

```jsx
function NumberList({ numbers }) {
  return (
    <ul>
      {numbers.map((number) => (
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

Pretty straightforward, right? The `map()` function takes each number and turns it into a list item.

## Why Are Keys Important?

Keys help React figure out which items have changed, been added, or removed. Think of keys like ID cards for your list items - React uses them to keep track of everything efficiently.

Keys must be unique among siblings. This is super important for React's performance and to avoid bugs!

### Without Keys (❌ Wrong)

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li>{todo.text}</li> // Warning: Missing key
      ))}
    </ul>
  );
}
```

React will give you a warning if you forget keys. It's not just a suggestion - keys are really important!

### With Keys (✅ Correct)

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

Much better! Now React knows exactly which item is which, even when the list changes.

## Key Selection Rules

### 1. Unique IDs (Best Practice)

The best keys are unique IDs from your data:

```jsx
function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

If your data comes from a database, it probably already has unique IDs. Use those!

### 2. Index as Key (Avoid if Possible)

You can use the index as a key, but only if your list never reorders:

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

**Warning:** Using index as key can cause problems if items can be reordered, added, or removed. React might get confused about which item is which!

## Complex List Example

Let's see a more realistic example - a product list:

```jsx
function ProductList({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
```

This shows how you'd render a real product catalog. Each product card has a unique key based on the product ID.

## Nested Lists

Sometimes you need lists inside lists. Here's how:

```jsx
function CategoryList({ categories }) {
  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <ul>
            {category.items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

Notice how each level has its own keys. The category has a key, and each item inside also has a key. Both are important!

## Filtering Lists

Often you'll want to show only some items from your list:

```jsx
function TodoList({ todos, filter }) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

First filter, then map. This is a common pattern!

## Conditional List Rendering

What if your list is empty? Show a message:

```jsx
function TodoList({ todos }) {
  if (todos.length === 0) {
    return <p>No todos yet. Add one to get started!</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

Or inline:

```jsx
function TodoList({ todos }) {
  return (
    <div>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      ) : (
        <p>No todos yet. Add one to get started!</p>
      )}
    </div>
  );
}
```

Both ways work - pick whichever feels more natural to you!

## List Operations

### Adding Items

Here's how to add items to a list:

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

The spread operator `...todos` copies all existing todos, then adds the new one. This is the React way!

### Removing Items

To remove an item, filter it out:

```jsx
function TodoList({ todos, onDelete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

The parent component handles the actual deletion by filtering the array.

### Updating Items

To update an item, map through and change the one you want:

```jsx
function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map((todo) => (
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

1. **Use Unique and Stable Keys**

```jsx
{
  todos.map((todo) => <TodoItem key={todo.id} todo={todo} />);
}
```

2. **Use Meaningful Keys**

```jsx
{
  users.map((user) => <UserCard key={user.email} user={user} />);
}
```

### ❌ Don'ts

1. **Avoid Index as Key** (when items can reorder)

Using index as key can cause bugs when items move around. React might update the wrong component!

2. **Don't Use Random Values**

```jsx
// Bad - Creates new key on every render
key={Math.random()}
```

3. **Don't Use Keys Inside Components**

```jsx
// Wrong - Key should be on the element returned from map
function TodoItem({ todo }) {
  return <li key={todo.id}>{todo.text}</li>;
}

// Correct - Key goes on the element in the map
{
  todos.map((todo) => <TodoItem key={todo.id} todo={todo} />);
}
```

## Performance Tips

### useMemo for Expensive Lists

If processing your list is expensive, use useMemo:

```jsx
import { useMemo } from "react";

function ExpensiveList({ items }) {
  const processedItems = useMemo(() => {
    return items.map((item) => ({
      ...item,
      processed: expensiveOperation(item),
    }));
  }, [items]);

  return (
    <ul>
      {processedItems.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}
```

This only recalculates when `items` changes, not on every render.

## Common Mistakes

Here are mistakes I see beginners make:

1. **Forgetting keys** - Always add keys!
2. **Using index when items can reorder** - Use unique IDs instead
3. **Using keys inside components** - Keys go on elements returned from map
4. **Not handling empty lists** - Always show something when the list is empty

## Conclusion

Lists and keys are fundamental to React. Once you get the hang of them, you'll use them everywhere. Remember: always use unique keys, and your React apps will work smoothly!

The key points:

- Use `map()` to render lists
- Always provide unique keys
- Use IDs from your data when possible
- Avoid index as key if items can reorder
- Handle empty lists gracefully

## Next Steps

Now that you understand lists and keys, check out:

- Learn about [Forms in React](/react/react-forms) - Handle form inputs and submissions
- Explore [List Optimization](/react/react-performance-tips) - Make your lists faster
- Study [Virtual Scrolling](/react/react-performance-tips) - Handle very long lists efficiently

Happy coding! 🚀
