'use strict'
import log from './log.js'

/*                  Best Sum
Write a function bestSum(target, nums) that returns the shortest combination of numbers (from the nums array) that add up to the target sum.

If tied, return any of the tied combinations.

Ex., bestSum(10, [2, 5]) => [5, 5] (instead of [2, 2, 2, 2, 2])
*/

// Incorrect: in the case of 8, [1, 4, 5] it returns [5, 1, 1, 1] instead of [4, 4].
function bestSumSort(target, nums) {
  function shortestSum(target, nums) {
    if (target < 0) return null // O(1)
    if (target === 0) return [] // O(1)

    for (const num of nums) {
      // O(n), or O(l) if l is nums.length.
      const result = shortestSum(target - num, nums) //

      if (!Array.isArray(result)) continue // O(10)

      result.push(num) // O(1)
      return result // O(1)
    }

    return null // O(1)
  }

  return shortestSum(
    target,
    nums.sort((a, b) => b - a) // Node implements V8's sorting algorithm, Timsort, which has a complexity of O(nlogn).
  )
}

function bestSum(target, nums) {
  if (target < 0) return null
  if (target === 0) return []
  let shortest = null

  for (const num of nums) {
    // O(l)
    const result = bestSum(target - num, nums)
    if (!Array.isArray(result)) continue

    result.push(num)
    if (shortest === null || result.length < shortest.length) shortest = result
  }

  return shortest
}

function bestSumMemo(target, nums, memo = {}) {
  if (target in memo) return memo[target]
  if (target < 0) return null
  if (target === 0) return []
  let shortest = null

  for (const num of nums) {
    // O(n)
    // Could not find a way to use the push method, which has a constant time complexity, so ended up using the spread operator in current.
    const rem = target - num,
      result = bestSumMemo(rem, nums, memo)

    if (!Array.isArray(result)) continue

    if (shortest === null || result.length + 1 < shortest.length)
      shortest = [...result, num]
  }

  memo[target] = shortest
  return shortest
}

// [7], [3, 5], [4, 4], [25, 25, 25, 25]

// log(bestSumSort(7, [5, 3, 4, 7]))
// log(bestSumSort(8, [2, 3, 5]))
// log(bestSumSort(8, [1, 4, 5]))
// log(bestSumSort(100, [1, 2, 5, 25]), '\n')

// log(bestSum(7, [5, 3, 4, 7]))
// log(bestSum(8, [2, 3, 5]))
// log(bestSum(8, [1, 4, 5]))
// log(bestSum(100, [1, 2, 5, 25]), '\n')

// log(bestSumMemo(6, [2, 4]))
log(bestSumMemo(7, [5, 3, 4, 7]))
log(bestSumMemo(8, [2, 3, 5]))
log(bestSumMemo(8, [1, 4, 5]))
log(bestSumMemo(100, [1, 2, 5, 25]), '\n')
