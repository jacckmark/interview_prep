function bubbleSort(array) {
  // we do loop for only n-1 elements because we are comparing 2 elements so no
  // need to do additional loop here (also we are decrementing the i because we
  // know that after each loop one more element gets sorted, so no need to go and
  // compare last already sorted elements)
  for (let i = array.length - 1; i > 0; i--) {
    // additional loop which goes over every element to find the biggest one and
    // after that the second biggest and so on, until we reach the end of our list
    // (there will be no more elements to compare to and order)
    for (let j = 0; j < i; j++) {
      // we compare two elements (that live next to each other) to check if one
      // of them is bigger then the other
      if (array[j] > array[j + 1]) {
        // we swap elements in an array when first element is bigger then the
        // second one (this way the biggest element will be moved to the end)
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}

const unsortedArr1 = [1, 4, 55, 890, 2, 3, 9, 0];
console.log("\n*BUBBLE SORT");
console.log("array before bubble sort");
console.log(unsortedArr1);
console.log("array after bubble sort");
console.log(bubbleSort(unsortedArr1));

function selectionSort(array) {
  // stores an index of the lowest item in current loop
  let min = 0;
  // loop over all the spots in the array to order them (all but one because last
  // item will be already in a proper spot)
  for (let i = 0; i < array.length - 1; i++) {
    // we temporarily set the min to be item we are currently looping over, before
    // we check if there is an item with lower value
    min = i;
    // we loop over all the items in the array to find the item that is lower then
    // the item in spot we are trying to fill
    for (let j = i + 1; j < array.length; j++) {
      // we set the min to currently looped over j only if it is lower then
      // current min
      if (array[j] < array[min]) min = j;

      // we are swapping items only if the lowest item is not the item in spot we
      // try to fill in (there is a possibility that currently lowest item will be
      // on the good spot, then we will get the same index for i and min)
    }
    if (i !== min) {
      // we are swapping items places to place lowest item on the spot we are
      // trying to fill
      let temp = array[i];
      array[i] = array[min];
      array[min] = temp;
    }
  }
  return array;
}

const unsortedArr2 = [1, 4, 55, 890, 2, 3, 9, 0];
console.log("\n*SELECTION SORT");
console.log("array before selection sort");
console.log(unsortedArr2);
console.log("array after selection sort");
console.log(selectionSort(unsortedArr2));

function insertionSort1(array) {
  // stores the element in the array we are currently working with
  let temp;

  // we are looping over the array (starting at position 1)
  for (let i = 1; i < array.length; i++) {
    // stores element we want to compare to the rest and move to correct spot
    temp = array[i];
    // defined j here because we do need an access to it later on
    let j;

    // here we are looping over the left side of an array to insert our element in
    // the correct spot. We will break out of the loop when j is lower then 0 or
    // current temp is bigger then array[j] (we then know we have to place there
    // our item)
    for (j = i - 1; array[j] > temp && j > -1; j--) {
      // when the array[j] is bigger then temp we move array[j] element to the
      // right to make place on the left for our temp item (we are now sure it
      // will go there we are not sure on which spot so we are carefully moving
      // items one by one)
      array[j + 1] = array[j];
    }

    // we move the temp to spot next to last checked item (we broke from for loop
    // and we know that checked item was smaller then our temp)
    array[j + 1] = temp;
  }

  return array;
}

const unsortedArr3 = [4, 2, 6, 5, 1, 3, 9, 20, 0];
console.log("\n*INSERTION SORT");
console.log("\n**V1");
console.log("array before insertion sort");
console.log(unsortedArr3);
console.log("array after insertion sort");
console.log(insertionSort1(unsortedArr3));

function insertionSort2(array) {
  // looping over our array starting from second element
  for (let i = 1; i < array.length; i++) {
    // choosing the element we want to sort now
    let current = array[i];
    // choosing element right before element that we want to sort now
    let j = i - 1;

    // we loop only if the index of element before our currently sorted element
    // is 0 or more and only if our current sorted element is not bigger than
    // element before it
    while (j > -1 && current < array[j]) {
      // swapping places and moving elements to accommodate our currently sorted
      // element later on
      array[j + 1] = array[j];
      // decrementing to reach index less then 0 and break of the loop (only when
      // we don't find element that is smaller than our current element)
      j--;
    }

    // here we swap the element in places to insert the current into correct spot
    // (element current for this loop is sorted we can move to another one)
    array[j + 1] = current;
  }

  return array;
}

const unsortedArr4 = [4, 2, 6, 5, 1, 3, 9, 20, 0];
console.log("\n**V2");
console.log("array before insertion sort");
console.log(unsortedArr4);
console.log("array after insertion sort");
console.log(insertionSort2(unsortedArr4));
