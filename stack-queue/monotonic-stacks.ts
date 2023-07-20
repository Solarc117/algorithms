// Next greater => non-increasing stack ([a, b] => a >= b, what we DON'T want in the stack is any adjacent elements [a, b] where a is NOT >= b, aka. a < b - so < is what we use in the while loop).

function nextGreater(numbers: number[]): number[] {
  const nonIncreasingStack: number[] = [],
    nextGreater: number[] = Array(numbers.length).fill(-1),
    top = () => numbers[nonIncreasingStack.at(-1) as number]

  for (let i = 0; i < numbers.length; i++) {
    const current = numbers.at(i) as number

    while (nonIncreasingStack.length > 0 && top() < current) {
      const index = nonIncreasingStack.pop() as number

      nextGreater[index] = current
    }

    nonIncreasingStack.push(i)
  }

  return nextGreater
}

// Previous greater: strictly decreasing stack ([a, b] -> a > b, so operator we use is the opposite - <=).

function previousGreater(numbers: number[]): number[] {
  const strictlyDecreasingStack: number[] = [],
    previousGreater: number[] = Array(numbers.length).fill(-1),
    top = () => strictlyDecreasingStack.at(-1)

  for (let i = 0; i < numbers.length; i++) {
    const current = numbers[i]

    while (strictlyDecreasingStack.length > 0 && (top() as number) <= current)
      strictlyDecreasingStack.pop()

    if (strictlyDecreasingStack.length > 0) previousGreater[i] = top() as number

    strictlyDecreasingStack.push(i)
  }

  return previousGreater
}

// Nearest greater: either non-increasing, or strictly decreasing, depending on which answer you wish to compromise strictness on; strictly decreasing if next greater compromises, or non-increasing if previous greater compromises.

function nearestGreater(numbers: number[]): number[][] {
  const strictDecreaseStack: number[] = [],
    previousGreater: number[] = Array(numbers.length).fill(-1),
    nextGreaterOrEqual: number[] = [...previousGreater]

  for (let I = 0; I < numbers.length; I++) {
    const current = numbers[I]

    while (
      strictDecreaseStack.length > 0 &&
      numbers[strictDecreaseStack.at(-1) as number] <= current
    ) {
      // Number at top of stack is less or eq. to current - set nextGreater[top] to current.
      const index = strictDecreaseStack.pop() as number

      nextGreaterOrEqual[index] = I
    }

    // Number indicated by top of stack, which comes first in the array, is greater than current, so we set previousGreater[current] to top.
    if (strictDecreaseStack.length > 0)
      previousGreater[I] = strictDecreaseStack.at(-1) as number

    strictDecreaseStack.push(I)
  }

  return [previousGreater, nextGreaterOrEqual]
}

// Next smaller: if I were to guess at the pattern now, I'd say "next" questions do not require strict stacks, whereas "previous" questions do. So for next, non-strict, and smaller, we need the opposite in the stack, so increasing -> non-decreasing stack.

function nextSmaller(numbers: number[]): number[] {
  const nonDecreaseStack: number[] = [],
    nextSmaller: number[] = Array(numbers.length).fill(-1)

  for (let I = 0; I < numbers.length; I++) {
    const current = numbers[I],
      top = () => numbers[nonDecreaseStack.at(-1) as number]

    while (nonDecreaseStack.length > 0 && top() > current) {
      const topI = nonDecreaseStack.pop() as number

      nextSmaller[topI] = I
    }

    nonDecreaseStack.push(I)
  }

  return nextSmaller
}

// Previous smaller - strictly increasing stack.

function previousSmaller(numbers: number[]): number[] {
  const strictIncreaseStack: number[] = [],
    previousSmaller: number[] = Array(numbers.length).fill(-1)

  for (let I = 0; I < numbers.length; I++) {
    const current = numbers[I],
      topI = () => strictIncreaseStack.at(-1) as number,
      top = () => numbers[topI()]

    while (strictIncreaseStack.length > 0 && top() >= current)
      strictIncreaseStack.pop()

    if (strictIncreaseStack.length > 0) previousSmaller[I] = topI()

    strictIncreaseStack.push(I)
  }

  return previousSmaller
}

//                           0   1  2  3  4  5  6  7  8  9
// console.log(previousSmaller([13, 8, 1, 5, 2, 5, 9, 7, 6, 12]))
//                           -1,-1,-1, 2, 2, 4, 5, 5, 5, 8

function previousAndNextSmaller(numbers: number[]): number[][] {
  const increasingStack: number[] = [],
    previous: number[] = Array(numbers.length).fill(-1),
    next: number[] = Array(numbers.length).fill(-1)

  for (let I = 0; I < numbers.length; I++) {
    const current = numbers[I],
      topI = () => increasingStack.at(-1) as number,
      top = () => numbers[topI()]

    while (increasingStack.length > 0 && top() >= current) {
      const topI = increasingStack.pop() as number

      next[topI] = I
    }

    if (increasingStack.length > 0) previous[I] = topI()

    increasingStack.push(I)
  }

  return [previous, next]
}

const nums = [13, 8, 1, 5, 2, 5, 9, 7, 6, 12]
//                           0   1  2  3  4  5  6  7  8  9
// console.log(previousAndNextSmaller(nums))
//                                  -1,-1,-1, 2, 2, 4, 5, 5, 5, 8
//                                  1, 2, -1, 4,-1,-1, 7, 8,-1, -1

function nextGreaterII(numbers: number[]): number[] {
  const nonIncreasingStack: number[] = [],
    nextGreater: number[] = Array(numbers.length).fill(-1),
    topI = () => nonIncreasingStack.at(-1) as number,
    top = () => numbers[topI()]

  let count = numbers.length,
    I = 0
  do {
    const current = numbers[I]

    while (nonIncreasingStack.length > 0 && top() < current) {
      const index = nonIncreasingStack.pop() as number

      nextGreater[index] = current
      count--
      if (count === 0) break
    }

    nonIncreasingStack.push(I)
    if (++I === numbers.length) I = 0
  } while (count > 0)

  return nextGreater
}

function nextGreaterII_2(numbers: number[]): number[] {
  function loop(first: boolean = true) {
    for (let I = 0; I < (first ? numbers.length : topI()); I++) {
      const current = numbers[I]

      while (nonIncreasingStack.length > 0 && current > top())
        nextGreater[nonIncreasingStack.pop() as number] = current

      if (first) nonIncreasingStack.push(I)
    }
  }
  const nonIncreasingStack: number[] = [],
    nextGreater: number[] = Array(numbers.length).fill(-1),
    topI = () => nonIncreasingStack.at(-1) as number,
    top = () => numbers[topI()]

  loop()
  loop(false)

  return nextGreater
}

const numbers = [1, 2, 3, 4, 3]
// console.log(nextGreaterII(numbers)) // Expected: [2,3,4,-1,4]

console.log(nextGreaterII_2(numbers))
