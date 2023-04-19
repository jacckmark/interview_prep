class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // adds new node/vertices
  addVertex(vertex) {
    // we check if such node does not already exist in our adjacencyList and if
    // not we are adding this key with an empty array (to store later on connections)
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
      // informs us if we succeeded when creating node
      return true;
    }

    // informs us if we succeeded when creating node
    return false;
  }

  // adds new edge/connection
  addEdge(vertex1, vertex2) {
    // we have to check if the nodes/vertices exist, because we cannot connect
    // non-exising nodes
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
      // informs us if we succeeded when creating an edge
      return true;
    }

    // informs us if we succeeded when creating an edge
    return false;
  }

  // removes edge/connection
  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      // will filter the edges and return only those that are not equal to vertex1
      // for vertex2 array and vertex2 for vertex1 array
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(v => v !== vertex2);
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(v => v !== vertex1);
      // informs us if we succeeded when removing an edge
      return true;
    }
    // informs us if we succeeded when removing an edge
    return false;
  }

  // removes vertex/node
  removeVertex(vertex) {
    // you cannot remove an vertex that does not exist
    if (!this.adjacencyList[vertex]) return undefined;

    // we will run this as long as the length of given array (our adjacency list
    // item we try to remove) is not 0, so there are still some items left there
    while (this.adjacencyList[vertex].length) {
      // pops the last item in our array item (for given vertex key) in adjacency
      //  list and saves the removed item into temp for removing the connections
      let temp = this.adjacencyList[vertex].pop();
      // here using removed item from adjacency list to remove existing edge
      this.removeEdge(vertex, temp);
    }

    // removes the key in adjacency list object
    delete this.adjacencyList[vertex];
    return this;
  }
}

console.log("\nafter creating one");
let myGraph = new Graph();
console.log(myGraph);

console.log("\nafter running addVertex few times");
myGraph.addVertex("A");
myGraph.addVertex("B");
myGraph.addVertex("C");
console.log(myGraph);

console.log("\nafter running addEdge few times");
myGraph.addEdge("A", "B");
myGraph.addEdge("B", "C");
myGraph.addEdge("C", "A");
console.log(`can create connection between non-existing nodes: ${myGraph.addEdge("C", "G")}`);
console.log(myGraph);

console.log("\nafter running removeEdge");
myGraph.removeEdge("A", "B");
console.log(`can remove connection between non-existing nodes: ${myGraph.addEdge("C", "G")}`);
console.log(myGraph);

console.log("\nafter running removeVertex");
myGraph.removeVertex("A");
console.log(`can remove node that does not exist: ${myGraph.removeVertex("G")}`);
console.log(myGraph);
