---
title: "Python Control Flow - If Statements, Loops, and More"
date: "2025-02-17"
description: "Learn about Python control flow including if statements, for loops, while loops, break, continue, and how to control program execution."
category: "Python Basics"
tags: ["python", "control-flow", "if-statements", "loops", "programming"]
image: "/assets/images/python.jpg"
author: "Sushil Kumar"
---

# Python Control Flow - If Statements, Loops, and More

Control flow lets you make decisions and repeat actions in your Python programs. It's how you make your code smart and efficient!

## If Statements

If statements let you make decisions based on conditions.

### Basic If

```python
age = 18

if age >= 18:
    print("You are an adult")
```

### If-Else

```python
age = 16

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
```

### If-Elif-Else

```python
score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")
```

### Nested If

```python
age = 20
has_license = True

if age >= 18:
    if has_license:
        print("You can drive")
    else:
        print("You need a license")
else:
    print("You're too young to drive")
```

## Comparison Operators

```python
a = 10
b = 5

print(a == b)   # False (equal)
print(a != b)   # True (not equal)
print(a > b)    # True (greater than)
print(a < b)    # False (less than)
print(a >= b)   # True (greater than or equal)
print(a <= b)   # False (less than or equal)
```

## Logical Operators

```python
age = 25
has_license = True

# AND - both must be true
if age >= 18 and has_license:
    print("Can drive")

# OR - at least one must be true
if age < 18 or not has_license:
    print("Cannot drive")

# NOT - reverses the condition
if not has_license:
    print("Need license")
```

## For Loops

For loops iterate over sequences (lists, strings, etc.).

### Basic For Loop

```python
fruits = ["apple", "banana", "orange"]

for fruit in fruits:
    print(fruit)
# Output:
# apple
# banana
# orange
```

### For Loop with Range

```python
# Range from 0 to 4
for i in range(5):
    print(i)
# Output: 0, 1, 2, 3, 4

# Range from 1 to 5
for i in range(1, 6):
    print(i)
# Output: 1, 2, 3, 4, 5

# Range with step
for i in range(0, 10, 2):
    print(i)
# Output: 0, 2, 4, 6, 8
```

### For Loop with Index

```python
fruits = ["apple", "banana", "orange"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
# Output:
# 0: apple
# 1: banana
# 2: orange
```

### Nested For Loops

```python
for i in range(3):
    for j in range(3):
        print(f"({i}, {j})")
```

## While Loops

While loops repeat as long as a condition is true.

### Basic While Loop

```python
count = 0

while count < 5:
    print(count)
    count += 1
# Output: 0, 1, 2, 3, 4
```

### While with User Input

```python
name = ""

while name == "":
    name = input("Enter your name: ")

print(f"Hello, {name}!")
```

### Infinite Loop (with break)

```python
while True:
    user_input = input("Enter 'quit' to exit: ")
    if user_input == "quit":
        break
    print(f"You entered: {user_input}")
```

## Break and Continue

### Break - Exit Loop

```python
for i in range(10):
    if i == 5:
        break  # Exit loop
    print(i)
# Output: 0, 1, 2, 3, 4
```

### Continue - Skip Iteration

```python
for i in range(10):
    if i % 2 == 0:
        continue  # Skip even numbers
    print(i)
# Output: 1, 3, 5, 7, 9
```

## Else with Loops

Else runs when loop completes normally (not broken):

```python
for i in range(5):
    print(i)
else:
    print("Loop completed!")
# Output: 0, 1, 2, 3, 4, Loop completed!

for i in range(5):
    if i == 3:
        break
    print(i)
else:
    print("Loop completed!")  # Won't print (loop was broken)
```

## Pass Statement

Pass does nothing - useful as placeholder:

```python
if age >= 18:
    pass  # TODO: Add code later
else:
    print("Too young")
```

## Match-Case (Python 3.10+)

Like switch statements in other languages:

```python
day = "Monday"

match day:
    case "Monday":
        print("Start of week")
    case "Friday":
        print("Weekend coming!")
    case "Saturday" | "Sunday":
        print("Weekend!")
    case _:
        print("Regular day")
```

## Visual Explanation: Control Flow

Here's how control flow works:

```
If Statement Flow:
┌──────────────┐
│ Check        │
│ Condition    │
└──────┬───────┘
       │
   ┌───┴───┐
   │       │
True?    False?
   │       │
   ▼       ▼
Execute  Skip
Code     Code

Loop Flow:
┌──────────────┐
│ Start Loop   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Check        │
│ Condition    │
└──────┬───────┘
       │
   ┌───┴───┐
   │       │
True?    False?
   │       │
   ▼       ▼
Execute  Exit
Code     Loop
   │
   └───► Repeat
```

## Frequently Asked Questions (FAQ)

### Q1: What's the difference between == and =?

**A:** 
- **=** - Assignment (assigns value)
- **==** - Comparison (checks if equal)

```python
x = 5      # Assign 5 to x
x == 5     # Check if x equals 5 (returns True)
```

### Q2: Can I use else with if?

**A:** Yes! Else runs when if condition is false:

```python
if condition:
    # Do this
else:
    # Do that
```

### Q3: What's the difference between for and while?

**A:** 
- **for** - Iterate over sequence (know how many times)
- **while** - Repeat while condition true (might not know how many times)

### Q4: How do I loop backwards?

**A:** Use reversed() or negative step:

```python
for i in range(5, 0, -1):
    print(i)  # 5, 4, 3, 2, 1

for item in reversed([1, 2, 3]):
    print(item)  # 3, 2, 1
```

### Q5: What's the difference between break and continue?

**A:** 
- **break** - Exit loop completely
- **continue** - Skip current iteration, continue loop

### Q6: Can I have multiple conditions in if?

**A:** Yes! Use `and`, `or`, `not`:

```python
if age >= 18 and has_license:
    # Both must be true
```

### Q7: What's a nested loop?

**A:** A loop inside another loop:

```python
for i in range(3):
    for j in range(3):
        print(i, j)
```

### Q8: How do I exit a loop early?

**A:** Use `break`:

```python
for i in range(10):
    if i == 5:
        break  # Exit at 5
```

### Q9: What's pass used for?

**A:** Placeholder when you need syntax but no action:

```python
if condition:
    pass  # Will add code later
```

### Q10: Can I use else with for/while?

**A:** Yes! Else runs when loop completes normally (not broken):

```python
for i in range(5):
    print(i)
else:
    print("Done!")  # Runs after loop
```

---

## Next Steps

Now that you understand control flow, here's what to learn next:

- **Next:** Learn about [Python Functions](/python/python-functions) - Use control flow in functions
- Explore [Python Data Structures](/python/python-data-structures) - Loop through lists and dictionaries
- Understand [Python Classes](/python/python-classes) - Object-oriented programming
- Master [Python File Handling](/python/python-files) - Read and write files

Control flow is essential in Python. Practice writing if statements and loops to get comfortable!
