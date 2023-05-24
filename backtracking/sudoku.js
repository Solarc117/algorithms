'use strict'
import log from './log.js'

/*

*/

function isValid(sudoku) {
  // Check if sudoku board is valid.
}

function getCandidates(sudoku) {
}

function search(sudoku) {
  if (isValid(sudoku)) return sudoku

  for (const candidate of getCandidates(sudoku)) {
    sudoku.push(candidate)
    search(sudoku)
    sudoku.pop()
  }
}

function solve(sudoku) {
  return search(sudoku) || null
}