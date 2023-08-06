/* There are n people standing in the queue. They are numbered from 0 to n-1 in left to right order. You are given an array 'heights' of distinct integers where 'heights[i]' is the height of the 'i'th person.

A person can see another person to their right if everybody in between is shorter than both of them.

Return an array answer of length n where answer[i] is the number of people the ith person can see to their right in the queue. */
{
  function visiblePeople(heights: number[]): number[] {
    const decreasingStack: number[] = [],
      peekI = () => decreasingStack.at(-1) as number,
      peek = () => heights[peekI()],
      visible: number[] = Array(heights.length).fill(0)

    for (let i = 0; i < heights.length; i++) {
      const current = heights[i]

      while (decreasingStack.length > 0 && current >= peek()) {
        const index = decreasingStack.pop() as number,
          distance = i - index

        visible[index] = distance
      }

      decreasingStack.push(i)
    }

    return visible
  }
}
{
  function visiblePeople(heights: number[]): number[] {
    const decreasingStack: number[] = [],
      peekI = () => decreasingStack.at(-1) as number,
      peek = () => heights[peekI()],
      visible: number[] = []

    for (let i = 0; i < heights.length; i++) {
      const current = heights[i]

      let popped = 0
      while (decreasingStack.length > 0 && current >= peek()) {
        const index = decreasingStack.pop() as number
        popped++
        visible[index] = popped
      }

      decreasingStack.push(i)
    }

    let ahead = 0
    while (decreasingStack.length > 0) {
      const index = decreasingStack.pop() as number
      visible[index] = ahead
      ahead++
    }

    return visible
  }
}

{
  function visiblePeople(heights: number[]): number[] {
    const decreasingStack: number[] = [],
      peekI = () => decreasingStack.at(-1) as number,
      peek = () => heights[peekI()],
      visible: number[] = Array(heights.length).fill(0)

    for (let i = 0; i < heights.length; i++) {
      const current = heights[i]

      let popped = 0
      while (decreasingStack.length > 0 && current >= peek()) {
        const index = decreasingStack.pop() as number
        popped++
        visible[index] += popped
        visible[peekI()] += 1
      }

      decreasingStack.push(i)
    }

    let ahead = 0
    while (decreasingStack.length > 0) {
      const index = decreasingStack.pop() as number
      visible[index] += ahead
      ahead++
    }

    return visible
  }
}
{
  // pge: decreasing stack
  function visiblePeople(heights: number[]): number[] {
    const stack: number[] = [],
      visible: number[] = Array(heights.length).fill(0),
      peek = () => heights[stack.at(-1) as number]

    for (let i = 0; i < heights.length; i++) {
      const current = heights[i]

      let popped = 0
      while (stack.length > 0 && current > peek()) {
        const index = stack.pop() as number
        popped++

        visible[index] += popped
      }

      if (stack.length > 0) {
        const index = stack.at(-1) as number
        visible[index]++
      }

      stack.push(i)
    }

    let ahead = 0
    while (stack.length > 0) {
      const index = stack.pop() as number
      visible[index] += ahead
      ahead++
    }

    return visible
  }

  const h = [10, 6, 8, 5, 11, 9],
    h2 = [5, 1, 2, 3, 10]

  console.log(visiblePeople(h))
}

/*
a: [0, 0, 0, 0, 0]

c: 10 => 10

10, c: 6 => 10, 6

10, 6, c: 8 => 10, 8
  - pop 6's index, increase it & index behind by 1
  
a: [1, 1, 0, 0, 0]


*/