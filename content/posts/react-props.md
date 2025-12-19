---
title: "React Props - Data Passing का तरीका"
date: "2025-02-05"
description: "React में Props क्या हैं? Props कैसे pass करें, default props, prop types और best practices के बारे में जानें।"
category: "React Basics"
tags: ["react", "props", "components", "हिंदी"]
image: "/images/react-props.jpg"
author: "आपका नाम"
---

# React Props - Data Passing का तरीका

Props (Properties) React में data pass करने का primary तरीका है। वे parent components से child components में data pass करते हैं।

## Props क्या हैं?

Props read-only data हैं जो parent component से child component में pass होते हैं। वे components को reusable और dynamic बनाते हैं।

## Basic Props Example

```jsx
function Greeting(props) {
  return <h1>नमस्ते, {props.name}!</h1>;
}

function App() {
  return <Greeting name="राज" />;
}
```

## Destructuring Props

Props को destructure करना एक common practice है:

```jsx
function UserCard({ name, email, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
    </div>
  );
}

function App() {
  return (
    <UserCard 
      name="राज कुमार"
      email="raj@example.com"
      age={25}
    />
  );
}
```

## Default Props

Default values set करना:

```jsx
function Button({ text, color = 'blue' }) {
  return (
    <button style={{ backgroundColor: color }}>
      {text}
    </button>
  );
}

// Usage
<Button text="Click me" /> // color will be 'blue'
<Button text="Click me" color="red" /> // color will be 'red'
```

या defaultProps के साथ:

```jsx
function Button({ text, color }) {
  return (
    <button style={{ backgroundColor: color }}>
      {text}
    </button>
  );
}

Button.defaultProps = {
  color: 'blue',
  text: 'Click me'
};
```

## Children Prop

`children` prop special है और component के बीच content pass करने के लिए use होता है:

```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Card title="मेरी कार्ड">
      <p>यह कार्ड का content है</p>
      <button>Click me</button>
    </Card>
  );
}
```

## Props Types

### Strings

```jsx
<Component name="राज" />
```

### Numbers

```jsx
<Component age={25} count={10} />
```

### Booleans

```jsx
<Component isActive={true} showDetails={false} />
```

### Arrays

```jsx
<Component items={[1, 2, 3]} users={['राज', 'प्रिया']} />
```

### Objects

```jsx
<Component user={{ name: 'राज', age: 25 }} />
```

### Functions

```jsx
function App() {
  const handleClick = () => {
    console.log('Clicked!');
  };

  return <Button onClick={handleClick} />;
}
```

## Props Validation

TypeScript के साथ:

```tsx
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ text, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
```

PropTypes के साथ:

```jsx
import PropTypes from 'prop-types';

function Button({ text, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
```

## Spread Operator के साथ Props

```jsx
function UserCard({ name, email, ...otherProps }) {
  return (
    <div {...otherProps}>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

// Usage
<UserCard 
  name="राज"
  email="raj@example.com"
  className="card"
  id="user-1"
/>
```

## Props vs State

| Props | State |
|-------|-------|
| Parent से pass होते हैं | Component के अंदर बनता है |
| Read-only | Mutable |
| Cannot be changed | setState से change होता है |
| Downward data flow | Internal component data |

## Best Practices

### 1. Props को Destructure करें

```jsx
// Good
function Component({ name, age }) { }

// Avoid
function Component(props) {
  const name = props.name;
  const age = props.age;
}
```

### 2. Meaningful Names Use करें

```jsx
// Good
<UserCard userName="राज" userEmail="raj@example.com" />

// Avoid
<UserCard a="राज" b="raj@example.com" />
```

### 3. Default Values Provide करें

```jsx
function Button({ text = 'Click me', variant = 'primary' }) {
  // ...
}
```

## निष्कर्ष

Props React में data passing का मुख्य तरीका हैं। वे components को reusable और dynamic बनाते हैं।

## अगले कदम

- State के बारे में जानें
- Props और State के बीच difference समझें
- Advanced prop patterns सीखें

