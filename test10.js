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
    if (arr[i] < arr[pivotIndex]) {
      swapIndex++;
      swap(arr, i, swapIndex);
    }
  }
  swap(arr, swapIndex, pivotIndex);
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

const curry = function (callback) {
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

Function.prototype.myBind = function (obj, ...boundArgs) {
  const thisArg = this;
  return function (...args) {
    return thisArg.apply(obj, [...boundArgs, ...args]);
  };
};

const once = function (callback) {
  let canBeCalled = true;
  let res;

  return function (...args) {
    if (!canBeCalled) return res;

    res = callback.apply(this, args);
    canBeCalled = false;
    return res;
  };
};

const sumNum = function (num1) {
  return function (num2) {
    if (!!num2) {
      return sumNum(num1 + num2);
    } else {
      return num1;
    }
  };
};

const flatten = function (arr) {
  while (arr.some(Array.isArray)) {
    arr = [].concat(...arr);
  }
  return arr;
};

const flatten2 = function (arr) {
  return arr.flat(Infinity);
};

const debounce = function (callback, time = 100) {
  let timerId;

  return function (...args) {
    let context = this;

    clearTimeout(timerId);
    timerId = setTimeout(function () {
      timerId = null;
      return callback.apply(context, args);
    }, time);
  };
};

const throttle = function (callback, time = 100) {
  let canBeCalled = true;

  return function (...args) {
    if (!canBeCalled) return;
    canBeCalled = false;
    setTimeout(function () {
      canBeCalled = true;
    }, time);
    return callback.apply(this, args);
  };
};

const testArr = [2, 23, 1, 0, 55, 424, 11, 5, 3, 80];
console.log(insertionSort([...testArr]));
console.log(pivot([...testArr])); //2
console.log(quickSort([...testArr]));
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
console.log(flatten2([[[[[1], 2], 3], 4], 5])); // [1, 2, 3, 4, 5]
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

console.log(arguments);
