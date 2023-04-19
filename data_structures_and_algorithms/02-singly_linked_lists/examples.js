class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    const newNode = new Node(value);
    this.head = newNode;
    this.tail = this.head;
    this.length = 1;
  }

  push(value) {
    const newNode = new Node(value);

    // here checking if linked list is empty (if head points to null then we know that it is
    // and we can just add new node as tail and head)
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // we change where the tail points (instead of the null we point it into our newly
      // created object)
      this.tail.next = newNode;
      // we move the tail pointer onto our new node
      this.tail = newNode;
    }
    // we have to keep track of linked list length
    this.length++;
    // will return whole linked list instance where we called push
    return this;
  }

  pop() {
    if (!this.head) return undefined;

    // we create temp and pre as pointers for our looping over linked list,
    // they are pointing to head so they can start in the same place
    let temp = this.head;
    let pre = this.head;
    // we are looping over the whole linked list to find one before last element
    // in the linked list (element before element that has null as 'next' property)
    while (temp.next) {
      // here we are moving the pre and temp, temp is moved to the next item in the
      // list and pre is moved to the item temp previously occupied. This way
      // we have access to element before while going over current element and
      // checking if next is falsy
      pre = temp;
      temp = temp.next;
    }
    // after we find our last element we can set the tail as our pre and
    // set the 'next' to null to break the connection between last and one
    // before last elements
    this.tail = pre;
    this.tail.next = null;
    this.length--;

    // if after the decrementing of length, the length is equal 0, we assume
    // that the length of this linked list was 1. In this case the while does
    // not run and the only thing we did in previous steps is to decrement length
    // so we have to point head and tail to null
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    // to return the item we removed
    return temp;
  }

  unshift(value) {
    const newNode = new Node(value);

    // if the head is falsy then we know that the list is empty and can point
    // tail and head onto our new element
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // if the head is not falsy we have to set the 'next' property in newNode
      // to head (our first element in linked list) and then move head to point
      // onto our new node
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  shift() {
    // if head is falsy then we know that linked list is empty and we do nothing
    if (!this.head) return undefined;

    // if there are some items in linked list we are setting temp to track current
    // head and then set head to track current head.next (the second item in list)
    // after this we need to set the 'next' property in our temp to null to
    // break the connection between the first item and the list
    let temp = this.head;
    this.head = this.head.next;
    temp.next = null;
    this.length--;

    // here we know that the linked list had 1 item so we need to set tail to null
    // (head is already set to null because this.head.next is null in this instance)
    if (this.length === 0) {
      this.tail = null;
    }

    return temp;
  }

  get(index) {
    // if the index passed into the function is less then 0 or higher then list
    // length we return undefined
    if (index < 0 || index >= this.length) return undefined;

    // we set temp to head
    let temp = this.head;

    // we loop over the linked list to get to item by given index and set temp to
    // next item in every single loop. We break loop before we get to the item, so
    // the item we want to get will be in the 'next' property of last traversed
    // element
    for (let i = 0; i < index; i++) {
      temp = temp.next;
    }
    return temp;
  }

  set(index, value) {
    // if temp returns undefined we know that the index is out of range, in other
    // case we have obtained the element on given index using get
    let temp = this.get(index);

    if (temp) {
      // we set found item to provided value to change it
      temp.value = value;
      return true;
    }

    // if temp was falsy we return false to signal that the operation was not
    // successful
    return false;
  }

  insert(index, value) {
    // we know in this case that the item should be added in the beginning of list
    // so we can reuse unshift
    if (index === 0) return this.unshift(value);
    // we know that item should be added on the end of the list so we reuse push
    if (index === this.length) return this.push(value);
    // here we are checking if passes to function index is legit (if not return false)
    if (index < 0 || index >= this.length) return false;

    const newNode = new Node(value);
    // we want to point to one item before place where the item should be added
    const temp = this.get(index - 1);

    // point the new item to have the same 'next' property content like temp
    newNode.next = temp.next;
    // set temp (our one element before the designated place where new item should
    // go) to point to newNode
    temp.next = newNode;
    this.length++;

    // if successfully we return true
    return true;
  }

  remove(index) {
    if (index === 0) return this.shift(value);
    if (index === this.length - 1) return this.pop(value);
    if (index < 0 || index >= this.length) return undefined;

    // item before the item we want to remove
    const before = this.get(index - 1);
    // item we want to remove
    const temp = before.next;

    // point before next property to point to item after the item we want to remove
    before.next = temp.next;

    // remove the pointer from item we want to remove to 'unconnect' it from the
    // rest of the list
    temp.next = null;
    this.length--;

    return true;
  }

  reverse() {
    // we reverse the main pointers (head points now to node tail was pointing to
    // and tail to node that head was pointing to)
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
      // temp 'next' property is changed to previous (first iteration to null and
      // later to items that were before it)
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
let myLinkedList = new LinkedList(4);
console.log(myLinkedList);

console.log("\nafter running push");
myLinkedList.push(14);
myLinkedList.push(231);
myLinkedList.push(4444);
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
console.log(`third item in list ${JSON.stringify(myLinkedList.get(2))}`);

console.log("\nafter running set");
console.log(`set item nr 1 in list to 10 ${myLinkedList.set(1, 10)}`);
console.log(myLinkedList.get(1));
console.log(`set item nr -1 to 10 ${myLinkedList.set(-1, 10)}`);

console.log("\nafter running insert");
myLinkedList.insert(1, 123);
console.log(myLinkedList);

console.log("\nafter running remove");
myLinkedList.remove(1);
console.log(myLinkedList);

console.log("\nafter running reverse");
const myLinkedList2 = new LinkedList(222);
myLinkedList2.push(12);
myLinkedList2.push(424);
myLinkedList2.push(1);
myLinkedList2.push(34);
console.log(`before:\n ${JSON.stringify(myLinkedList2)}`);
myLinkedList2.reverse();
console.log(`after:\n ${JSON.stringify(myLinkedList2)}`);
