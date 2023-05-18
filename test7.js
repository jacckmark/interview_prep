const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
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
console.log(insertionSort([...testArr]));
console.log(pivot([...testArr])); //2
console.log(quickSort([...testArr]));
console.log(power(2, 5)); //32
console.log(factorial(5)); //120
console.log(sumToNumber(5)); //15
console.log(fibonacci(9)); //34
console.log(fibonacci2(9)); //34
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
