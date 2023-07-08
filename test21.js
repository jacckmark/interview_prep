const curry = callback => {
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

Object.prototype.myBind = function (thisArg, ...boundArgs) {
  const orgObj = this;
  return function (...args) {
    return orgObj.apply(thisArg, [...boundArgs, ...args]);
  };
};

const once = callback => {
  let canBeCalled = true;
  let result = null;

  return function (...args) {
    if (!canBeCalled) return result;
    canBeCalled = false;

    result = callback.apply(this, args);
    return result;
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

const flatten = arr => arr.flat(Infinity);

const flatten2 = arr => {
  while (arr.some(Array.isArray)) {
    arr = [].concat(...arr);
  }
  return arr;
};

const replaceWithCamelCase = key => {
  const keyArr = key.split("_");
  if (keyArr.length < 2) return key.toLowerCase();

  return keyArr
    .map((el, i) => {
      const temp = el.toLowerCase();
      if (i === 0) return temp;
      return `${temp[0].toUpperCase()}${temp.slice(1)}`;
    })
    .join("");
};

const camelCaseKeys = obj => {
  if (Array.isArray(obj)) return obj.map(camelCaseKeys);

  if (typeof obj !== "object" && obj !== null) return obj;

  return Object.fromEntries(Object.entries(obj).map(([key, val]) => [replaceWithCamelCase(key), camelCaseKeys(val)]));
};

const classNames = (...classes) => {
  const result = [];

  classes.forEach(el => {
    const type = typeof el;

    if (Array.isArray(el)) return result.push(classNames(...el));

    if (type === "number" || type === "string") return result.push(el);

    if (type === "object") {
      for (let key in el) {
        if (Object.hasOwn(el, key) && el[key]) result.push(key);
      }
    }
  });

  return result.join(" ");
};

const $ = selector => {
  const selectedEl = document.querySelector(selector);

  return {
    css: function (prop, val) {
      if (val === undefined) {
        if (selectedEl == null) return undefined;
        const value = selectedEl.style[prop];
        return value === "" ? value : undefined;
      }

      if (selectedEl != null) {
        selectedEl.style[prop] = val;
      }
      return this;
    }
  };
};

const getNestedProp = (obj, path, defaultValue) => {
  const pathArr = Array.isArray(path) ? path : path.split(".");
  if (!pathArr.length || !Object.entries(obj).length) return defaultValue || undefined;

  let temp = obj;

  for (let i = 0; i < pathArr.length; i++) {
    const curr = pathArr[i];
    temp = temp[curr];

    if (!temp) {
      if (i === pathArr.length) return temp ? temp : defaultValue;
      return defaultValue || undefined;
    }
  }
  return temp;
};

const debounce = (callback, time = 100) => {
  let timerId = null;

  return function (...args) {
    clearTimeout(timerId);
    const context = this;

    timerId = setTimeout(() => {
      timerId = null;
      callback.apply(context, args);
    }, time);
  };
};

const throttle = (callback, time = 100) => {
  let canBeCalled = true;

  return function (...args) {
    if (!canBeCalled) return;
    canBeCalled = false;
    const context = this;

    setTimeout(() => {
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