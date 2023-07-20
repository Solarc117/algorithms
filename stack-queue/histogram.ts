function getSubLists(numbers: number[], subtractor: number = 0): number[][] {
  const result: number[][] = []
  let subList: number[] = []

  for (const number of numbers) {
    const remainder = number - subtractor

    if (remainder !== 0) {
      subList.push(remainder)
      continue
    }

    if (subList.length <= 0) continue

    result.push(subList)
    subList = []
  }

  if (subList.length > 0) result.push(subList)

  return result
}

function largestRectangleArea0(heights: number[], height: number = 0): number {
  const smallest = Math.min(...heights),
    area = smallest * heights.length + height * heights.length,
    subLists = getSubLists(heights, smallest)

  return Math.max(
    area,
    ...subLists.map(subList =>
      largestRectangleArea0(subList, height + smallest)
    )
  )
}

function largestRectangleArea(heights: number[]): number {
  const skips: Set<number> = new Set()
  let largest = 0

  for (let i = 0; i < heights.length; i++) {
    if (skips.has(i)) continue

    const height = heights.at(i) as number
    let area = height,
      left = i - 1,
      right = i + 1

    while (left > -1) {
      const h = heights.at(left) as number

      if (h < height) break
      if (h === height) skips.add(i)

      area += height
      left--
    }

    while (right < heights.length) {
      const h = heights.at(right) as number

      if (h < height) break
      if (h === height) skips.add(i)

      area += height
      right++
    }

    if (area > largest) largest = area
  }

  return largest
}

// const numbers = [2, 1, 5, 6, 2, 3]

// console.log('largestRectangleArea:', largestRectangleArea0(numbers))
