// function should get nested properties from provided object and dot separated
// path, there should be an option to provide optional default value that will be
// returned when given path does not exist
function get(object, path, defaultValue) {
  const properties = typeof path === "string" ? path.split(".") : path;
  let temp = object;

  if (!Object.getOwnPropertyNames(object).length) return defaultValue || undefined;

  for (let i = 0; i < properties.length; i++) {
    temp = temp[properties[i]];

    if (!temp) {
      if (i === properties.length - 1) return temp !== undefined ? temp : defaultValue;
      return defaultValue || undefined;
    }
  }

  return temp;
}

// second version for get function
function get2(objectParam, pathParam, defaultValue) {
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

console.log("\n*GETNESTEDPROPERTIES");
// tests
console.log(get({}, "a")); //undefined
console.log(get({}, "a.b")); //undefined

//path contains two segments
console.log(get({ a: 1 }, "a")); //1
console.log(get({ c: 2 }, "b")); //undefined
console.log(get({ c: { foo: 1 } }, "c")); //{foo: 1}

//path contains two segments
console.log(get({ a: { b: 2 }, c: 1 }, "a.b")); //2
console.log(get({ a: { b: 2 }, c: 1 }, "a.c")); //undefined
console.log(get({ a: { b: 2, c: { foo: 2 } } }, "a.c")); //{foo: 2}

//path contains multiple segments
console.log(get({ a: { b: 2, c: { d: 0 } }, c: 1 }, "a.c.d")); //0
console.log(get({ a: { b: 2 }, c: 1 }, "a.c.e.f")); //undefined
console.log(get({ a: { b: 2, c: { d: { e: { foo: 3 } } } }, c: 1 }, "a.c.d.e")); //{ foo: 3 }

// test("array values
console.log(get({ a: { b: [1, 2, 3], c: { d: 0 } }, c: 1 }, "a.b.2")); //3
console.log(get({ a: { b: [1, 2, 3, { c: "bar" }], c: { d: 0 } }, c: 1 }, "a.b.3.c")); //bar

//uses default value
console.log(get({}, "a", 1)); //1
console.log(get({}, "a.b", 2)); //2
console.log(get({ c: 2 }, "b", 3)); //3

//correctly returns null values
console.log(get({ b: null }, "b")); //null
console.log(get({ a: { b: 2, c: null }, c: 1 }, "a.c")); //null
console.log(get({ a: { b: 2, c: { d: { e: null } } }, c: 1 }, "a.c.d.e")); //null

//path as an array
console.log(get({ a: { b: 2 }, c: 1 }, ["c"])); //1
console.log(get({ a: { b: 2 }, c: 1 }, ["a", "c"])); //undefined
console.log(get({ a: { b: 2, c: { foo: 2 } } }, ["a", "c"])); //{foo: 2}
console.log(get({ a: { b: [1, 2, 3, { c: "bar" }], c: { d: 0 } }, c: 1 }, ["a", "b", "3", "c"])); //bar

//access index of non-primitives
console.log(get({ a: { b: true } }, "a.b.c")); //undefined
console.log(get({ a: { b: null } }, "a.b.c")); //undefined
console.log(get({ a: { b: undefined } }, "a.b.c")); //undefined
console.log(get({ a: { b: 2 } }, "a.b.c")); //undefined
console.log(get({ a: { b: "foo" } }, "a.b.c")); //undefined
