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
      while (decreasingStack.length > 0 && current <= peek()) {
        const index = decreasingStack.pop() as number
        popped++
        visible[index] = popped
      }

      decreasingStack.push(i)
    }

    let ahead = 0
    while (decreasingStack.length > 0) {
      const index = decreasingStack.pop() as number
    }
  }

  const h = [10, 6, 8, 5, 11, 9]

  console.log(visiblePeople(h))
}
