---
title: "Chapter 9: User Input in Java — Scanner, Numbers, Strings, and nextLine Pitfalls"
description: "Read keyboard input in Java with Scanner: strings, ints, doubles, the nextInt-then-nextLine gotcha, locale issues, and when to stop using Scanner in real apps."
category: "Java"
tags:
  - Java Scanner
  - Java user input
  - Java nextLine nextInt
  - read string Java console
  - Java Scanner tutorial
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 9
---

# Chapter 9: User Input in Java

This chapter is **only** about **reading input from the user** in small learning programs—usually the **keyboard** via `System.in`. Real servers read from HTTP bodies, not `Scanner`, but the same ideas about **parsing text into types** show up everywhere.

---

## 1. Topic title

**User input in Java: `Scanner`, reading strings and numbers, and the famous `nextLine` issue after `nextInt`**

---

## 2. What it means

`java.util.Scanner` is a class that can **tokenize** an input stream. You attach it to `System.in` (standard input). Then you call methods like:

- `nextLine()` — reads the rest of the current line as a `String` (consumes the newline).
- `next()` — reads the next token (often one word), skips leading whitespace.
- `nextInt()`, `nextDouble()`, … — reads the next token and converts it.

If conversion fails, `Scanner` throws **`InputMismatchException`**. If you want friendlier behavior, you catch that and ask again (small exercise pattern).

---

## 3. Why it is used

Beginner programs need **interaction**: grades, menus, quiz answers. `Scanner` is the standard teaching tool because it is in the JDK—no extra libraries.

Professionally, console `Scanner` is rare in services. You still practice **validation** and **parsing** here; those skills transfer to web forms and file parsers.

---

## 4. Real-world example

A school lab program asks: “Enter student name,” then “Enter marks out of 100.” You read a line, then an `int`, validate range, store in variables. A real school system would use a web form, but the **parse/validate/store** rhythm is the same.

---

## 5. Java code example

```java
import java.util.Scanner;

public class InputDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String name = scanner.nextLine();

        System.out.print("Enter your age: ");
        int age = scanner.nextInt();

        scanner.nextLine();

        System.out.print("Enter your city: ");
        String city = scanner.nextLine();

        System.out.println("Hello, " + name + " (" + age + ") from " + city);

        scanner.close();
    }
}
```

**Sample session:**

```text
Enter your name: Priya
Enter your age: 21
Enter your city: Pune
Hello, Priya (21) from Pune
```

The extra `scanner.nextLine()` after `nextInt()` is explained below—it eats the newline left in the buffer.

---

## 6. Explanation of code

`new Scanner(System.in)` ties the helper to keyboard input.

`nextLine()` after the name reads the full line including spaces.

`nextInt()` reads only the number token. It **does not** consume the newline character you typed after the number. That newline stays in the buffer.

If you immediately call `nextLine()` for city **without** clearing that newline, `nextLine()` returns an **empty string** because it “sees” the pending end-of-line first.

**Fix patterns:**

- Call a bare `nextLine()` after `nextInt()`/`nextDouble()`/`next()` when you plan to read a full line next, **or**
- Use only `nextLine()` for everything and parse manually with `Integer.parseInt`, **or**
- Use `Scanner.useDelimiter` patterns—overkill early on.

`scanner.close()` also closes `System.in` in simple programs. In tiny homework apps that is usually fine. In larger apps that might still need `System.in`, closing can surprise you—know what you are closing.

---

## 7. Common mistakes

**The empty `city` after `nextInt`** — the classic beginner bug described above.

**Not handling bad input** — user types `twenty` for age → crash unless you catch exceptions or validate.

**Locale surprises** with `nextDouble()` — some locales expect `3,14` instead of `3.14`. Teachers often ignore this until it bites on a European laptop.

**Using `==` on strings read from input** — always `.equals` for value comparison.

**Creating a new `Scanner` on `System.in` in every method** — awkward; one `Scanner` per program is enough for learning.

---

## 8. Best practices

**Trim input** when appropriate: `String name = scanner.nextLine().trim();` — reduces accidental spaces-only “names.”

**Validate ranges** after parsing: age `>= 0 && age <= 130` or whatever rule fits your exercise.

**Prefer `try-with-resources`** when you point `Scanner` at a **file** (later chapter). For `System.in`, many tutorials skip try-with-resources to keep the first example short.

**Learn `Integer.parseInt` early** — `String s = scanner.nextLine(); int n = Integer.parseInt(s);` gives you one code path for “whole line is a number” and clearer error handling later.

---

## 9. Small practice task

Write a program that asks:

1. “Favorite programming language?” (read with `nextLine()`)
2. “Years of experience?” (read with `nextInt()`)
3. “What are you learning next?” (read with `nextLine()`)

Make the third question work **without** swallowing an empty line. Print all three answers on one line.

---

## Beginner tip

When input acts “random,” assume the **buffer** first. Print debug lines like `System.out.println("DEBUG: '" + city + "'");` to see empty strings you did not expect.
