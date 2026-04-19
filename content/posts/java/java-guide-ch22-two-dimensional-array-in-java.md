---
title: "Chapter 22: Two-Dimensional Array in Java — Matrices and Jagged Arrays"
description: "Learn 2D Java arrays: rows and columns, rectangular matrices, jagged arrays where row lengths differ, nested loops, and common indexing mistakes."
category: "Java"
tags:
  - Java 2D array
  - Java two dimensional array
  - Java jagged array
  - Java matrix loop
  - Java nested array
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 22
---

# Chapter 22: Two-Dimensional Array in Java

This chapter is **only** about **two-dimensional** arrays: `type[][]` — an array whose elements are themselves **arrays** (usually of the same length, but not required). **1D** depth was Chapter 21.

---

## 1. Topic title

**2D arrays: `matrix[row][col]`, rectangular vs jagged, and nested loops**

---

## 2. What it means

Declaration shape:

```java
int[][] grid = new int[3][4];
```

Think **3 rows**, **4 columns** if you like that mental model—Java does not truly have “rows,” it has an **array of 3 references**, each pointing to an `int[4]`.

**Jagged** (ragged) array: row lengths differ.

```java
int[][] jagged = new int[3][];
jagged[0] = new int[2];
jagged[1] = new int[5];
jagged[2] = new int[1];
```

---

## 3. Why it is used

**Grids:** game boards, spreadsheets in memory, pixels in a small buffer.

**Tables:** each row is one record; each column is one field—until you switch to objects or databases, a 2D array is a teaching-friendly model.

---

## 4. Real-world example

**Seating chart:** rows = seat rows in a theater, columns = seat numbers in that row. `boolean[][] taken` marks occupied seats.

---

## 5. Java code example

```java
import java.util.Arrays;

public class TwoDimensionalArrayDemo {
    public static void main(String[] args) {
        int[][] table = {
            {1, 2, 3},
            {4, 5, 6},
        };

        System.out.println("rows: " + table.length);
        System.out.println("cols row 0: " + table[0].length);

        for (int r = 0; r < table.length; r++) {
            for (int c = 0; c < table[r].length; c++) {
                System.out.print(table[r][c] + " ");
            }
            System.out.println();
        }

        int[][] jagged = new int[2][];
        jagged[0] = new int[] {10, 20};
        jagged[1] = new int[] {1, 2, 3, 4};

        for (int r = 0; r < jagged.length; r++) {
            System.out.println("row " + r + ": " + Arrays.toString(jagged[r]));
        }
    }
}
```

---

## 6. Explanation of code

- `table.length` is **number of rows** (number of inner array references).
- `table[r].length` is **length of row `r`**—for rectangular `new int[3][4]`, all rows share the same length; for **jagged**, always use **`table[r].length`** in the inner loop.

Initializer `{{1,2,3},{4,5,6}}` builds a rectangular 2×3 structure.

---

## 7. Common mistakes

**Assuming every row has the same length** on a jagged array—`table[1][4]` can throw if row 1 is shorter.

**Using `table[0].length` for all rows** after manual edits—unsafe if ragged.

**Off-by-one on both dimensions** — double the chance to be wrong; trace `r` and `c` on paper.

---

## 8. Best practices

**Always loop inner length with `matrix[r].length`** unless you **prove** rectangular.

**Consider a small class** instead of `Object[][]` for heterogeneous tables—readability wins as projects grow.

**Use `deepToString` for debug** of 2D arrays: `Arrays.deepToString(matrix)`.

---

## 9. Small practice task

Create a **3×3** `int` matrix initialized to zero. Set the **main diagonal** (`[0][0]`, `[1][1]`, `[2][2]`) to `1` (identity-ish pattern). Print with nested loops. Then convert to print using **`Arrays.deepToString`** once to compare output style.

---

## Beginner tip

Say “array of arrays” out loud. If you picture a rectangle, remember **jagged** arrays break that picture on purpose.
