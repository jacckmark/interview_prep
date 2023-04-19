# BIG O

1. Big O - a measure how efficient your code is. Helps you decide which data structure or algorithm to use. When we are measuring the Big O we are always measuring the worst case.
2. Time complexity - measured in number of operations not the "time the code runs".
3. Space complexity - measured in a number of memory the code uses.

4. Big O can have 3 types of cases:

- best case(Ω omega letter) - when looking for element in array, which is 7 elements long, the first element you checked is the searched element,
- average case(Θ theta letter) - when looking for element in array, which is 7 elements long, the fourth element you checked is the searched element,
- worst case(Ο omicron letter) - when looking for element in array, which is 7 elements long, the seventh element you checked is the searched element,

5. O notation - shows us the Big O notation. Written as O(n) or O($n^2$) or similar.

6. There are 4 most popular O notations that we can meet:

- O(1) - sometimes called "constant". When there is only one operation needed to reach the goal,
- O($log{n}$) - sometimes called "divide and conquer". Amount of operations correlates to number of items or passed parameter. Is the second most performant O,
- O(n) - sometimes called "proportional". When the amount of operations is dependent either upon the parameter passed to function, or array length, or something different,
- O($n^2$) - sometimes called "loop within loop". When the amount of operations is dependent upon not only parameter passed into the function (or array length), but also number of nested loops,

7. O(n) example:

```js
function logItems(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}
```

8. Droping constants - this means that when we are representing the big O for code where there would be for example two loops independently looping over an array, we would not say that this code is O(2n) but that it is O(n).

9. O(2n) example:

```js
function logItems(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }

  for (let j = 0; j < n; j++) {
    console.log(j);
  }
}
```

Even though this code has two loop we would drop the constants and present its big O notation just as O(n).

10. O($n^2$) example:

```js
function logItems(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i, j);
    }
  }
}
```

Solution that has O($n^2$) complexity is always least attractive one than O(n).

11. O($n^2$) example:

```js
function logItems(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let z = 0; z < n; z++) {
        console.log(i, j, z);
      }
    }
  }
}
```

Even though this code has 3 nested loops we would still categorize it as O($n^2$). This is another example of dropping constants.

12. Dropping non-dominants - in this example O notation would be O($n^2$ + n) because the first for is $n^2$ and the second is n. We know however that the first argument of O notation would impact more our code, thus we are naming it the dominant term. The second one, called non-dominant one can be omitted because, it should not affect overall code complexity that much.

```js
function logItems(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i, j, z);
    }
  }

  for (let i = 0; i < n; i++) {
    console.log(i, j, z);
  }
}
```

13. O(1) - a lot of the times referred to as constant time. The amount of operations does not change as n parameter changes. Noting is more efficient than O(1).

14. O(1) example:

```js
function returnDoubleSum(n) {
  return n + n;
}
```

Here the n would not impact the code complexity because it does not matter if we will pass here 1 or 1mld as n parameter.

15. O(1) example:

```js
function returnDoubleSum(n) {
  return n + n + n;
}
```

Here this code would be written as O(1) even if there are actually 2 operations because of the simplifying.

16. O($log{n}$) - good example is looking for element in sorted array. The array we want to search has 8 elements with each containing an number from 1 to 8. We can find element 1 by using divide and conquer (divide elements in equal parts and check for element you are looking for until you will find your element). This would cause to make 3 operations to find element 1 so the complexity would be O($log{_2}{8}$) because $log{_2}{8}$=3. We would say that this example is O{$log{n}$}.

17. Different terms of input.

- In case of two inputs in our function we would want to simplify it into O(n), but this would be a mistake. The function below has O(a + b) complexity because we would run first for loop based on a and the second based on b. First loop would be O(a) and the second O(b) which would become O(a + b) when combined.

```js
function logItems(a, b) {
  for (let i = 0; i < a; i++) {
    console.log(i);
  }

  for (let j = 0; j < b; j++) {
    console.log(j);
  }
}
```

- Another example would be the two nested for loops with 2 inputs. We also cannot say about example below that this is O($n^2$) because the number of operations will depend upon a and b. So the complexity will be O(a * b).

```js
function logItems(a, b) {
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      console.log(i, j);
    }
  }
}
```

18. Ordering O from best to worst case scenario:

O(1) 🠢 O($log{n}$) 🠢 O(n) 🠢 O($n^2$)

For n equal 100 O(1) would be 1 and O($n^2$) would be 10000, so there is a big difference in complexity between the best and the worst one.
