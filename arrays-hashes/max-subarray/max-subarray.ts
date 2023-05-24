function arraySumReducer(accumulator: number, currentValue: number): number {
  return accumulator + currentValue
}
function maxSubArraySum(numbers: number[]): number {
  let largestEncounteredSum: number = numbers[0]

  for (
    let subArrayStartingIndex = 0;
    subArrayStartingIndex < numbers.length;
    subArrayStartingIndex++
  ) {
    for (
      let subArrayLength = 1;
      subArrayLength <= numbers.length - subArrayStartingIndex;
      subArrayLength++
    ) {
      const subArray: number[] = numbers.slice(
          subArrayStartingIndex,
          subArrayStartingIndex + subArrayLength
        ),
        subArraySum: number = subArray.reduce(arraySumReducer, 0)
      if (largestEncounteredSum === null || subArraySum > largestEncounteredSum)
        largestEncounteredSum = subArraySum
    }
  }

  return largestEncounteredSum
}

