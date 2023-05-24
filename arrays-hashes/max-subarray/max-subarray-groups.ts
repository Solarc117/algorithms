function group(numbers: number[]): number[] {
  function meetsCondition(
    number: number,
    currentGroupPositive: -  ): boolean {
    return (
      (currentGroupIsPositive && number >= 0) ||
      (!currentGroupIsPositive && number < 0)
    )
  }
  const groups: number[] = []
  let currentSum: number = 0,
    currentGroupIsPositive: boolean = numbers[0] >= 0

  for (let index: number = 0; index < numbers.length; index++) {
    const number = numbers[index]

    if (meetsCondition(number, currentGroupIsPositive)) {
      currentSum += number
      continue
    }

    currentGroupIsPositive = !currentGroupIsPositive
    groups.push(currentSum)
    currentSum = number
  }

  groups.push(currentSum)
  return groups
}
function maxSubArraySum(groupedNumbers: number[]): number {
  function getArraySum(accumulator: number, currentValue: number): number {
    return accumulator + currentValue
  }
  let largestEncounteredSum: number = groupedNumbers[0]

  for (
    let subArrayStartingIndex = 0;
    subArrayStartingIndex < groupedNumbers.length;
    subArrayStartingIndex++
  ) {
    for (
      let subArrayLength = 1;
      subArrayLength <= groupedNumbers.length - subArrayStartingIndex;
      subArrayLength++
    ) {
      const subArray: number[] = groupedNumbers.slice(
          subArrayStartingIndex,
          subArrayStartingIndex + subArrayLength
        ),
        subArraySum: number = subArray.reduce(getArraySum, 0)
      if (largestEncounteredSum === null || subArraySum > largestEncounteredSum)
        largestEncounteredSum = subArraySum
    }
  }

  return largestEncounteredSum
}

console.log('maxSubArraySum(group([-2, 1, -3, 4, -1, 2, 1, -5, 4])):', maxSubArraySum(group([-2, 1, -3, 4, -1, 2, 1, -5, 4]))) // 6
console.log('maxSubArraySum(group([1])):', maxSubArraySum(group([1]))) // 1
console.log('maxSubArraySum(group([5, 4, -1, 7, 8])):', maxSubArraySum(group([5, 4, -1, 7, 8]))) // 23