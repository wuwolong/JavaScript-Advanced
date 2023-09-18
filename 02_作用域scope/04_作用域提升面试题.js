// function foo() {
//   var a = (b = 1)
// }
// foo()
// console.log(b)
// console.log(a)、

foo()

function foo() {
  console.log(1)
}

var foo // 这个是重复申明，会被忽略

console.log(foo)

Array.prototype.Filter = function (fn) {
  const arr = []
  for (let i = 0; i < this.length; i++) {
    const res = fn.call(this, this[i], i, this)
    if (res) arr.push(this[i])
  }
  return arr
}

Array.prototype.Find = function (fn) {
  let res
  for (let i = 0; i < this.length; i++) {
    res = fn.call(this, this[i], i, this)
    if (res) {
      res = this[i]
      break
    }
  }
  return res
}

const arr = [1, 2, 3, 4, 5, 6, 6, 8]
const res = arr.Filter((item, index, arr) => {
  console.log(item, index, arr)
  return item % 2
})
// console.log(
//   arr.Find((item, index, arr) => {
//     console.log(item, index, arr)
//     return item % 2
//   })
// )
Array.prototype.Reduce = function (cbFn, inital) {
  for (let i = 0; i < this.length; i++) {
    let res = cbFn.call(this, inital, this[i], i, this)
    inital = res
  }
  return inital
}
const total = arr.Reduce((preValue, curValue, curIndex, arr) => {
  return preValue + curIndex
}, 0)
console.log(total)
