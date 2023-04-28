// implement universal curry function which can be called with varying number
// of arguments (curr(a,b,c), curr(a)(b)(c), curr(a,b)(c), curr(a) and so on)
function curry(func) {
  // returns curried function to gather up all the potential arguments of function
  return function curried(...args) {
    // if passed args count is the same or more than the original function has in
    // its definition (func.length) , then just call it using regular func.apply
    if (args.length >= func.length) {
      return func.apply(this, args);
      // if the args amount is less then the original function definition we have
      // to concatenate the arguments and then call the function
    } else {
      // here gathering the rest of potential arguments in function
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

// log example
const hello = (firstName, lastName, shoeSize) =>
  console.log(
    `Hello ${firstName} ${lastName}. We know everything about you. We know that yor shoe size is: ${shoeSize}`
  );

const helloCurry = curry(hello);
// partial which helps a lot when we want to reuse this function with preset argument
// for example we would like to call hello with first argument as 'Julian' we can
// do it easily now
const helloJulianCurry = helloCurry("Julian");
helloJulianCurry("Markiewicz", "43");

// adding example
const add = (a, b, c) => a + b + c;
const sumCurry = curry(add);
console.log(sumCurry(1)(2)(3)); //6
console.log(sumCurry(1, 2)(3)); //6
console.log(sumCurry(1, 2, 3)); //6
// partial for summing to one (first parameter is preset as 1)
const sumToOne = sumCurry(1);
console.log(sumToOne(2)(3)); //6
console.log(sumToOne(2)(3)); //6
