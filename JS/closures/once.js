// restricts given function calls to one (subsequent calls should return result from
// first run), function provided as a parameter
function once(func) {
  // holds information if the function was already called
  let isAlreadyCalled = false;
  // holds result of the first function call
  let funcRes;

  // we don't use the arrow functions because we want to have access to 'this'
  // in for example object in which this function would be a parameter
  return function (...args) {
    if (!isAlreadyCalled) {
      funcRes = func.apply(this, args);
      isAlreadyCalled = true;
    }

    return funcRes;
  };
}

let onceCounter = 0;
const onced = once(() => ++onceCounter);

console.log("\n*ONCE");
// tests
const onced1 = onced();
const onced2 = onced();
console.log(onceCounter); //1
console.log(onced1 === onced2); //true because all subsequent calls should return
// the same result as the first run
