'use strict'
import log from './log.js'

function factors(num) {
  const factors = []

  for (let i = 1; i <= Math.floor(num / 2); i++)
    if (num % i === 0) log(i, num / i)
}

// function factorialSum(num, memo = {}) {
//   if (num in memo) return memo[num]
//   if (num < 0) return 0
//   if (num === 0) return 1

//   memo[num] = num + factorialSum(num - 1)
//   return memo[num]
// }

// for (let i = 0; i < 100; i++) {
//   log(Math.pow(i, 2), factorialSum(i))
// }


factors(60)