/*
Given two strings s and t, return whether t is an anagram of s.

An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:
----------------
Input: s = "anagram", t = "nagaram"
Output: true
----------------

Example 2:
----------------
Input: s = "rat", t = "car"
Output: false
----------------

Constraints:

- 1 <= s.length, t.length <= 5 * 104
- s and t consist of lowercase English letters.
*/

interface String {
  isAnagramOf(string: string): boolean
}

String.prototype.isAnagramOf = function (string: string): boolean {
  const instances: { [key: string]: number } = {}

  for (let i: number = 0; i < this.length; i++) {
    const lowerCaseCharacter: string = this[i].toLowerCase()
    if (lowerCaseCharacter === ' ') continue

    typeof instances[lowerCaseCharacter] === 'number'
      ? instances[lowerCaseCharacter]++
      : (instances[lowerCaseCharacter] = 0)
  }

  for (let i: number = 0; i < string.length; i++) {
    const lowerCaseCharacter: string = string[i].toLowerCase()
    if (lowerCaseCharacter === ' ') continue

    if (instances[lowerCaseCharacter] === void 0) return false

    instances[lowerCaseCharacter] === 0
      ? delete instances[lowerCaseCharacter]
      : instances[lowerCaseCharacter]--
  }

  return Object.keys(instances).length === 0
}

console.log('a'.isAnagramOf('b'))
console.log('a'.isAnagramOf('a'))

// Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
