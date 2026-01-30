---
title: "Error Handling in React - Complete Guide"
date: "2025-01-22"
description: "Learn how to handle errors in React applications. Understand Error Boundaries, try-catch, and best practices for error handling."
category: "React Advanced"
tags: ["react", "error-handling", "error-boundaries", "try-catch", "debugging"]
image: "/assets/images/react.jpg"
author: "Sushil Kumar"
---

# Error Handling in React - Complete Guide

Nobody likes errors, but they happen! Learning how to handle errors properly in React will make your apps more robust and user-friendly. Let me show you how to deal with errors gracefully.

## Why Error Handling Matters

When errors occur in React, they can:
- Crash your entire app
- Show ugly error messages to users
- Make your app unusable
- Frustrate users

Good error handling prevents these problems and gives users a better experience.

## Basic Try-Catch

The simplest way to handle errors is with try-catch:

```jsx
function DataFetcher() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    }
  };
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

This catches errors in async operations and shows a friendly message.

## Error Boundaries

Error Boundaries are React's way of catching errors in component trees. They're like safety nets for your components!

### Creating an Error Boundary

Here's how to create one:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong!</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

### Using Error Boundaries

Wrap components that might error:

```jsx
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <MainContent />
      <Footer />
    </ErrorBoundary>
  );
}
```

Now if any child component crashes, the Error Boundary catches it!

## Functional Component Error Boundary

Since Error Boundaries need class components, here's a workaround with a custom hook:

```jsx
function useErrorHandler() {
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);
  
  return setError;
}

function Component() {
  const handleError = useErrorHandler();
  
  const riskyOperation = async () => {
    try {
      // Something that might fail
    } catch (err) {
      handleError(err);
    }
  };
  
  return <div>Content</div>;
}
```

## Handling Form Errors

Forms need special error handling:

```jsx
function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validate()) {
      return;
    }
    
    try {
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      alert('Success!');
    } catch (err) {
      setSubmitError('Failed to submit. Please try again.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      
      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      
      {submitError && <div className="error">{submitError}</div>}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## API Error Handling

When fetching data, always handle errors:

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;
  
  return <div>{user.name}</div>;
}
```

## Error Messages for Users

Always show user-friendly error messages:

```jsx
function ErrorMessage({ error }) {
  const getMessage = () => {
    if (error.message.includes('network')) {
      return 'Network error. Please check your connection.';
    }
    if (error.message.includes('404')) {
      return 'Page not found.';
    }
    return 'Something went wrong. Please try again.';
  };
  
  return (
    <div className="error-message">
      <p>{getMessage()}</p>
      <button onClick={() => window.location.reload()}>
        Reload Page
      </button>
    </div>
  );
}
```

## Logging Errors

Always log errors for debugging:

```jsx
const logError = (error, errorInfo) => {
  // Log to console
  console.error('Error:', error, errorInfo);
  
  // Send to error tracking service (like Sentry)
  // errorTrackingService.log(error, errorInfo);
};

function Component() {
  const handleError = (error) => {
    logError(error, { component: 'Component' });
    // Show user-friendly message
  };
  
  return <div>Content</div>;
}
```

## Best Practices

1. **Always handle async errors** - Use try-catch with async/await
2. **Show user-friendly messages** - Don't show technical errors
3. **Log errors properly** - Help yourself debug later
4. **Use Error Boundaries** - Catch component errors
5. **Validate inputs** - Prevent errors before they happen
6. **Provide fallbacks** - Show something useful when errors occur

## Common Error Scenarios

### Scenario 1: Network Errors

```jsx
try {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Network error');
} catch (err) {
  if (err.message === 'Network error') {
    // Handle network error
  }
}
```

### Scenario 2: Invalid Data

```jsx
try {
  const data = JSON.parse(response);
  if (!data || !data.name) {
    throw new Error('Invalid data format');
  }
} catch (err) {
  // Handle invalid data
}
```

### Scenario 3: Component Errors

```jsx
function RiskyComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    try {
      // Risky operation
      setData(riskyFunction());
    } catch (err) {
      console.error('Component error:', err);
      // Set safe default
      setData([]);
    }
  }, []);
  
  return <div>{data?.map(...)}</div>;
}
```

## Testing Error Handling

Test your error handling:

```jsx
function Component() {
  const [error, setError] = useState(null);
  
  const triggerError = () => {
    try {
      throw new Error('Test error');
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <div>
      {error && <div>Error: {error}</div>}
      <button onClick={triggerError}>Test Error</button>
    </div>
  );
}
```

## Conclusion

Error handling is crucial for building robust React apps. Always plan for errors - they will happen! Good error handling makes your app more professional and user-friendly.

Remember:
- Use try-catch for async operations
- Use Error Boundaries for component errors
- Show user-friendly messages
- Log errors for debugging
- Always have fallbacks

## Visual Explanation: Error Boundary Flow

Here's how Error Boundaries catch errors:

```
Component Tree
┌─────────────────────────────┐
│ ErrorBoundary                │
│   ┌───────────────────────┐ │
│   │ Component A            │ │
│   │   ┌─────────────────┐ │ │
│   │   │ Component B     │ │ │
│   │   │   ┌───────────┐ │ │ │
│   │   │   │ Component │ │ │ │
│   │   │   │ C (ERROR!)│ │ │ │
│   │   │   └───────────┘ │ │ │
│   │   └─────────────────┘ │ │
│   └───────────────────────┘ │
└─────────────────────────────┘
       │
       │ Error caught
       ▼
┌─────────────────────────────┐
│ ErrorBoundary catches error  │
│ Shows fallback UI            │
│ Logs error                   │
└─────────────────────────────┘
```

## Error Handling Strategies

```
┌─────────────────────────────┐
│ 1. Try-Catch                │
│    (For async code)         │
├─────────────────────────────┤
│ 2. Error Boundaries         │
│    (For component errors)   │
├─────────────────────────────┤
│ 3. Validation               │
│    (Prevent errors)         │
├─────────────────────────────┤
│ 4. Fallback UI              │
│    (Show something useful)  │
└─────────────────────────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: What's the difference between try-catch and Error Boundaries?

**A:** 
- **try-catch** - For JavaScript errors (async, event handlers)
- **Error Boundaries** - For React component errors (rendering, lifecycle)

### Q2: Can I use Error Boundaries in functional components?

**A:** Not directly! Error Boundaries must be class components. But you can create a class Error Boundary and use it in functional components.

### Q3: What errors do Error Boundaries catch?

**A:** They catch:
- Rendering errors
- Lifecycle method errors
- Constructor errors

They DON'T catch:
- Event handler errors
- Async code errors
- Errors in Error Boundary itself

### Q4: How do I handle async errors?

**A:** Use try-catch:

```jsx
useEffect(() => {
  async function fetchData() {
    try {
      const data = await fetch('/api');
    } catch (error) {
      // Handle error
    }
  }
  fetchData();
}, []);
```

### Q5: Should I wrap everything in Error Boundaries?

**A:** No! Use them strategically:
- Wrap major sections
- Wrap third-party components
- Don't wrap every small component

### Q6: Can I have multiple Error Boundaries?

**A:** Yes! Nest them for granular error handling:

```jsx
<ErrorBoundary>
  <Header />
  <ErrorBoundary>
    <MainContent />
  </ErrorBoundary>
</ErrorBoundary>
```

### Q7: How do I test error handling?

**A:** 
- Throw errors intentionally
- Test error states
- Verify error messages display
- Check error logging

### Q8: What should I show users when errors occur?

**A:** 
- Friendly message (not technical)
- What they can do (retry, go back)
- Option to report error
- Don't show stack traces!

### Q9: Should I log all errors?

**A:** Yes! Log errors for debugging:
- Console in development
- Error tracking service (Sentry) in production
- Include context (user, action, etc.)

### Q10: How do I prevent errors?

**A:** 
- Validate inputs
- Check for null/undefined
- Use TypeScript
- Test thoroughly
- Handle edge cases

Prevention is better than handling!

---

## Next Steps

Now that you understand error handling, here's what to learn next:

- **Next:** Learn about [Performance Tips](/react/react-performance-tips) - Optimize your React app
- Review [React Fundamentals](/react/react-introduction) - Solidify your React knowledge
- Practice building projects - Apply everything you've learned

Happy coding! 🚀

