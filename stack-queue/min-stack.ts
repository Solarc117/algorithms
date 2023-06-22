/*
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:

MinStack() initializes the stack object.
void push(int val) pushes the element val onto the stack.
void pop() removes the element on the top of the stack.
int top() gets the top element of the stack.
int getMin() retrieves the minimum element in the stack.
You must implement a solution with O(1) time complexity for each function.

 

Example 1:
  Input
  ["MinStack","push","push","push","getMin","pop","top","getMin"]
  [[],[-2],[0],[-3],[],[],[],[]]
  Output
  [null,null,null,null,-3,null,0,-2]
Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
 
Constraints:
  -231 <= val <= 231 - 1
  Methods pop, top and getMin operations will always be called on non-empty stacks.
  At most 3 * 104 calls will be made to push, pop, top, and getMin.
*/

// Must be O(1) for all functions.
interface IMinStack {
  /**
   * @time O(1)
   */
  push(number: number): void
  /**
   * @time O(1)
   */
  getMin(): number
  /**
   * @time O(1)
   */
  pop(): number
  /**
   * @time O(1)
   */
  top(): number
}

class MinStack implements IMinStack {
  // O(n) space.
  private numbers: Map<number, number> = new Map()
  // O(n) space.
  private minimums: Map<number, number> = new Map([[0, Infinity]])

  push(number: number): void {
    const minimum = this.minimums.get(this.minimums.size - 1)

    if (minimum === void 0 || number <= minimum)
      this.minimums.set(this.minimums.size, number)
    this.numbers.set(this.numbers.size, number)
  }

  getMin(): number {
    return this.minimums.get(this.minimums.size - 1) as number
  }

  pop(): number {
    const number = this.numbers.get(this.numbers.size - 1) as number

    this.numbers.delete(this.numbers.size - 1)
    if (number === this.minimums.get(this.minimums.size - 1))
      this.minimums.delete(this.minimums.size - 1)

    return number
  }

  top(): number {
    return this.numbers.get(this.numbers.size - 1) as number
  }

  print(): void {
    console.log(this.numbers.values())
  }
}