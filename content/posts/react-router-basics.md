---
title: "React Router - Navigation Made Easy"
date: "2025-01-16"
description: "Learn React Router to add navigation to your React app. Step by step guide with examples for routing between pages."
category: "React Advanced"
tags: ["react", "router", "navigation", "routing", "react-router"]
image: "/assets/images/react.jpg"
author: "Sushil Kumar"
---

# React Router - Navigation Made Easy

Hey! So you built a cool React app, but now you want multiple pages? That's where React Router comes in! Let me show you how to add navigation to your app.

## What is React Router?

React Router lets you create multiple pages in your single-page app. Think of it like having different rooms in your house - you click a link and go to a different "room" (page) without refreshing the whole page.

It's super popular and makes your app feel like a real website with navigation.

## Installing React Router

First, you need to install it. Open your terminal and run:

```bash
npm install react-router-dom
```

That's it! Now you're ready to use React Router.

## Basic Setup

Here's how you set it up in your app:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

That's the basic setup! Now you have three pages:

- `/` - Shows the Home component
- `/about` - Shows the About component
- `/contact` - Shows the Contact component

## Creating Navigation Links

Now you need a way to navigate between pages. Use the Link component:

```jsx
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

The `Link` component creates clickable links that change the URL without refreshing the page. Much better than regular `<a>` tags!

## Complete Example

Let me show you a complete working example:

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Page components
function Home() {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <p>This is the home page content!</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Learn more about our company here.</p>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Get in touch with us!</p>
    </div>
  );
}

// Main App
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |<Link to="/about">About</Link> |
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Now you have a working multi-page app! Click the links and watch the content change.

## Dynamic Routes

Sometimes you want routes like `/user/123` or `/product/456`. Here's how:

```jsx
function UserProfile() {
  const { id } = useParams();

  return <div>Showing profile for user: {id}</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
```

The `:id` part is a parameter. So `/user/123` will show user 123, and `/user/456` will show user 456. Use `useParams()` hook to get the id.

## Using useNavigate Hook

Sometimes you want to navigate programmatically (not with a link):

```jsx
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Do login stuff...
    // Then navigate to dashboard
    navigate("/dashboard");
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

Super useful when you want to redirect after a form submission or login!

## Active Link Styling

You can style the active link differently:

```jsx
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-link" : "normal-link")}
      >
        Home
      </NavLink>
    </nav>
  );
}
```

`NavLink` is like `Link` but it automatically knows which link is active. Perfect for highlighting the current page!

## Nested Routes

You can have routes inside routes:

```jsx
function Layout() {
  return (
    <div>
      <nav>Navigation bar</nav>
      <Outlet /> {/* This shows child routes */}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

The `Outlet` component shows where child routes should appear. This is great for shared layouts!

## Handling 404 Pages

What if someone visits a page that doesn't exist? Show a 404 page:

```jsx
function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, this page doesn't exist!</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

The `path="*"` catches all routes that don't match. Perfect for 404 pages!

## Redirects

Want to automatically redirect from one route to another?

```jsx
import { Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/old-page" element={<Navigate to="/new-page" />} />
        <Route path="/new-page" element={<NewPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Now visiting `/old-page` automatically sends you to `/new-page`.

## Common Patterns

Here are some patterns I use all the time:

### Protected Routes

```jsx
function ProtectedRoute({ children }) {
  const isLoggedIn = true; // Check if user is logged in

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

This checks if user is logged in before showing the dashboard.

## Tips and Best Practices

- Keep your route paths simple and clear
- Use descriptive route names
- Group related routes together
- Always handle 404 cases
- Use nested routes for shared layouts
- Consider lazy loading for better performance

## Common Mistakes

Here's what to avoid:

1. **Forgetting BrowserRouter** - Wrap your app in BrowserRouter!

2. **Using <a> tags instead of Link** - This will refresh the page

3. **Wrong path matching** - Make sure your paths match exactly

## Conclusion

React Router makes it super easy to add navigation to your React app. Start with basic routes, then gradually learn advanced features as you need them.

The key things to remember:

- Wrap your app in BrowserRouter
- Use Routes and Route to define pages
- Use Link for navigation
- Use useNavigate for programmatic navigation

Practice building a small app with multiple pages. That's the best way to learn!

## Next Steps

Now that you know routing basics, here's what to learn next:

- **Next:** Learn about [Performance Tips](/react/react-performance-tips) - Optimize your React app
- Explore [Custom Hooks](/react/react-custom-hooks) - Create hooks for route logic
- Master [React Hooks](/react/react-hooks) - Deep dive into all hooks
