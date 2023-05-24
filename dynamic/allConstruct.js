'use strict'
import log from './log.js'

/*          All Construct
Write a function allConstruct(target, wordBank) that returns different ways the target string can be constructed by concatenating strings from the wordBank array.

You may reuse wordBank strings as many times as needed.
*/

/*
Algorithm: to ensure a nice, last answer, e.g. ['purp', 'le'] and not ['le', 'purp'], I'll use the string endsWith method, and push substrings into the subarrays when a successful base case is found.
*/

/*
n = target's length
w = number of words in wordBank

Time: O(n^w * nw)
Space: O(n)
*/
function allConstruct(target, wordBank) {
  if (target === '') return [[]]
  const combinations = []

  for (const word of wordBank) {
    // O(w) (branching factor)
    if (!target.endsWith(word)) continue
    const result = allConstruct(
      target.slice(0, target.length - word.length), // O(n)
      wordBank
    )

    if (result.length === 0) continue

    for (const comb of result) comb.push(word) // O(w)
    combinations.push(...result)
  }

  return combinations
}

function allConstructMemo(target, wordBank, memo = {}) {
  if (target in memo) return memo[target]
  if (target === '') return [[]]
  const combinations = []

  for (const word of wordBank) { // O(w) (branching factor)
    if (!target.endsWith(word)) continue
    const result = allConstructMemo(
      target.slice(0, target.length - word.length), // O(n)
      wordBank,
      memo
    )

    if (result.length === 0) continue

    for (const comb of result) comb.push(word) // O(w)
    combinations.push(...result)
  }

  memo[target] = combinations 
  return combinations
}

// log(allConstruct('sos', ['s', 'o'])) // ['s', 'o', 's']
log(allConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl']))
log(allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']))
log(allConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']))
log(allConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't']))
log(
  allConstruct('feeeeeeeeeeeeeeeeeeeeeeeeeee', [
    'e',
    'ee',
    'eee',
    'eeee',
    'eeeee',
    'eeeeee',
  ])
)
