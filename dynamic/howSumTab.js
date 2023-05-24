'use strict'
import log from './log.js'

/*      How Sum
Given a number and an array of numbers, return an array containing any combination of numbers from the array argument that add up to the given number. Array numbers may be repeated.*/

/**
 * @param {number} target
 * @param {number[]} nums
 * @time O(tn^3 * log(n))
 * @space O(nt^2)
 */
function howSum(target, nums) {
  const table = [[]],
    sorted = [...nums].sort() // T: O(n^2 * log(n))

  // T: O(t)
  for (let i = 0; i < target; i++) {
    if (sorted[sorted.length - 1] + i > target) sorted.pop()
    if (sorted.length === 0) break
    if (table[i])
      // T: O(n)
      for (const num of sorted)
      // prettier-ignore
      // @ts-ignore
        if (num + i <= target) table[num + i] = [...table[i], num]
    if (table[target]) return table[target]
  }

  return table[target] ?? null
}

// console.time()
log(howSum(7, [2, 3])) // [3, 2, 2]
log(howSum(7, [5, 3, 4, 7])) // [3, 4]
log(howSum(7, [2, 4])) // null
log(howSum(8, [2, 3, 5])) // [2, 2, 2, 2]
log(howSum(300, [7, 14])) // null
// console.timeEnd()
