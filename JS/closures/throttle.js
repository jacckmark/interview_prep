// throttles running function for given time (will wait to process request for given time
// every during the time will return with nothing until the timer runs out)
function throttle(func, wait = 0) {
  let canBeCalled = true;
  let res = null;

  return function (...args) {
    if (!canBeCalled) return res;

    canBeCalled = false;

    setTimeout(function () {
      canBeCalled = true;
    }, wait);

    return func.apply(this, args);
  };
}

console.log("\n*THROTTLE");
// tests

// invokes callback immediately'
let j = 0;
const increment = throttle(() => {
  j++;
}, 50);

console.log(j); //0
increment();
console.log(j); //0

// throttles immediate invocations'
let i = 0;
const increment2 = throttle(() => {
  i++;
}, 50);

console.log(i); //0
increment2();
console.log(i); //1
increment2();
console.log(i); //1
