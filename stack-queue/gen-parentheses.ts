/*
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Example 1:
  Input: n = 3
  Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:
  Input: n = 1
  Output: ["()"]

Constraints:
  1 <= n <= 8
*/

function constructParenthesisString(tokens: string): string {
  let parentheses = '',
    nests = 0

  for (const token of tokens) {
    if (token === 'A') {
      if (parentheses.at(-1) === '(') parentheses += ')'
      parentheses += '('
      continue
    }

    if (token === 'N') {
      parentheses += '('
      nests++
      continue
    }

    parentheses += '))('
    nests--
  }

  parentheses += ')'

  while (nests > 0) {
    parentheses += ')'
    nests--
  }

  return parentheses
}

function generateParentheses0(n: number): string[] {
  function recursiveParentheses(
    n: number,
    tokens: string,
    nestDepth: number
  ): void {
    if (n === 0) {
      PERMUTATIONS.push(constructParenthesisString(tokens))
      return
    }

    recursiveParentheses(n - 1, `${tokens}A`, nestDepth)
    recursiveParentheses(n - 1, `${tokens}N`, nestDepth + 1)
    if (nestDepth > 0) recursiveParentheses(n - 1, `${tokens}C`, nestDepth - 1)
  }
  const PERMUTATIONS: string[] = []
  recursiveParentheses(n - 1, 'A', 0)

  return PERMUTATIONS
}

function generateParentheses(n: number): string[] {
  function recursiveParentheses(
    n: number,
    parentheses: string,
    nests: number
  ): void {
    if (n === 0) {
      let closedParentheses = `${parentheses})`
      for (let i = 0; i < nests; i++) closedParentheses += ')'
      PERMUTATIONS.push(closedParentheses)
      return
    }

    recursiveParentheses(
      n - 1,
      `${parentheses}${parentheses.at(-1) === '(' ? ')(' : ')'}`,
      nests
    )
    recursiveParentheses(n - 1, `${parentheses}(`, nests + 1)
    if (nests > 0) {
      for (let i = nests; i > 0; i--)
      recursiveParentheses(n - 1, `${parentheses})${')'.repeat(i)}(`, nests - i)
    }
  }
  const PERMUTATIONS: string[] = []
  recursiveParentheses(n - 1, '(', 0)

  return PERMUTATIONS
}

