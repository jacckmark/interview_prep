// should flatten nested arrays into single level array
function flatten(value) {
  while (value.some(el => Array.isArray(el))) {
    value = [].concat(...value);
  }

  return value;
}

console.log("\n*FLATTEN");
// tests

// empty array
console.log(flatten([])); // []
console.log(flatten([[], [[]], [[], [[[]]]]])); //[]

// single-element array
console.log(flatten([1])); //[1]
console.log(flatten(["foo"])); //['foo']
console.log(flatten([undefined])); //[undefined]

// array with only one level
console.log(flatten([1, 2, 3])); // [1, 2, 3]
console.log(flatten(["foo", "bar"])); // ['foo', 'bar']
console.log(flatten([null, true, undefined])); // [null, true, undefined]

// array with multiple levels of nesting
console.log(flatten([0, 1, 2, [3, 4]])); // [0, 1, 2, 3, 4]
console.log(flatten([1, [2, [3]]])); // [1, 2, 3]
console.log(
  flatten([
    [1, 2],
    [3, 4]
  ])
); // [1, 2, 3, 4]
console.log(flatten(["foo", ["bar"]])); // ['foo', 'bar']
console.log(flatten([[null, [true]], undefined])); // [null, true, undefined, ]

// list-style array
console.log(flatten([1, [2, [3, [4, [5]]]]])); // [1, 2, 3, 4, 5]
console.log(flatten([[[[[1], 2], 3], 4], 5])); // [1, 2, 3, 4, 5]

// deeply-nested single-element array
console.log(flatten([[[[1]]]])); // [1]
