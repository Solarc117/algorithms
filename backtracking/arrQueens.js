'use strict'
import log from './log.js'

/*
given a board, return how many possibilities there are 
 */

function columnCoords(column, n) {
  const coords = []

  for (let i = 1; i <= n; i++) coords.push(`${column}${i}`)

  return coords
}

function rowCoords(row, n) {
  const coords = [],
    minCharCode = 65,
    maxCharCode = minCharCode + n - 1

  for (
    let currCharCode = minCharCode;
    currCharCode <= maxCharCode;
    currCharCode++
  )
    coords.push(`${String.fromCharCode(currCharCode)}${row}`)

  return coords
}

function diagCoords(coord, n) {
  function sideDiagCoords(n, coord, dist) {
    // Assumes the charCode in the coord is within range, though it could check since n is passed.
    const coords = [],
      currCharCode = coord.charCodeAt(0) + dist,
      origRow = +coord[1],
      row1 = origRow + dist,
      row2 = origRow - dist

    for (const row of [row1, row2])
      if (row >= 1 && row <= n)
        coords.push(`${String.fromCharCode(currCharCode)}${row}`)

    return coords
  }
  const coords = [],
    origCharCode = coord.charCodeAt(0),
    minCharCode = 65,
    maxCharCode = minCharCode + n - 1

  for (
    let currCharCode = origCharCode - 1;
    currCharCode >= minCharCode;
    currCharCode--
  ) {
    const dist = currCharCode - origCharCode,
      diags = sideDiagCoords(n, coord, dist)

    if (diags.length > 0) coords.push(...diags)
  }

  for (
    let currCharCode = origCharCode + 1;
    currCharCode <= maxCharCode;
    currCharCode++
  ) {
    const dist = currCharCode - origCharCode,
      diags = sideDiagCoords(n, coord, dist)

    if (diags.length > 0) coords.push(...diags)
  }

  return coords
}

function isValid(n, queenCoords) {
  /* 
    Starting with the queen on the first column, and for every column right of that sequentially:
      If the queen is on an invalid square, return false.
      If the queen is the last queen, return true.
      Render the appropriate squares 'invalid' - that is, the current row, column, and diagonals, including the queen's current position..
     Return the result of the new board, with the invalid squares, and the current queen count.
    */
  if (!Array.isArray(queenCoords)) return false

  const invalidCoords = []

  for (const [i, coord] of queenCoords.entries()) {
    if (invalidCoords.includes(coord)) return false
    if (i === n - 1) return true
    if (i === queenCoords.length) return false

    const column = coord[0],
      row = coord[1]
    invalidCoords.push(
      ...columnCoords(column, n),
      ...rowCoords(row, n),
      ...diagCoords(coord, n)
    )
  }

  return false
}

function coordsFromN(n) {
  if (n < 1 || n % 1 !== 0 || n > 26) return []

  const coords = [],
    firstCharCode = 65,
    lastCharCode = firstCharCode + n - 1

  for (let charCode = firstCharCode; charCode <= lastCharCode; charCode++)
    for (let row = 1; row <= n; row++)
      coords.push(`${String.fromCharCode(charCode)}${row}`)

  return coords
}

/**
 *
 * @param {number} n
 * @param {Array} queenCoords
 * @param {Array} valCoords
 * @returns {Array}
 */
function getCandidateCoords(n, queenCoords, valCoords = coordsFromN(n)) {
  const validCoords = [valCoords],
    candidates = []

  for (const [column, row] of queenCoords) {
    validCoords.deleteAll(
      ...columnCoords(column, n),
      ...rowCoords(row, n),
      ...diagCoords(coord, n)
    )
    if (validCoords.length === 0) return candidates
  }

  for (const coord of validCoords) candidates.push([...queenCoords, coord])

  return candidates
}
