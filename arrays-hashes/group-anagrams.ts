/*
Given an array of strings 'strs', group the anagrams together. You can return the answer in any order.

Example 1:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:
Input: strs = [""]
Output: [[""]]

Example 3:
Input: strs = ["a"]
Output: [["a"]]

Constraints:
1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.
*/

interface String {
  /**
   * @time O(n + m + nlogn) = O(nlogn) linear-logarithmic time.
   * @space O(n) linear space.
   */
  anagramOf(candidate: string): boolean
}

String.prototype.anagramOf = function (candidate: string): boolean {
  const [self, string] = [this, candidate].map(s => s.normalize()),
    frequencies: Map<string, number> = new Map()

  // First check if the length of both normalized strings is the same - from other solutions.
  if (self.length !== string.length) return false

  for (let i = 0; i < self.length; i++) {
    const [lowerCaseSelf, lowerCaseCandidate] = [self[i], string[i]].map(s =>
      s.toLowerCase()
    )

    if (lowerCaseSelf !== ' ') {
      const value = frequencies.get(lowerCaseSelf)

      frequencies.set(lowerCaseSelf, typeof value === 'number' ? value + 1 : 1)
    }

    if (lowerCaseCandidate === ' ') continue

    const value = frequencies.get(lowerCaseCandidate)

    frequencies.set(
      lowerCaseCandidate,
      typeof value === 'number' ? value - 1 : -1
    )
  }

  // return Object.keys(frequencies).every(key => frequencies[key] === 0)
  let isAnagram = true
  frequencies.forEach(frequency => {
    if (frequency !== 0) return (isAnagram = false)
  })
  return isAnagram
}

function groupAnagrams(strings: string[]): string[][] {
  const groupsByLength: Map<number, string[][]> = new Map()

  for (const string of strings) {
    const candidateGroups = groupsByLength.get(string.length)

    if (candidateGroups === void 0) {
      groupsByLength.set(string.length, [[string]])
      continue
    }

    let stringAdded = false
    for (const group of candidateGroups) {
      if (!group[0].anagramOf(string)) continue

      group.push(string)
      stringAdded = true
      break
    }

    if (!stringAdded) candidateGroups.push([string])
  }

  const groups: string[][] = []
  groupsByLength.forEach(lengthGroups => groups.push(...lengthGroups))
  return groups
}

/*
For every string, 
  - sort it, and
  - check if the hash table contains the sorted string as a key.
    - If not, set the value of that key to an array containing the current string.
    - If so, append the current string to the array value of the sorted string key.
  - Create another array, and for each key in the map, append the array value to the array.
  - Return the array.
*/
/**
 * @time O([(n^2)logn] + n) => O((n^2)logn).
 * @space O(2n) => O(n).
 */
function groupAnagrams2(strings: string[]): string[][] {
  // Worst case - creates an entry for every word in 'strings' - O(n) space.
  const groups: Map<string, string[]> = new Map()

  // O(n) time.
  for (const string of strings) {
    // O(nlogn) - split is O(n), sort is O(nlogn), and join is O(n).
    // Combined with for loop, O(n * nlogn) = O((n^2)logn)
    const sortedString = string.split('').sort().join(''),
      anagrams = groups.get(sortedString)

    if (anagrams === void 0) {
      groups.set(sortedString, [string])
      continue
    }

    anagrams.push(string)
  }

  // Same worst case as map - O(n) space.
  const anagrams: string[][] = []

  // O(n) time.
  groups.forEach(group => anagrams.push(group))

  return anagrams
}

console.log(groupAnagrams2(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))
console.log(groupAnagrams2(['']))
console.log(groupAnagrams2(['a']))
