// Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

interface String {
  isAnagramOf(string: string): boolean
}

String.prototype.isAnagramOf = function (string: string): boolean {
  return true
}
