function run(gen) {
  /**
   * 功能 需求]
   * 实现重复迭代控制,每一次会生成一个Promise,等其决议后继续
   * 在 it.next()调用过程中生成器发生错误
   */
  const args = [].slice.call(arguments, 1)
  const it = gen.apply(this, args)
  return Promise.resolve().then(function handleNext(value) {
    let next = it.next(value)
    return (function handleResult(next) {
      if (next.done) {
        return next.value
      } else {
        return Promise.resolve(next.value).then(
          handleNext,
          function handleEr(err) {
            return Promise.resolve(it.throw(err)).then(handleResult)
          }
        )
      }
    })(next)
  })
}

function foo() {
  return new Promise((resolve, reject) => {
    fetch('http://jsonplaceholder.typicode.com/photos').then((res) => {
      res.json().then((res) => {
        resolve(res)
      })
    })
  })
}
function* main() {
  try {
    const res = yield foo()
    const res2 = yield Promise.resolve(333)
    console.log(res, res2)
  } catch (error) {
    console.log(error)
  }
}
run(main)
// 先自己实现
function* bar() {
  try {
    const res2 = yield Promise.resolve('bar 222')
    const res1 = yield Promise.resolve('bar 111')
    console.log(res1, res2)
  } catch (error) {
    console.log(error)
  }
}
// const it = bar()
// const yieldArgument1 = it.next().value

// yieldArgument1.then((res) => {
//   const yieldArgument2 = it.next(res).value
//   yieldArgument2.then((res) => {
//     it.next(res)
//   })
// })

// 自动化实现 asyncFunction
function asyncFunction(gen) {
  // 收集迭代器
  const args = [].slice.call(arguments, 1)
  const iterator = gen.apply(this, args)
  // 你必须返回一个Promise
  return Promise.resolve().then(function handleNext(next) {
    // 处理第一个next
    const p = iterator.next(next)
    // 判断是不是最后一次yield或者是return
    if (p.done) {
      //是最后一次yield,比如bar中的最后一次yield,也就是next3次
      return p.value
    } else {
      // 第二次next
      return (function (next) {
        return next.then(
          function handleResult(result) {
            return handleNext(result)
          },
          function handleErr(err) {
            return Promise.resolve(iterator.throw(err)).then(
              function handleResult(result) {
                return handleNext(result)
              }
            )
          }
        )
      })(p.value)
    }
  })
}
asyncFunction(main)
