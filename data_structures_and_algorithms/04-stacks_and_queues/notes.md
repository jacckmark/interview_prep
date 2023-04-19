# STACKS AND QUEUES

1. Stacks - works according to a LIFO (last in first out). This means that you cannot remove items that are not the last element. Common way to implement stack in JS is an array. If you want to do stack with an array always implement it, so the array's end is the stack's end, this is because of the fact that the operations of removing/adding elements in array in the beginning are much more costly (O(n)) then in the end (O(1)).

2. Queue - works according to FIFO (first in firs out). This means that the elements added first can be removed first (elements are added at one end and removed on another). To implement queue in JS we can use an array, but we will have always O(n) complexity, because we will have to add/remove from both ends of the queue. It is often better to implement the queue from scratch and then we can count on better complexity and times for both removing and adding items to/from queue (then the complexity lowers to O(1)).
