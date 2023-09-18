/**
 *
 *
 * 需求
 * 返回一个函数
 * 函数的this绑定第一个传入的参数
 * 参数可以保存
 * 返回值函数调用时穿进去的参数会拼接
 */

Function.prototype.Bind = function (thisArg, ...res) {
  const fn = this
  const bind = function () {
    return fn.apply(thisArg, [...res, ...arguments])
  }
  return bind
}

function sum(...res) {
  console.log(this)
  return res.reduce((pre, cur) => pre + cur, 0)
}

console.log(sum.Bind('abc', 1, 2, 3, 4)(6, 7))
