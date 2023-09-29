// -0 和 0

// NaN NaN

// JavaScript中有两个情况比较特殊,那就是 -0 === 0 为true NaN !== NaN为true

// 实现-0不等于0 NaN等于NaN

// console.log(1 / -0 === 1 / 0)

// console.log(NaN !== NaN)

Object.is = function (n1, n2) {
  // 处理两个值为零的情况
  if (n1 === 0 && n2 === 0) {
    return 1 / n1 === 1 / n2
  }
  if (n1 !== n1) {
    return n2 !== n2
  }
  return n1 === n2
}

console.log(Object.is(NaN, NaN))
console.log(Object.is(0, -0))
