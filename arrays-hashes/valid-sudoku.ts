function validSudoku(board: string[][]): boolean {
  // O(1) t
  function gridIndex(rowIndex: number, columnIndex: number): number {
    return (rowIndex < 3 ? [0, 1, 2] : rowIndex > 5 ? [6, 7, 8] : [3, 4, 5])[
      Math.floor(columnIndex / 3)
    ]
  }
  // At worst, each element in the rows/columns/grids arrays will be a set of 9 integers, so each array would contain 9*9 items = 81, and there are three arrays, so 81*3 = 243. If n is the number of values in a sudoku board, space scales by a factor of 3n, so O(3n) => O(n) s.
  const areaSets: { [key: string]: Set<string>[] } = {
    rows: Array(9),
    columns: Array(9),
    grids: Array(9),
  }

  // O(n^2)? t
  // O((1/9)n) => O(n) t
  for (let rowIndex = 0; rowIndex < 9; rowIndex++)
    // O(n) t
    for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
      const value = board[rowIndex][columnIndex]
      if (value === '.') continue

      for (const { area, index } of [
        { area: 'rows', index: rowIndex },
        { area: 'columns', index: columnIndex },
        { area: 'grids', index: gridIndex(rowIndex, columnIndex) },
      ]) {
        if (areaSets[area][index] === void 0) areaSets[area][index] = new Set()
        if (areaSets[area][index].has(value)) return false

        areaSets[area][index].add(value)
      }
    }

  return true
}

console.log(
  validSudoku([
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ]),
  validSudoku([
    ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ])
)
