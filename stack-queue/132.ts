function nextGreater(numbers: number[]): Map<number, number> {
  const nonIncreasingStack: number[] = [],
    result: Map<number, number> = new Map()

  for (let i = 0; i < numbers.length; i++) {
    const current = numbers[i]

    while (
      nonIncreasingStack.length > 0 &&
      current > numbers[nonIncreasingStack.at(-1) as number]
    ) {
      const index = nonIncreasingStack.pop() as number

      result.set(i, index)
    }

    nonIncreasingStack.push(i)
  }

  return result
}
function brute(numbers: number[]): boolean {
  for (let i = 0; i < numbers.length; i++) {
    const I = numbers[i]
    for (let j = i + 1; j < numbers.length; j++) {
      const J = numbers[j]
      if (J <= I) continue

      for (let k = j + 1; k < numbers.length; k++) {
        const K = numbers[k]

        if (K < J && K > I) return true
      }
    }
  }

  return false
}

function derivative(numbers: number[]): boolean {
  const areas: number[][] = []

  let isPositive: boolean = numbers[2] > numbers[1],
    wasPositive: boolean = numbers[1] > numbers[0]

  if (isPositive !== wasPositive) {
    areas.push([wasPositive, []])
  }

  for (let i = 3; i < numbers.length; i++) {
    const current = numbers[i],
      previous = numbers[i - 1]
  }
}

console.log(brute([3, 1, 4, 2]))

console.log(brute([-1, 3, 2, 0]))
