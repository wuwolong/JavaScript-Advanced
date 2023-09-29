Promise.map = function (vals, cb) {
  return Promise.all(
    vals.map((val) => {
      return new Promise((resolve) => {
        cb(val, resolve)
      })
    })
  )
}
console.log(
  Promise.map(
    [Promise.resolve(1), Promise.resolve(2), Promise.reject('oops')],
    function (pr, done) {
      Promise.resolve(pr).then((v) => {
        done(2 * v)
      }, done)
    }
  ).then((vals) => {
    console.log(vals)
  })
)


Promise.resolve(Promise.reject('opps'))
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
