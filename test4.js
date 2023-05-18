const swap = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

const bubbleSort = array => {
  for (let i = 0; i < array.length; i++) {
    for (let h = 0; h < array.length; h++) {
      if (array[i] < array[h]) swap(array, h, i);
    }
  }
  return array;
};

const selectionSort = array => {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[minIndex] > array[j]) minIndex = j;
    }
    if (minIndex !== i) swap(array, minIndex, i);
  }
  return array;
};

const insertionSort = array => {
  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    let j = i - 1;

    while (j > -1 && current < array[j]) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = current;
  }
  return array;
};

const merge = (array1, array2) => {
  let i = 0;
  let j = 0;
  let res = [];

  while (i < array1.length && j < array2.length) {
    if (array1[i] < array2[j]) {
      res.push(array1[i]);
      i++;
    } else {
      res.push(array2[j]);
      j++;
    }
  }

  while (i < array1.length) {
    res.push(array1[i]);
    i++;
  }
  while (j < array2.length) {
    res.push(array2[j]);
    j++;
  }

  return res;
};

const mergeSort = array => {
  if (array.length === 1) return array;
  const middleIndex = Math.floor(array.length / 2);
  const leftSide = array.slice(0, middleIndex);
  const rightSide = array.slice(middleIndex);
  return merge(mergeSort(leftSide), mergeSort(rightSide));
};

const pivot = (array, pivotIndex = 0, endIndex = array.length - 1) => {
  let swapIndex = pivotIndex;

  for (let i = pivotIndex; i <= endIndex; i++) {
    if (array[pivotIndex] > array[i]) {
      swapIndex++;
      swap(array, swapIndex, i);
    }
  }
  swap(array, pivotIndex, swapIndex);
  return swapIndex;
};

const quickSort = (array, left = 0, right = array.length - 1) => {
  if (left < right) {
    const pivotIndex = pivot(array, left, right);
    quickSort(array, left, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, right);
  }
  return array;
};

const power = (num, pow) => {
  if (pow === 0) return 1;
  if (pow === 1) return num;

  return num * power(num, pow - 1);
};

const factorial = num => {
  if (num === 1) return num;
  return num * factorial(num - 1);
};

const sumToNumber = num => {
  if (num === 1) return num;

  return num + sumToNumber(num - 1);
};

const fibonacci = num => {
  if (num === 2) return 1;
  if (num < 2) return num;

  return fibonacci(num - 1) + fibonacci(num - 2);
};

const fibonacci2 = num => {
  let temp = 0;
  let num1 = 0;
  let num2 = 1;

  for (let i = 1; i < num; i++) {
    temp = num1 + num2;
    num1 = num2;
    num2 = temp;
  }
  return num2;
};

Array.prototype.myFilter = function (callback, thisArg) {
  const res = [];
  const array = this;

  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    if (!current) continue;

    const result = callback.call(thisArg, current, i, array);
    if (!result) continue;
    res.push(current);
  }
  return res;
};

Array.prototype.myMap = function (callback, thisArg) {
  const array = this;
  const res = [];

  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    if (!current) {
      res.push(current);
      continue;
    }

    const result = callback.call(thisArg, current, i, array);
    res.push(result);
  }

  return res;
};

Array.prototype.myReduce = function (callback, initialValue, thisArg) {
  const array = this;
  if (!initialValue && !array.length) return "no data you dumbass";

  let acc = initialValue || array[0];
  for (let i = initialValue ? 0 : 1; i < array.length; i++) {
    const element = array[i];
    if (!element) continue;
    acc = callback.call(thisArg, acc, element, i, array);
  }
  return acc;
};

const curry = function (callback) {
  const context = this;

  return function curried(...args) {
    if (args.length >= callback.length) {
      return callback.apply(context, args);
    } else {
      return function (...args2) {
        return curried.apply(context, [...args, ...args2]);
      };
    }
  };
};

Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const myFunc = this;

  return function (...args) {
    return myFunc.apply(thisArg, [...boundArgs, ...args]);
  };
};

const once = function (callback) {
  let canBeCalled = true;
  let result;

  return function (...args) {
    if (!canBeCalled) return result;
    result = callback.apply(this, args);
    canBeCalled = false;
    return result;
  };
};

function sum(num1) {
  return function (num2) {
    return num2 === undefined ? num1 : sum(num1 + num2);
  };
}

const debounce = function (callback, time = 100) {
  let timerId = null;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      timerId = null;
      return callback.apply(this, args);
    }, time);
  };
};

const testArr = [2, 23, 1, 0, 55, 424, 11, 5, 3, 80];
console.log(bubbleSort([...testArr]));
console.log(selectionSort([...testArr]));
console.log(insertionSort([...testArr]));
console.log(merge([1, 3, 5, 7, 9, 12], [2, 4, 6, 8, 11]));
console.log(mergeSort([...testArr]));
console.log(pivot([...testArr])); //2
console.log(quickSort([...testArr]));
console.log(power(2, 5)); //32
console.log(factorial(5)); //120
console.log(sumToNumber(5)); //15
console.log(fibonacci(9)); //34
console.log(fibonacci2(9)); //34
console.log([1, 2, 3, 4, 5, 6, 22].myFilter(el => el >= 4)); //[4,5,6,22]
console.log([1, 2, 3, 4, 5, 6, 22].myMap(el => el + 1)); //[2,3,4,5,6,7,23]
console.log([1, 2, 3, 4, 5, 6, 22].myReduce((prev, curr) => prev + curr, 0)); //43
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); //6
console.log(curriedSum(1, 2)(3)); //6
console.log(curriedSum(1, 2, 3)); //6
const person = {
  name: "John",
  greeting(prefix, message) {
    return `${prefix} ${this.name}, ${message}`;
  }
};
const greeting = person.greeting.myBind(person, "Mr.");
console.log(greeting("good morning!")); // 'Mr. John, good morning!'
let onceCounter = 0;
const onced = once(() => ++onceCounter);
const onced1 = onced();
const onced2 = onced();
console.log(onceCounter); //1
console.log(onced1 === onced2); //true
const addTwo = sum(2);
console.log(addTwo(4)()); //6
console.log(addTwo(3)(4)()); //9
let debounceCounter = 0;
const increment = debounce(() => {
  debounceCounter++;
}, 50);
console.log(debounceCounter); // 0
increment();
increment();
console.log(debounceCounter); // still 0
setTimeout(() => console.log(debounceCounter), 50); //1
