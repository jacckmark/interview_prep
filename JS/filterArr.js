// implement filter method for array (you cannot use filter)
Array.prototype.myFilter = function (callbackFn, thisArg) {
  let resultArr = [];
  for (let i = 0; i < this.length; i++) {
    let current = this[i];
    // for sparse arrays like [2,3,,5,6,,1]
    if (!current) continue;
    const res = callbackFn.call(thisArg, current, i, this);
    if (!!res) resultArr.push(current);
  }
  return resultArr;
};

// helpers for testing
const isEven = element => element % 2 === 0;
const isOdd = element => element % 2 === 1;
const isEvenIndex = (_, index) => index % 2 === 0;
const isOddIndex = (_, index) => index % 2 === 1;
const isSquareEven = (_, index, array) => (array[index] * array[index]) % 2 === 0;
const isSquareOdd = (_, index, array) => (array[index] * array[index]) % 2 === 1;
const isThisProductEven = function (element) {
  return (element * this) % 2 === 0;
};
const isThisProductEvenArrowFn = element => (element * this) % 2 === 0;

console.log("\n*FILTERARR");
// tests
//empty array
console.log([].myFilter(isEven)); // []
console.log([].myFilter(isOdd)); // []

// one value'
console.log([1].myFilter(isEven)); //[]
console.log([1].myFilter(isOdd)); //[1]

//two values
console.log([1, 10].myFilter(isEven)); //[10]
console.log([1, 10].myFilter(isOdd)); //[1]

//multiple values
console.log([1, 2, 3, 5, 7, 8, 9].myFilter(isEven)); //[2, 8]
console.log([1, 2, 3, 5, 7, 8, 9].myFilter(isOdd)); //[1, 3, 5, 7, 9,]

//reducer uses index argument when provided
console.log([1, 2, 3].myFilter(isEvenIndex)); //[1, 3]
console.log([-1, -3, 4, 99].myFilter(isOddIndex)); //[-3, 99]

//reducer uses array argument when provided
console.log([1, 2, 3, 4].myFilter(isSquareEven)); //[2, 4]
console.log([-3, 4, 1, 5].myFilter(isSquareOdd)); //[-3, 1, 5]

// uses this argument
console.log([1, 2, 3, 4].myFilter(isThisProductEven)); //[]
console.log([1, 2, 3, 4].myFilter(isThisProductEven, 10)); //[1, 2, 3, 4,]
console.log([1, 2, 3, 4].myFilter(isThisProductEven, 9)); //[2, 4]
console.log([1, 2, 3, 4].myFilter(isThisProductEvenArrowFn)); //[]
console.log([1, 2, 3, 4].myFilter(isThisProductEvenArrowFn, 10)); //[]
console.log([1, 2, 3, 4].myFilter(isThisProductEvenArrowFn, 9)); //[]

//sparse arrays
console.log([, , ,].myFilter(isEven)); //[]
console.log([, , ,].myFilter(val => val === undefined)); //[]
console.log([1, 2, , 4].myFilter(isEven)); //[2, 4]
console.log([1, , 2, , 4, 7, 9].myFilter(isOdd)); //[1, 7, 9]
