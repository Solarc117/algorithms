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
  static encode(strings: string[]): string {
    let encodedString = ''

    for (const string of strings) encodedString += `${string.length}~${string}`

    return encodedString
  }

  static decode(string: string): string[] {
    return this.#recursiveDecode(string)
  }

  static #recursiveDecode(string: string, decoded: string[] = []): string[] {
    if (string.length === 0) return decoded

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
