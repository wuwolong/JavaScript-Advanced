function foo() {
  fetch('http://jsonplaceholder.typicode.com/photos').then(
    (res) => {
      res.json().then(
        (res) => {
          it.next(res) // 这是第二个next,传入参数res会作为第一个yield的计算值
        },
        (err) => {
          it.throw(err)
        }
      )
    },
    (err) => {
      console.log(err)
    }
  )
}

function* main() {
  const res = yield foo()
  console.log(res)
}
// const it = main() //这意味着你可以在任意的地方next
// it.next()

function request(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(url)
      resolve(url)
    }, 2000)
  })
}
function requestNext(url) {
  request(url).then((res) => {
    it.next(res)
  })
}
/**
 * 需求
 * 上一次发送请求的返回值拼接字符串作为这一次发送请求的url
 * 发送三次
 * promise实现就是.then
 * async实现就是 await
 * 那么用生成器怎么实现呢
 */
function* requestGen() {
  const res1 = yield requestNext('http:something.com/')
  const res2 = yield requestNext(`${res1}something`)
  const res3 = yield requestNext(`${res2}/something`)
  const res4 = yield requestNext(`${res3}/something`)
}

const it = requestGen()
it.next()
