/*
STACK: LIFO (last in first out).

Usually, stacks have the following methods:
  push - adds an item to the stack
  pop - returns the last added item and remove it from the stack
  peek (optional) - returns the last added item without removing it from the stack

Stack also has some properties:
  storage represents all stacked items
  capacity (optional) is a number of items a stack can fit

Let's define a generic interface for the Stack:
*/
interface IStack<T> {
  add(item: T): void
  remove(): T | undefined
  peek(): T | undefined
  print(): void
  size: number
}

export class Stack<T> implements IStack<T> {
  private items: Map<number, T>
  private topIndex: number

  constructor() {
    this.items = new Map()
    this.topIndex = 0
  }

  get size(): number {
    return this.items.size
  }

  add(item: T): void {
    this.items.set(this.topIndex, item)
    this.topIndex++
  }

  remove(): T | undefined {
    const item = this.items.get(this.topIndex)
    this.items.delete(this.topIndex)
    this.topIndex--
    return item
  }

  peek(): T | undefined {
    return this.items.get(this.size - 1)
  }

  print(): void {
    console.log(this.items)
  }
}

const stack = new Stack<number>()
stack.add(1)
stack.add(2)
stack.add(3)

console.log(stack.peek()) // 3

stack.remove()

console.log(stack.peek()) // 2

stack.print() // Map { 0 => 1, 1 => 2 }

/*
QUEUE
Queues are very similar to the stacks, but they handle items FIFO (first in first out). Items will be retrieved from the queue in the same order that they were added. 

Queues have the following methods:
  enqueue - adds an item to the queue
  dequeue - retrieves an item from the queue
  size - returns the size of the queue
*/

interface IQueue<T> {
  enqueue(item: T): void
  dequeue(): T | undefined
  peek(): T | undefined
  print(): void
  size: number
}

export class Queue<T> implements IQueue<T> {
  private items: Map<number, T>
  private frontIndex: number
  private backIndex: number

  constructor() {
    this.items = new Map()
    this.frontIndex = 0
    this.backIndex = 0
  }

  get size(): number {
    return this.items.size
  }

  enqueue(item: T): void {
    this.items.set(this.backIndex, item)
    this.backIndex++
  }

  dequeue(): T | undefined {
    const item = this.items.get(this.frontIndex)
    this.items.delete(this.frontIndex)
    this.frontIndex++
    return item
  }

  peek(): T | undefined {
    return this.items.get(this.frontIndex)
  }

  print(): void {
    console.log(this.items)
  }
}
