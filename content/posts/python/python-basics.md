---
title: "Python Basics - Variables, Types, and Syntax"
date: "2025-01-30"
description: "Learn Python fundamentals including variables, data types, operators, and basic syntax. Perfect for beginners starting their Python journey."
category: "Python Basics"
tags: ["python", "basics", "variables", "types", "syntax"]
image: "/assets/images/python.jpg"
author: "Sushil Kumar"
---

# Python Basics - Variables, Types, and Syntax

Welcome to Python basics! This is where your Python journey begins. We'll learn about variables, data types, and how to write basic Python code. Python is known for being simple and readable - you'll see why!

## Variables in Python

Variables store data. In Python, creating variables is super simple:

```python
name = "John"
age = 25
height = 5.9
```

That's it! No need to declare types - Python figures it out automatically.

### Variable Naming Rules

- Can contain letters, numbers, and underscores
- Must start with a letter or underscore
- Case-sensitive (name and Name are different)
- Can't use Python keywords (like `if`, `for`, `def`)

```python
# Good variable names
user_name = "John"
user_age = 25
total_count = 100

# Bad variable names
2name = "John"  # Can't start with number
user-name = "John"  # Can't use hyphens
```

## Data Types in Python

Python has several built-in types:

### Numbers

```python
# Integers (whole numbers)
age = 25
count = -10

# Floats (decimal numbers)
price = 19.99
temperature = -5.5

# Complex numbers (advanced)
complex_num = 3 + 4j
```

### Strings

Strings are text:

```python
name = "John"
message = 'Hello, World!'
multiline = """This is
a multiline
string"""
```

### Booleans

True or False values:

```python
is_active = True
is_done = False
```

### None

Represents "nothing":

```python
value = None
```

## Type Checking

You can check a variable's type:

```python
name = "John"
print(type(name))  # <class 'str'>

age = 25
print(type(age))   # <class 'int'>
```

## Basic Operations

### Arithmetic Operations

```python
a = 10
b = 3

print(a + b)  # 13 (addition)
print(a - b)  # 7 (subtraction)
print(a * b)  # 30 (multiplication)
print(a / b)  # 3.333... (division)
print(a // b) # 3 (floor division)
print(a % b)  # 1 (modulo/remainder)
print(a ** b) # 1000 (exponentiation)
```

### String Operations

```python
first_name = "John"
last_name = "Doe"

# Concatenation
full_name = first_name + " " + last_name
print(full_name)  # "John Doe"

# Repetition
greeting = "Hello! " * 3
print(greeting)  # "Hello! Hello! Hello! "

# Length
print(len(full_name))  # 8
```

### Comparison Operations

```python
a = 10
b = 5

print(a == b)  # False (equal)
print(a != b)  # True (not equal)
print(a > b)   # True (greater than)
print(a < b)   # False (less than)
print(a >= b)  # True (greater than or equal)
print(a <= b)  # False (less than or equal)
```

## Input and Output

### Printing Output

```python
print("Hello, World!")
print("Name:", name)
print(f"Age: {age}")  # f-string (formatted string)
```

### Getting Input

```python
name = input("Enter your name: ")
age = int(input("Enter your age: "))  # Convert to integer
```

## Type Conversion

Convert between types:

```python
# String to number
age_str = "25"
age = int(age_str)

# Number to string
age = 25
age_str = str(age)

# Float to int
price = 19.99
price_int = int(price)  # 19 (truncates)
```

## Comments

Comments help explain your code:

```python
# This is a single-line comment

"""
This is a
multi-line comment
"""

# Comments are ignored by Python
```

## Visual Explanation: Python Variable Assignment

Here's how variables work:

```
Variable Assignment:
┌─────────────────────────────┐
│ name = "John"               │
│                             │
│ 1. Python creates variable │
│ 2. Assigns value "John"    │
│ 3. Determines type: string │
└─────────────────────────────┘

Memory:
┌──────────────┐
│ name         │
│ ────────────│
│ "John"       │
│ (string)     │
└──────────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: Do I need to declare variable types in Python?

**A:** No! Python is dynamically typed. You just assign values, and Python figures out the types automatically. This makes Python code shorter and easier to write.

### Q2: Can I change a variable's type?

**A:** Yes! Python variables can change types:

```python
x = 10      # x is an integer
x = "hello" # Now x is a string
```

This is different from statically typed languages.

### Q3: What's the difference between = and ==?

**A:** 
- **=** - Assignment (assigns value to variable)
- **==** - Comparison (checks if values are equal)

```python
x = 5      # Assign 5 to x
x == 5     # Check if x equals 5 (returns True)
```

### Q4: What are f-strings?

**A:** F-strings (formatted string literals) let you embed expressions in strings:

```python
name = "John"
age = 25
message = f"My name is {name} and I'm {age} years old"
```

They're the modern way to format strings in Python!

### Q5: How do I check if a variable exists?

**A:** Use `in locals()` or `in globals()`:

```python
if 'name' in locals():
    print("Variable exists")
```

### Q6: What's the difference between / and //?

**A:** 
- **/** - Regular division (returns float)
- **//** - Floor division (returns integer, rounds down)

```python
10 / 3   # 3.333...
10 // 3  # 3
```

### Q7: Can variable names have spaces?

**A:** No! Use underscores instead:

```python
user_name = "John"  # Good
user name = "John"  # Error!
```

### Q8: What happens if I use a variable before assigning it?

**A:** You'll get a `NameError`:

```python
print(x)  # NameError: name 'x' is not defined
x = 10
```

### Q9: Can I use keywords as variable names?

**A:** No! Python keywords are reserved:

```python
if = 10  # SyntaxError: invalid syntax
```

### Q10: What's the difference between single and double quotes?

**A:** No difference for strings! Use whichever you prefer:

```python
name1 = "John"
name2 = 'John'
# Both are the same
```

Use double quotes if your string contains single quotes, and vice versa.

---

## Next Steps

Now that you understand Python basics, here's what to learn next:

- **Next:** Learn about [Python Data Structures](/python/python-data-structures) - Lists, dictionaries, tuples, and sets
- Explore [Python Functions](/python/python-functions) - Write reusable code blocks
- Understand [Python Control Flow](/python/python-control-flow) - If statements, loops, and more
- Master [Python Strings](/python/python-strings) - Advanced string operations

Keep practicing! Write small programs to get comfortable with these concepts. Python is all about simplicity and readability!

