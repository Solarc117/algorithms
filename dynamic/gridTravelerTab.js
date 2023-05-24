'use strict'
import log from './log.js'

/* Grid Traversal 
How many ways are there to traverse an m x n grid?
*/

/*
r = rows
c = columns
Time: O((c^2)(r^c))
Space: O(rc)
*/
/**
 * @param {number} rows
 * @param {number} columns
 * @returns {number[][]}
 * @time O(rc)
 * @space O(r + c)
 */
function createTable(rows, columns) {
  const table = [],
    firstRow = []

  for (let i = 0; i < columns; i++) firstRow.push(1) // O(c)
  table[0] = firstRow
  for (let i = 1; i < rows; i++) table.push([1]) // O(r)

  return table
}

/**
 * @param {number} rows 
 * @param {number} columns 
 * @returns {number}
 * @time O(rc * c^r)
 * @space O(rc)
 */
function gridTraversal(rows, columns) {
  const table = createTable(rows, columns) // O(rc)

  for (
    let i = 1;
    i < rows;
    i++ // O(r)
  )
    for (
      let j = 1;
      j < columns;
      j++ // O(c)
    )
      table[i][j] = table[i - 1][j] + table[i][j - 1]

  return table[rows - 1][columns - 1]
}

function fccGridTraversal(m, n) {
  const table = Array(m + 1)
    // @ts-ignore
    .fill()
    .map(() => Array(n + 1).fill(0))

  table[1][1] = 1
  for (let row = 0; row <= m; row++)
    for (let column = 0; column <= n; column++) {
      const current = table[row][column]
      if (row + 1 <= m) table[row + 1][column] += current
      if (column + 1 <= n) table[row][column + 1] += current
    }

  return table[m][n]
}

// console.time('carlos')
// gridTraversal(1, 1) // 1
// gridTraversal(3, 2) // 3
// gridTraversal(2, 3) // 3
// gridTraversal(3, 3) // 6
// gridTraversal(18, 18) // 2333606220
// console.timeEnd('carlos')

console.time('fcc')
fccGridTraversal(1, 1) // 1
fccGridTraversal(3, 2) // 3
fccGridTraversal(2, 3) // 3
fccGridTraversal(3, 3) // 6
fccGridTraversal(18, 18) // 2333606220
console.timeEnd('fcc')
