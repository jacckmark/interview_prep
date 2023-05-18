const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const bubbleSort = arr => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] < arr[j]) swap(arr, i, j);
    }
  }
  return arr;
};

const selectionSort = arr => {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) minIndex = j;
    }
    if (minIndex !== i) swap(arr, minIndex, i);
  }
  return arr;
};

const insertionSort = arr => {
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;

    while (j > -1 && current < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = current;
  }
  return arr;
};

const merge = (arr1, arr2) => {
  let i = 0;
  let j = 0;
  let res = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] > arr2[j]) {
      res.push(arr2[j]);
      j++;
    } else {
      res.push(arr1[i]);
      i++;
    }
  }

  while (i < arr1.length) {
    res.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    res.push(arr2[j]);
    j++;
  }

  return res;
};

const mergeSort = arr => {
  if (arr.length === 1) return arr;

  const middleIndex = Math.floor(arr.length / 2);
  const leftSide = arr.slice(0, middleIndex);
  const rightSide = arr.slice(middleIndex);
  return merge(mergeSort(leftSide), mergeSort(rightSide));
};

const pivot = (arr, pivotIndex = 0, endIndex = arr.length - 1) => {
  let swapIndex = pivotIndex;

  for (let i = pivotIndex + 1; i <= endIndex; i++) {
    if (arr[pivotIndex] > arr[i]) {
      swapIndex++;
      swap(arr, swapIndex, i);
    }
  }
  swap(arr, pivotIndex, swapIndex);

  return swapIndex;
};

const quickSort = (arr, left = 0, right = arr.length - 1) => {
  if (left < right) {
    const pivotIndex = pivot(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
};

const power = (num, pow) => {
  if (pow === 0) return 1;
  if (pow === 1) return num;

  return num * power(num, pow - 1);
};

const factorial = num => {
  if (num <= 1) return num;

  return num * factorial(num - 1);
};

const sumToNumber = num => {
  if (num < 1) return num;
  return num + sumToNumber(num - 1);
};

const fibonacci = num => {
  if (num < 2) return num;
  if (num === 2) return 1;

  return fibonacci(num - 1) + fibonacci(num - 2);
};

Array.prototype.myFilter = function (callback, thisArg) {
  const result = [];
  const array = this;

  for (let i = 0; i < array.length; i++) {
    const current = array[i];

    if (!current) continue;
    const res = callback.call(thisArg, current, i, array);

    if (res) result.push(current);
  }

  return result;
};

Array.prototype.myMap = function (callback, thisArg) {
  const array = this;
  const result = [];

  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    if (!current) {
      result.push(current);
      continue;
    }
    const res = callback.call(thisArg, current, i, array);
    result.push(res);
  }
  return result;
};

Array.prototype.myReduce = function (callback, initialVal, thisArg) {
  const array = this;
  if (!initialVal && !array.length) return "error no suitable data";

  let acc = initialVal || array[0];

  for (let i = initialVal ? 0 : 1; i < array.length; i++) {
    const current = array[i];
    if (!current) continue;
    acc = callback.call(thisArg, acc, current, i, array);
  }

  return acc;
};

const curry = callback => {
  return function curried(...args) {
    if (callback.length <= args.length) {
      return callback.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, [...args, ...args2]);
      };
    }
  };
};

Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const myMethod = this;

  return function (...args) {
    return myMethod.apply(thisArg, [...boundArgs, ...args]);
  };
};

const once = function (callback) {
  let canBeCalled = true;
  let result;
  let context = this;

  return function (...args) {
    if (!canBeCalled) return result;
    result = callback.apply(context, args);
    canBeCalled = false;
    return result;
  };
};

const debounce = function (callback, time = 100) {
  const context = this;
  let timerId = null;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(function () {
      timerId = null;

      return callback.apply(context, args);
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
let debounceCounter = 0;
const increment = debounce(() => {
  debounceCounter++;
}, 50);
console.log(debounceCounter); // 0
increment();
increment();
console.log(debounceCounter); // still 0
setTimeout(() => console.log(debounceCounter), 50); //1
