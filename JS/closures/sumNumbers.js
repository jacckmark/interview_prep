// adds numbers to each other using closures until empty argument occurs, then is
// should return a result (sum(1)(2)(3)() = 6 and sum(1)(2) = function partial with
// 2 args already set)

function sum(num1) {
  return function (num2) {
    return num2 === undefined ? num1 : sum(num1 + num2);
  };
}

console.log("\n*cumNumbers");
// tests

// one number
console.log(sum(1)()); //1
console.log(sum(-1)()); //-1

// two numbers
console.log(sum(1)(2)()); //3
console.log(sum(89)(11)()); //100
console.log(sum(-1)(-2)()); //-3

// zero works
console.log(sum(0)(0)(0)()); //0
console.log(sum(1)(2)(0)()); //3
console.log(sum(1)(0)(89)(10)()); //100
console.log(sum(-1)(0)(-2)()); //-3

// negative numbers
console.log(sum(-1)(-2)()); //-3
console.log(sum(-89)(-2)()); //-91
console.log(sum(-42)(42)()); //0

// // returns function if not terminated
console.log(sum(1) instanceof Function);
console.log(sum(1)(2) instanceof Function);
console.log(sum(1)(2)(3) instanceof Function);

// can be reused
const addTwo = sum(2);
console.log(addTwo(3)()); //5
console.log(addTwo(4)()); //6
console.log(addTwo(3)(4)()); //9
