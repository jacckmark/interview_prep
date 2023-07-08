const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
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

const pivot = (arr, pivotIndex = 0, endIndex = arr.length - 1) => {
  let swapIndex = pivotIndex;

  for (let i = pivotIndex + 1; i <= endIndex; i++) {
    const current = arr[i];

    if (arr[pivotIndex] > current) {
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

Object.prototype.myBind = function (thisArg, ...boundArgs) {
  const orgObj = this;

  return function (...args) {
    return orgObj.apply(thisArg, [...boundArgs, ...args]);
  };
};

const once = function (callback) {
  let canBeCalled = true;
  let res = null;

  return function (...args) {
    if (!canBeCalled) return res;

    canBeCalled = false;
    res = callback.apply(this, args);
    return res;
  };
};

const sumNum = function (num1) {
  return function (num2) {
    if (num2 === undefined) {
      return num1;
    } else {
      return sumNum(num1 + num2);
    }
  };
};

const flatten = arr => {
  return arr.flat(Infinity);
};

const flatten2 = arr => {
  while (arr.some(Array.isArray)) {
    arr = [].concat(...arr);
  }
  return arr;
};

const debounce = (callback, time = 100) => {
  const context = this;
  let timerId = null;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(function () {
      timerId = null;
      callback.apply(context, args);
    }, time);
  };
};

const throttle = (callback, time = 100) => {
  const context = this;
  let canBeCalled = true;

  return function (...args) {
    if (!canBeCalled) return;
    canBeCalled = false;

    setTimeout(function () {
      canBeCalled = true;
    }, time);

    callback.apply(context, args);
  };
};

function $(selector) {
  const selectedElement = document.querySelector(selector);

  return {
    css: function (prop, value) {
      if (value === undefined) {
        if (selectedElement == null) return undefined;
        const value = element.style[prop];
        return value === "" ? undefined : value;
      }
      if (selectedElement != null) {
        selectedElement.style[prop] = value;
      }
      return this;
    }
  };
}

const getNestedProp = (object, path, defaultVal) => {
  const pathArr = Array.isArray(path) ? path : path.split(".");

  if (!pathArr.length || !Object.getOwnPropertyNames(object)) return defaultVal || undefined;
  let temp = object;

  for (let i = 0; i < pathArr.length; i++) {
    temp = temp[pathArr[i]];

    if (!temp) {
      if (i === pathArr.length - 1) {
        return temp !== undefined ? temp : defaultVal;
      } else {
        return defaultVal || undefined;
      }
    }
  }
  return temp;
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
console.log(`IMPLEMENT THE JQUERY METHOD`);
console.log(getNestedProp({}, "a.b", 2)); //2
console.log(getNestedProp({ a: { b: [1, 2, 3, { c: "bar" }], c: { d: 0 } }, c: 1 }, ["a", "b", "3", "c"])); //bar
