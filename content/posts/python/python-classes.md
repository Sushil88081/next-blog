---
title: "Python Classes and Objects - Complete Guide"
date: "2025-02-18"
description: "Learn about Python classes and object-oriented programming. Understand how to create classes, objects, methods, inheritance, and more."
category: "Python Advanced"
tags: ["python", "classes", "oop", "object-oriented", "programming"]
image: "/assets/images/python.jpg"
author: "Sushil Kumar"
---

# Python Classes and Objects - Complete Guide

Classes let you create your own data types in Python. They're the foundation of object-oriented programming (OOP). Let's learn how to use them!

## What is a Class?

A class is a blueprint for creating objects. Think of it like a cookie cutter - the class is the cutter, objects are the cookies!

```python
class Dog:
    pass

# Create an object (instance)
my_dog = Dog()
```

## Creating a Simple Class

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old"

# Create objects
person1 = Person("John", 25)
person2 = Person("Jane", 30)

print(person1.introduce())  # Hi, I'm John and I'm 25 years old
print(person2.introduce())  # Hi, I'm Jane and I'm 30 years old
```

## The __init__ Method

`__init__` is called when an object is created. It initializes the object:

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        print("Person created!")
```

## Instance Variables

Variables that belong to each object:

```python
class Person:
    def __init__(self, name):
        self.name = name  # Instance variable
        self.age = 0      # Instance variable

person = Person("John")
person.age = 25  # Set instance variable
```

## Methods

Functions that belong to a class:

```python
class Calculator:
    def __init__(self):
        self.result = 0
    
    def add(self, value):
        self.result += value
        return self.result
    
    def subtract(self, value):
        self.result -= value
        return self.result

calc = Calculator()
print(calc.add(10))      # 10
print(calc.subtract(3))  # 7
```

## Class Variables

Variables shared by all instances:

```python
class Dog:
    species = "Canis familiaris"  # Class variable
    
    def __init__(self, name):
        self.name = name  # Instance variable

dog1 = Dog("Buddy")
dog2 = Dog("Max")

print(dog1.species)  # "Canis familiaris"
print(dog2.species)  # "Canis familiaris"
print(Dog.species)   # "Canis familiaris"
```

## Inheritance

Create new classes based on existing ones:

```python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

dog = Dog("Buddy")
cat = Cat("Whiskers")

print(dog.speak())  # Woof!
print(cat.speak())  # Meow!
```

## Method Overriding

Override parent class methods:

```python
class Animal:
    def make_sound(self):
        return "Some sound"

class Dog(Animal):
    def make_sound(self):
        return "Woof!"  # Overrides parent method
```

## Super() Function

Call parent class methods:

```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Call parent __init__
        self.breed = breed
```

## Encapsulation

Control access to variables and methods:

```python
class BankAccount:
    def __init__(self, balance):
        self._balance = balance  # Protected (convention)
        self.__pin = 1234        # Private (name mangling)
    
    def get_balance(self):
        return self._balance
    
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
```

## Properties

Use properties for getters and setters:

```python
class Person:
    def __init__(self, age):
        self._age = age
    
    @property
    def age(self):
        return self._age
    
    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Age cannot be negative")
        self._age = value

person = Person(25)
print(person.age)  # 25
person.age = 30    # Uses setter
```

## Class Methods and Static Methods

### Class Methods

```python
class Person:
    count = 0
    
    def __init__(self, name):
        self.name = name
        Person.count += 1
    
    @classmethod
    def get_count(cls):
        return cls.count

print(Person.get_count())  # 0
person1 = Person("John")
print(Person.get_count())  # 1
```

### Static Methods

```python
class Math:
    @staticmethod
    def add(a, b):
        return a + b

print(Math.add(5, 3))  # 8
```

## Special Methods (Magic Methods)

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f"Person({self.name}, {self.age})"
    
    def __repr__(self):
        return f"Person(name='{self.name}', age={self.age})"
    
    def __eq__(self, other):
        return self.name == other.name and self.age == other.age

person = Person("John", 25)
print(person)  # Uses __str__
print(repr(person))  # Uses __repr__
```

## Visual Explanation: Class Structure

Here's how classes work:

```
Class Definition:
┌─────────────────────────────┐
│ class Person:               │
│     def __init__(self, name)│
│         self.name = name    │
│                             │
│     def greet(self):        │
│         return "Hello"      │
└─────────────────────────────┘
         │
         │ Creates instances
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│Person1 │ │Person2 │
│name    │ │name    │
│greet() │ │greet() │
└────────┘ └────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: What's the difference between class and object?

**A:** 
- **Class** - Blueprint/template
- **Object** - Instance created from class

```python
class Person:  # Class
    pass

john = Person()  # Object (instance)
```

### Q2: What is self?

**A:** `self` refers to the current instance. It's like "this" in other languages. You must include it as the first parameter in methods.

### Q3: What's __init__?

**A:** `__init__` is a special method called when an object is created. It initializes the object:

```python
def __init__(self, name):
    self.name = name
```

### Q4: What's the difference between class and instance variables?

**A:** 
- **Class variable** - Shared by all instances
- **Instance variable** - Unique to each instance

### Q5: What is inheritance?

**A:** Creating a new class based on an existing class. The new class inherits all methods and variables from the parent:

```python
class Child(Parent):
    pass
```

### Q6: What's method overriding?

**A:** When a child class defines a method with the same name as the parent, it overrides (replaces) the parent's method.

### Q7: What's super()?

**A:** `super()` lets you call parent class methods:

```python
super().__init__(name)  # Call parent __init__
```

### Q8: What are private variables?

**A:** Variables starting with `__` are private (name mangling). Variables starting with `_` are protected (convention):

```python
self.__private = 10  # Private
self._protected = 20  # Protected
```

### Q9: What's the difference between @classmethod and @staticmethod?

**A:** 
- **@classmethod** - Receives class as first parameter
- **@staticmethod** - Doesn't receive class or instance

### Q10: What are magic methods?

**A:** Special methods with double underscores like `__init__`, `__str__`, `__eq__`. They define how objects behave:

```python
def __str__(self):  # Called by print()
    return "String representation"
```

---

## Next Steps

Now that you understand classes, here's what to learn next:

- **Next:** Learn about [Python Modules](/python/python-modules) - Organize your classes
- Explore [Python File Handling](/python/python-files) - Work with files
- Understand [Python Exception Handling](/python/python-exceptions) - Handle errors
- Master [Python Decorators](/python/python-decorators) - Advanced Python features

Classes are powerful in Python. Practice creating classes and objects to get comfortable!
