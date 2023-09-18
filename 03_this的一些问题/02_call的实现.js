/**
 * 需求
 * 函数会被执行
 * this会被改变
 *
 */

Function.prototype.Call = function (thisArg, ...res) {
  const fn = this
  thisArg =
    thisArg === null || thisArg === undefined ? globalThis : Object(thisArg)
  thisArg.fn = fn
  const result = thisArg.fn(...res)
  delete thisArg.fn
  return result
}

function foo() {
  console.log(this)
}
foo.Call('abc')
