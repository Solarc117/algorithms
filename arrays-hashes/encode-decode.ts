/*
Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

Please implement encode and decode

Example1
Input: ["lint","code","love","you"]
  Output: ["lint","code","love","you"]
  Explanation:
  One possible encode method is: "lint:;code:;love:;you"
Example2
  Input: ["we", "say", ":", "yes"]
  Output: ["we", "say", ":", "yes"]
  Explanation:
  One possible encode method is: "we:;say:;:::;yes"
*/

class Solution {
  // O(n) time, O(n) space.
  static encode(strings: string[]): string {
    let encodedString = ''

    for (const string of strings) encodedString += `${string.length}~${string}`

    return encodedString
  }

  static decode(string: string): string[] {
    return this.#recursiveDecode(string)
  }

  // O(n) space, O(n) time?
  static #recursiveDecode(string: string, decoded: string[] = []): string[] {
    if (string.length === 0) return decoded

    // I don't think the time complexity of string.indexOf is worth counting here, as counting the number of digits of the group length scales at a rate orders of magnitude slower than counting said string.
    // Altogether, all the substring methods called should total roughly O(n) time.
    const separatorIndex = string.indexOf('~'),
      firstGroupLength = +string.substring(0, separatorIndex),
      firstGroup = string.substring(
        separatorIndex + 1,
        separatorIndex + 1 + firstGroupLength
      ),
      stringWithoutFirstGroup = string.substring(
        separatorIndex + 1 + firstGroupLength
      )

    decoded.push(firstGroup)

    return this.#recursiveDecode(stringWithoutFirstGroup, decoded)
  }
}
