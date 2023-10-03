function fibonacci(num) {
  if (num === 2) {
    return 1
  }
  if (num === 1) {
    return 0
  }
  return fibonacci(num - 1) + fibonacci(num - 2)
}

function* fibonacciGen() {
  let [pre, cur] = [0, 1]
  while (true) {
    yield pre
    ;[pre, cur] = [cur, pre + cur]
  }
}

function fib(n) {
  let index = 1
  for (const val of fibonacciGen()) {
    if (index++ < n) {
      continue
    }
    return val
    break
  }
}
console.log(fibonacci(30))
console.log(fib(30))
