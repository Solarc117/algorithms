function containsDuplicate(numbers: number[]): boolean {
  const previousNumbers: Set<number> = new Set()

  for (let index = numbers.length - 1; index >= 0; index--)
    if (previousNumbers.has(number[index])) return true
    else previousNumbers.add(numbers.pop())

  return false
}

function containsDuplicateHash(numbers: [number]): boolean {
  const previousNumbers: Hash
}

