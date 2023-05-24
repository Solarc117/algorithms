'use strict'
import log from './log.js'

// @ts-ignore
String.prototype.remove = function (regex) {
  this.replace(regex, '')
}
// @ts-ignore
String.prototype.replaceAt = function (index, char) {
  return this.slice(0, index) + char + this.slice(index + 1)
}
// @ts-ignore
Set.prototype.addAll = function (...vals) {
  for (const val of vals) this.add(val)
}
// @ts-ignore
Set.prototype.deleteAll = function (...vals) {
  for (const val of vals) this.delete(val)
}
// @ts-ignore
Set.prototype.copy = function () {
  return new Set([...this.values()])
}
// @ts-ignore
Set.prototype.equalTo = function (set) {
  return this.size === set.size && [...this.values()].every(v => set.has(v))
}

/*
1. If no queens coords yet, return an array containing all possible indexes.
2. If there are queencoords, return only valid indexes.
*/
function getCandidates(queenCoords, n) {
  const columns = []
  for (let i = 0; i < n; i++) columns.push(i)
  if (queenCoords.length === 0) return columns

  const rowToFill = queenCoords.length,
    validColumns = new Set(columns)

  for (const [queenRow, queenColumn] of queenCoords.entries()) {
    const distance = rowToFill - queenRow

    // @ts-ignore
    validColumns.deleteAll(
      queenColumn,
      queenColumn + distance,
      queenColumn - distance
    )
  }

  return validColumns
}

function search(queenCoords, solutions, n) {
  if (queenCoords.length === n) solutions.add(queenCoords.join(''))

  for (const candidate of getCandidates(queenCoords, n)) {
    queenCoords.push(candidate)
    search(queenCoords, solutions, n)
    queenCoords.pop()
  }
}

function nQueens(n) {
  const solutions = new Set(),
    queenCoords = []

  search(queenCoords, solutions, n)

  return solutions
}

function format(solutions) {
  const boards = []

  for (const solution of solutions) {
    const board = []

    for (const char of solution.split(''))
    // prettier-ignore
    // @ts-ignore
      board.push('....'.replaceAt(+char, 'Q'))

    boards.push(board)
  }

  return boards
}

log(format(nQueens(1))) // {}
log(format(nQueens(2))) // { '0' }
log(format(nQueens(3))) // {}
log(format(nQueens(4))) // { '1302', '2031' }
