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
  /**
   * @time O(n + m + nlogn) = O(nlogn) linear-logarithmic time.
   * @space O(n) linear space.
   */
  isAnagramOf(candidate: string): boolean
  isUnicodeAnagramOf(candidate: string): boolean
  /**
   * @time O(n) - linear time.
   * @space O(n) - linear space.
   */
  isUnicodeAnagramOf2(candidate: string): boolean
  isAnagramOf2(candidate: string): boolean
}

String.prototype.isAnagramOf = function (candidate: string): boolean {
  // Let n = this.length, m = candidate.length.
  // O(n) space - at worst will have to store a 1 for each individual character in 'this'.
  const instances: { [key: string]: number } = {}
  // O(n) time.
  for (let i: number = 0; i < this.length; i++) {
    const lowerCaseCharacter: string = this[i].toLowerCase()
    if (lowerCaseCharacter === ' ') continue

    typeof instances[lowerCaseCharacter] === 'number'
      ? instances[lowerCaseCharacter]++
      : (instances[lowerCaseCharacter] = 0)
  }

  // O(m) time.
  for (let i: number = 0; i < candidate.length; i++) {
    const lowerCaseCharacter: string = candidate[i].toLowerCase()
    if (lowerCaseCharacter === ' ') continue

    if (instances[lowerCaseCharacter] === void 0) return false

    instances[lowerCaseCharacter] === 0
      ? delete instances[lowerCaseCharacter]
      : instances[lowerCaseCharacter]--
  }

  // O(nlogn) - algorithm bottleneck; can reduce to O(n) if I don't use Object.keys.
  return Object.keys(instances).length === 0
}

// Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

String.prototype.isUnicodeAnagramOf = function (candidate: string): boolean {
  // For unicode characters, just normalize the strings before working with them.
  const [self, string] = [this, candidate].map(s => s.normalize()),
    instances: { [key: string]: number } = {}

  for (let i: number = 0; i < self.length; i++) {
    const lowerCaseCharacter: string = self[i].toLowerCase()
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

// A version of the algorithm that addresses the object.keys bottleneck by adding a key counter
String.prototype.isUnicodeAnagramOf2 = function (candidate: string): boolean {
  const [self, string] = [this, candidate].map(s => s.normalize()),
    instances: { [key: string]: number } = {}
  let keys = 0

  // First check if the length of both normalized strings is the same - from other solutions.
  if (self.length !== string.length) return false

  for (let i: number = 0; i < self.length; i++) {
    const lowerCaseCharacter: string = self[i].toLowerCase()
    if (lowerCaseCharacter === ' ') continue

    if (typeof instances[lowerCaseCharacter] === 'number') {
      instances[lowerCaseCharacter]++
      continue
    }

    keys++
    instances[lowerCaseCharacter] = 0
  }

  for (let i: number = 0; i < string.length; i++) {
    const lowerCaseCharacter: string = string[i].toLowerCase()
    if (lowerCaseCharacter === ' ') continue

    if (instances[lowerCaseCharacter] === void 0) return false

    if (instances[lowerCaseCharacter] === 0) {
      delete instances[lowerCaseCharacter]
      keys--
      continue
    }

    instances[lowerCaseCharacter]--
  }

  return keys === 0
}

String.prototype.isAnagramOf2 = function (candidate: string): boolean {
  const [self, string] = [this, candidate].map(s => s.normalize()),
    frequencies: { [key: string]: number } = {}

  // First check if the length of both normalized strings is the same - from other solutions.
  if (self.length !== string.length) return false

  for (let i = 0; i < self.length; i++) {
    const [lowerCaseSelf, lowerCaseCandidate] = [self[i], string[i]].map(s =>
      s.toLowerCase()
    )
    if (lowerCaseSelf !== ' ')
      typeof frequencies[lowerCaseSelf] === 'number'
        ? frequencies[lowerCaseSelf]++
        : (frequencies[lowerCaseSelf] = 1)

    if (lowerCaseCandidate === ' ') continue
    typeof frequencies[lowerCaseCandidate] === 'number'
      ? frequencies[lowerCaseCandidate]--
      : (frequencies[lowerCaseCandidate] = -1)
  }

  return Object.keys(frequencies).every(key => frequencies[key] === 0)
}

function isAnagramOf(string1: string, string2: string): boolean {
  const [self, string] = [string1, string2].map(s => s.normalize()),
    frequencies: { [key: string]: number } = {}

  // First check if the length of both normalized strings is the same - from other solutions.
  if (self.length !== string.length) return false

  for (let i = 0; i < self.length; i++) {
    const [lowerCaseSelf, lowerCaseCandidate] = [self[i], string[i]].map(s =>
      s.toLowerCase()
    )
    if (lowerCaseSelf !== ' ')
      typeof frequencies[lowerCaseSelf] === 'number'
        ? frequencies[lowerCaseSelf]++
        : (frequencies[lowerCaseSelf] = 1)

    if (lowerCaseCandidate === ' ') continue
    typeof frequencies[lowerCaseCandidate] === 'number'
      ? frequencies[lowerCaseCandidate]--
      : (frequencies[lowerCaseCandidate] = -1)
  }

  return Object.keys(frequencies).every(key => frequencies[key] === 0)
}

console.log(
  'a'.isAnagramOf2('a'),
  'a'.isAnagramOf2('b'),
  'dog'.isAnagramOf2('god'),
  'THE MORSE CODE'.isAnagramOf2('here come dots')
)
