// function used to combine classes with each other
function classNames(...args) {
  const result = [];

  args.forEach(arg => {
    // falsy values
    if (!arg) return;

    const argType = typeof arg;

    // string and numbers.
    if (argType === "string" || argType === "number") return result.push(arg);

    // arrays
    if (Array.isArray(arg)) return result.push(classNames(...arg));

    // objects
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

// tests
console.log(classNames("foo", "bar")); // 'foo bar'
console.log(classNames(["foo", "bar", "baz"])); // 'foo bar baz'
console.log(classNames({ foo: true, bar: false, qux: true })); // 'foo qux'
console.log(classNames("a", ["b", { c: true, d: false }])); // 'a b c'
