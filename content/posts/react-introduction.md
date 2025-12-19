---
title: "React.js क्या है? - शुरुआती गाइड"
date: "2025-01-15"
description: "React.js क्या है और इसे क्यों सीखना चाहिए? React की मूल बातें, फायदे और उपयोग के बारे में जानें।"
category: "React Basics"
tags: ["react", "introduction", "basics", "हिंदी"]
image: "/images/react-intro.jpg"
author: "आपका नाम"
---

# React.js क्या है?

React.js एक powerful JavaScript library है जो user interfaces बनाने के लिए उपयोग की जाती है। इसे Facebook (अब Meta) ने 2013 में बनाया था और आज यह दुनिया की सबसे लोकप्रिय frontend libraries में से एक है।

## React क्यों सीखें?

### 1. **लोकप्रियता और नौकरी के अवसर**
React.js बहुत लोकप्रिय है और कई बड़ी कंपनियों में उपयोग की जाती है। React developers की मांग बहुत अधिक है।

### 2. **Component-Based Architecture**
React component-based approach का उपयोग करता है, जिससे code reusable और maintainable बनता है।

### 3. **Virtual DOM**
React Virtual DOM का उपयोग करता है, जो performance को बेहतर बनाता है।

### 4. **बड़ा Community**
React का एक बहुत बड़ा community है, जो आपकी मदद कर सकता है।

## React की मुख्य विशेषताएं

### Components
React में सब कुछ components है। Components reusable code blocks हैं जो UI elements बनाते हैं।

```jsx
function Welcome() {
  return <h1>नमस्ते, React!</h1>;
}
```

### JSX
JSX (JavaScript XML) एक syntax extension है जो HTML-like code लिखने की अनुमति देता है।

```jsx
const element = <h1>Hello, World!</h1>;
```

### Props
Props components के बीच data pass करने का तरीका है।

```jsx
function Greeting(props) {
  return <h1>नमस्ते, {props.name}!</h1>;
}
```

### State
State component का internal data है जो बदल सकता है।

## React कैसे स्थापित करें?

### Create React App का उपयोग करके

```bash
npx create-react-app my-app
cd my-app
npm start
```

### Next.js के साथ (Recommended)

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

## निष्कर्ष

React.js एक शक्तिशाली library है जो modern web applications बनाने में मदद करती है। यह component-based architecture, Virtual DOM, और बड़े community के साथ आती है।

अगर आप frontend development में interested हैं, तो React.js सीखना एक बेहतरीन choice है!

## अगले कदम

- React Components के बारे में जानें
- Props और State को समझें
- React Hooks सीखें

