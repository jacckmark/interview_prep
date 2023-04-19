# HASH TABLES

1. Hash tables - is a data structure that is used to store key-value pairs. It uses hash function to compute an index into an array in which an element will be inserted or searched (in case we want to access element that is already stored in hash table).

2. Hash tables in JS - the most common example of hash table is the object data type, where you can pair the object's property value with a property key.

```js
  let obj = {
    Nathan: "555-0182",
    Jane: "315-0322"
  }
  // in this example the key Nathan is paired with the phone number 
  // "555..." and the key Jane with value "315..."
```

Object is not the best implementation of hash tables though. Object does not count the number of elements in it and it has inherited from Object class properties which might conflict with your keys. Better implementation of hash table in JS is build in Map, where you have to use get set methods, cannot overwrite accidentally inherited properties and the size method is already build in.

3. Hash tables collisions - if our hash function maps 2 or more items to the same space in the table we can talk about an collision. There are few ways to deal with collisions like:

- separate chaining - we put all elements within an array in the space that was pointed to us by the hash function. Another way is to have linked list in addresses and put in these the elements one after another so when we are pointed by hash function to this particular address we are searching trough the linked list (if there is more then one item),
- linear probing (type of open addressing) - we put the element in the next free address space when we see that there is already item in the space that was pointed to us by the hash table,

4. Big O - hash method itself is always O(1), so getting/setting items by keys we have always O(1). There is possibility of collisions so the O(n) (where n is the number of elements in given space, for given key) would be more sensible, but collisions are pretty rare in build in hash tables (this is because they are much bigger then the hash table we build in example and the hash functions for build in hash tables are great in distributing elements across such hash tables) so setting and getting of items would be O(1) (one exception would be getting an item by value which would be O(n) and not O(1)).
