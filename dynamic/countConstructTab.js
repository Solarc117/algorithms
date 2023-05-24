'use strict'
import log from './log.js'

/**
 * @param {string} target 
 * @param {string[]} wordBank 
 * @returns {number}
 * @time O(nt^2)
 * @space O(t)
 */
function countConstruct(target, wordBank) {
  const table = Array(target.length + 1).fill(0)
  table[0] = 1

  // T: O(t * (t + tn)) = O(t^2 + nt^2) = O(t^2(n + 1)) => O(nt^2)
  for (let i = 0; i < target.length; i++) {
    if (!table[i]) continue
    const substr = target.slice(i) // T: O(t) ↑

    for (const word of wordBank) // T: O(n * t) ↑
      if (substr.startsWith(word) && word.length + i <= target.length)
        // T: O(t) ↑
        table[word.length + i] += table[i]
  }

  return table[target.length]
}

// 2, 1, 0, 4, 0
log(countConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl']))
log(countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']))
log(countConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']))
log(
  countConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'])
)
log(
  countConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeef', [
    'e',
    'ee',
    'eee',
    'eeee',
    'eeeee',
    'eeeeee',
  ])
)
