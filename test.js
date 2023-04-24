const swap = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

const bubbleSort = array => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] > array[j + 1]) swap(array, j, j + 1);
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
    if (i !== minIndex) swap(array, minIndex, i);
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

const merge = (arr1, arr2) => {
  let i = 0;
  let j = 0;
  const res = [];

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

const mergeSort = array => {
  if (array.length === 1) return array;
  const middleIndex = Math.floor(array.length / 2);
  const leftSide = array.slice(0, middleIndex);
  const rightSide = array.slice(middleIndex);

  return merge(mergeSort(leftSide), mergeSort(rightSide));
};

const pivot = (array, pivotIndex = 0, endIndex = array.length - 1) => {
  let swapIndex = pivotIndex;

  for (let i = pivotIndex + 1; i <= endIndex; i++) {
    if (array[pivotIndex] > array[i]) {
      swapIndex++;
      swap(array, i, swapIndex);
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
  if (pow === 1) return num;
  if (pow === 0) return 1;

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

  return fibonacci(num - 2) + fibonacci(num - 1);
};

Array.prototype.myFilter = function (callbackFn, thisArg) {
  const arr = this;
  const resultArr = [];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (!current) continue;
    const res = callbackFn.call(thisArg, current, i, this);
    if (!!res) resultArr.push(current);
  }

  return resultArr;
};

Array.prototype.myMap = function (callbackFn, thisArg) {
  const arr = this;
  const resultArr = [];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];

    if (!current) {
      resultArr.push(current);
      continue;
    }
    const res = callbackFn.call(thisArg, current, i, this);
    resultArr.push(res);
  }
  return resultArr;
};

Array.prototype.myReduce = function (callbackFn, initialVal) {
  const arr = this;
  const noInitialVal = initialVal === undefined;

  if (noInitialVal || !arr.length) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let acc = noInitialVal ? arr[0] : initialVal;

  for (let i = noInitialVal ? 1 : 0; i < arr.length; i++) {
    const current = arr[i];
    if (!current) continue;

    acc = callbackFn(acc, arr[i], i, arr);
  }
  return acc;
};

function once(func) {
  let isCallable = true;
  let res;

  return function (...args) {
    if (isCallable) {
      res = func.call(this, ...args);
      isCallable = false;
    }
    return res;
  };
}

function debounce(func, time = 100) {
  let timeoutId = null;

  return function (...args) {
    let context = this;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(function () {
      timeoutId = null;
      func.call(context, ...args);
    }, time);
  };
}

Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const originalMethod = this;

  return function (...args) {
    return originalMethod.apply(thisArg, [...boundArgs, ...args]);
  };
};

const testArr = [2, 23, 1, 0, 55, 424, 11, 5, 3, 80];
console.log(bubbleSort([...testArr]));
console.log(selectionSort([...testArr]));
console.log(insertionSort([...testArr]));
console.log(merge([1, 3, 5, 7, 9, 12], [2, 4, 6, 8, 11]));
console.log(mergeSort([...testArr]));
console.log(quickSort([...testArr]));
console.log(pivot([...testArr])); //2
console.log(power(2, 5)); //32
console.log(factorial(5)); //120
console.log(sumToNumber(5)); //15
console.log(fibonacci(9)); //34
console.log([1, 2, 3, 4, 5, 6, 22].myFilter(el => el >= 4)); //[4,5,6,22]
console.log([1, 2, 3, 4, 5, 6, 22].myMap(el => el + 1)); //[2,3,4,5,6,7,23]
console.log([1, 2, 3, 4, 5, 6, 22].myReduce((prev, curr) => prev + curr, 0)); //43
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
setTimeout(() => console.log(debounceCounter), 50);
const person = {
  name: "John",
  greeting(prefix, message) {
    return `${prefix} ${this.name}, ${message}`;
  }
};
const greeting = person.greeting.myBind(person, "Mr.");
console.log(greeting("good morning!")); // 'Mr. John, good morning!'
