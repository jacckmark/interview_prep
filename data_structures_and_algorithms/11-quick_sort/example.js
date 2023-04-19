// helper function that swaps elements in an array with each other
function swap(arr, firstIndex, secondIndex) {
  let temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

// pivot helper function to choose random element and then order items around it
// (smaller before and bigger after). Should return an index where is now our pivot
// to be able to sort arrays items on the left and right (we don't want to sort
// pivot in subsequent runs)
function pivot(arr, pivotIndex = 0, endIndex = arr.length - 1) {
  // we set the swapIndex to pivot which in the first loop will be 0
  let swapIndex = pivotIndex;

  // we loop over all array but the pivot (so on first try this will be from the
  // second element till the last)
  for (let i = pivotIndex + 1; i <= endIndex; i++) {
    // we compare the current elements in loop to our pivot, in case this statement
    // is true we are moving the swapIndex by 1 and swap the element with index
    // equal to swapIndex with the item that is smaller then our pivot (pivot
    // stays in place we are not only swapping the values to create two parts in
    // our array)
    if (arr[i] < arr[pivotIndex]) {
      swapIndex++;
      swap(arr, swapIndex, i);
    }
  }

  // after we "sorted" elements (moved them on two sides of our array, smaller on
  // the left, bigger on the right) we finally move pivot to the central place of
  // our array (now we know that elements on the left are smaller and on the right
  // are bigger then our pivot)
  swap(arr, pivotIndex, swapIndex);

  return swapIndex;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  // this breaks our recursive calls, when left and right will be pointing to the
  // same item (ergo left is not smaller then right) we know that the subarray
  // that we got and want to sort is 1 item long, so we don't need to sort it
  if (left < right) {
    // it rearranges our array and then stores the index of our pivot (we don't want
    // to sort once again our pivot)
    let pivotIndex = pivot(arr, left, right);

    // runs recursively the quicksort on left and right parts of our array
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }

  return arr;
}

const array1 = [4, 6, 1, 7, 3, 2, 5];
console.log("\n*QUICK SORT");
console.log("\n**PIVOT HELPER FUNCTION");
console.log("array before quick sort pivot helper function");
console.log(array1);
console.log(`array's pivot is: ${pivot(array1)}`);
console.log("array after quick sort pivot helper function");
console.log(array1);

const array2 = [643, 11, 9, 0, 1, 2, 41, 533, 6, 4];
console.log("\n**QUICK SORT MAIN FUNCTION");
console.log("array before quick sort");
console.log(array2);
console.log("array after quick sort");
console.log(quickSort(array2));
