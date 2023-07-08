const replaceWithCamelCase = key => {
  if (!key.length) return key;

  const keyArr = key.split("_");

  if (keyArr.length === 1) return key;

  const res = keyArr
    .map((el, i) => {
      let temp = el.toLowerCase();
      if (i === 0) return temp;

      return `${temp[0].toUpperCase()}${temp.slice(1)}`;
    })
    .join("");

  return res;
};

function camelCaseKeys(object) {
  if (Array.isArray(object)) {
    return object.map(item => camelCaseKeys(item));
  }

  if (typeof object !== "object" || object === null) {
    return object;
  }

  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [replaceWithCamelCase(key), camelCaseKeys(value)])
  );
}

function classNames(...args) {
  const result = [];

  args.forEach(arg => {
    if (!arg) return;

    const argType = typeof arg;

    if (argType === "string" || argType === "number") return result.push(arg);

    if (Array.isArray(arg)) return result.push(classNames(...arg));

    if (argType === "object") {
      for (const key in arg) {
        if (Object.hasOwn(arg, key) && arg[key]) {
          result.push(key);
        }
      }

      return;
    }
  });

  return result.join(" ");
}

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
const testArr = [2, 23, 1, 0, 55, 424, 11, 5, 3, 80];
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
