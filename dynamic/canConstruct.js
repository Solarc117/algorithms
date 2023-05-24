'use strict'
import log from './log.js'

/* 
n = string.length
m = bank.length
*/

/**
Time: O(m^n * m^2) => O(m^n) (one m for startsWith, and one for slice).
Space: O(n)
  The maximum number of frames on the stack is the same as the length of the string - imagine we pop off a single char on every recursive call.
*/
function canConstruct(string, stringBank) {
  return (
    string === '' ||
    stringBank.some(
      substr =>
        string.startsWith(substr) && // O(m) worst-case.
        canConstruct(string.slice(substr.length), stringBank) // O(m) worst-case (slice).
    )
  )
}

/*
Time: O(nmmm) = O(nm^3) 
  We'll never have to traverse a subtree twice, so worst case we branch down n times (once for every character in string), and each time we create m notes more (one for every string in the bank). Also, for every recursive call, we call the string startsWith and slice methods, which in the worst case will take O(m).
Space: O(n^2)
  n is our depth, and therefore the maximum number of stack frames. But in our memo, in the worst case we'll have to store n keys as well. So nn (n^2).
*/
function canConstructMemo(string, stringBank, memo = {}) {
  if (string in memo) return memo[string]
  if (string === '') return true

  for (const substr of stringBank) {
    if (
      !string.startsWith(substr) || // O(m) worst-case.
      !canConstructMemo(string.slice(substr.length), stringBank, memo) // O(m) worst-case (slice).
    )
      continue

    memo[string] = true
    return true
  }

  memo[string] = false
  return false
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
