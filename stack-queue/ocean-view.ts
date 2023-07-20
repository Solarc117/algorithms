import assert from 'assert'

function viewBuildings(heights: number[]): number[] {
  const buildingsWithView: Set<number> = new Set(heights.map((_, i) => i)),
    stack: number[] = []

  for (let i = 0; i < heights.length; i++) {
    while (stack.length > 0 && heights[i] >= heights[stack.at(-1) as number]) {
      const index = stack.pop() as number

      buildingsWithView.delete(index)
    }

    stack.push(i)
  }

  return Array.from(buildingsWithView)
}

function viewBuildings2(heights: number[]): number[] {
  const stack: number[] = []

  for (let i = 0; i < heights.length; i++) {
    while (stack.length > 0 && heights[i] >= heights[stack.at(-1) as number])
      stack.pop()

    stack.push(i)
  }

  return stack
}

function findBuildings(heights: number[]): number[] {
  /* We want to find which of the buildings have a next greater element. 
  At the end, the elements left in the stack will be the ones which 
  don't have any greater elements after them. */
  let stack = []
  for (let i = 0; i < heights.length; i++) {
    /* We want to pop out the buildings which have another
    building with equal or greater height in view. This 
    means the monotonic stack is going to be strictly 
    decreasing. */
    while (stack.length && heights[stack.at(-1) as number] <= heights[i]) {
      stack.pop()
    }
    stack.push(i)
  }
  return stack
}

function competitors(heights: number[]): number[] {
  let max = 0,
    answer = []

  for (let i = heights.length - 1; i >= 0; --i) {
    const height = heights[i]
    if (max >= height) continue

    answer.push(i)
    max = height
  }

  return answer.reverse()
}

let l: number

const tests = [
  { heights: [4, 2, 3, 1], expected: [0, 2, 3] },
  { heights: [4, 3, 2, 1], expected: [0, 1, 2, 3] },
  { heights: [1, 3, 2, 4], expected: [3] },
  { heights: [2, 2, 2, 2], expected: [3] },
  {
    heights: [
      ...(function (): number[] {
        const arr = []
        for (let i = 0; i < 9999999; i++) arr.push(i)
        l = arr.length
        return arr
      })(),
    ],
    expected: [l - 1],
  },
]

const me = 'jonas',
  competitor = 'LeetcodeCa',
  guide = 'stack guide'

console.time(guide)
for (const { heights, expected } of tests)
  assert.deepEqual(findBuildings(heights), expected)
console.timeEnd(guide)

console.time(me + guide)
for (const { heights, expected } of tests)
  assert.deepEqual(viewBuildings2(heights), expected)
console.timeEnd(me + guide)

// console.time(me)
// for (const { heights, expected } of tests)
//   assert.deepEqual(viewBuildings(heights), expected)
// console.timeEnd(me)

// console.time(competitor)
// for (const { heights, expected } of tests)
//   assert.deepEqual(competitors(heights), expected)
// console.timeEnd(competitor)
