// here implementation of hash table using array in JS, but we can just use Map
// when we want to use hash table in JS "out of the box"
class HashTable {
  constructor(size = 7) {
    this.dataMap = new Array(size);
  }

  // underscore tells other developer that this is a method that should be called
  // only by other methods
  _hash(key) {
    // variable holding our hash
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      // this will generate hash based on keys in our key (we are multiplying char
      // code by 23 which is prime number (resulting hash will be more random) and
      // then we are doing remainder using our dataMap length (in our case 7), this
      // will make sure that we will always get number between 0 and 6 which are
      // the places we can put our data in our hash table)
      hash = (hash + key.charCodeAt(i) * 23) % this.dataMap.length;
    }
    return hash;
  }

  set(key, value) {
    // this is index in our hash table where to put our item
    let index = this._hash(key);

    // we add new array table (to pointed by hash table place), but only if there
    // is currently nothing there (there might already be there something, then we
    // want to just add the new item into existing array)
    if (!this.dataMap[index]) {
      this.dataMap[index] = [];
    }

    // we push data into array in the hash table
    this.dataMap[index].push([key, value]);
  }

  get(key) {
    let index = this._hash(key);

    // check if there is something in the address pointed to us by hash function
    // if not we will return undefined
    if (this.dataMap[index]) {
      // here we are looping over the array in given address to find the item we
      // are looking for
      for (let i = 0; i < this.dataMap[index].length; i++) {
        // here we are checking if the looped over item has first item (our key,
        // because every element in hash table looks like that [KEY, VALUE]) that
        // is equal to the key passed to the function
        if (this.dataMap[index][i][0] === key) {
          // we return the value for key we were looking for
          return this.dataMap[index][i][1];
        }
      }
    }
    return undefined;
  }

  // returns all the keys in the hash table
  keys() {
    let allKeys = [];

    // we loop over all the hash map addresses (whole hash map array)
    for (let i = 0; i < this.dataMap.length; i++) {
      // if there is something in the address we are looping over we will loop
      // over an array within this address if not we move to next iteration in loop
      if (this.dataMap[i]) {
        // loop over array elements within one address in hash table
        for (let j = 0; j < this.dataMap[i].length; j++) {
          // we push all keys from array of given element
          allKeys.push(this.dataMap[i][j][0]);
        }
      }
    }
    return allKeys;
  }
}

console.log("\nafter creating one");
let myHashTable = new HashTable();
console.log(myHashTable);

console.log("\nafter running set few times");
myHashTable.set("lumber", 70);
myHashTable.set("washers", 50);
myHashTable.set("bolts", 1400);
console.log(myHashTable);
console.log(myHashTable.dataMap[4]); //washers and bolts
console.log(myHashTable.dataMap[6]); //lumber

console.log("\nafter running gey");
console.log("get lumber:");
console.log(myHashTable.get("lumber")); //70
console.log("get washers:");
console.log(myHashTable.get("washers")); //50
console.log("get bolts:");
console.log(myHashTable.get("bolts")); //1400
console.log("get banana:");
console.log(myHashTable.get("banana")); //undefined (this element does no exist
// in hash table)

console.log("\nafter running keys");
console.log(myHashTable.keys()); // [washers, bolts, lumber]
