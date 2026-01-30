---
title: "Python Data Structures - Lists, Dictionaries, Tuples, Sets"
date: "2025-02-16"
description: "Learn about Python data structures including lists, dictionaries, tuples, and sets. Understand when to use each and how to work with them effectively."
category: "Python Basics"
tags: ["python", "data-structures", "lists", "dictionaries", "tuples", "sets"]
image: "/assets/images/python.jpg"
author: "Sushil Kumar"
---

# Python Data Structures - Lists, Dictionaries, Tuples, Sets

Python has several built-in data structures. Each one is perfect for different situations. Let's learn about lists, dictionaries, tuples, and sets!

## Lists

Lists are ordered collections of items. They're like arrays in other languages.

### Creating Lists

```python
# Empty list
my_list = []

# List with items
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = ["hello", 42, True, 3.14]
```

### Accessing Elements

```python
fruits = ["apple", "banana", "orange"]

print(fruits[0])   # "apple" (first element)
print(fruits[1])   # "banana" (second element)
print(fruits[-1])  # "orange" (last element)
print(fruits[-2])  # "banana" (second to last)
```

### Modifying Lists

```python
fruits = ["apple", "banana"]

# Add to end
fruits.append("orange")  # ["apple", "banana", "orange"]

# Add at specific position
fruits.insert(1, "grape")  # ["apple", "grape", "banana", "orange"]

# Remove item
fruits.remove("banana")  # ["apple", "grape", "orange"]

# Remove by index
fruits.pop(0)  # Removes first item

# Change item
fruits[0] = "mango"  # ["mango", "grape", "orange"]
```

### List Methods

```python
numbers = [3, 1, 4, 1, 5]

# Length
print(len(numbers))  # 5

# Count occurrences
print(numbers.count(1))  # 2

# Find index
print(numbers.index(4))  # 2

# Sort
numbers.sort()  # [1, 1, 3, 4, 5]

# Reverse
numbers.reverse()  # [5, 4, 3, 1, 1]

# Copy
new_numbers = numbers.copy()
```

### List Slicing

```python
numbers = [0, 1, 2, 3, 4, 5]

print(numbers[1:4])    # [1, 2, 3]
print(numbers[:3])     # [0, 1, 2] (start to index 3)
print(numbers[3:])     # [3, 4, 5] (index 3 to end)
print(numbers[::2])    # [0, 2, 4] (every 2nd item)
print(numbers[::-1])   # [5, 4, 3, 2, 1, 0] (reverse)
```

## Dictionaries

Dictionaries store key-value pairs. Like a real dictionary - you look up a word (key) to find its meaning (value).

### Creating Dictionaries

```python
# Empty dictionary
my_dict = {}

# Dictionary with items
person = {
    "name": "John",
    "age": 25,
    "city": "New York"
}
```

### Accessing Values

```python
person = {"name": "John", "age": 25}

print(person["name"])        # "John"
print(person.get("age"))     # 25
print(person.get("email", "N/A"))  # "N/A" (default if key doesn't exist)
```

### Modifying Dictionaries

```python
person = {"name": "John"}

# Add/Update
person["age"] = 25
person["city"] = "New York"

# Remove
del person["city"]
# or
person.pop("age")

# Get all keys
print(person.keys())    # dict_keys(['name'])

# Get all values
print(person.values())  # dict_values(['John'])

# Get all items
print(person.items())   # dict_items([('name', 'John')])
```

### Dictionary Methods

```python
person = {"name": "John", "age": 25}

# Check if key exists
if "name" in person:
    print("Name exists")

# Update dictionary
person.update({"city": "NY", "email": "john@example.com"})

# Clear dictionary
person.clear()

# Copy dictionary
new_person = person.copy()
```

## Tuples

Tuples are like lists, but immutable (can't be changed after creation).

### Creating Tuples

```python
# Empty tuple
my_tuple = ()

# Tuple with items
coordinates = (10, 20)
person = ("John", 25, "NY")

# Single item tuple (note the comma)
single = (5,)
```

### Using Tuples

```python
point = (10, 20)

print(point[0])   # 10
print(point[1])   # 20

# Unpacking
x, y = point
print(x)  # 10
print(y)  # 20

# Can't modify (immutable)
# point[0] = 5  # Error!
```

### When to Use Tuples

- When data shouldn't change
- As dictionary keys (lists can't be keys)
- Returning multiple values from functions

```python
def get_name_age():
    return "John", 25

name, age = get_name_age()
```

## Sets

Sets are unordered collections of unique items. No duplicates allowed!

### Creating Sets

```python
# Empty set
my_set = set()  # Note: {} creates empty dict, not set!

# Set with items
fruits = {"apple", "banana", "orange"}
numbers = {1, 2, 3, 4, 5}
```

### Set Operations

```python
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

# Union (all items from both)
print(set1 | set2)        # {1, 2, 3, 4, 5, 6}
print(set1.union(set2))  # Same

# Intersection (common items)
print(set1 & set2)              # {3, 4}
print(set1.intersection(set2))   # Same

# Difference (items in set1 but not set2)
print(set1 - set2)            # {1, 2}
print(set1.difference(set2))  # Same

# Add item
set1.add(5)

# Remove item
set1.remove(3)
set1.discard(3)  # Won't error if item doesn't exist
```

### Set Methods

```python
fruits = {"apple", "banana"}

# Add
fruits.add("orange")

# Remove
fruits.remove("apple")

# Check membership
if "banana" in fruits:
    print("Found!")

# Length
print(len(fruits))

# Clear
fruits.clear()
```

## Visual Explanation: Data Structures Comparison

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│      LISTS      │   DICTIONARIES  │     TUPLES      │      SETS       │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Ordered         │ Key-Value       │ Ordered         │ Unordered       │
│ Mutable         │ Mutable         │ Immutable       │ Mutable         │
│ Allows          │ Unique keys     │ Allows          │ Unique values   │
│ duplicates      │                 │ duplicates      │ only            │
│                 │                 │                 │                 │
│ [1, 2, 3]       │ {"key": "val"} │ (1, 2, 3)       │ {1, 2, 3}       │
│                 │                 │                 │                 │
│ Use for:        │ Use for:        │ Use for:        │ Use for:        │
│ - Collections   │ - Key-value     │ - Fixed data    │ - Unique items  │
│ - When order    │   pairs         │ - Coordinates   │ - Set           │
│   matters       │ - Lookups       │ - Return values│   operations    │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

## List Comprehensions

Create lists in one line:

```python
# Traditional way
squares = []
for x in range(5):
    squares.append(x ** 2)

# List comprehension (shorter!)
squares = [x ** 2 for x in range(5)]
# [0, 1, 4, 9, 16]

# With condition
evens = [x for x in range(10) if x % 2 == 0]
# [0, 2, 4, 6, 8]
```

## Dictionary Comprehensions

```python
# Create dictionary from list
numbers = [1, 2, 3, 4]
squared = {x: x ** 2 for x in numbers}
# {1: 1, 2: 4, 3: 9, 4: 16}
```

## Frequently Asked Questions (FAQ)

### Q1: What's the difference between list and tuple?

**A:** 
- **List** - Mutable (can change)
- **Tuple** - Immutable (can't change)

Use lists when data might change, tuples when it shouldn't.

### Q2: Can I use lists as dictionary keys?

**A:** No! Lists are mutable, so they can't be keys. Use tuples instead:

```python
# Wrong
# {[1, 2]: "value"}  # Error!

# Right
{(1, 2): "value"}  # Works!
```

### Q3: What's the difference between list and set?

**A:** 
- **List** - Ordered, allows duplicates
- **Set** - Unordered, no duplicates

Use sets when you need unique items.

### Q4: How do I remove duplicates from a list?

**A:** Convert to set and back:

```python
numbers = [1, 2, 2, 3, 3, 3]
unique = list(set(numbers))  # [1, 2, 3]
```

### Q5: Can dictionaries have lists as values?

**A:** Yes!

```python
person = {
    "name": "John",
    "hobbies": ["reading", "coding", "gaming"]
}
```

### Q6: What's the difference between .remove() and .pop()?

**A:** 
- **remove()** - Removes by value
- **pop()** - Removes by index and returns value

```python
fruits = ["apple", "banana"]
fruits.remove("banana")  # Remove by value
item = fruits.pop(0)     # Remove by index, get value
```

### Q7: Can I have nested data structures?

**A:** Yes!

```python
# List of dictionaries
people = [
    {"name": "John", "age": 25},
    {"name": "Jane", "age": 30}
]

# Dictionary of lists
data = {
    "names": ["John", "Jane"],
    "ages": [25, 30]
}
```

### Q8: What's list comprehension?

**A:** A concise way to create lists:

```python
# Instead of:
squares = []
for x in range(5):
    squares.append(x ** 2)

# Use:
squares = [x ** 2 for x in range(5)]
```

### Q9: How do I check if an item exists?

**A:** 
- **Lists/Tuples:** `if item in my_list:`
- **Dictionaries:** `if key in my_dict:`
- **Sets:** `if item in my_set:`

### Q10: When should I use each data structure?

**A:** 
- **List** - Ordered collection that might change
- **Dictionary** - Key-value pairs, lookups
- **Tuple** - Fixed data, coordinates, return values
- **Set** - Unique items, set operations

---

## Next Steps

Now that you understand data structures, here's what to learn next:

- **Next:** Learn about [Python Control Flow](/python/python-control-flow) - If statements, loops, and more
- Explore [Python Functions](/python/python-functions) - Work with functions and data structures
- Understand [Python Classes](/python/python-classes) - Object-oriented programming
- Master [Python File Handling](/python/python-files) - Read and write files

Data structures are fundamental in Python. Practice using each one to get comfortable!
