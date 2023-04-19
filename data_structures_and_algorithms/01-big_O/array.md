# ARRAYS

1. Array modifying methods.

- `Array.prototype.pop()` - this operation is only O(1) operation, because we are removing element from the end of an array and this does not require reindexing of the array,
- `Array.prototype.push()` - similarly to pop this operation is also only O(1) complexity, because we are adding element to the end of the array and we do only one operation,
- `Array.prototype.shift()` - this operation would be O(n), where n is the number of elements in an array. This is due to the fact that when we remove an element from the beginning of our array, we must reorder rest of the elements, so we will have one operation for removing and n - 1 operations of reordering our array,
- `Array.prototype.unshift()` - this would work the same as shift, because when we added new element on the beginning of our array, we have to reorder rest of elements, so complexity here will be also O(n),
- `Array.prototype.splice()` - this operation would be O(n),
  - operation of adding element into a array myArray which is 4 elements long, like `myArray.splice(1, 0, 'HI')`. In this instance we are putting an element as the second one and then doing 3 additional operations to move all the elements that are after this element (so elements on index 1, 2, 3 change the index to 2, 3, 4). So this would be O(n) where n is the number of elements in our array (here O(4)),
  - same case with operation that would remove element from the middle of an array this would be O(n) where n is the arrays length,

2. Other.

- searching in array,

  - searching by value (for example `Array.prototype.find()`) - would cost us O(n), because in the worst case scenario we would have to go trough whole array to find this one searched item,
  - searching by index (for example `myArray[144]`) - on the other hand when we are searching for item using index (so accessing the item nr 14 for example) the complexity would be O(1) because arrays are great for such operations,
  - indexes greatly improve searching, when we are searching by index, but are also an disadvantage, because when we are editing an array (especially at the beginning and in the middle) we have to reindex everything, so we should take this into consideration when choosing the data structure,
