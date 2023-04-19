// power written using recursion
console.log("**POWER");
function myPower(number, power) {
  if (power === 1) return number;
  if (power === 0) return 1;

  return number * myPower(number, power - 1);
}

console.log("*RECURSION");
console.log(`\t${myPower(2, 0)}`);
console.log(myPower(2, 1));
console.log(myPower(2, 2));
console.log(myPower(2, 3));
console.log(myPower(2, 4));
console.log(myPower(2, 5));
console.log(myPower(2, 6));
console.log(myPower(2, 7));
console.log(myPower(2, 8));

// power written using for loop
function myPower2(number, power) {
  if (power === 1) return number;

  if (power === 0) return 1;

  let res = 1;
  for (let i = 1; i <= power; i++) {
    res = res * number;
  }
  return res;
}

console.log("*FOR LOOP");
console.log(myPower2(2, 0));
console.log(myPower2(2, 1));
console.log(myPower2(2, 2));
console.log(myPower2(2, 3));
console.log(myPower2(2, 4));
console.log(myPower2(2, 5));
console.log(myPower2(2, 6));
console.log(myPower2(2, 7));
console.log(myPower2(2, 8));

// sum to number written using recursion
console.log("\n**SUM TO NUMBER");
function sumToNumber(number) {
  if (number <= 1) return number;

  return number + sumToNumber(number - 1);
}

console.log("*RECURSION");
console.log(sumToNumber(1));
console.log(sumToNumber(5));
console.log(sumToNumber(12));
console.log(sumToNumber(100));
console.log(sumToNumber(1432));
console.log(sumToNumber(0));
console.log(sumToNumber(1111));

// sum to number written using for loop
function sumToNumber2(number) {
  if (number <= 1) return number;

  let res = 0;
  for (let i = 1; i <= number; i++) {
    res = res + i;
  }

  return res;
}

console.log("*FOR LOOP");
console.log(sumToNumber2(5));
console.log(sumToNumber2(12));
console.log(sumToNumber2(100));
console.log(sumToNumber2(1432));
console.log(sumToNumber2(0));
console.log(sumToNumber2(1111));

// factorial written using recursion
console.log("\n**FACTORIAL");
function factorial(number) {
  if (number <= 1) return number;

  return number * factorial(number - 1);
}

console.log("*RECURSION");
console.log(factorial(1));
console.log(factorial(2));
console.log(factorial(3));
console.log(factorial(4));
console.log(factorial(5));
console.log(factorial(6));
console.log(factorial(7));

// factorial written using for loop
function factorial2(number) {
  if (number <= 1) return number;

  let res = 1;
  for (let i = 1; i <= number; i++) {
    res = res * i;
  }

  return res;
}

console.log("*FOR LOOP");
console.log(factorial2(1));
console.log(factorial2(2));
console.log(factorial2(3));
console.log(factorial2(4));
console.log(factorial2(5));
console.log(factorial2(6));
console.log(factorial2(7));

// fibonacci written using recursion
console.log("\n**FIBONACCI");
function fibonacci(number) {
  if (number < 2) return number;
  if (number === 2) return 1;

  return fibonacci(number - 1) + fibonacci(number - 2);
}

console.log("*RECURSION");
console.log(fibonacci(1));
console.log(fibonacci(2));
console.log(fibonacci(3));
console.log(fibonacci(4));
console.log(fibonacci(5));
console.log(fibonacci(6));
console.log(fibonacci(7));
console.log(fibonacci(8));
console.log(fibonacci(9));
console.log(fibonacci(10));
console.log(fibonacci(11));
// turned off because of time complexity (this would calculate for at least 5mins)
// console.log(fibonacci(77));

// fibonacci written using for loop
function fibonacci2(number) {
  if (number < 2) return number;
  if (number === 2) return 1;

  let fibArray = [1, 1];

  for (let i = fibArray.length; i < number; i++) {
    fibArray.push(fibArray[fibArray.length - 2] + fibArray[fibArray.length - 1]);
  }

  return fibArray[fibArray.length - 1];
}

console.log("*FOR LOOP");
console.log(fibonacci2(1));
console.log(fibonacci2(2));
console.log(fibonacci2(3));
console.log(fibonacci2(4));
console.log(fibonacci2(5));
console.log(fibonacci2(6));
console.log(fibonacci2(7));
console.log(fibonacci2(8));
console.log(fibonacci2(9));
console.log(fibonacci2(10));
console.log(fibonacci2(11));
console.log(fibonacci2(77));

// fibonacci written using for loop (second example)
function fibonacci3(number) {
  if (number < 2) return number;
  if (number === 2) return 1;

  let num1 = 0;
  let num2 = 1;
  let holder = 0;

  for (let i = 2; i <= number; i++) {
    holder = num1 + num2;
    num1 = num2;
    num2 = holder;
  }

  return num2;
}

console.log("*FOR LOOP");
console.log(fibonacci3(1));
console.log(fibonacci3(2));
console.log(fibonacci3(3));
console.log(fibonacci3(4));
console.log(fibonacci3(5));
console.log(fibonacci3(6));
console.log(fibonacci3(7));
console.log(fibonacci3(8));
console.log(fibonacci3(9));
console.log(fibonacci3(10));
console.log(fibonacci3(11));
console.log(fibonacci3(77));
