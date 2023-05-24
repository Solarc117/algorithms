'use strict'
import log from './log.js'

// O(2^n) time, O(n) space.
function fib(n) {
  if (n <= 2) return 1

  return fib(n - 1) + fib(n - 2)
}

function fibonacci(n) {
  function isEven(num) {
    return num % 2 === 0
  }
  let odd = 1, // First.
    even = 1 // Second.

  for (let i = 3; i <= n; i++)
    isEven(i) ? (even += odd) : (odd += even)

  return isEven(n) ? even : odd
}

log(fibonacci(1)) // 1
log(fibonacci(2)) // 1
log(fibonacci(3)) // 2
log(fibonacci(4)) // 3
log(fibonacci(5)) // 5
log(fibonacci(6)) // 8
log(fibonacci(30)) // 832040
log(fibonacci(100)) // idklol


// O(n) time and space.
// Slightly faster than the array implementation, though I don't know why.
function fibHash(n, fibNums = { 1: 1, 2: 1 }) {
  if (fibNums[n]) return fibNums[n]

  fibNums[n] = fibHash(n - 1, fibNums) + fibHash(n - 2, fibNums)
  return fibNums[n]
}

// O(n) time and space.
function fibArr(n, fibNums = [1, 1]) {
  if (fibNums[n]) return fibNums[n]

  fibNums[n] = fibArr(n - 1, fibNums) + fibArr(n - 2, fibNums)
  return fibNums[n]
}

// Grid traversal: how many ways are there to traverse an m x n grid?
function gridTraversal(m, n) {
  if (m <= 0 || n <= 0) return 0
  if (m === 1 || n === 1) return 1

  return gridTraversal(m - 1, n) + gridTraversal(m, n - 1)
}

function gridTraversalMemo(m, n, memo = {}) {
  if (m <= 0 || n <= 0) return 0
  if (m === 1 || n === 1) return 1

  if (!(`${m}${n}` in memo))
    memo[`${m}${n}`] =
      gridTraversalMemo(m - 1, n, memo) + gridTraversalMemo(m, n - 1, memo)
  return memo[`${m}${n}`]
}

function gridTraversalMemoInterchange(m, n, memo = {}) {
  if (m <= 0 || n <= 0) return 0
  if (m === 1 || n === 1) return 1

  const sorted = [m, n].sort().join()

  if (!(sorted in memo))
    memo[sorted] =
      gridTraversalMemo(m - 1, n, memo) + gridTraversalMemo(m, n - 1, memo)
  return memo[sorted]
}

/* Write a function canSum(target, nums) that takes in a target num and an array of nums as an argument, and returns
a boolean depicting whether it's possible to generate the target sum using numbers from the array.

** You may use an element of the array as many times as needed.
** You may assume all input numbers are non-negative.*/

/* O(l ^ (t/m)) time, where:
  l is the length of nums,
  t is the target, and
  m is the smallest number in nums.

  O(t/m) space.
*/
function canSum(target, nums) {
  if (target < 0) return false
  if (target === 0) return true

  for (const num of nums) if (canSum(target - num, nums)) return true

  return false
}

/* O(lt/m) time? If we infer from the brute force time? Meaning we multiply the growth factor by the branching factor, instead of raising the former to the latter?
O(t/m) space.*/
function canSumMemo(target, nums, memo = {}) {
  if (target in memo) return memo[target]
  if (target < 0) return false
  if (target === 0) return true

  for (const num of nums) {
    const rem = target - num

    if (!(rem in memo)) memo[rem] = canSumMemo(rem, nums, memo)

    if (memo[rem]) return true
  }

  return false
}

/*                                  howSum

Same as previous problem, but instead of true we return the first exact sequence of numbers that sum up to the target sum.

Return null if no possible combinations, and [] if sum is 0.*/

/* Let:
t = target,
l = nums length,
m = smallest nums number.

Time: O(l^(t/m))
Space: O(t/m)
*/
function howSum(target, nums) {
  if (target < 0) return null // O(1)
  if (target === 0) return [] // O(1)

  for (const num of nums) {
    // O(l)
    const result = howSum(target - num, nums) // O(???)
    // If the recursive call above returned an array, we return whichever values are in that array, PLUS the current target sum
    if (!Array.isArray(result)) continue // O(1)

    result.push(num) // O(1)
    return result // O(1)
  }

  return null // O(1)
}

/* Time: O(lt/m) (?)
Space: O(t/m)
*/
function howSumMemo(target, nums, memo = {}) {
  if (target in memo) return memo[target] // O(log(memo.length))
  if (target < 0) return null // O(1)
  if (target === 0) return [] // O(1)

  for (const num of nums) {
    // O(l)
    const result = howSumMemo(target - num, nums, memo) // O(???)

    if (!Array.isArray(result)) continue // O(1)

    result.push(num) // O(1)
    memo[num] = result // O(1)
    return result // O(1)
  }

  memo[target] = null // O(1)
  return null // O(1)
}

// log(howSumMemo(7, [2, 3])) // [3, 2, 2]
// log(howSumMemo(7, [5, 3, 4, 7])) // [4, 3]
// log(howSumMemo(7, [2, 4])) // null
// log(howSumMemo(8, [2, 3, 5])) // [2, 2, 2, 2]
// log(howSumMemo(300, [7, 14])) // null
