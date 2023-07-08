// debounces running function for given time (will wait to process request for given time
// every request will "reset" timer and will have to wait once again), also has methods
// cancel (to cancel delayed invocations) and flush (to immediately invoke delayed
// invocations)
function debounce(func, time = 100) {
  // all needed later data
  let timerId = null;
  let argsList = null;
  let context = null;

  // clears timeout and sets timerId to null
  const clearTimer = () => {
    clearTimeout(timerId);
    timerId = null;
  };

  const invoke = () => {
    // need to check if there is some timerId now if not then invoking it will
    // have no sense
    if (timerId == null) return;

    // clears timers set before
    clearTimer();
    // calls function with correct this and arguments
    func.apply(context, argsList);
  };

  function fn(...args) {
    // clears all the timers that were set before
    clearTimer();
    // sets all the required data to use later on
    argsList = args;
    context = this;

    timerId = setTimeout(function () {
      invoke();
    }, time);
  }

  // attach cancel and flush so the result of running debounce can run another methods
  fn.cancel = clearTimer;
  fn.flush = invoke;
  // return fn function (thanks to this we will be able to run it and then use
  // the result to run cancel and flush methods)
  return fn;
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
