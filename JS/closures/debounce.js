// debounces running function for given time (will wait to process request for given time
// every request will "reset" timer and will have to wait once again)
function debounce(func, time = 100) {
  let timeoutId = null;

  return function (...args) {
    let context = this;
    clearTimeout(timeoutId);

    // when using arrow function we should be wary that this would not
    // have worked as for example property in an object, because "with
    // normal javascript functions, `this` is bound when the function
    // is called. With arrow functions, `this` is bound to the context
    // in which the function is originally created."
    timeoutId = setTimeout(function () {
      timeoutId = null;
      func.call(context, args);
    }, time);
  };
}

let debounceCounter = 0;
const increment = debounce(() => {
  debounceCounter++;
}, 50);

console.log("\n*DEBOUNCE");
// tests
console.log(debounceCounter); //our counter is equal 0
increment();
increment();
increment();
increment();
console.log(debounceCounter); //still 0 even though we have run the increment function 4 times

setTimeout(() => console.log(debounceCounter), 50); //counter is now 1, because 50ms have elapsed
// after last call of 'increment' function
