// node class for our tree (copied from chapter 5)
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// binary search tree definition (everything until line 61 copied from chapter 5)
class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let temp = this.root;
    while (true) {
      if (newNode.value === temp.value) return undefined;
      if (newNode.value < temp.value) {
        if (temp.left === null) {
          temp.left = newNode;
          return this;
        }
        temp = temp.left;
      } else {
        if (temp.right === null) {
          temp.right = newNode;
          return this;
        }
        temp = temp.right;
      }
    }
  }

  contains(value) {
    if (this.root === null) return false;
    let temp = this.root;
    while (temp) {
      if (value < temp.value) {
        temp = temp.left;
      } else if (value > temp.value) {
        temp = temp.right;
      } else {
        return true;
      }
    }
    return false;
  }

  minimalValue(currentNode) {
    while (currentNode.left != null) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  // SEARCH ALGORITHMS

  // breadth first search algorithm
  BFS() {
    // variable that holds our currently moved over node
    let currentNode = this.root;
    // will hold next nodes (from left and right properties) that we remove one
    // by one and set as the currentNode, to from there add the values from it
    // to our result
    let queue = [];
    // will hold a list of values from our whole tree
    let results = [];

    // initializing the queue with first item in the tree (root)
    queue.push(currentNode);

    // we loop over the tree until there are some items in the queue
    while (queue.length) {
      // removes first item in the queue and saves it in the currentNode variable
      currentNode = queue.shift();
      // adds value to our results array
      results.push(currentNode.value);

      // checks if there are some nodes on the left and right sides of our currentNode
      // and pushes them to the queue to process in next iteration, there will be
      // no more nodes on left, right when we reach the bottom of the tree thus
      // the while loop will stop
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return results;
  }

  // depth first search algorithms

  DFSPreOrder() {
    // stores our result
    let results = [];

    // function within function that will call itself recursively
    function traverse(currentNode) {
      // we add the value from currentNode to our results
      results.push(currentNode.value);
      // we check if there are some items on left or right of our current node
      // and run the traverse function with them as an argument (this will repeat
      // the steps before and tackle the tree in smaller parts until there are
      // no nodes left to be traversed)
      if (currentNode.left) traverse(currentNode.left);
      if (currentNode.right) traverse(currentNode.right);
    }

    // we pass to it root of our tree
    traverse(this.root);

    return results;
  }

  DFSPostOrder() {
    // holds results
    let results = [];

    // the implementation for postOrder is almost the same to preOrder one,
    // the only difference is the order in which the function calls itself, this
    // way we are first running the traverse method recursively until we get all
    // the values and only then we go to the last node in our tree (our root node)
    function traverse(currentNode) {
      if (currentNode.left) traverse(currentNode.left);
      if (currentNode.right) traverse(currentNode.right);
      results.push(currentNode.value);
    }

    // we pass to it root of our tree
    traverse(this.root);

    return results;
  }

  DFSInOrder() {
    // holds results
    let results = [];

    // the implementation for inOrder is almost the same to the previous ones, the
    // only difference being that we traverse first left, save the node and then
    // traverse the right part of the tree
    function traverse(currentNode) {
      if (currentNode.left) traverse(currentNode.left);
      results.push(currentNode.value);
      if (currentNode.right) traverse(currentNode.right);
    }

    traverse(this.root);

    return results;
  }
}

let myTree = new BST();
myTree.insert(47);
myTree.insert(21);
myTree.insert(76);
myTree.insert(18);
myTree.insert(27);
myTree.insert(52);
myTree.insert(82);

console.log("\nafter running BFS function");
console.log(myTree.BFS());

console.log("\nafter running DFSPreOrder function");
console.log(myTree.DFSPreOrder());

console.log("\nafter running DFSPostOrder function");
console.log(myTree.DFSPostOrder());

console.log("\nafter running DFSInOrder function");
console.log(myTree.DFSInOrder());
