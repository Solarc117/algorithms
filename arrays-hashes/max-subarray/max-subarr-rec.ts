class MaxSubArraySumCalculator {
  static calculate(
    numbers: number[],
    currentIndex: number = 0,
    currentSum?: number
  ): number {
    const currentItem: number = numbers.at(currentIndex)

    if (typeof currentSum === 'number') {
      const sumIncludingCurrentItem = currentSum + numbers.at(currentIndex),
        continuedSum = this.calculate(
          numbers,
          currentIndex + 1,
          sumIncludingCurrentItem
        )

      return Math.max(currentSum, continuedSum)
    } 

    const sumIncludingCurrentItem = numbers.at(currentIndex),
      inclusiveSum = this.calculate(
        numbers,
        currentIndex + 1,
        sumIncludingCurrentItem
      ),
      exclusiveSum = this.calculate(numbers, currentIndex + 1)
    
    return Math.max(inclusiveSum, exclusiveSum)
  }
}
