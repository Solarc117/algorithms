'use strict'
import log from './log.js'

/*          Fibonacci
Implement a fib(n) function using tabulation.
*/

function fibTab(n) {
  const table = new Array(n + 1).fill(0)
  table[1] = 1

  for (let i = 0; i <= n; i++) {
    const current = table[i]
    table[i + 1] += current
    table[i + 2] += current
  }

  log(table)

  return table[n]
}

log(fibTab(2)) // 1
log(fibTab(3)) // 2
log(fibTab(4)) // 3
log(fibTab(5)) // 5
log(fibTab(6)) // 8
log(fibTab(30)) // 832040
