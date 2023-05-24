'use strict'
import log from './log.js'

/*                      Count Construct
Write a function countConstruct(target, wordBank) that returns the number of ways the target string can be constructed by concatenating strings from the wordBank array.

You may reuse wordBank strings as many times as needed.
*/

/*
n = target.length
m = wordBank.length
branchingFactor = m
depth = n
frame = target.startsWith + target.slice = O(n + n) = O(2n) => O(n)
Time: branchingFactor^depth * frame = O(m^n * n)
Space: depth (max num frames) = O(n)
*/
function countConstruct(target, substrings) {
  if (target === '') return 1

  return substrings
    .map(substring =>
      target.startsWith(substring)
        ? countConstruct(target.slice(substring.length), substrings)
        : 0
    )
    .reduce((acc, curVal) => acc + curVal)
}

/*
n = target.length
m = substrings.length
o = memoKeys.length
p = max memo prop size
Time: tree depth * branching factor * individual frame time = O(nm * nn) = O((n^3)m)
Space: depth + o * p = O(n + n) => O(n)
*/
function countConstructMemo(target, substrings, memo = {}) {
  if (target in memo) return memo[target]
  if (target === '') return 1
  let count = 0

  for (const substring of substrings)
    if (target.startsWith(substring))
      count += countConstructMemo(
        target.slice(substring.length),
        substrings,
        memo
      )

  memo[target] = count
  return count
}

// 2, 1, 0, 4, 0
// log(countConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl']))
// log(countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']))
// log(countConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar']))
// log(
//   countConstruct('enterapotentpot', ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'])
// )
// log(
//   countConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeef', [
//     'e',
//     'ee',
//     'eee',
//     'eeee',
//     'eeeee',
//     'eeeeee',
//   ])
// )

log(countConstructMemo('purple', ['purp', 'p', 'ur', 'le', 'purpl']))
log(countConstructMemo('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']))
log(
  countConstructMemo('skateboard', [
    'bo',
    'rd',
    'ate',
    't',
    'ska',
    'sk',
    'boar',
  ])
)
log(
  countConstructMemo('enterapotentpot', [
    'a',
    'p',
    'ent',
    'enter',
    'ot',
    'o',
    't',
  ])
)
log(
  countConstructMemo('eeeeeeeeeeeeeeeeeeeeeeeeeeef', [
    'e',
    'ee',
    'eee',
    'eeee',
    'eeeee',
    'eeeeee',
  ])
)
