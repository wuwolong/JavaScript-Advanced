// function* foo() {
//   console.log('*foo(),starting')
//   yield 3
//   yield 4
//   console.log('*foo() finished')
// }
// function* bar() {
//   console.log('*bar(),starting')
//   yield 1
//   yield 2
//   yield* foo() // 这里为什么叫做委托,是因为bar把对生成器的控制交给了foo
//   yield 5
//   console.log('*bar() finished')
// }
// const it = bar()
// for (const val of it) {
//   console.log(val)
// }

const run = require('./run.js')
function* foo() {
  const res1 = yield Promise.resolve('res1')
  const res2 = yield Promise.resolve('res2')
  return res1 + res2
}
function* bar() {
  try {
    const res1 = yield Promise.resolve('res1')
    console.log(res1)
    const res3 = yield* foo()
    console.log(res3)
  } catch (error) {
    console.log('error', error)
  }
}
// run(bar)
const it = bar()
it.next()
const res = it.throw(222)

console.log(it.next(res))

// Promise.resolve(Promise.reject('err res1')).then(
//   () => {},
//   (err) => {
//     console.log(err)
//   }
// )

async function baz() {
  try {
    await Promise.reject(333)
  } catch (error) {
    console.log('error', error)
  }
}

baz()
