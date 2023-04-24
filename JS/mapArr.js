// implement map method for array (you cannot use map)
Array.prototype.myMap = function (callbackFn, thisArg) {
  const res = [];

  for (let i = 0; i < this.length; i++) {
    const current = this[i];
    // for sparse arrays like [2,3,,5,6,,1]
    if (!current) {
      res.push(current);
      continue;
    }
    const modifiedEl = callbackFn.call(thisArg, current, i, this);
    res.push(modifiedEl);
  }

  return res;
};

// helpers for testing
const identity = element => element;
const square = element => element * element;
const multiplyByIndex = (element, index) => element * index;
const squareAlt = (element, index, array) => element * array[index];
const usesThis = function (element) {
  return element * this;
};
const usesThisArrowFn = element => element * this;

console.log("\n*MAPARR");
// tests
// empty array
console.log([].myMap(identity)); // []
console.log([].myMap(square)); // []

// one value
console.log([10].myMap(identity)); // [10]
console.log([10].myMap(square)); // [100]

// two values
console.log([-4, 10].myMap(identity)); // [-4, 10]
console.log([-4, 10].myMap(square)); // [16, 100]

// multiple values
console.log([1, 2, 3, 4].myMap(identity)); // [1, 2, 3, 4]
console.log([1, 2, 3, 4, 5].myMap(square)); // [1, 4, 9, 16, 25]

//reducer uses index argument when provided
console.log([1, 2, 3].myMap(multiplyByIndex)); // [0, 2, 6]
console.log([-1, -3, 4].myMap(multiplyByIndex)); // [-0, -3, 8]

//reducer uses array argument when provided
console.log([1, 2, 3, 4].myMap(squareAlt)); // [1, 4, 9, 16]
console.log([-1, -3, 4].myMap(squareAlt)); // [1, 9, 16]

//uses this argument
console.log([1, 2, 3, 4].myMap(usesThis)); // [NaN, NaN, NaN, NaN]
console.log([1, 2, 3, 4].myMap(usesThis, 10)); // [10, 20, 30, 40]
console.log([1, 2, 3, 4].myMap(usesThisArrowFn)); // [NaN, NaN, NaN, NaN]
console.log([1, 2, 3, 4].myMap(usesThisArrowFn, 10)); // [NaN, NaN, NaN, NaN,]

// sparse arrays
console.log([1, 2, , 4].myMap(identity)); // [1, 2, , 4]
console.log([1, 2, , 4].myMap(square)); // [1, 4, , 16]
