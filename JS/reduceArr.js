// implement reduce method for array (you cannot use reduce)
Array.prototype.myReduce = function (callbackFn, initialValue) {
  const noInitialVal = initialValue === undefined;

  if (noInitialVal && this.length === 0) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  // if there is no initialVal we are using first el as initialVal
  let acc = noInitialVal ? this[0] : initialValue;

  // if there is no initialVal we are starting from index 1, because index 0 becomes
  // our initialVal
  for (let i = noInitialVal ? 1 : 0; i < this.length; i++) {
    // for sparse arrays like [2,3,,5,6,,1]
    if (!this[i]) continue;
    // we implemented reduce without option to set this value manually (passed
    // as parameter in callback) so we can call this function without using call
    // method
    acc = callbackFn(acc, this[i], i, this);
  }
  return acc;
};

// helpers for testing
const add = (prev, curr) => prev + curr;
const multiplyByIndex = (prev, curr, index) => prev + curr * index;
const subtract = (prev, curr) => prev - curr;
const sumOfSquares = (prev, curr, index, array) => prev + curr * array[index];
const combineObj = (prev, curr) => ({ ...prev, ...curr });
const combineArr = (prev, curr) => [...prev, curr];

console.log("\n*REDUCEARR");
// tests
//empty array equals initial value
console.log([].myReduce(add, 0)); // 0
console.log([].myReduce(subtract, 0)); // 0

//one value
console.log([1].myReduce(add, 0)); // 1
console.log(["a"].myReduce(add, "")); // 'a'

//two values
console.log([-4, 10].myReduce(add, 0)); // 6
console.log(["b", "c", "d"].myReduce(add, "")); // 'bcd'

//multiple values
console.log([1, 2, 3].myReduce(add, 0)); // 6
console.log(["a", "b", "c", "d"].myReduce(add, "")); // 'abcd'

//object values
console.log([{ foo: 1 }, { bar: 2 }].myReduce(combineObj)); // {foo: 1, bar: 2 }
console.log([{ foo: 1 }, { bar: 2 }].myReduce(combineObj, {})); // { foo: 1, bar: 2 }

//array values
console.log([1, 2, 3].myReduce(combineArr, [])); // [1, 2, 3]

//reducer uses index argument when provided
console.log([1, 2, 3].myReduce(multiplyByIndex, 0)); // 8
console.log([-1, -3, 4].myReduce(multiplyByIndex, 0)); // 5

//reducer uses array argument when provided
console.log([1, 2, 3, 4].myReduce(sumOfSquares, 0)); // 30
console.log([-1, -3, 4].myReduce(sumOfSquares, 0)); // 26

//no initial value provided and array is non-empty
console.log([1, 2, 3].myReduce(add)); // 6
console.log([-1, -3, 4].myReduce(sumOfSquares, 0)); // 26

//sparse arrays
console.log([1, 2, , 3].myReduce(add)); // 6
console.log([-1, -3, 4, , ,].myReduce(sumOfSquares, 0)); // 26
