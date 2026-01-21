---
title: "useEffect Hook Explained Simply"
date: "2025-01-12"
description: "Learn useEffect hook in React with simple examples. Understand how to use useEffect for side effects like API calls and data fetching."
category: "React Hooks"
tags: ["react", "hooks", "useEffect", "side effects"]
image: "/assets/images/react.jpg"
author: "Sushil Kumar"
---

# useEffect Hook Explained Simply

Hey there! Today I'm going to explain the useEffect hook in React. Don't worry if it sounds complicated at first - I'll make it super simple for you.

## What is useEffect Anyway?

So useEffect is basically React's way of saying "hey, do something after the component renders". Think of it like a note you leave yourself - "after I finish this, remember to do that".

In simple words, useEffect lets you run some code after your component shows up on the screen. This is super useful when you want to:

- Fetch data from an API
- Update the page title
- Start a timer
- Clean up things when component disappears

## Basic Example

Let me show you the simplest way to use useEffect:

```jsx
import { useEffect } from "react";

function MyComponent() {
  useEffect(() => {
    console.log("Component just rendered!");
  });

  return <div>Hello World</div>;
}
```

This will print "Component just rendered!" every time the component updates. But wait, we usually don't want that! We want more control.

## Running Code Only Once

Most of the time, you want something to happen only once when the component first appears. Here's how:

```jsx
useEffect(() => {
  console.log("This runs only once when component mounts");
}, []); // Empty array means "run only once"
```

See that empty array `[]`? That's the dependency array. Empty means "no dependencies, so run only once".

## Real Example - Fetching Data

Let me show you a real example. Say you want to load user data when the page loads:

```jsx
function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This runs once when component loads
    fetch("https://api.example.com/user")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []); // Empty array = run once

  if (!user) return <div>Loading...</div>;

  return <div>Hello {user.name}!</div>;
}
```

Pretty cool, right? When the component shows up, it fetches the user data automatically.

## Running When Something Changes

Sometimes you want your effect to run when a specific value changes. Here's how:

```jsx
function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // This runs whenever userId changes
    fetch(`https://api.example.com/posts/${userId}`)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, [userId]); // Now it depends on userId

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

Now whenever `userId` changes, it will fetch new posts automatically. That's the power of useEffect!

## Cleaning Up

Sometimes you need to clean up after yourself. Like stopping a timer or canceling a request:

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(interval); // Stop the timer when component is removed
    };
  }, []);

  return <div>Timer: {seconds} seconds</div>;
}
```

The return statement in useEffect is the cleanup function. It runs when the component is removed from the screen. This prevents memory leaks!

## Common Mistakes to Avoid

I made these mistakes when I started, so learn from me:

1. **Forgetting the dependency array** - Your effect will run on every update (probably not what you want!)

2. **Putting too many things in the array** - This makes your effect run too often

3. **Forgetting to clean up** - If you start a timer or subscription, remember to stop it!

## Quick Tips

- Empty array `[]` = run once
- Array with values `[userId]` = run when those values change
- No array = run on every update (usually not recommended)
- Return a function = cleanup function

## When Should You Use useEffect?

Use useEffect when you need to:

- Fetch data from an API
- Subscribe to something (like WebSocket)
- Update document title
- Set up event listeners
- Clean up resources

Don't use it for:

- Calculating values (use useMemo instead)
- Setting state based on props directly
- Things that can be done during render

## Wrap Up

So that's useEffect in a nutshell! It's React's way of handling side effects - things that happen outside of rendering. Start with simple examples, and you'll get the hang of it quickly.

Remember: useEffect is your friend for doing things after render, but use it wisely. Don't overuse it, and always clean up when needed!

## Next Steps

Once you understand useEffect, here's what to learn next:

- **Next:** Learn about [React Hooks](/react/react-hooks) - Discover all built-in hooks
- Understand [Custom Hooks](/react/react-custom-hooks) - Create reusable hook logic
- Explore [Context API](/react/react-context-api) - Share data across components
- Master [Performance Tips](/react/react-performance-tips) - Optimize your effects
