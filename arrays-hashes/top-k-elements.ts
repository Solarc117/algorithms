/*
Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

Example 1:
  Input: nums = [1,1,1,2,2,3], k = 2
  Output: [1,2]

Example 2:
  Input: nums = [1], k = 1
  Output: [1]

Constraints:
  1 <= nums.length <= 105
  -104 <= nums[i] <= 104
  k is in the range [1, the number of unique elements in the array].
  It is guaranteed that the answer is unique.

Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
*/

/**
 * @time O(n + k + nlogn) => O(nlogn)
 * @space O(n + n + n) => O(n)
 * Can improve time complexity by using a data structure that organizes data proportionally, based on size. Treemap?
 */
function brute(numbers: number[], k: number): number[] {
  // O(n) space.
  const instances: { [key: number]: number } = {}
  // O(n) time.
  for (const number of numbers)
    instances[number] === void 0 ? (instances[number] = 1) : instances[number]++

  // O(n) space.
  const elements: number[][] = []
  // O(n) space.
  for (const number in instances) elements.push([+number, instances[number]])
  // O(nlogn) time.
  elements.sort(([, instances1], [, instances2]) => instances2 - instances1)

  const ans = []
  // O(k) time.
  for (let i = 0; i < k; i++) ans.push(elements[i][0])

  return ans
}

/**
 * @time O(n + n + nlogn) => O(2n + nlogn) => O(logn)?
 */
function brute2(nums: number[], k: number): number[] {
  // O(n) space.
  const instances: Map<number, number> = new Map()

  // O(n) time.
  for (const num of nums) {
    const storedVal = instances.get(num)
    storedVal === void 0
      ? instances.set(num, 1)
      : instances.set(num, storedVal + 1)
  }

  // O(n) for both array.from & map.entries, O(logn) for sort
  const sortedKeys = Array.from(instances.entries()).sort(
      (a, b) => b[1] - a[1]
    ),
    ans = []

  for (let i = 0; i < k; i++) ans.push(sortedKeys[i][0])

  return ans
}

function sortKElements(numbers: number[], k: number): number[] {
  const instances: { [key: number]: number } = {}

  return []
}

console.log(brute([1, 1, 1, 2, 2, 3], 2))
console.log(brute([1], 1))

class SortedArray {
  maxLength: number
  values: number[]

  constructor(maxLength: number, ...values: number[]) {
    this.maxLength = maxLength
    this.values = [...values].sort().slice(0, maxLength)
  }

  add(value: number): void {}
}
