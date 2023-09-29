function objectIterator(obj) {
  Object.defineProperty(obj, Symbol.iterator, {
    writable: false,
    enumerable: false,
    configurable: false,
    value() {
      const keys = Object.keys(this)
      const len = Object.keys(this).length
      let index = 0

      return {
        next: () => {
          if (index === len) return { done: true }
          return {
            value: this[keys[index++]],
            done: false,
          }
        },
      }
    },
  })
}

const obj = {
  a: 1,
  b: 2,
}

objectIterator(obj)
// 获取对象的symbol属性 Object.getOwnPropertySymbols
console.log(
  Object.getOwnPropertyNames(obj),
  obj[Symbol.iterator],
  obj.hasOwnProperty(Symbol.iterator),
  Object.getOwnPropertySymbols(obj)
)
const iterator = obj[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

for (let value of obj) {
  console.log(value)
}
