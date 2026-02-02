---
title: "React Hook Form - Complete Guide with Examples"
date: "2025-01-15"
description: "Master React Hook Form library for building performant forms with minimal re-renders. Learn validation, error handling, and real-world examples with diagrams."
category: "React Advanced"
tags: ["react", "react-hook-form", "forms", "validation", "performance"]
image: "/images/react-forms.jpg"
author: "Sushil Kumar"
---

# React Hook Form - Complete Guide with Examples

Building forms in React can be tedious. You need to manage state, handle validation, show errors, and prevent unnecessary re-renders. React Hook Form solves all these problems with a simple, performant API that makes form handling a breeze!

## What is React Hook Form?

React Hook Form is a lightweight library that helps you build forms with minimal boilerplate code. Unlike traditional form handling, it uses uncontrolled components with refs, which means **fewer re-renders** and **better performance**.

### Why Use React Hook Form?

Think of React Hook Form like a smart assistant for your forms:

- **Performance**: Only re-renders when necessary (not on every keystroke)
- **Less Code**: Minimal boilerplate compared to controlled components
- **Built-in Validation**: Easy validation with clear error messages
- **TypeScript Support**: Excellent TypeScript support out of the box
- **Small Bundle Size**: Only ~9KB minified and gzipped
- **Easy Integration**: Works with any UI library (Material-UI, Ant Design, etc.)

## Installation

First, install React Hook Form in your project:

```bash
npm install react-hook-form
```

Or with yarn:

```bash
yarn add react-hook-form
```

That's it! No additional dependencies needed.

## Basic Example: Contact Form

Let's start with a real-world example - a contact form that you might use on your website:

```jsx
import { useForm } from 'react-hook-form';

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form data:', data);
    // Send data to your API
    // fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters'
            }
          })}
        />
        {errors.message && <span className="error">{errors.message.message}</span>}
      </div>

      <button type="submit">Send Message</button>
    </form>
  );
}
```

### Understanding the Code

Let's break down what's happening:

1. **`useForm()`** - The main hook that returns form methods
2. **`register()`** - Registers an input field with the form
3. **`handleSubmit()`** - Wraps your submit function with validation
4. **`formState.errors`** - Contains validation errors

The `{...register('name')}` syntax spreads all necessary props (name, ref, onChange, onBlur) to the input. This is React Hook Form's magic!

## How React Hook Form Works: Visual Diagram

Here's how React Hook Form manages form state internally:

```
┌─────────────────────────────────────────────────────────┐
│                    React Hook Form                      │
│                                                          │
│  ┌──────────────┐         ┌──────────────┐            │
│  │   Input 1     │─────────▶│   Register   │            │
│  │  (uncontrolled)│         │   Function   │            │
│  └──────────────┘         └──────┬───────┘            │
│                                   │                     │
│  ┌──────────────┐         ┌──────▼───────┐            │
│  │   Input 2     │─────────▶│  Form State   │            │
│  │  (uncontrolled)│         │   (Internal)  │            │
│  └──────────────┘         └──────┬───────┘            │
│                                   │                     │
│  ┌──────────────┐         ┌──────▼───────┐            │
│  │   Input 3     │─────────▶│  Validation   │            │
│  │  (uncontrolled)│         │   Engine      │            │
│  └──────────────┘         └──────┬───────┘            │
│                                   │                     │
│                            ┌──────▼───────┐            │
│                            │   Errors     │            │
│                            │   Object     │            │
│                            └──────────────┘            │
└─────────────────────────────────────────────────────────┘

Key Benefits:
✓ No re-renders on every keystroke
✓ Validation happens on submit/blur
✓ Form state managed internally
✓ Access via refs (uncontrolled)
```

## Real-World Example: User Registration Form

Let's build a complete registration form with multiple validations:

```jsx
import { useForm } from 'react-hook-form';

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm();

  // Watch password field to compare with confirm password
  const password = watch('password');

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Registration data:', data);
    alert('Registration successful!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
      <h2>Create Your Account</h2>

      {/* Full Name */}
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          {...register('fullName', {
            required: 'Full name is required',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters'
            },
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: 'Name can only contain letters and spaces'
            }
          })}
          placeholder="John Doe"
        />
        {errors.fullName && (
          <span className="error-message">{errors.fullName.message}</span>
        )}
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          })}
          placeholder="john@example.com"
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
              message: 'Password must contain uppercase, lowercase, and number'
            }
          })}
          placeholder="••••••••"
        />
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
      </div>

      {/* Confirm Password */}
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: value => value === password || 'Passwords do not match'
          })}
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword.message}</span>
        )}
      </div>

      {/* Age */}
      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          {...register('age', {
            required: 'Age is required',
            min: {
              value: 18,
              message: 'You must be at least 18 years old'
            },
            max: {
              value: 120,
              message: 'Please enter a valid age'
            }
          })}
          placeholder="25"
        />
        {errors.age && (
          <span className="error-message">{errors.age.message}</span>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            {...register('terms', {
              required: 'You must accept the terms and conditions'
            })}
          />
          <span>I agree to the Terms and Conditions</span>
        </label>
        {errors.terms && (
          <span className="error-message">{errors.terms.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="submit-button"
      >
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}
```

### Key Features Demonstrated

1. **Multiple Validation Rules**: Each field has different validation requirements
2. **Custom Validation**: Password confirmation uses `validate` function
3. **Watching Fields**: `watch('password')` to compare with confirm password
4. **Loading State**: `isSubmitting` to disable button during submission
5. **Error Messages**: Clear, user-friendly error messages

## Validation Modes: Understanding When Validation Happens

React Hook Form offers different validation modes. Here's a visual explanation:

```
Validation Modes:

┌─────────────────────────────────────────────────────┐
│  Mode: "onSubmit" (Default)                         │
│                                                      │
│  User Types → No Validation                         │
│  User Blurs → No Validation                         │
│  User Submits → Validation Runs                     │
│                                                      │
│  ✓ Best for: Simple forms, less validation         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Mode: "onBlur"                                     │
│                                                      │
│  User Types → No Validation                         │
│  User Blurs → Validation Runs                      │
│  User Submits → Validation Runs                    │
│                                                      │
│  ✓ Best for: Better UX, immediate feedback          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Mode: "onChange"                                    │
│                                                      │
│  User Types → Validation Runs                       │
│  User Blurs → Validation Runs                       │
│  User Submits → Validation Runs                    │
│                                                      │
│  ⚠️ Can be annoying for users                      │
│  ✓ Best for: Real-time feedback needed              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Mode: "onTouched"                                   │
│                                                      │
│  User Types → No Validation                         │
│  User Blurs → Validation Runs (after first blur)    │
│  User Submits → Validation Runs                     │
│                                                      │
│  ✓ Best for: Balance between UX and performance     │
└─────────────────────────────────────────────────────┘
```

### Setting Validation Mode

```jsx
const { register, handleSubmit } = useForm({
  mode: 'onBlur' // or 'onChange', 'onTouched', 'onSubmit'
});
```

## Advanced Example: Product Review Form

Let's build a product review form with rating, file upload, and conditional fields:

```jsx
import { useForm, Controller } from 'react-hook-form';

function ProductReviewForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      rating: 5,
      recommend: true,
      category: 'electronics'
    }
  });

  const recommend = watch('recommend');

  const onSubmit = (data) => {
    console.log('Review submitted:', data);
    // Handle review submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Write a Review</h2>

      {/* Product Name */}
      <div>
        <label>Product Name</label>
        <input
          {...register('productName', { required: 'Product name is required' })}
        />
        {errors.productName && <span>{errors.productName.message}</span>}
      </div>

      {/* Rating (using Controller for custom component) */}
      <div>
        <label>Rating</label>
        <Controller
          name="rating"
          control={control}
          rules={{ required: 'Please select a rating' }}
          render={({ field }) => (
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={field.value >= star ? 'star-filled' : 'star-empty'}
                  onClick={() => field.onChange(star)}
                >
                  ★
                </button>
              ))}
            </div>
          )}
        />
        {errors.rating && <span>{errors.rating.message}</span>}
      </div>

      {/* Review Title */}
      <div>
        <label>Review Title</label>
        <input
          {...register('title', {
            required: 'Review title is required',
            maxLength: {
              value: 100,
              message: 'Title must be less than 100 characters'
            }
          })}
          placeholder="Great product!"
        />
        {errors.title && <span>{errors.title.message}</span>}
      </div>

      {/* Review Text */}
      <div>
        <label>Your Review</label>
        <textarea
          {...register('review', {
            required: 'Please write a review',
            minLength: {
              value: 50,
              message: 'Review must be at least 50 characters'
            },
            maxLength: {
              value: 1000,
              message: 'Review must be less than 1000 characters'
            }
          })}
          rows={6}
          placeholder="Share your experience..."
        />
        {errors.review && <span>{errors.review.message}</span>}
      </div>

      {/* Would Recommend (Checkbox) */}
      <div>
        <label>
          <input
            type="checkbox"
            {...register('recommend')}
          />
          I would recommend this product
        </label>
      </div>

      {/* Conditional Field: Why Not Recommend */}
      {!recommend && (
        <div>
          <label>Why wouldn't you recommend it?</label>
          <textarea
            {...register('notRecommendReason', {
              required: !recommend ? 'Please explain why' : false
            })}
            rows={3}
          />
          {errors.notRecommendReason && (
            <span>{errors.notRecommendReason.message}</span>
          )}
        </div>
      )}

      {/* Product Category (Select) */}
      <div>
        <label>Product Category</label>
        <select {...register('category', { required: true })}>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
          <option value="home">Home & Garden</option>
        </select>
      </div>

      {/* Photo Upload */}
      <div>
        <label>Upload Photo (Optional)</label>
        <input
          type="file"
          accept="image/*"
          {...register('photo')}
        />
        <small>Max file size: 5MB</small>
      </div>

      {/* Submit */}
      <button type="submit">Submit Review</button>
    </form>
  );
}
```

## Form State Management Flow

Here's how React Hook Form manages the entire form lifecycle:

```
┌──────────────────────────────────────────────────────────┐
│              React Hook Form Lifecycle                    │
└──────────────────────────────────────────────────────────┘

1. INITIALIZATION
   ┌──────────────┐
   │  useForm()   │───▶ Creates form state object
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │  register()  │───▶ Registers input with form
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │ Input Ready  │───▶ Input connected to form
   └──────────────┘

2. USER INTERACTION
   ┌──────────────┐
   │ User Types   │───▶ Input value changes
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │ Form State   │───▶ Internal state updates
   │  Updates     │    (No re-render if mode: onSubmit)
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │ Validation   │───▶ Runs based on mode
   │  (if needed) │    (onSubmit/onBlur/onChange)
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │ Errors Set  │───▶ Errors stored if invalid
   └──────────────┘

3. SUBMISSION
   ┌──────────────┐
   │ User Submits │───▶ handleSubmit() called
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │ Validation   │───▶ All fields validated
   │   Runs       │
   └──────┬───────┘
          │
      ┌───┴───┐
      │       │
   Valid?  Invalid?
      │       │
      ▼       ▼
   Submit  Show Errors
   Form    to User
```

## Performance Comparison: React Hook Form vs Traditional Forms

Here's why React Hook Form is faster:

```
Traditional Controlled Component:
┌─────────────────────────────────────────┐
│ User types "H"                          │
│   → onChange fires                      │
│   → setState("H")                       │
│   → Component re-renders                │
│   → All inputs re-render                │
│                                         │
│ User types "e"                          │
│   → onChange fires                      │
│   → setState("He")                      │
│   → Component re-renders                │
│   → All inputs re-render                │
│                                         │
│ Result: 2 re-renders for 2 keystrokes  │
└─────────────────────────────────────────┘

React Hook Form (Uncontrolled):
┌─────────────────────────────────────────┐
│ User types "H"                          │
│   → Input value changes (DOM only)     │
│   → No state update                    │
│   → No re-render                        │
│                                         │
│ User types "e"                          │
│   → Input value changes (DOM only)     │
│   → No state update                    │
│   → No re-render                        │
│                                         │
│ Result: 0 re-renders for 2 keystrokes  │
│ (Re-render only on submit/blur)         │
└─────────────────────────────────────────┘

Performance Gain: 
- Fewer re-renders = Better performance
- Especially noticeable in large forms
- Better user experience
```

## Common Validation Patterns

### Email Validation

```jsx
{...register('email', {
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address'
  }
})}
```

### Password Strength

```jsx
{...register('password', {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters'
  },
  validate: {
    hasUpperCase: (value) =>
      /[A-Z]/.test(value) || 'Password must contain uppercase letter',
    hasLowerCase: (value) =>
      /[a-z]/.test(value) || 'Password must contain lowercase letter',
    hasNumber: (value) =>
      /\d/.test(value) || 'Password must contain a number',
    hasSpecialChar: (value) =>
      /[!@#$%^&*]/.test(value) || 'Password must contain special character'
  }
})}
```

### URL Validation

```jsx
{...register('website', {
  pattern: {
    value: /^https?:\/\/.+/,
    message: 'Please enter a valid URL (must start with http:// or https://)'
  }
})}
```

### Phone Number Validation

```jsx
{...register('phone', {
  required: 'Phone number is required',
  pattern: {
    value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
    message: 'Please enter a valid phone number'
  }
})}
```

### Date Validation (Future Date)

```jsx
{...register('appointmentDate', {
  required: 'Date is required',
  validate: {
    isFuture: (value) => {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today || 'Date must be in the future';
    }
  }
})}
```

## Resetting Forms

After successful submission, you often want to reset the form:

```jsx
const { register, handleSubmit, reset, formState: { isSubmitSuccessful } } = useForm();

const onSubmit = async (data) => {
  // Submit data
  await submitToAPI(data);
  // Reset form after successful submission
  reset();
};

// Or reset with default values
const resetWithDefaults = () => {
  reset({
    name: '',
    email: '',
    message: ''
  });
};
```

## Working with Default Values

You can set default values when initializing the form:

```jsx
const { register, handleSubmit } = useForm({
  defaultValues: {
    name: 'John Doe',
    email: 'john@example.com',
    country: 'USA',
    newsletter: true
  }
});
```

This is useful for:
- Edit forms (pre-populate with existing data)
- Forms with common defaults
- Remembering user preferences

## Real-World Example: Multi-Step Form

Here's a complete multi-step form (like a checkout process):

```jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function CheckoutForm() {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm();

  const nextStep = async () => {
    // Validate current step before proceeding
    let isValid = false;
    
    if (step === 1) {
      isValid = await trigger(['name', 'email', 'phone']);
    } else if (step === 2) {
      isValid = await trigger(['address', 'city', 'zipCode']);
    } else if (step === 3) {
      isValid = await trigger(['cardNumber', 'expiry', 'cvv']);
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data) => {
    console.log('Checkout data:', data);
    // Process payment
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Step Indicator */}
      <div className="step-indicator">
        <div className={step >= 1 ? 'active' : ''}>1. Contact</div>
        <div className={step >= 2 ? 'active' : ''}>2. Address</div>
        <div className={step >= 3 ? 'active' : ''}>3. Payment</div>
      </div>

      {/* Step 1: Contact Information */}
      {step === 1 && (
        <div className="form-step">
          <h2>Contact Information</h2>
          <input
            {...register('name', { required: 'Name is required' })}
            placeholder="Full Name"
          />
          {errors.name && <span>{errors.name.message}</span>}

          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            placeholder="Email"
          />
          {errors.email && <span>{errors.email.message}</span>}

          <input
            type="tel"
            {...register('phone', { required: 'Phone is required' })}
            placeholder="Phone"
          />
          {errors.phone && <span>{errors.phone.message}</span>}

          <button type="button" onClick={nextStep}>Next</button>
        </div>
      )}

      {/* Step 2: Shipping Address */}
      {step === 2 && (
        <div className="form-step">
          <h2>Shipping Address</h2>
          <input
            {...register('address', { required: 'Address is required' })}
            placeholder="Street Address"
          />
          {errors.address && <span>{errors.address.message}</span>}

          <input
            {...register('city', { required: 'City is required' })}
            placeholder="City"
          />
          {errors.city && <span>{errors.city.message}</span>}

          <input
            {...register('zipCode', {
              required: 'ZIP code is required',
              pattern: {
                value: /^\d{5}(-\d{4})?$/,
                message: 'Invalid ZIP code'
              }
            })}
            placeholder="ZIP Code"
          />
          {errors.zipCode && <span>{errors.zipCode.message}</span>}

          <button type="button" onClick={prevStep}>Back</button>
          <button type="button" onClick={nextStep}>Next</button>
        </div>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <div className="form-step">
          <h2>Payment Information</h2>
          <input
            {...register('cardNumber', {
              required: 'Card number is required',
              pattern: {
                value: /^\d{16}$/,
                message: 'Card number must be 16 digits'
              }
            })}
            placeholder="Card Number"
          />
          {errors.cardNumber && <span>{errors.cardNumber.message}</span>}

          <input
            {...register('expiry', {
              required: 'Expiry date is required',
              pattern: {
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: 'Format: MM/YY'
              }
            })}
            placeholder="MM/YY"
          />
          {errors.expiry && <span>{errors.expiry.message}</span>}

          <input
            {...register('cvv', {
              required: 'CVV is required',
              pattern: {
                value: /^\d{3,4}$/,
                message: 'CVV must be 3-4 digits'
              }
            })}
            placeholder="CVV"
          />
          {errors.cvv && <span>{errors.cvv.message}</span>}

          <button type="button" onClick={prevStep}>Back</button>
          <button type="submit">Complete Order</button>
        </div>
      )}
    </form>
  );
}
```

## Working with Dynamic Fields: useFieldArray

When you need to add or remove form fields dynamically (like multiple email addresses, phone numbers, or items in a list), React Hook Form provides `useFieldArray`. This hook makes it incredibly easy to manage arrays of form fields.

### What is useFieldArray?

`useFieldArray` is a hook that helps you manage arrays of form fields. It provides methods to:
- **Append** new fields
- **Remove** existing fields
- **Insert** fields at specific positions
- **Swap** field positions
- **Move** fields to different positions
- **Update** field values

### Visual Understanding: useFieldArray Flow

```
┌─────────────────────────────────────────────────────────┐
│              useFieldArray Workflow                      │
└─────────────────────────────────────────────────────────┘

Initial State:
┌──────────────┐
│  Fields: []  │───▶ Empty array, no fields
└──────────────┘

User Clicks "Add Item":
┌──────────────┐
│  append()    │───▶ Adds new field to end
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Fields: [1] │───▶ One field in array
└──────┬───────┘
       │
       ▼
User Clicks "Add Item" Again:
┌──────────────┐
│  append()    │───▶ Adds another field
└──────┬───────┘
       │
       ▼
┌──────────────┐
│Fields: [1,2] │───▶ Two fields in array
└──────┬───────┘
       │
       ▼
User Clicks "Remove" on Field 1:
┌──────────────┐
│  remove(0)   │───▶ Removes first field
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Fields: [2] │───▶ One field remains
└──────────────┘
```

## Real-World Example 1: Multiple Email Addresses

Imagine a user profile form where users can add multiple email addresses:

```jsx
import { useForm, useFieldArray } from 'react-hook-form';

function MultipleEmailsForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      emails: [{ email: '' }] // Start with one empty email field
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'emails' // Name of the array field
  });

  const onSubmit = (data) => {
    console.log('All emails:', data.emails);
    // Submit to API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Email Addresses</h2>
      <p>Add multiple email addresses for your account</p>

      {fields.map((field, index) => (
        <div key={field.id} className="email-field-group">
          <div className="input-group">
            <label htmlFor={`email-${index}`}>
              Email {index + 1}
            </label>
            <input
              id={`email-${index}`}
              type="email"
              {...register(`emails.${index}.email`, {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              placeholder="example@email.com"
            />
            {errors.emails?.[index]?.email && (
              <span className="error">
                {errors.emails[index].email.message}
              </span>
            )}
          </div>

          {/* Remove button - hide if only one field */}
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="remove-button"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {/* Add new email button */}
      <button
        type="button"
        onClick={() => append({ email: '' })}
        className="add-button"
      >
        + Add Another Email
      </button>

      <button type="submit">Save Emails</button>
    </form>
  );
}
```

### Key Points:
- `fields` - Array of field objects with unique `id` properties
- `append({ email: '' })` - Adds a new field at the end
- `remove(index)` - Removes field at specific index
- `register(\`emails.${index}.email\`)` - Register each field dynamically

## Real-World Example 2: Shopping Cart with Dynamic Items

Here's a complete shopping cart where users can add/remove items and update quantities:

```jsx
import { useForm, useFieldArray } from 'react-hook-form';

function ShoppingCartForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      items: [
        { name: '', quantity: 1, price: 0 }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  // Watch all items to calculate total
  const items = watch('items');

  // Calculate total price
  const total = items.reduce((sum, item) => {
    return sum + (item.quantity * item.price);
  }, 0);

  const onSubmit = (data) => {
    console.log('Cart items:', data.items);
    console.log('Total:', total);
    // Process checkout
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Shopping Cart</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="cart-item">
          <h3>Item {index + 1}</h3>

          {/* Product Name */}
          <div>
            <label>Product Name</label>
            <input
              {...register(`items.${index}.name`, {
                required: 'Product name is required'
              })}
              placeholder="Enter product name"
            />
            {errors.items?.[index]?.name && (
              <span>{errors.items[index].name.message}</span>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              {...register(`items.${index}.quantity`, {
                required: 'Quantity is required',
                min: { value: 1, message: 'Minimum quantity is 1' },
                valueAsNumber: true // Convert to number
              })}
            />
            {errors.items?.[index]?.quantity && (
              <span>{errors.items[index].quantity.message}</span>
            )}
          </div>

          {/* Price */}
          <div>
            <label>Price per Unit</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register(`items.${index}.price`, {
                required: 'Price is required',
                min: { value: 0, message: 'Price must be positive' },
                valueAsNumber: true
              })}
            />
            {errors.items?.[index]?.price && (
              <span>{errors.items[index].price.message}</span>
            )}
          </div>

          {/* Item Total */}
          <div className="item-total">
            <strong>
              Item Total: ${(items[index].quantity * items[index].price).toFixed(2)}
            </strong>
          </div>

          {/* Remove Item Button */}
          <button
            type="button"
            onClick={() => remove(index)}
            className="remove-item-button"
          >
            Remove Item
          </button>
        </div>
      ))}

      {/* Add New Item */}
      <button
        type="button"
        onClick={() => append({ name: '', quantity: 1, price: 0 })}
        className="add-item-button"
      >
        + Add Another Item
      </button>

      {/* Cart Summary */}
      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <p>Total Items: {fields.length}</p>
        <p className="total-price">Total Price: ${total.toFixed(2)}</p>
      </div>

      <button type="submit">Proceed to Checkout</button>
    </form>
  );
}
```

## Real-World Example 3: Work Experience Form

A professional resume form where users can add multiple work experiences:

```jsx
import { useForm, useFieldArray } from 'react-hook-form';

function WorkExperienceForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      experiences: [
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    }
  });

  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: 'experiences'
  });

  const onSubmit = (data) => {
    console.log('Work experiences:', data.experiences);
    // Save to profile
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Work Experience</h2>
      <p>Add your work history (most recent first)</p>

      {fields.map((field, index) => (
        <div key={field.id} className="experience-card">
          <div className="experience-header">
            <h3>Experience {index + 1}</h3>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="remove-button"
              >
                Remove
              </button>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label>Company Name *</label>
            <input
              {...register(`experiences.${index}.company`, {
                required: 'Company name is required'
              })}
              placeholder="Google, Microsoft, etc."
            />
            {errors.experiences?.[index]?.company && (
              <span>{errors.experiences[index].company.message}</span>
            )}
          </div>

          {/* Job Position */}
          <div>
            <label>Job Position *</label>
            <input
              {...register(`experiences.${index}.position`, {
                required: 'Position is required'
              })}
              placeholder="Software Engineer, Product Manager, etc."
            />
            {errors.experiences?.[index]?.position && (
              <span>{errors.experiences[index].position.message}</span>
            )}
          </div>

          {/* Date Range */}
          <div className="date-range">
            <div>
              <label>Start Date *</label>
              <input
                type="date"
                {...register(`experiences.${index}.startDate`, {
                  required: 'Start date is required'
                })}
              />
              {errors.experiences?.[index]?.startDate && (
                <span>{errors.experiences[index].startDate.message}</span>
              )}
            </div>

            <div>
              <label>End Date</label>
              <input
                type="date"
                {...register(`experiences.${index}.endDate`, {
                  validate: (value, formValues) => {
                    const startDate = formValues.experiences[index].startDate;
                    if (formValues.experiences[index].current) {
                      return true; // No validation if current job
                    }
                    if (!value) {
                      return 'End date is required if not current job';
                    }
                    if (startDate && value < startDate) {
                      return 'End date must be after start date';
                    }
                    return true;
                  }
                })}
                disabled={watch(`experiences.${index}.current`)}
              />
              {errors.experiences?.[index]?.endDate && (
                <span>{errors.experiences[index].endDate.message}</span>
              )}
            </div>
          </div>

          {/* Current Job Checkbox */}
          <div>
            <label>
              <input
                type="checkbox"
                {...register(`experiences.${index}.current`)}
              />
              I currently work here
            </label>
          </div>

          {/* Job Description */}
          <div>
            <label>Job Description</label>
            <textarea
              {...register(`experiences.${index}.description`, {
                maxLength: {
                  value: 500,
                  message: 'Description must be less than 500 characters'
                }
              })}
              rows={4}
              placeholder="Describe your responsibilities and achievements..."
            />
            {errors.experiences?.[index]?.description && (
              <span>{errors.experiences[index].description.message}</span>
            )}
          </div>

          {/* Insert Above Button */}
          {index > 0 && (
            <button
              type="button"
              onClick={() => insert(index, {
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
              })}
              className="insert-button"
            >
              Insert Above
            </button>
          )}
        </div>
      ))}

      {/* Add New Experience */}
      <button
        type="button"
        onClick={() => append({
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        })}
        className="add-button"
      >
        + Add Another Experience
      </button>

      <button type="submit">Save Work Experience</button>
    </form>
  );
}
```

## Real-World Example 4: Dynamic Survey Form

A survey form where questions can be added dynamically with multiple choice options:

```jsx
import { useForm, useFieldArray } from 'react-hook-form';

function DynamicSurveyForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      questions: [
        {
          questionText: '',
          questionType: 'multiple-choice',
          options: [{ text: '' }],
          required: true
        }
      ]
    }
  });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion
  } = useFieldArray({
    control,
    name: 'questions'
  });

  const onSubmit = (data) => {
    console.log('Survey questions:', data.questions);
    // Save survey
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create Survey</h2>

      {questionFields.map((questionField, questionIndex) => {
        const questionType = watch(`questions.${questionIndex}.questionType`);
        
        // Nested useFieldArray for options
        const {
          fields: optionFields,
          append: appendOption,
          remove: removeOption
        } = useFieldArray({
          control,
          name: `questions.${questionIndex}.options`
        });

        return (
          <div key={questionField.id} className="question-card">
            <div className="question-header">
              <h3>Question {questionIndex + 1}</h3>
              {questionFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(questionIndex)}
                >
                  Remove Question
                </button>
              )}
            </div>

            {/* Question Text */}
            <div>
              <label>Question Text *</label>
              <input
                {...register(`questions.${questionIndex}.questionText`, {
                  required: 'Question text is required'
                })}
                placeholder="Enter your question"
              />
              {errors.questions?.[questionIndex]?.questionText && (
                <span>{errors.questions[questionIndex].questionText.message}</span>
              )}
            </div>

            {/* Question Type */}
            <div>
              <label>Question Type *</label>
              <select
                {...register(`questions.${questionIndex}.questionType`, {
                  required: true
                })}
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="text">Text Answer</option>
                <option value="rating">Rating (1-5)</option>
              </select>
            </div>

            {/* Options (only for multiple-choice) */}
            {questionType === 'multiple-choice' && (
              <div className="options-section">
                <label>Answer Options *</label>
                {optionFields.map((optionField, optionIndex) => (
                  <div key={optionField.id} className="option-row">
                    <input
                      {...register(
                        `questions.${questionIndex}.options.${optionIndex}.text`,
                        { required: 'Option text is required' }
                      )}
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                    {optionFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeOption(optionIndex)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendOption({ text: '' })}
                >
                  + Add Option
                </button>
              </div>
            )}

            {/* Required Checkbox */}
            <div>
              <label>
                <input
                  type="checkbox"
                  {...register(`questions.${questionIndex}.required`)}
                />
                Required question
              </label>
            </div>
          </div>
        );
      })}

      {/* Add New Question */}
      <button
        type="button"
        onClick={() => appendQuestion({
          questionText: '',
          questionType: 'multiple-choice',
          options: [{ text: '' }],
          required: true
        })}
      >
        + Add Another Question
      </button>

      <button type="submit">Create Survey</button>
    </form>
  );
}
```

## Real-World Example 5: Product Variants Form

An e-commerce form for managing product variants (size, color, price combinations):

```jsx
import { useForm, useFieldArray } from 'react-hook-form';

function ProductVariantsForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      productName: '',
      variants: [
        {
          size: '',
          color: '',
          price: 0,
          stock: 0,
          sku: ''
        }
      ]
    }
  });

  const { fields, append, remove, swap, move } = useFieldArray({
    control,
    name: 'variants'
  });

  const onSubmit = (data) => {
    console.log('Product variants:', data.variants);
    // Save product
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Product Variants</h2>

      {/* Product Name */}
      <div>
        <label>Product Name *</label>
        <input
          {...register('productName', { required: 'Product name is required' })}
          placeholder="T-Shirt, Jeans, etc."
        />
        {errors.productName && <span>{errors.productName.message}</span>}
      </div>

      {/* Variants */}
      {fields.map((field, index) => (
        <div key={field.id} className="variant-card">
          <div className="variant-header">
            <h3>Variant {index + 1}</h3>
            <div className="variant-actions">
              {/* Move Up */}
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => move(index, index - 1)}
                  title="Move Up"
                >
                  ↑
                </button>
              )}
              {/* Move Down */}
              {index < fields.length - 1 && (
                <button
                  type="button"
                  onClick={() => move(index, index + 1)}
                  title="Move Down"
                >
                  ↓
                </button>
              )}
              {/* Remove */}
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <div className="variant-fields">
            {/* Size */}
            <div>
              <label>Size *</label>
              <select
                {...register(`variants.${index}.size`, {
                  required: 'Size is required'
                })}
              >
                <option value="">Select Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              {errors.variants?.[index]?.size && (
                <span>{errors.variants[index].size.message}</span>
              )}
            </div>

            {/* Color */}
            <div>
              <label>Color *</label>
              <input
                {...register(`variants.${index}.color`, {
                  required: 'Color is required'
                })}
                placeholder="Red, Blue, Black, etc."
              />
              {errors.variants?.[index]?.color && (
                <span>{errors.variants[index].color.message}</span>
              )}
            </div>

            {/* Price */}
            <div>
              <label>Price *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register(`variants.${index}.price`, {
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' },
                  valueAsNumber: true
                })}
                placeholder="29.99"
              />
              {errors.variants?.[index]?.price && (
                <span>{errors.variants[index].price.message}</span>
              )}
            </div>

            {/* Stock */}
            <div>
              <label>Stock Quantity *</label>
              <input
                type="number"
                min="0"
                {...register(`variants.${index}.stock`, {
                  required: 'Stock is required',
                  min: { value: 0, message: 'Stock cannot be negative' },
                  valueAsNumber: true
                })}
                placeholder="100"
              />
              {errors.variants?.[index]?.stock && (
                <span>{errors.variants[index].stock.message}</span>
              )}
            </div>

            {/* SKU */}
            <div>
              <label>SKU (Stock Keeping Unit)</label>
              <input
                {...register(`variants.${index}.sku`, {
                  validate: (value) => {
                    // Check for duplicate SKUs
                    const allVariants = watch('variants');
                    const duplicates = allVariants.filter(
                      (v, i) => v.sku === value && i !== index && value !== ''
                    );
                    return duplicates.length === 0 || 'SKU must be unique';
                  }
                })}
                placeholder="TSHIRT-RED-M"
              />
              {errors.variants?.[index]?.sku && (
                <span>{errors.variants[index].sku.message}</span>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Add New Variant */}
      <button
        type="button"
        onClick={() => append({
          size: '',
          color: '',
          price: 0,
          stock: 0,
          sku: ''
        })}
      >
        + Add Another Variant
      </button>

      <button type="submit">Save Product</button>
    </form>
  );
}
```

## useFieldArray Methods Explained

Here's a complete reference of all `useFieldArray` methods:

### append(value)
Adds a new field at the end of the array.

```jsx
const { append } = useFieldArray({ control, name: 'items' });

// Add new item
append({ name: 'New Item', quantity: 1 });
```

### prepend(value)
Adds a new field at the beginning of the array.

```jsx
const { prepend } = useFieldArray({ control, name: 'items' });

// Add at the beginning
prepend({ name: 'First Item', quantity: 1 });
```

### insert(index, value)
Inserts a new field at a specific position.

```jsx
const { insert } = useFieldArray({ control, name: 'items' });

// Insert at position 2
insert(2, { name: 'Inserted Item', quantity: 1 });
```

### remove(index)
Removes a field at a specific index.

```jsx
const { remove } = useFieldArray({ control, name: 'items' });

// Remove first item
remove(0);

// Remove multiple items
remove([0, 1, 2]);
```

### swap(indexA, indexB)
Swaps positions of two fields.

```jsx
const { swap } = useFieldArray({ control, name: 'items' });

// Swap first and second items
swap(0, 1);
```

### move(from, to)
Moves a field from one position to another.

```jsx
const { move } = useFieldArray({ control, name: 'items' });

// Move item from position 2 to position 0
move(2, 0);
```

### update(index, value)
Updates a field at a specific index.

```jsx
const { update } = useFieldArray({ control, name: 'items' });

// Update first item
update(0, { name: 'Updated Item', quantity: 5 });
```

### replace(array)
Replaces the entire array with a new array.

```jsx
const { replace } = useFieldArray({ control, name: 'items' });

// Replace all items
replace([
  { name: 'Item 1', quantity: 1 },
  { name: 'Item 2', quantity: 2 }
]);
```

## useFieldArray Best Practices

### 1. Always Use field.id as Key

```jsx
// ✅ Correct
{fields.map((field, index) => (
  <div key={field.id}>
    <input {...register(`items.${index}.name`)} />
  </div>
))}

// ❌ Wrong - Don't use index as key
{fields.map((field, index) => (
  <div key={index}>
    <input {...register(`items.${index}.name`)} />
  </div>
))}
```

### 2. Provide Default Values

```jsx
// ✅ Good - Start with one empty field
defaultValues: {
  items: [{ name: '', quantity: 1 }]
}

// ❌ Bad - Empty array might cause issues
defaultValues: {
  items: []
}
```

### 3. Validate Array Items

```jsx
{...register(`items.${index}.name`, {
  required: 'Item name is required',
  minLength: {
    value: 3,
    message: 'Name must be at least 3 characters'
  }
})}
```

### 4. Handle Empty Arrays

```jsx
// Show message if no fields
{fields.length === 0 && (
  <p>No items added yet. Click "Add Item" to get started.</p>
)}

// Disable remove if only one field
{fields.length > 1 && (
  <button onClick={() => remove(index)}>Remove</button>
)}
```

### 5. Use watch() for Real-time Calculations

```jsx
const items = watch('items');
const total = items.reduce((sum, item) => sum + item.price, 0);
```

## Common Patterns with useFieldArray

### Pattern 1: Minimum One Item Required

```jsx
const { fields, remove } = useFieldArray({ control, name: 'items' });

// Only allow removal if more than one item
{fields.length > 1 && (
  <button onClick={() => remove(index)}>Remove</button>
)}
```

### Pattern 2: Maximum Items Limit

```jsx
const MAX_ITEMS = 10;
const { fields, append } = useFieldArray({ control, name: 'items' });

<button
  onClick={() => append({ name: '' })}
  disabled={fields.length >= MAX_ITEMS}
>
  {fields.length >= MAX_ITEMS
    ? 'Maximum items reached'
    : '+ Add Item'}
</button>
```

### Pattern 3: Conditional Fields Based on Array Item

```jsx
const itemType = watch(`items.${index}.type`);

{itemType === 'custom' && (
  <input {...register(`items.${index}.customValue`)} />
)}
```

### Pattern 4: Nested useFieldArray

```jsx
// Outer array
const { fields: questionFields } = useFieldArray({
  control,
  name: 'questions'
});

// Inner array (inside map)
{questionFields.map((question, qIndex) => {
  const { fields: optionFields } = useFieldArray({
    control,
    name: `questions.${qIndex}.options`
  });
  
  return (
    // Render options
  );
})}
```

## Performance Tips for useFieldArray

1. **Use field.id as key** - React can efficiently track changes
2. **Limit re-renders** - Only watch specific fields if needed
3. **Memoize calculations** - Use `useMemo` for expensive operations
4. **Batch updates** - Use `replace()` instead of multiple `remove()` + `append()`

## Best Practices

### 1. Use Meaningful Error Messages

```jsx
// ❌ Bad
{...register('email', { required: true })}

// ✅ Good
{...register('email', {
  required: 'Email address is required to create your account'
})}
```

### 2. Validate on Appropriate Events

```jsx
// For better UX, validate on blur
const { register } = useForm({
  mode: 'onBlur' // Validates when user leaves the field
});
```

### 3. Use TypeScript for Type Safety

```tsx
interface FormData {
  name: string;
  email: string;
  age: number;
}

const { register, handleSubmit } = useForm<FormData>();
```

### 4. Handle Async Validation

```jsx
{...register('username', {
  validate: async (value) => {
    const response = await fetch(`/api/check-username?username=${value}`);
    const data = await response.json();
    return data.available || 'Username is already taken';
  }
})}
```

### 5. Disable Submit During Processing

```jsx
const { formState: { isSubmitting } } = useForm();

<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</button>
```

## Common Mistakes to Avoid

### 1. Forgetting to Spread register()

```jsx
// ❌ Wrong - Missing spread operator
<input register('name') />

// ✅ Correct
<input {...register('name')} />
```

### 2. Not Handling Errors

```jsx
// ❌ Wrong - No error display
<input {...register('email', { required: true })} />

// ✅ Correct - Show errors
<input {...register('email', { required: 'Email is required' })} />
{errors.email && <span>{errors.email.message}</span>}
```

### 3. Using Controlled Components Unnecessarily

```jsx
// ❌ Wrong - Unnecessary controlled component
const [value, setValue] = useState('');
<input value={value} onChange={(e) => setValue(e.target.value)} />

// ✅ Correct - Let React Hook Form handle it
<input {...register('name')} />
```

## Frequently Asked Questions

### Q1: How is React Hook Form different from Formik?

**A:** React Hook Form uses uncontrolled components (refs) for better performance, while Formik uses controlled components. React Hook Form is lighter (~9KB vs ~15KB) and has fewer re-renders.

### Q2: Can I use React Hook Form with TypeScript?

**A:** Yes! React Hook Form has excellent TypeScript support:

```tsx
interface FormValues {
  email: string;
  password: string;
}

const { register, handleSubmit } = useForm<FormValues>();
```

### Q3: How do I reset a form after submission?

**A:** Use the `reset()` function:

```jsx
const { reset } = useForm();

const onSubmit = (data) => {
  // Submit data
  reset(); // Resets all fields
  // Or reset({ email: '', password: '' }) for specific values
};
```

### Q4: Can I validate fields conditionally?

**A:** Yes! Use the `validate` function:

```jsx
{...register('confirmPassword', {
  validate: (value) => {
    const password = watch('password');
    return value === password || 'Passwords must match';
  }
})}
```

### Q5: How do I handle file uploads?

**A:** File inputs work the same way:

```jsx
<input
  type="file"
  {...register('avatar')}
/>
```

Then access it in `onSubmit`:

```jsx
const onSubmit = (data) => {
  const file = data.avatar[0]; // FileList to File
  // Handle file upload
};
```

### Q6: Can I use React Hook Form with Material-UI or other UI libraries?

**A:** Absolutely! Use the `Controller` component for custom components:

```jsx
import { Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';

<Controller
  name="email"
  control={control}
  render={({ field }) => (
    <TextField {...field} label="Email" />
  )}
/>
```

### Q7: How do I set default values?

**A:** Use `defaultValues` in `useForm()`:

```jsx
const { register } = useForm({
  defaultValues: {
    name: 'John',
    email: 'john@example.com'
  }
});
```

### Q8: Can I validate on multiple events?

**A:** Yes, use `reValidateMode`:

```jsx
const { register } = useForm({
  mode: 'onSubmit', // Initial validation
  reValidateMode: 'onChange' // Re-validate on change after first submit
});
```

## Summary

React Hook Form is a powerful, performant solution for handling forms in React. Key takeaways:

- ✅ **Performance**: Fewer re-renders with uncontrolled components
- ✅ **Simplicity**: Less boilerplate code
- ✅ **Validation**: Built-in validation with clear error messages
- ✅ **Flexibility**: Works with any UI library
- ✅ **TypeScript**: Excellent TypeScript support
- ✅ **Small Bundle**: Only ~9KB minified

## Next Steps

Now that you understand React Hook Form, here's what to explore next:

- **Next:** Learn about [React Context API](/react/react-context-api) - Share form state across components
- Explore [Custom Hooks](/react/react-custom-hooks) - Create reusable form logic
- Study [React Performance Tips](/react/react-performance-tips) - Optimize your forms further
- Understand [Error Handling](/react/react-error-handling) - Handle form submission errors

Start building better forms today with React Hook Form! 🚀

