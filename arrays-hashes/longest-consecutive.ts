/*
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Example 1:
  Input: nums = [100,4,200,1,3,2]
  Output: 4
  Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
Example 2:
  Input: nums = [0,3,7,2,5,8,4,6,0,1] 
  Output: 9 (0, 1, 2, 2, 3, 4, 5, 6, 7, 8)
 
Constraints:
  0 <= nums.length <= 105
  -109 <= nums[i] <= 109
*/

function longestConsecutive0(numbers: number[]): number {
  function longestSequence(
    numbers: number[],
    startingIndex: number = 0,
    sequenceLengths: number[] = []
  ): number {
    if (startingIndex === numbers.length) return Math.max(...sequenceLengths)

    let sequenceLength = 1,
      nextSequenceIndex = numbers.length

    for (let index = startingIndex + 1; index < numbers.length; index++) {
      const difference = numbers[index] - numbers[index - 1]

      if (difference <= 1) {
        if (difference === 1) sequenceLength++
        continue
      }

      nextSequenceIndex = index
      break
    }

    sequenceLengths.push(sequenceLength)

    return longestSequence(numbers, nextSequenceIndex, sequenceLengths)
  }

  // O(nlogn + n) = O(nlogn) time, O()
  return longestSequence(numbers.sort((a, b) => a - b))
}

// function leftValueNeeded(sequenceLength: number, midLeftValue: number): number {
//   return Math.ceil(sequenceLength / 2) + midLeftValue
// }
// function rightValueNeeded(sequenceLength: number, midLeftValue: number): number {
//   return Math.ceil(sequenceLength / 2) + midLeftValue
// }

function longestConsecutive1(numbers: number[]): number {
  const sequenceLengths: Map<number, number> = new Map()

  for (const number of numbers) {
    const sequenceLength = sequenceLengths.get(number)

    if (sequenceLength === void 0) {
      if (!sequenceLengths.has(number - 1)) sequenceLengths.set(number - 1, 1)
      continue
    }
    const newLength = sequenceLength + 1,
      lengthOfCurrent = sequenceLengths.get(number - 1)

    if (lengthOfCurrent !== void 0) {
      if (newLength > lengthOfCurrent)
        sequenceLengths.set(number - 1, newLength)
    } else sequenceLengths.set(number - 1, newLength)
  }

  let longestLength = 0
  sequenceLengths.forEach((length, leftOfSequence) => {
    const rightMost = leftOfSequence + length,
      connectingSequenceLength = sequenceLengths.get(rightMost)

    let lengthToCompare = length
    if (connectingSequenceLength !== void 0) {
      const newLength = connectingSequenceLength + length
      sequenceLengths.set(leftOfSequence, newLength)
      lengthToCompare = newLength
    }

    if (lengthToCompare > longestLength) longestLength = lengthToCompare
  })

  return longestLength
}

function longestConsecutive(nums: number[]): number {
  const numbers = new Set(nums)
  let longestLength = 0

  numbers.forEach(number => {
    numbers.delete(number)
    let sequenceLength = 1,
      smaller = number - 1,
      larger = number + 1

    // O(1) time
    while (numbers.has(smaller)) {
      numbers.delete(smaller)
      sequenceLength++
      smaller--
    }

    while (numbers.has(larger)) {
      numbers.delete(larger)
      sequenceLength++
      larger++
    }

    longestLength = Math.max(longestLength, sequenceLength)
  })

  return longestLength
}
