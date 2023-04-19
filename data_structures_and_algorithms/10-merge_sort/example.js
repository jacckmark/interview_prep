// merge helper function to combine 2 arrays in correct order
function merge(arr1, arr2) {
  // holds result of merging
  let combined = [];
  // iterators
  let i = 0;
  let j = 0;

  // we do this loop only if i and j are smaller then our arrays length
  while (i < arr1.length && j < arr2.length) {
    // comparing current element in first array with current element in second one
    if (arr1[i] < arr2[j]) {
      // here we got rid of one element in arr1 and we increment i to keep track
      // of elements that were already sorted
      combined.push(arr1[i]);
      i++;
    } else {
      // we remove one element from arr2 and increment the j to keep track of
      // elements already sorted
      combined.push(arr2[j]);
      j++;
    }
  }

  // here we cover the case when we already sorted all the elements of either
  // arr1 or arr2, we broke from previous while loop and we still have some elements.
  // Now we do need to push remaining elements (the elements in passed arrays are
  // already sorted so if there are elements in for example arr2 left, then we
  // should only push them one by one to combined array)
  while (i < arr1.length) {
    combined.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    combined.push(arr2[j]);
    j++;
  }

  return combined;
}

// merge sort function
function mergeSort(arr) {
  // our base case when we want to stop doing recursive runs (there are no more
  // items in our array)
  if (arr.length === 1) return arr;

  // middle element in our array
  let mid = Math.floor(arr.length / 2);
  // our array divided into two equal chunks
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);

  // recursive case where we are calling recursively merge sort on left and right
  // until there is only 1 item left in both and then we run merge helper function
  // to combine these 2 arrays together
  return merge(mergeSort(left), mergeSort(right));
}

const array1 = [1, 3, 7, 8];
const array2 = [2, 4, 5, 6];
console.log("\n*MERGE SORT");
console.log("\n**MERGE HELPER FUNCTION");
console.log("arrays before merge sort merge helper function");
console.log(array1, array2);
console.log("arrays after merge sort merge helper function");
console.log(merge(array1, array2));

const array3 = [643, 11, 9, 0, 1, 2, 41, 533, 6, 4];
console.log("\n**MERGE SORT MAIN FUNCTION");
console.log("array before merge sort");
console.log(array3);
console.log("array after merge sort");
console.log(mergeSort(array3));
