function* foo() {
  try {
    const val = yield 1
    console.log(val)
    yield 2
    yield 3
    console.log('end')
  } catch (error) {
    console.log('error', error)
  }
}
const it = foo()
it.next()
const res = it.throw(222)

console.log(it.next(res))
// throw会终止后续的代码执行
