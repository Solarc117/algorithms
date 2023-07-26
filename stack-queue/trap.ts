function nextGreaterOrEqual(numbers: number[]): Map<number, number> {
  const decStack: number[] = [],
    result: Map<number, number> = new Map()

  for (let i = 0; i < numbers.length; i++) {
    while (
      decStack.length > 0 &&
      numbers[i] >= numbers[decStack.at(-1) as number]
    )
      result.set(decStack.pop() as number, i)

    decStack.push(i)
  }

  return result
}

function trap(heights: number[]): number {
  const nextGTE = nextGreaterOrEqual(heights)
  let water = 0

  for (const [I, GTE_I] of nextGTE) {
    const distance = GTE_I - I
    if (distance < 2) continue

    let rectAreas = 0
    for (let i = I + 1; i < GTE_I; i++) rectAreas += heights[i]

    const maxTrapped = (distance - 1) * Math.min(heights[I], heights[GTE_I]),
      actualTrapped = maxTrapped - rectAreas

    water += actualTrapped
  }

  return water
}

function trapped(heights: number[]): number {
  const nextGTE = nextGreaterOrEqual(heights)
  let water = 0,
    I = 0

  while (I < heights.length) {
    const GTE_I = nextGTE.get(I)
    if (GTE_I === void 0) {
      I++
      continue
    }

    const distance = GTE_I - I
    if (distance < 2) {
      I++
      continue
    }

    let rectAreas = 0
    for (let i = I + 1; i < GTE_I; i++) rectAreas += heights[i]
    const maxTrapped = (distance - 1) * Math.min(heights[I], heights[GTE_I]),
      actualTrapped = maxTrapped - rectAreas

    water += actualTrapped
    I = GTE_I
  }

  return water
}

function answer(heights: number[]): number {
  const stack: number[] = [],
    top = () => heights[stack.at(-1) as number]
  let water = 0

  for (let i = 0; i < heights.length; i++) {
    const current = heights[i]

    while (stack.length > 0 && current >= top()) {
      const index = stack.pop() as number
      
    }
  }
}

const heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
  heights2 = [4, 2, 3]

// console.log(nextGreaterOrEqual(heights))

console.log(trap(heights2))

console.log(trapped(heights2))