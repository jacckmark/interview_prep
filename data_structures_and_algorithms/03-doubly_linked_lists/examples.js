class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor(value) {
    const newNode = new Node(value);
    this.head = newNode;
    this.tail = this.head;
    this.length = 1;
  }

  push(value) {
    const newNode = new Node(value);

    // this runs in case we don't have elements in the list
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      // this is the only difference between singly and doubly linked lists. We
      // have to add the information about previous element to our node to be
      // able to traverse the list in both ways
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  pop() {
    if (this.length === 0) return undefined;

    let temp = this.tail;

    // code when the list has one element only
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
      temp.prev = null;
    }

    this.length--;
    return temp;
  }

  unshift(value) {
    const newNode = new Node(value);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  shift() {
    if (this.length === 0) return undefined;
    // temp for element we want to remove from the list
    let temp = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
      temp.next = null;
    }

    this.length--;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return undefined;
    let temp = this.head;

    // this is much needed optimization, because like in the singly linked list
    // we have to traverse whole list, but here are 2 options, because sometimes
    // it might be faster to traverse it from the end to the beginning rather
    // than from the beginning to the end
    if (index < this.length / 2) {
      // traversing from the beginning
      for (let i = 0; i < index; i++) {
        temp = temp.next;
      }
    } else {
      // here temp will be tail because we start from the end and not the beginning
      temp = this.tail;
      // traversing from the end
      for (let i = this.length - 1; i > index; i--) {
        temp = temp.prev;
      }
    }

    return temp;
  }

  set(index, value) {
    // to get the item where we want to add our new node
    let temp = this.get(index);

    // if get returned the truthy value we can set the value for this item (otherwise)
    // we know that either this index is wrong, or the list is empty, so set operation
    // would not be possible
    if (temp) {
      temp.value = value;
      return true;
    }

    return false;
  }

  insert(index, value) {
    if (index === 0) return this.unshift(value);
    if (index === this.length - 1) return this.push(value);
    if (index < 0 || index >= this.length) return false;

    // code for adding element in the middle (cases for 'in the end' or 'in the
    // beginning' are covered using push and unshift)
    const newNode = new Node(value);
    let before = this.get(index - 1);
    let after = before.next;

    // here setting all the 'next' and 'prev' connections for items that are:
    // before and after our item, and for the item we want to add to the list
    before.next = newNode;
    newNode.prev = before;
    newNode.next = after;
    after.prev = newNode;

    this.length++;
    return true;
  }

  remove(index) {
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    if (index < 0 || index >= this.length) return undefined;

    // we can use the information from the element we want to remove to change
    // the connections between elements in the list
    const temp = this.get(index);
    temp.prev.next = temp.next;
    temp.next.prev = temp.prev;

    // here breaking the removed element connection to the list
    temp.next = null;
    temp.prev = null;

    this.length--;
    return this;
  }

  reverse() {
    if (this.length === 1) return this;
    if (this.length < 1) return false;

    // we swap head and tail in list
    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;

    // we add additional variables to keep track of previous and next element when
    // doing for loop (temp initially points to first element and next to second)
    let next = temp.next;
    let prev = null;

    for (let i = 0; i < this.length; i++) {
      // we set next to next item in list (in first iteration this does nothing, but
      // later it changes to next items in list)
      next = temp.next;
      // temp 'next' and 'prev' properties are changed to previous/next. First
      // iteration next is second item in the list and prev points to null. Later
      // they point to items that are before/after it
      temp.prev = next;
      temp.next = prev;
      // prev will now point to the same place that temp (first iteration to first
      // item in list)
      prev = temp;
      // temp will now be moved to next item in list (first iteration it will be
      // second item)
      temp = next;
    }

    return this;
  }
}

console.log("\nafter creating one");
let myLinkedList = new DoublyLinkedList(4);
console.log(myLinkedList);

console.log("\nafter running push");
myLinkedList.push(14);
myLinkedList.push(2222);
myLinkedList.push(123);
myLinkedList.push(0);
console.log(myLinkedList);

console.log("\nafter running pop");
myLinkedList.pop();
console.log(myLinkedList);

console.log("\nafter running unshift");
myLinkedList.unshift(111);
console.log(myLinkedList);

console.log("\nafter running shift");
myLinkedList.shift();
console.log(myLinkedList);

console.log("\nafter running get");
console.log(`1000th item in list ${myLinkedList.get(1000)}`);
console.log(`-1 item in list ${myLinkedList.get(-1)}`);
console.log(`third item in list value is ${myLinkedList.get(2).value}`);

console.log("\nafter running set");
console.log(`set item nr 1 in list to 10 ${myLinkedList.set(1, 10)}`);
console.log(myLinkedList.get(1));
console.log(`set item nr -1 to 10 ${myLinkedList.set(-1, 10)}`);

console.log("\nafter running insert");
myLinkedList.insert(1, 177);
console.log(myLinkedList);

console.log("\nafter running remove");
myLinkedList.remove(1);
console.log(myLinkedList);

console.log("\nafter running reverse");
const myLinkedList2 = new DoublyLinkedList(222);
myLinkedList2.push(12);
myLinkedList2.push(424);
myLinkedList2.push(1);
myLinkedList2.push(34);
console.log(`before:`);
console.log(myLinkedList2);
myLinkedList2.reverse();
console.log(`after:`);
console.log(myLinkedList2);
