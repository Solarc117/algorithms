function validSudoku(board: string[][]): boolean {
  function gridIndex(rowIndex: number, columnIndex: number): number {
    return (rowIndex < 3 ? [0, 1, 2] : rowIndex > 5 ? [6, 7, 8] : [3, 4, 5])[
      Math.floor(columnIndex / 3)
    ]
  }

  const areaSets: { [key: string]: Set<string>[] } = {
    rows: Array(9),
    columns: Array(9),
    grids: Array(9),
  }

  for (let rowIndex = 0; rowIndex < 9; rowIndex++)
    for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
      const value = board[rowIndex][columnIndex]
      if (value === '.') continue

      for (let area of [
        areaSets.rows[rowIndex],
        areaSets.columns[columnIndex],
        areaSets.grids[gridIndex(rowIndex, columnIndex)],
      ]) {
        if (area === void 0) area = new Set()
        if (area.has(value)) return false

        area.add(value)
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
