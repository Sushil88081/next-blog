---
title: "React Component Lifecycle - Understanding Component Phases"
date: "2025-01-15"
description: "Learn about React component lifecycle. Understand mounting, updating, and unmounting phases in functional components with hooks."
category: "React Advanced"
tags: ["react", "lifecycle", "useEffect", "mounting", "unmounting"]
image: "/assets/images/react.jpg"
author: "Sushil Kumar"
---

# React Component Lifecycle - Understanding Component Phases

Every React component goes through a lifecycle - it's born (mounts), lives (updates), and eventually dies (unmounts). Understanding this lifecycle helps you write better React code!

## What is Component Lifecycle?

Think of a component's lifecycle like a person's life:
1. **Birth (Mount)** - Component is created and added to the DOM
2. **Life (Update)** - Component updates when props or state change
3. **Death (Unmount)** - Component is removed from the DOM

## Lifecycle in Functional Components

In functional components, we use `useEffect` to handle lifecycle events:

```jsx
function MyComponent() {
  useEffect(() => {
    // This runs after component mounts (birth)
    console.log('Component mounted');
    
    return () => {
      // This runs when component unmounts (death)
      console.log('Component unmounted');
    };
  }, []);
  
  return <div>Hello</div>;
}
```

## Mounting Phase

Mounting is when React creates your component and adds it to the DOM:

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Runs once when component mounts
    console.log('Component mounted, fetching user...');
    
    fetchUser(userId).then(setUser);
  }, []); // Empty array = run only on mount
  
  return <div>{user?.name}</div>;
}
```

## Updating Phase

Components update when props or state change:

```jsx
function Counter({ initialValue }) {
  const [count, setCount] = useState(initialValue);
  
  useEffect(() => {
    // Runs every time count changes
    console.log('Count updated:', count);
  }, [count]); // Runs when count changes
  
  return <div>{count}</div>;
}
```

## Unmounting Phase

Unmounting happens when a component is removed:

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // Cleanup runs when component unmounts
    return () => {
      clearInterval(interval);
      console.log('Timer cleaned up');
    };
  }, []);
  
  return <div>Timer: {seconds}</div>;
}
```

## Complete Lifecycle Example

Here's a component showing all lifecycle phases:

```jsx
function LifecycleDemo({ name }) {
  const [count, setCount] = useState(0);
  
  // Mount: Runs once when component is created
  useEffect(() => {
    console.log('1. Component mounted');
    
    // Unmount: Cleanup function
    return () => {
      console.log('3. Component unmounted');
    };
  }, []);
  
  // Update: Runs when name prop changes
  useEffect(() => {
    console.log('2. Name updated:', name);
  }, [name]);
  
  // Update: Runs when count state changes
  useEffect(() => {
    console.log('2. Count updated:', count);
  }, [count]);
  
  return (
    <div>
      <p>Name: {name}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## Common Lifecycle Patterns

### Pattern 1: Fetch Data on Mount

```jsx
function DataComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Fetch when component mounts
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

### Pattern 2: Update on Prop Change

```jsx
function UserDetails({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Fetch new user when userId changes
    fetchUser(userId).then(setUser);
  }, [userId]); // Re-run when userId changes
  
  return <div>{user?.name}</div>;
}
```

### Pattern 3: Cleanup on Unmount

```jsx
function SubscriptionComponent() {
  useEffect(() => {
    const subscription = subscribe();
    
    // Cleanup subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  return <div>Subscribed</div>;
}
```

## Lifecycle with Multiple Effects

You can have multiple useEffect hooks for different purposes:

```jsx
function ComplexComponent({ userId, autoRefresh }) {
  const [user, setUser] = useState(null);
  const [online, setOnline] = useState(true);
  
  // Effect 1: Fetch user on mount and when userId changes
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  // Effect 2: Set up online status listener
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Effect 3: Auto-refresh when enabled
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      fetchUser(userId).then(setUser);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoRefresh, userId]);
  
  return (
    <div>
      <p>User: {user?.name}</p>
      <p>Status: {online ? 'Online' : 'Offline'}</p>
    </div>
  );
}
```

## Understanding Dependencies

The dependency array controls when effects run:

```jsx
// Runs once on mount
useEffect(() => {}, []);

// Runs on every render (usually avoid this)
useEffect(() => {});

// Runs when count changes
useEffect(() => {}, [count]);

// Runs when count OR name changes
useEffect(() => {}, [count, name]);
```

## Best Practices

1. **Always include dependencies** - Don't ignore the dependency array
2. **Clean up resources** - Return cleanup functions
3. **Separate concerns** - Use multiple effects for different things
4. **Avoid infinite loops** - Be careful with dependencies
5. **Use empty array for mount** - `[]` means "run once"

## Common Mistakes

### Mistake 1: Missing Dependencies

```jsx
// Wrong - Missing count in dependencies
useEffect(() => {
  console.log(count);
}, []); // Should be [count]

// Right
useEffect(() => {
  console.log(count);
}, [count]);
```

### Mistake 2: Forgetting Cleanup

```jsx
// Wrong - Memory leak!
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  // No cleanup
}, []);

// Right - Clean up!
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

## Real-World Example

Here's a complete example managing component lifecycle:

```jsx
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  
  // Mount: Connect to chat room
  useEffect(() => {
    console.log('Connecting to room:', roomId);
    connectToRoom(roomId);
    setIsConnected(true);
    
    // Unmount: Disconnect
    return () => {
      console.log('Disconnecting from room:', roomId);
      disconnectFromRoom(roomId);
      setIsConnected(false);
    };
  }, [roomId]);
  
  // Update: Listen for new messages
  useEffect(() => {
    if (!isConnected) return;
    
    const handleMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };
    
    subscribeToMessages(roomId, handleMessage);
    
    return () => {
      unsubscribeFromMessages(roomId, handleMessage);
    };
  }, [roomId, isConnected]);
  
  return (
    <div>
      <h2>Room: {roomId}</h2>
      <div>
        {messages.map(msg => <div key={msg.id}>{msg.text}</div>)}
      </div>
    </div>
  );
}
```

## Conclusion

Understanding component lifecycle is crucial for writing good React code. It helps you:
- Know when to fetch data
- Clean up resources properly
- Avoid memory leaks
- Write more efficient code

Remember:
- Mount = component created
- Update = component changed
- Unmount = component removed
- Use useEffect to handle each phase

## Visual Explanation: Component Lifecycle Phases

Here's the complete lifecycle:

```
┌─────────────────────────────┐
│     MOUNTING PHASE           │
│ Component created            │
│ useEffect(() => {}, [])     │
│ runs once                    │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│     UPDATING PHASE           │
│ Props/State change           │
│ Component re-renders        │
│ useEffect(() => {}, [dep]) │
│ runs when deps change       │
└──────────────┬──────────────┘
               │
               │ (can happen many times)
               │
               ▼
┌─────────────────────────────┐
│     UNMOUNTING PHASE         │
│ Component removed            │
│ Cleanup function runs        │
│ (return from useEffect)      │
└─────────────────────────────┘
```

## useEffect Dependency Patterns

```
Empty [] = Mount only
[value] = When value changes
[val1, val2] = When either changes
No array = Every render (avoid!)
```

## Frequently Asked Questions (FAQ)

### Q1: What's the difference between mount and render?

**A:** 
- **Mount** - Component created and added to DOM (happens once)
- **Render** - Component's JSX is evaluated (can happen many times)

### Q2: How do I run code only on mount?

**A:** Use useEffect with empty dependency array:

```jsx
useEffect(() => {
  // Runs once on mount
}, []);
```

### Q3: What's the cleanup function for?

**A:** Cleanup runs when:
- Component unmounts
- Dependencies change (before new effect runs)

Use it to:
- Cancel API requests
- Remove event listeners
- Clear timers
- Clean up subscriptions

### Q4: Can I have multiple useEffect hooks?

**A:** Yes! It's recommended to separate concerns:

```jsx
useEffect(() => {
  // Effect 1
}, [dep1]);

useEffect(() => {
  // Effect 2
}, [dep2]);
```

### Q5: What happens if I don't include dependencies?

**A:** React will warn you, and your effect might:
- Use stale values
- Not run when it should
- Run too often

Always include dependencies!

### Q6: How do I prevent useEffect from running on mount?

**A:** Use a ref to track first render:

```jsx
const isFirstRender = useRef(true);

useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return;
  }
  // Effect code (won't run on mount)
}, [value]);
```

### Q7: Can useEffect be async?

**A:** Not directly, but create async function inside:

```jsx
useEffect(() => {
  async function fetchData() {
    const data = await fetch('/api');
  }
  fetchData();
}, []);
```

### Q8: What's the difference between useEffect and useLayoutEffect?

**A:** 
- **useEffect** - Runs after paint (non-blocking)
- **useLayoutEffect** - Runs before paint (blocking, synchronous)

Use useEffect for most cases. useLayoutEffect only when you need synchronous updates.

### Q9: How do I stop an effect from running?

**A:** Return early or use cleanup:

```jsx
useEffect(() => {
  if (!shouldRun) return;
  // Effect code
}, [shouldRun]);
```

### Q10: Do effects run in order?

**A:** Yes! Effects run in the order they're defined. Cleanup functions run in reverse order.

---

## Next Steps

Now that you understand lifecycle, here's what to learn next:

- **Next:** Learn about [useEffect Hook](/react/react-useeffect-explained) - Deep dive into effects and lifecycle
- Explore [React Hooks](/react/react-hooks) - Master all built-in hooks
- Understand [Custom Hooks](/react/react-custom-hooks) - Create your own lifecycle hooks

Happy coding! 🚀

