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

    // If num is stored, it connects to that sequence.
    if (sequenceLength !== void 0) {
      // Add 1 to that length,
      const newLength = sequenceLength + 1,
        // Get the left value of the current number in iteration,
        lengthOfCurrent = sequenceLengths.get(number - 1)

      // & if that number is currenty stored, AND the stored length is less than the current length, overwrite it with the current.
      if (lengthOfCurrent !== void 0) {
        if (newLength > lengthOfCurrent)
          sequenceLengths.set(number - 1, newLength)
      }
      // If that number is not current stored, store it.
      else sequenceLengths.set(number - 1, newLength)

      // Delete num from sequence.
      sequenceLengths.delete(number)

      continue
    }

    const storedLength = sequenceLengths.get(number - 1)

    if (storedLength === void 0) sequenceLengths.set(number - 1, 1)
  }

  return 0
}

console.log(longestConsecutive1([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))
