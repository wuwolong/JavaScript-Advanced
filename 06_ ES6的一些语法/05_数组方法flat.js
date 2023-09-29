const arr2 = [0, 1, [2, [3, [4, 5]]]]
const arr = []
Array.prototype.flat = function flat(depth = 1) {
  const flatArr = []
  if (depth < 0) {
    flatArr.push(this)
    return flatArr
  }
  this.forEach((item) => {
    // console.log(flatArr)
    if (item instanceof Array) {
      flatArr.push(...flat.call(item, --depth))
    } else {
      flatArr.push(item)
    }
  })
  return flatArr
}
// arr2.flat()
console.log(arr2.flat(Infinity))
