const curry = callback => {
  return function curried(...args) {
    const context = this;
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
  const context = this;
  return function (...args) {
    return context.apply(thisArg, [...boundArgs, ...args]);
  };
};

const replaceWithCamelCase = key => {
  if (!key.includes("_")) return key;
  const keyArr = key.split("_");

  return keyArr
    .map((el, i) => {
      const temp = el.toLowerCase();
      if (i === 0) return temp;
      return `${temp[0].toUpperCase()}${temp.slice(1)}`;
    })
    .join("");
};

const camelCaseKeys = obj => {
  if (Array.isArray(obj)) return obj.map(el => camelCaseKeys(el));

  const type = typeof obj;

  if (type !== "object" || obj === null) return obj;

  return Object.fromEntries(Object.entries(obj).map(([key, val]) => [replaceWithCamelCase(key), camelCaseKeys(val)]));
};

const classNames = (...classes) => {
  const res = [];

  classes.forEach(el => {
    if (Array.isArray(el)) return res.push(classNames(...el));

    const type = typeof el;

    if (type === "number" || type === "string") res.push(el);

    if (type === "object") {
      for (let key in el) {
        if (Object.hasOwn(el, key) && el[key]) res.push(key);
      }
    }
  });

  return res.join(" ");
};

const $ = selector => {
  const selectedEl = document.querySelector(selector);

  return {
    css: function (param, val) {
      if (val === undefined) {
        if (selectedEl == null) return undefined;
        const value = selectedEl.style[param];
        return value === "" ? undefined : value;
      }

      if (selectedEl != null) {
        selectedEl.style[param] = val;
      }

      return this;
    }
  };
};

const getNestedProp = (obj, path, defaultVal) => {
  const pathArr = Array.isArray(path) ? path : path.split(".");

  let temp = obj;

  for (let i = 0; i < pathArr.length; i++) {
    const curr = pathArr[i];
    temp = temp[curr];

    if (!temp) {
      if (i === pathArr.length - 1) return temp === undefined ? defaultVal : temp;
      return temp || defaultVal;
    }
  }
  return temp;
};

const binarySearchHelper = (arr, left, right, target) => {
  if (left > right) return -1;

  const middleIndex = Math.floor((left + right) / 2);

  if (arr[middleIndex] > target) return binarySearchHelper(arr, left, middleIndex - 1, target);

  if (arr[middleIndex] < target) return binarySearchHelper(arr, middleIndex + 1, right, target);

  return middleIndex;
};

const binarySearch = (arr, target) => {
  return binarySearchHelper(arr, 0, arr.length - 1, target);
};

const binarySearch2 = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const middleIndex = Math.floor((left + right) / 2);

    if (arr[middleIndex] > target) {
      right = middleIndex - 1;
    } else if (arr[middleIndex] < target) {
      left = middleIndex + 1;
    } else {
      return middleIndex;
    }
  }

  return -1;
};

const debounce = (callback, time = 100) => {
  let timerId = null;

  return function (...args) {
    const context = this;
    clearTimeout(timerId);

    timerId = setTimeout(function () {
      timerId = null;
      return callback.apply(context, args);
    }, time);
  };
};

const throttle = (callback, time = 100) => {
  let canBeCalled = true;

  return function (...args) {
    if (!canBeCalled) return;
    canBeCalled = false;
    const context = this;

    setTimeout(function () {
      canBeCalled = true;
    }, time);
    callback.apply(context, args);
  };
};

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
console.log(replaceWithCamelCase("test_aa_bb")); // testAaBb
console.log(camelCaseKeys({ foo_bar: true })); // { fooBar: true }
console.log(camelCaseKeys({ foo_bar: true, bar_baz: { baz_quz: "1", quz: "2" } }));
// { fooBar: true, barBaz: { bazQuz: "1", quz: "2" } }
console.log(camelCaseKeys({ foo_bar: true, bar_baz: [{ baz_qux: true }, { foo: true }] }));
// { barBaz: [ { bazQux: true, }, { foo: true }, ], fooBar: true }
console.log(classNames("foo", "bar")); // 'foo bar'
console.log(classNames(["foo", "bar", "baz"])); // 'foo bar baz'
console.log(classNames({ foo: true, bar: false, qux: true })); // 'foo qux'
console.log(classNames("a", ["b", { c: true, d: false }])); // 'a b c'
console.log(`IMPLEMENT THE JQUERY METHOD`);
console.log(getNestedProp({}, "a.b", 2)); //2
console.log(getNestedProp({ a: { b: [1, 2, 3, { c: "bar" }], c: { d: 0 } }, c: 1 }, ["a", "b", "3", "c"])); //bar
console.log(binarySearch([], 1)); //-1
console.log(binarySearch([1], 1)); //0
console.log(binarySearch([1, 2, 3], 3)); //2
console.log(binarySearch([2, 4, 5, 23, 43, 666], 1)); //-1
console.log(binarySearch([2, 4, 5, 23, 43, 666], 666)); //5
console.log(binarySearch2([], 1)); //-1
console.log(binarySearch2([1], 1)); //0
console.log(binarySearch2([1, 2, 3], 3)); //2
console.log(binarySearch2([2, 4, 5, 23, 43, 666], 1)); //-1
console.log(binarySearch2([2, 4, 5, 23, 43, 666], 666)); //5
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
