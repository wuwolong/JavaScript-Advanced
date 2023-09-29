/**
 * 用法
 * 创建一个唯一的值,一般用于对象
 * 遍历对象Symbol的key
 * 创建两个相同的symbol
 * 获取symbol里面的标志符
 */

const s1 = Symbol('s1')

const obj = { [s1]: s1 }

const s2 = Symbol('s2')

Object.defineProperty(obj, s2, {
  enumerable: true,
  writable: true,
  configurable: true,
  value: s2,
})

const keys = Object.keys(obj)
console.log(keys)
const sKeys = Object.getOwnPropertySymbols(obj)
console.log(sKeys)

const s3 = Symbol.for('s1')
const s4 = Symbol.for('s1')

console.log(s4 === s3)

console.log(Symbol.keyFor(s3))
