class Node {
  constructor(value) {
    this.value = value;
    // will hold element that is smaller (this might mean different things,
    // because such structure can hold not only a number but also text) then our
    // node element
    this.left = null;
    // will hold element that is bigger then our node element
    this.right = null;
  }
}

class BST {
  constructor() {
    // we only need the root pointer that points to the root of the tree
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    // for case if we have no elements in our tree yet
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    // our pointer that will be moved from item to item and will help us with tree
    // traversing
    let temp = this.root;

    // the loop will run until it will hit the return statement because the initial
    // condition will always be true
    while (true) {
      // this is the case when the new node we want to add is already in the tree
      // we have assumed that there cannot be any duplicates in our tree, but this
      // might not be a case always, so when we would like to store duplicates we
      // would add new property to node which would count the duplicates (for
      // example "count")
      if (newNode.value === temp.value) return undefined;

      // we compare our new node and the pointer value to see where we should move
      // in the next step (if true then we know that newNode is lesser then our
      // temp)
      if (newNode.value < temp.value) {
        // we check if this spot is open and we can put there our element immediately
        if (temp.left === null) {
          temp.left = newNode;
          return this;
        }
        // in case the temp.left is not an empty spot we are moving the pointer
        // further along and do the loop once again
        temp = temp.left;
        // when newNode is greater then our temp
      } else {
        // for case when the spot is not taken and we can place our newNode
        if (temp.right === null) {
          temp.right = newNode;
          return this;
        }
        // in case the temp.right is not empty we move the pointer and do loop again
        temp = temp.right;
      }
    }
  }

  // searching for element by value
  contains(value) {
    // when tree does not have items we know that searched item cannot exist in it
    if (this.root === null) return false;

    // pointer that will help when traversing the tree
    let temp = this.root;

    while (temp) {
      // we compare here the value of temp pointer with value passed to function
      if (value < temp.value) {
        // we move pointer to left element in next level of the tree
        temp = temp.left;
      } else if (value > temp.value) {
        // when passed value is greater then pointer value then we move pointer
        // to the right
        temp = temp.right;
      } else {
        // when the value is neither greater nor lesser, we know that it is equal
        // and we have found our item so we can return true
        return true;
      }
    }
    // if the temp is ever equal to null we know that we have searched the whole
    // tree and the element does not occur there
    return false;
  }

  // we can pass here the node which makes this method more versatile because we
  // can also look for the smallest element in the subtree (we only have to pass
  // the root node of this subtree to use it)
  minimalValue(currentNode) {
    // we loop over the tree elements targeting elements on the left because we
    // know that they are sorted (so element on the left will be the smaller in
    // the tree)
    while (currentNode.left != null) {
      currentNode = currentNode.left;
    }

    // when we reached null we know that this is the tree's end and we can return
    // the smallest element
    return currentNode;
  }
}

console.log("\nafter creating one");
let myTree = new BST();
console.log(myTree);

console.log("\nbefore running insert");
myTree.insert(47);
myTree.insert(21);
myTree.insert(76);
myTree.insert(18);
myTree.insert(52);
myTree.insert(82);

console.log(myTree);

myTree.insert(27);
console.log("\nafter running insert");
console.log(myTree);
console.log(myTree.root.left.right); // there should be a node with value 27 here

console.log("\nafter running contains");
console.log(`my tree contains 11: ${myTree.contains(11)}`); //false
console.log(`my tree contains 82: ${myTree.contains(82)}`); //true
console.log(`my tree contains 27: ${myTree.contains(27)}`); //true
console.log(`my tree contains 217: ${myTree.contains(217)}`); //false

console.log("\nafter running minimalValue");
console.log(myTree.minimalValue(myTree.root.right)); // should return node 52
