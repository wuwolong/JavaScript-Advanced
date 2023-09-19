function compose(...fns) {
  /**
   * 需求
   * 返回一个函数
   * 前一个函数的返回值是下一个函数的参数
   * 绑定this
   */
  return function (x) {
    return fns.reduce((pre, cur) => {
      return cur.call(this, pre)
    }, x)
  }
}

function addTwo(x) {
  return x + 2
}

function multiplyByThree(x) {
  return x * 3
}

function subtractTen(x) {
  return x - 10
}

const composeFn = compose(addTwo, multiplyByThree, subtractTen)

console.log(composeFn.call('abc', 5))
