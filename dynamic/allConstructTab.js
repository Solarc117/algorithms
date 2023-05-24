'use strict'
import log from './log.js'

function allConstruct(target, wordBank) {
  const table = Array(target.length + 1)
    // prettier-ignore
    // @ts-ignore
    .fill()
    .map(() => [])
  table[0] = [[]]

  for (let i = 0; i < target.length; i++)
    if (table[i].length > 0)
      for (const word of wordBank)
        if (
          target.slice(i).startsWith(word) &&
          word.length + i <= target.length
        )
          for (const arr of table[i])
        // prettier-ignore
        // @ts-ignore
            table[word.length + i].push([...arr, word])

  return table[target.length]
}

log(allConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl']))
log(allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']))
log(allConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']))
log(allConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']))
log(
  allConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
    'e',
    'ee',
    'eee',
    'eeee',
    'eeeee',
    'eeeeee',
  ])
)
