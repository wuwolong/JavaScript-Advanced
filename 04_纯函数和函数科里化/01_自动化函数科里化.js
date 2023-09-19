function curry(fn) {
  /**
   * 需求
   * 返回一个函数
   * const curryAdd = curry(add)
   * curryAdd(1)(2)(3)(4)(5)
   * 返回的函数可以一个一个的处理参数,如果曾经传参的个数不大于原函数形参的各处会返回一个函数
   * 这个函数可以继续处理参数
   * 如果传参的个数大于或者等于原函数形参的个数, 那么函数将会执行
   *
   */
  return function curried(...args) {
    if (fn.length <= args.length) {
      return fn.apply(this, args)
    } else {
      return function (...res) {
        return curried.call(this, ...args, ...res)
      }
    }
  }
}

function add(num1, num2, num3, num4, num5) {
  return num1 + num2 + num3 + num4 + num5
}
const curryAdd = curry(add)
console.log(curryAdd(1)(2)(3)(4)(5))
