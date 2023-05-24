'use strict'
import log from './log.js'

/**
 * @param {string} target 
 * @param {string[]} wordBank 
 * @returns {boolean}
 * @time O(nt^2)
 * @space O(t)
 */
function canConstruct(target, wordBank) {
  const table = [true]

  for (let i = 0; i < target.length; i++) { // T: O(t * (t + tn)) = O(t^2 + nt^2) = O(t^2(n + 1)) => O(nt^2)
    if (!table[i]) continue
    const substr = target.slice(i) // T: O(t) ↑

    for (const word of wordBank) // T: O(n * t) ↑
      if (substr.startsWith(word) && word.length + i <= target.length) // T: O(t) ↑
        table[word.length + i] = true
  }

  return table[target.length] ?? false
}

// true, false, true, false
log(canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']))
log(canConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']))
log(canConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']))
log(
  canConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeef', [
    'e',
    'ee',
    'eee',
    'eeee',
    'eeeee',
    'eeeeee',
  ])
)
