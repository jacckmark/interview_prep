// here we are implementing stack by ourselves because doing it using an array would be to easy

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor(value) {
    const newNode = new Node(value);
    this.top = newNode;
    this.length = 1;
  }

  push(value) {
    const newNode = new Node(value);

    if (this.length === 0) {
      this.top = newNode;
    } else {
      // in case there is something in the stack we have to set the next in our
      // newNode to point to the same thing as top (to previously last element)
      // and we have to change the top to point to newNode
      newNode.next = this.top;
      this.top = newNode;
    }

    this.length++;
    return this;
  }

  pop() {
    if (this.length === 0) return undefined;

    let temp = this.top;
    // we set the top to point to the next item in stack
    this.top = this.top.next;
    // we destroy the connection to stack in element that we want to pop
    temp.next = null;

    this.length--;
    return temp;
  }
}

console.log("\n*STACK WITHOUT AN ARRAY");
console.log("\nafter creating one");
let myStack = new Stack(111);
console.log(myStack);

console.log("\nafter running push");
myStack.push(333);
myStack.push(90);
console.log(myStack);

console.log("\nafter running pop");
myStack.pop();
console.log(myStack);

// Stack version with an array
class Stack2 {
  constructor() {
    this.__items = [];
  }

  // Pushes an item onto the top of the stack.
  push(item) {
    return this.__items.push(item);
  }

  // Remove an item at the top of the stack.
  pop() {
    return this.__items.pop();
  }

  // Determines if the stack is empty.
  isEmpty() {
    return !this.length();
  }

  // Returns the item at the top of the stack without removing it from the stack.
  peek() {
    return this.isEmpty() ? undefined : this.__items.slice(-1)[0];
  }

  // Returns the number of items in the stack.
  length() {
    return this.__items?.length;
  }
}

console.log("\n*STACK WITH AN ARRAY");
console.log("\nafter creating one");
let myStack2 = new Stack2(111);
console.log(myStack2);

console.log("\nafter running push");
myStack2.push(333);
myStack2.push(90);
console.log(myStack2);

console.log("\nafter running pop");
myStack2.pop();
console.log(myStack2);
console.log(`stacks length is now: ${myStack2.length()}`);
