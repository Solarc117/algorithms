def main():
  print(count([3, 2, 4, 5, 4]))


def count(s: list) -> int:
  n = len(s)
  counter = 0

  result = {}

  if n == 0:
    return 0

  for i in range(n):
    counter += recurse(s[i + 1:], s[i], result)

  return counter


def recurse(s: list, x: int, result: dict) -> int:
  n = len(s)
  counter = 0

  if n in result:
    return result[n]

  if n == 0:
    return 1

  for i in range(n):
    if s[i] > x:
      counter += recurse(s[i + 1:], s[i], result)

  result[n] = counter + 1

  return counter + 1


main()