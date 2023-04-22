// adds numbers to each other using closures to access variable that should not be accessible
function counter(num) {
  let count = 0;

  return function () {
    count = count + num;
    return count;
  };
}

let myCounter1 = counter(2);
console.log("\n*COUNTER");
//tests
console.log(myCounter1()); //2
console.log(myCounter1()); //4
console.log(myCounter1()); //6

let myCounter2 = counter(10);
console.log(myCounter2()); //10
console.log(myCounter2()); //20
console.log(myCounter2()); //30
