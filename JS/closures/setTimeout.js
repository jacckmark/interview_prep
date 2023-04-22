// resolution of setTimeout issue when working with var (first example is the not
// working one, because it will return to us 5 times number 6)
const timeout1 = () => {
  for (var i = 1; i <= 5; ++i) {
    setTimeout(function () {
      console.log(`not working: ${i}`); //prints out 6,6,6,6,6
    }, 100);
  }
};

const timeout2 = () => {
  function doSetTimeout(i) {
    setTimeout(function () {
      console.log(`separate fnc: ${i}`); //prints out 1,2,3,4,5
    }, 100);
  }

  for (var i = 1; i <= 5; ++i) doSetTimeout(i);
};

const timeout3 = () => {
  for (var i = 1; i <= 5; ++i) {
    setTimeout(
      function (index) {
        console.log(`bind: ${index}`); //prints out 1,2,3,4,5
      }.bind(this, i),
      100
    );
  }
};

const timeout4 = () => {
  for (let i = 1; i <= 5; ++i) {
    setTimeout(function () {
      console.log(`let: ${i}`); //prints out 1,2,3,4,5
    }, 100);
  }
};

const timeout5 = () => {
  for (var i = 1; i <= 5; ++i) {
    (function (index) {
      setTimeout(function () {
        console.log(`IIFE: ${index}`); //prints out 1,2,3,4,5
      }, 100);
    })(i);
  }
};

console.log("\n*SETTIMEOUT");
// tests
timeout1();
timeout2();
timeout3();
timeout4();
timeout5();
