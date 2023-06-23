/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
  Open brackets must be closed by the same type of brackets.
  Open brackets must be closed in the correct order.
  Every close bracket has a corresponding open bracket of the same type.

  Example 1:
  Input: s = "()"
  Output: true
Example 2:
  Input: s = "()[]{}"
  Output: true
Example 3:
  Input: s = "(]"
  Output: false

Constraints:
  1 <= s.length <= 104
  s consists of parentheses only '()[]{}'.
*/
import { Stack } from './index'

class Parentheses {
  static valid(parentheses: string): boolean {
    const pairsOfClosing = new Map<string, string>([
        [']', '['],
        ['}', '{'],
        [')', '('],
      ]),
      // O(n) space.
      stack = new Stack<string>()

    // O(n) time.
    for (const parenthesis of parentheses) {
      const parenthesisPair = pairsOfClosing.get(parenthesis)

      if (stack.size > 0 && stack.peek() === parenthesisPair) stack.remove()
      else stack.add(parenthesis)
    }

    return stack.size === 0
  }
}
