/**
 * 1.迭代器
 *  迭代器是一个对象,他实现了next的方法
 * 2. 可迭代对象
 * 可迭代对象中的属性[Symbol.iterate]()的返回值值为一个迭代器
 */

const something = (function () {
  let value = 3
  return {
    [Symbol.iterator]: function () {
      return this
    },
    next() {
      value = value * 3 + 1
      return {
        done: false,
        value,
      }
    },
  }
})()
for (const val of something) {
  console.log(val)
  if (val > 300) {
    break
  }
}
// something是一个可迭代对象,他[[Symbol.iterator]()的返回值实现了next方法
