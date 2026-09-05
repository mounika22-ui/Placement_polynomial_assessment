# Placement Drive Assessment – Polynomial Interpolation

## Overview

This project solves a polynomial interpolation problem using JavaScript (Node.js).

The input is provided in JSON format. Each root contains an `x` value as the JSON key and a `y` value represented in a specified numerical base.

The program converts the values into decimal form and calculates the constant term of the polynomial using Lagrange interpolation.

## Technologies Used

* JavaScript
* Node.js
* JSON
* BigInt
* Lagrange Interpolation

## Input

The input contains:

* `n` – Total number of points
* `k` – Minimum number of points required
* `base` – Numerical base of the value
* `value` – Encoded value of the point

## Algorithm

1. Read the input JSON files.
2. Extract `n` and `k`.
3. Convert each value from its given base to decimal using `BigInt`.
4. Select the required `k` points.
5. Apply Lagrange interpolation.
6. Calculate the polynomial value at `x = 0`.
7. Return the constant coefficient.

The constant coefficient is calculated using:

P(0) = Σ yi × Π((-xj) / (xi - xj))

## Test Cases

### Test Case 1

Output:

```text
Test Case 1 Answer: 3
```

### Test Case 2

Output:

```text
Test Case 2 Answer: -6290016743746469796
```

## How to Run

Make sure Node.js is installed.

Run:

```bash
node main.js
```

## Project Files

```text
placement-drive-assessment
│
├── main.js
├── testcase1.json
├── testcase2.json
└── README.md
```

## Output

```text
Test Case 1 Answer: 3
Test Case 2 Answer: -6290016743746469796
```
