// Find the previousGreater & previousSmaller for every number in the array, then iterate through both of those arrays. If there exists an index i, where prevG[i] and prevSmaller[i] is not undefined, a 132 pattern exists and we return true. Otherwise, we return false.

function prevGreater(numbers: number[]): Map<number, number> {
  const decreasingStack: number[] = [],
    result: Map<number, number> = new Map(),
    topI = () => decreasingStack.at(-1) as number,
    top = () => numbers[topI()]

  for (let i = 0; i < numbers.length; i++) {
    const current = numbers[i]

    while (decreasingStack.length > 0 && current >= top()) decreasingStack.pop()

    if (decreasingStack.length > 0) result.set(i, topI())

    decreasingStack.push(i)
  }

  return result
}

function prevSmaller(numbers: number[]): Map<number, number> {
  const increasingStack: number[] = [],
    result: Map<number, number> = new Map(),
    topI = () => increasingStack.at(-1) as number,
    top = () => numbers[topI()]

  for (let i = 0; i < numbers.length; i++) {
    const current = numbers[i]

    while (increasingStack.length > 0 && current <= top()) increasingStack.pop()

    if (increasingStack.length > 0) result.set(i, topI())

    increasingStack.push(i)
  }

  return result
}

function has132(numbers: number[]): boolean {
  const previous = {
    smaller: prevSmaller(numbers),
    greater: prevGreater(numbers),
  }

  for (const [index, smallerI] of previous.smaller) {
    const greaterI = previous.greater.get(index)

    if (greaterI === void 0) continue
    if (smallerI >= greaterI) continue

    return true
  }

  return false
}

function has132_2(numbers: number[]): boolean {
  const previousGreater = prevGreater(numbers),
    previousSmaller = prevSmaller(numbers)

  for (const [index, greaterI] of previousGreater) {
    const smallerI = previousSmaller.get(greaterI)

    if ((smallerI || Infinity) < numbers[index]) return true
  }

  return false
}

function find132pattern(nums: number[]): boolean {
  const minIUpTo: number[] = new Array(nums.length).fill(0),
    // Previous - greater; greater - decreasing.
    decreasingStack: number[] = [],
    minAtI = (i: number) => nums[minIUpTo[i]],
    min = () => nums[minIUpTo.at(-1) as number],
    topI = () => decreasingStack.at(-1) as number,
    top = () => nums[topI()]

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i]

    // Skip first index; min up till now can only be nums[0], which is 0, since we store the index, not the value.
    if (i !== 0) {
      // If the current number is is less than the current minimum, the new minimum becomes the current index. Otherwise, it remains the minimum from the previous iteration.
      if (current < min()) minIUpTo[i] = i
      else minIUpTo[i] = minIUpTo[i - 1]
    }

    // Decreasing - current cannot be greater or equal.
    while (decreasingStack.length > 0 && current >= top()) decreasingStack.pop()

    // If a previous greater element exists, the stack will not be empty.
    // If the previous minimum for the previous greater element is less than the current number, we found the pattern.
    if (decreasingStack.length > 0 && minAtI(topI()) < current) return true

    decreasingStack.push(i)
  }

  return false
}

const arr = [3, 5, 0, 3, 4]

console.log(has132_2(arr))
