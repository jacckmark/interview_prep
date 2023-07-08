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

    if (current < arr[pivotIndex]) {
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

const curry = function (func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, [...args, ...args2]);
      };
    }
  };
};

Object.prototype.myBind = function (thisArg, ...boundArgs) {
  const context = this;
  return function (...args) {
    return context.apply(thisArg, [...boundArgs, ...args]);
  };
};

const once = func => {
  let canBeCalled = true;
  let res;

  return function (...args) {
    if (!canBeCalled) return res;
    canBeCalled = false;
    func.apply(this, args);
  };
};

const sumNum = num1 => {
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

const debounce = function (func, time = 100) {
  let timerId = null;

  return function (...args) {
    clearTimeout(timerId);
    const context = this;

    timerId = setTimeout(function () {
      timerId = null;
      return func.apply(context, args);
    }, time);
  };
};

const throttle = function (func, time = 100) {
  let canBeCalled = true;

  return function (...args) {
    if (!canBeCalled) return;
    canBeCalled = false;

    setTimeout(function () {
      canBeCalled = true;
    }, time);
    func.apply(this, args);
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

function getNestedProp(objectParam, pathParam, defaultValue) {
  const path = Array.isArray(pathParam) ? pathParam : pathParam.split(".");

  let index = 0;
  let length = path.length;
  let object = objectParam;

  while (object != null && index < length) {
    object = object[String(path[index])];
    index++;
  }

  const value = index && index === length ? object : undefined;
  return value !== undefined ? value : defaultValue;
}

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
