/*
Given an array of integers "temperatures" representing the daily temperatures, return an array "answer" such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

Example 1:
  Input: temperatures = [73,74,75,71,69,72,76,73]
  Output: [1,1,4,2,1,1,0,0]
Example 2:
  Input: temperatures = [30,40,50,60]
  Output: [1,1,1,0]
Example 3:
  Input: temperatures = [30,60,90]
  Output: [1,1,0]

Constraints:
  1 <= temperatures.length <= 105
  30 <= temperatures[i] <= 100
*/

function indexedMergeSort(values: number[]): number[][] {
  function mergeSort(values: number[][]): number[][] {
    if (values.length <= 1) return values

    const midIndex = Math.floor(values.length / 2),
      left = mergeSort(values.slice(0, midIndex)),
      right = mergeSort(values.slice(midIndex)),
      sorted = []

    let leftIndex = 0,
      rightIndex = 0

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex][0] < right[rightIndex][0]) {
        sorted.push(left[leftIndex])
        leftIndex++
        continue
      }

      sorted.push(right[rightIndex])
      rightIndex++
    }

    for (let i = rightIndex; i < right.length; i++) sorted.push(right[i])
    for (let i = leftIndex; i < left.length; i++) sorted.push(left[i])

    return sorted
  }
  return mergeSort(values.map((v, i) => [v, i]))
}

function dailyTemperatures(temperatures: number[], defaultValue: number = 0): number[] {
  if (temperatures.length <= 1) return [defaultValue]

  const answer = Array(temperatures.length),
    sortedIndexes = indexedMergeSort(temperatures).map(([_, i]) => i)

  answer[answer.length - 1] = 0

  for (let index = sortedIndexes.length - 1; index >= 0; index--) {
    const indexOfNextLargest = sortedIndexes[index],
      left = temperatures.slice(0, indexOfNextLargest),
      right = temperatures.slice(indexOfNextLargest),
      leftAnswers = dailyTemperatures(left, )
  }
}
