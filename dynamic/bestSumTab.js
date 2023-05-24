'use strict'
import log from './log.js'

/**
 * @param {number} target
 * @param {number[]} nums
 * @time O(t^2 * n^3 * log(n))
 * @space O(t/2) => O(t)
 */
function bestSum(target, nums) {
  const table = [[]],
    sorted = [...nums].sort() // T: O(n^2 * log(n))

  // O(t)
  for (let i = 0; i < target; i++) {
    if (sorted[sorted.length - 1] + i > target) sorted.pop()
    if (sorted.length === 0) break
    if (table[i])
      for (const num of sorted) // O(n)
          // prettier-ignore
          // @ts-ignore
          if (!table[num + i] || (num + i <= target && table[num + i].length > table[i].length + 1)) table[num + i] = [...table[i], num] // O(t)
  }

  return table[target] ?? null
}

// [7], [3, 5], [4, 4], [25, 25, 25, 25]
log(bestSum(7, [5, 3, 4, 7]))
log(bestSum(8, [2, 3, 5]))
log(bestSum(8, [1, 4, 5]))
log(bestSum(100, [1, 2, 5, 25]), '\n')
