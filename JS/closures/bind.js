// implement bind method (you cannot use bind, but can use call and apply)
Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const originalMethod = this;
  return function (...args) {
    // you can use either call or apply, but remember to spread in call and to
    // produce one array from all args in apply
    return originalMethod.apply(thisArg, [...boundArgs, ...args]);
    // return originalMethod.call(thisArg, ...boundArgs, ...args);
  };
};

console.log("\n*BIND");
// tests
const person = {
  name: "John",
  getName() {
    return this.name;
  },
  dummy(a, b, c) {
    return [a, b, c];
  },
  greeting(prefix, message) {
    return `${prefix} ${this.name}, ${message}`;
  }
};

// `this` is bound
const getName = person.getName.myBind(person);
console.log(getName()); // John

// args can be bound
const dummyPerson1 = person.dummy.myBind(person, 2, 3, 5);
console.log(dummyPerson1()); //[2, 3, 5]

// returned function accepts args
const dummyPerson2 = person.dummy.myBind(person);
console.log(dummyPerson2(2, 3, 5)); // [2, 3, 5]

// returned function called with bound args and new args
const dummyPerson3 = person.dummy.myBind(person, 2);
console.log(dummyPerson3(3, 5)); // [2, 3, 5]

// integration
const greeting = person.greeting.myBind(person, "Mr.");
console.log(greeting("good morning!")); // 'Mr. John, good morning!'
