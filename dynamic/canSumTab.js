'use strict'
import log from './log.js'

/*                Can Sum
Write a function canSum(target, nums) that takes in a target num and an array of nums as an argument, and returns
a boolean depicting whether it's possible to generate the target sum using numbers from the array.

- You may use an element of the array as many times as needed.
- You may assume all input numbers are non-negative.*/

/**
 * @param {number} target
 * @param {number[]} nums
 * @returns {boolean}
 * @time O(tn^2)
 * @space O(t)
 */
function canSum(target, nums) {
  const table = [true],
    sorted = [...nums].sort() // O(n)
  let count = 0

  // O(t)
  while (sorted.length > 0) {
    if (sorted[sorted.length - 1] + count > target) sorted.pop()
    if (table[count]) for (const num of nums) table[count + num] = true // O(n) ↑
    count++
  }

  return table[target] ?? false
}

/**
 * @param {number} target
 * @param {number[]} nums
 * @returns {boolean}
 * @time O(t(n^3)logn)
 * @space O(tn)
 */
// Seems slightly faster.
function canSum2(target, nums) {
  const table = [true],
    sorted = [...nums].sort() // T: O(n^2 * log(n))

  // T: O(t)
  for (let i = 0; i < target; i++) {
    if (sorted[sorted.length - 1] + i > target) sorted.pop()
    if (sorted.length === 0) break

    if (table[i]) for (const num of nums) table[i + num] = true // T: O(n) ↑
  }

  return table[target] ?? false
}

// console.time('while loop')
// canSum(7, [2, 3]) // true
// canSum(7, [5, 3, 4, 7]) // true
// canSum(7, [2, 4]) // false
// canSum(8, [2, 3, 5]) // true
// canSum(300, [7, 14]) // false
// console.timeEnd('while loop')

console.time('for loop')
log(canSum2(7, [2, 3])) // true
log(canSum2(7, [5, 3, 4, 7])) // true
log(canSum2(7, [2, 4])) // false
log(canSum2(8, [2, 3, 5])) // true
log(canSum2(300, [7, 14])) // false
console.timeEnd('for loop')
