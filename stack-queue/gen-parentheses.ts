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

function generateParentheses(n: number): string[] {
  function recursiveParentheses(
    n: number,
    tokens: string,
    nestDepth: number
  ): void {
    if (n === 0) {
      PERMUTATIONS.push(tokens)
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

function constructParenthesisString(order: string): string {
  let result = "";
  let depth = 0;
  for (let i = 0; i < order.length; i++) {
    if (order[i] === "A") {
      result += "()";
    } else if (order[i] === "N") {
      result = `(${result})`;
      depth++;
    } else if (order[i] === "C") {
      while (depth > 0) {
        result += ")";
        depth--;
      }
      result += "()";
    }
  }
  while (depth > 0) {
    result += ")";
    depth--;
  }
  return result;
}

console.log(constructParenthesisString('AAA'))
console.log(constructParenthesisString('AAN'))
console.log(constructParenthesisString('ANC'))