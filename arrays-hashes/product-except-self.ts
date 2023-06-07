/*
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

Example 1:
  Input: nums = [1,2,3,4]
  Output: [24,12,8,6]
  nums[0] = nums[1] * nums[2] * nums[3] = 2 * 3 * 4 = 24
  nums[1] = nums[0] * nums[2] * nums[3] = 1 * 3 * 4 = 12
  nums[2] = nums[0] * nums[1] * nums[3] = 1 * 2 * 4 = 8
  nums[3] = nums[0] * nums[1] * nums[2] = 1 * 2 * 3 = 6
  
Example 2:
  Input: nums = [-1,1,0,-3,3]
  Output: [0,0,9,0,0]

Constraints:
  2 <= nums.length <= 105
  -30 <= nums[i] <= 30
  The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)
*/

// O(n) time, O(1) space.
function productExceptK(numbers: number[], excludedIndex: number): number {
  let answer = 1

  for (let index = 0; index < numbers.length; index++) {
    if (index === excludedIndex) continue
    answer *= numbers[index]
  }

  return answer
}

// O(n^2) time, O(n) space.
function productExceptSelf(numbers: number[]): number[] {
  const answer = []

  // O(n)
  for (let excludedIndex = 0; excludedIndex < numbers.length; excludedIndex++) {
    let product = 1

    // O(n)
    for (let index = 0; index < numbers.length; index++)
      if (index !== excludedIndex) product *= numbers[index]

    answer.push(product)
  }

  return answer
}

/*
Each element will be a product of all the elements on the right, and all the elements on the left.
*/
function productExceptSelf2(numbers: number[]): number[] {
  const lefts = [1],
    rights = Array(numbers.length),
    result = []
  rights[rights.length - 1] = 1

  for (let index = 1; index < numbers.length; index++)
    lefts[index] = lefts[index - 1] * numbers[index - 1]

  for (let index = rights.length - 2; index >= 0; index--)
    rights[index] = rights[index + 1] * numbers[index + 1]

  for (let index = 0; index < numbers.length; index++)
    result[index] = lefts[index] * rights[index]

  return result
}

function productExceptSelf3(numbers: number[]): number[] {
  const result = [1],
    rights: number[] = Array(numbers.length)
  rights[rights.length - 1] = 1

  // Insert lefts in every result slot.
  for (let index = 1; index < numbers.length; index++)
    result[index] = result[index - 1] * numbers[index - 1]

  // Multiply the default right product (1) by the right element in numbers, and store as the rightProduct. Multiply by the currently stored 
  let rightProduct = 1
  for (let index = numbers.length - 2; index >= 0; index--) {
    rightProduct *= numbers[index + 1]
    result[index] *= rightProduct
  }

  return result
}

console.log(productExceptSelf3([1, 2, 3, 4]))
console.log(productExceptSelf3([2, 3, 4, 5]))
