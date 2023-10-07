// const { sum, sub } = require('./01_CommonJS中的exports和module.exports')
// console.log(sum(234, 234))
// console.log(sub(234, 123))
// const axios = require('axios')
debugger
const $ = require('jquery')
$()
const arr = []
function toType(obj) {
  if (obj == null) {
    return obj + ''
  }
  const class2type = {}
  // Support: Android <=2.3 only (functionish RegExp)
  return typeof obj === 'object' || typeof obj === 'function'
    ? class2type[toString.call(obj)] || 'object'
    : typeof obj
}
function foo() {}
console.log(Object.toString.call(foo))
console.log(toType(foo))
console.log(arr.flat.call([[2334, [12, 232], 22]]))
