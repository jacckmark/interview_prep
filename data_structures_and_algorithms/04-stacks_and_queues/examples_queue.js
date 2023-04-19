class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor(value) {
    const newNode = new Node(value);
    this.first = newNode;
    this.last = newNode;
    this.length = 1;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.length === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      // we point our current last item in queue to new item
      this.last.next = newNode;
      // we point the pointer last to point to our new item
      this.last = newNode;
    }

    this.length++;
    return this;
  }

  dequeue() {
    if (this.length === 0) return undefined;

    let temp = this.first;

    if (this.length === 1) {
      // in case there is only one element we want to set first and last to null
      this.first = null;
      this.last = null;
    } else {
      // we set the first to point to the next item in queue
      this.first = this.first.next;
      // we destroy the connection to queue in element that we want to dequeue
      temp.next = null;
    }

    this.length--;
    return temp;
  }
}

console.log("\nafter creating one");
let myQueue = new Queue(111);
console.log(myQueue);

console.log("\nafter running enqueue");
myQueue.enqueue(333);
myQueue.enqueue(90);
console.log(myQueue);

console.log("\nafter running dequeue");
myQueue.dequeue();
console.log(myQueue);
