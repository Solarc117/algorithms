function containsDuplicate(numbers: number[]): boolean {
  // For every number in the array, iterate through the REST of the array, returning true at any point of the nested pointer matches
  for (let pointer1 = 0; pointer1 < numbers.length; pointer1++) {
    const currentNumber = numbers[pointer1]

    for (let pointer2 = pointer1 + 1; pointer2 < numbers.length; pointer2++) {
      const nextNumber = numbers[pointer2]

      if (currentNumber === nextNumber) return true
    }
  } 

  return false
}

console.log(
  containsDuplicate([0, 1, 2, 3, 4]), // false
  containsDuplicate([0, 1, 2, 3, 4, 1]), // true
  containsDuplicate([]), // false
  containsDuplicate([1, 1]), // true
  containsDuplicate([1]) // false
)
