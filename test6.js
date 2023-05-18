const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const bubbleSort = arr => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] < arr[j]) swap(arr, j, i);
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
    const element = arr[i];
    let j = i - 1;

    while (j > -1 && element < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = element;
  }
  return arr;
};

const merge = (arr1, arr2) => {
  let i = 0;
  let j = 0;
  let res = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i]);
      i++;
    } else {
      res.push(arr2[j]);
      j++;
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

  for (let i = pivotIndex; i <= endIndex; i++) {
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
  if (num < 2) return num;

  return num * factorial(num - 1);
};

const sumToNumber = num => {
  if (num <= 1) return num;

  return num + sumToNumber(num - 1);
};

const fibonacci = num => {
  if (num < 2) return num;
  if (num === 2) return 1;

  return fibonacci(num - 2) + fibonacci(num - 1);
};

const fibonacci2 = num => {
  let temp = 0;
  let num1 = 0;
  let num2 = 1;

  for (let i = 2; i <= num; i++) {
    temp = num1 + num2;
    num1 = num2;
    num2 = temp;
  }
  return num2;
};

Array.prototype.myFilter = function (callback, thisArg) {
  const arr = this;
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (!element) continue;

    const res = callback.call(thisArg, element, i, arr);

    if (res) result.push(element);
  }
  return result;
};

Array.prototype.myMap = function (callback, thisArg) {
  let result = [];
  const arr = this;

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (!element) {
      result.push(element);
      continue;
    }

    const res = callback.call(thisArg, element, i, arr);
    result.push(res);
  }
  return result;
};

Array.prototype.myReduce = function (callback, initialVal, thisArg) {
  const arr = this;
  if (!initialVal && !arr.length) return "no data";

  let acc = initialVal || arr[0];

  for (let i = initialVal ? 0 : 1; i < arr.length; i++) {
    const element = arr[i];
    if (!element) continue;

    acc = callback.call(thisArg, acc, element, i, arr);
  }
  return acc;
};

const curry = function (callback) {
  return function curried(...args) {
    if (args.length >= callback.length) {
      return callback.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, [...args, ...args2]);
      };
    }
  };
};

Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const orgFunc = this;

  return function (...args) {
    return orgFunc.apply(thisArg, [...boundArgs, ...args]);
  };
};

const once = callback => {
  let canBeCalled = true;
  const context = this;
  let res = null;

  return function (...args) {
    if (!canBeCalled) return res;

    res = callback.apply(context, args);
    canBeCalled = false;
    return res;
  };
};

const sumNum = function (num1) {
  return function (num2) {
    return num2 === undefined ? num1 : sumNum(num1 + num2);
  };
};

function flatten(value) {
  while (value.some(Array.isArray)) {
    value = [].concat(...value);
  }
  return value;
}

const debounce = (callback, timer = 100) => {
  let timerId = null;
  const context = this;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(function () {
      timerId = null;
      callback.apply(context, args);
    }, timer);
  };
};

function throttle(callback, wait = 0) {
  const context = this;
  let canBeCalled = true;

  return function (...args) {
    if (!canBeCalled) return;
    canBeCalled = false;

    setTimeout(function () {
      canBeCalled = true;
    }, wait);

    return callback.apply(context, args);
  };
}

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
const addTwo = sumNum(2);
console.log(addTwo(4)()); //6
console.log(addTwo(3)(4)()); //9
console.log(flatten([[[[[1], 2], 3], 4], 5])); // [1, 2, 3, 4, 5]
let debounceCounter = 0;
const increment = debounce(() => {
  debounceCounter++;
}, 50);
console.log(`debounce: ${debounceCounter}`); // 0
increment();
increment();
console.log(`debounce: ${debounceCounter}`); // still 0
setTimeout(() => console.log(`debounce: ${debounceCounter}`), 50); //1

let i = 0;
const increment2 = throttle(() => {
  i++;
}, 50);

console.log(`throttle: ${i}`); //0
increment2();
console.log(`throttle: ${i}`); //1
increment2();
console.log(`throttle: ${i}`); //1
