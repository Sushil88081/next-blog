---
title: "React में Forms Handling"
date: "2025-02-25"
description: "React में forms कैसे handle करें? Controlled components, form validation, और best practices के बारे में जानें।"
category: "React Basics"
tags: ["react", "forms", "validation", "हिंदी"]
image: "/images/react-forms.jpg"
author: "आपका नाम"
---

# React में Forms Handling

Forms web applications का एक important part हैं। React में forms handle करना थोड़ा different है क्योंकि React controlled components use करता है।

## Controlled Components

Controlled components में, form data component state द्वारा handle होता है:

```jsx
function NameForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        नाम:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Multiple Inputs

```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="नाम"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="ईमेल"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="संदेश"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Different Input Types

### Text Input

```jsx
function TextInput() {
  const [text, setText] = useState('');
  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
```

### Textarea

```jsx
function TextareaInput() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
```

### Select

```jsx
function SelectInput() {
  const [selected, setSelected] = useState('');

  return (
    <select value={selected} onChange={(e) => setSelected(e.target.value)}>
      <option value="">चुनें...</option>
      <option value="option1">विकल्प 1</option>
      <option value="option2">विकल्प 2</option>
      <option value="option3">विकल्प 3</option>
    </select>
  );
}
```

### Checkbox

```jsx
function CheckboxInput() {
  const [checked, setChecked] = useState(false);

  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      मैं सहमत हूं
    </label>
  );
}
```

### Radio Buttons

```jsx
function RadioInput() {
  const [selected, setSelected] = useState('');

  return (
    <div>
      <label>
        <input
          type="radio"
          value="option1"
          checked={selected === 'option1'}
          onChange={(e) => setSelected(e.target.value)}
        />
        विकल्प 1
      </label>
      <label>
        <input
          type="radio"
          value="option2"
          checked={selected === 'option2'}
          onChange={(e) => setSelected(e.target.value)}
        />
        विकल्प 2
      </label>
    </div>
  );
}
```

## Form Validation

### Basic Validation

```jsx
function ValidatedForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'ईमेल आवश्यक है';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'ईमेल अमान्य है';
    }

    if (!formData.password) {
      newErrors.password = 'पासवर्ड आवश्यक है';
    } else if (formData.password.length < 6) {
      newErrors.password = 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form is valid!', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Real-time Validation

```jsx
function RealTimeValidation() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !/\S+@\S+\.\S+/.test(value)) {
      setError('ईमेल अमान्य है');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleChange}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

## Form Submission

```jsx
function SubmitForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('सफलतापूर्वक submit हो गया!');
        setFormData({ name: '', email: '' });
      }
    } catch (error) {
      setMessage('त्रुटि हुई');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
```

## Best Practices

### 1. Controlled Components Use करें

```jsx
// Good
<input value={value} onChange={handleChange} />

// Avoid
<input ref={inputRef} />
```

### 2. Name Attributes Use करें

```jsx
<input
  name="email"
  value={formData.email}
  onChange={handleChange}
/>
```

### 3. Validation Early करें

```jsx
const handleBlur = () => {
  // Validate on blur
  validateField();
};
```

### 4. Disable Submit Button

```jsx
<button
  type="submit"
  disabled={!isValid || isSubmitting}
>
  Submit
</button>
```

## निष्कर्ष

Forms handling React में important skill है। Controlled components और proper validation से robust forms बनते हैं।

## अगले कदम

- Advanced form libraries explore करें (Formik, React Hook Form)
- Form validation libraries सीखें
- File upload handling जानें

