// replaces all the keys with a camel case keys in given object
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

// recursively calls itself and the replaceWithCamelCase function to replace all
// the keys in our input object
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

// tests
console.log(camelCaseKeys({ foo_bar: true })); // { fooBar: true }
console.log(camelCaseKeys({ foo_bar: true, bar_baz: { baz_quz: "1", quz: "2" } }));
// { fooBar: true, barBaz: { bazQuz: "1", quz: "2" } }
console.log(camelCaseKeys({ foo_bar: true, bar_baz: [{ baz_qux: true }, { foo: true }] }));
// { barBaz: [ { bazQux: true, }, { foo: true }, ], fooBar: true }
