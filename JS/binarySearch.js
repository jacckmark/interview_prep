// implement binary search method that will search for given el in provided sorted
// array. If not found index -1 should be returned
function binarySearch(arr, target) {
  return binarySearchImpl(arr, target, 0, arr.length - 1);
}

function binarySearchImpl(arr, target, left, right) {
  // return if the left pointer side is bigger then right one (this means that
  // you didn't find the element in array)
  if (left > right) return -1;

  // calculate the middleIndex (this will be left and right indexes combined and
  // divided by two)
  const mid = Math.floor((left + right) / 2);

  // if the target is smaller then the current middle element we know the element
  // resides in the first part of an array
  if (target < arr[mid]) {
    return binarySearchImpl(arr, target, left, mid - 1);
  }

  // if the target is bigger then our middle element we know the element resides
  // in the second part of an array
  if (target > arr[mid]) {
    return binarySearchImpl(arr, target, mid + 1, right);
  }

  // when the element is not smaller not bigger then our target and the left pointer
  // is still smaller (or equal) then the right one we know that the element we look
  // for is the current middle element
  return mid;
}

console.log(binarySearch([], 1)); // -1
console.log(binarySearch([1], 1)); // 0
console.log(binarySearch([1, 2, 3], 3)); // 2
console.log(binarySearch([1, 2, 3, 10, 11, 20], 1)); //0
console.log(binarySearch([1, 2, 3, 10, 11, 20], 2)); //1
console.log(binarySearch([1, 2, 3, 10, 11, 20], 3)); //2
console.log(binarySearch([1, 2, 3, 10, 11, 20], 10)); //3
console.log(binarySearch([1, 2, 3, 10, 11, 20], 9)); //-1
console.log(binarySearch([1, 2, 3, 10, 11, 20], 4)); //-1
console.log(binarySearch([1, 2, 3, 10, 11, 20], 0)); //-1
console.log(binarySearch([1, 2, 3, 10, 11, 20], 21)); //-1
