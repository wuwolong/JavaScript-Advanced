let x = 1
function* foo() {
  try {
    x++
    yield 23
    console.log('x', x)
    return
    yield 33
  } finally {
    console.log('cleaning up')
  }
}
function bar() {
  x++
}
const it = foo() // 这里调用生成器函数,函数并没有执行,而是构造了一个迭代器
// it.next() // 函数会执行,如果并在函数中的第一个yield暂停
// bar()
// it.next()
for (const val of it) {
  console.log(it.return('hello world').value)
}

// 生成器调用会产生一个迭代器,yield 后面的值就是遍历得到的value
// 终止生成器
