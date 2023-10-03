function run(gen) {
  let args = [].slice.call(arguments, 1),
    it
  it = gen.apply(this, args)
  return Promise.resolve().then(function handleNext(next) {
    next = it.next(next)
    return (function handleResult(next) {
      if (next.done) {
        return next.value
      } else {
        // 这里需要包装一下
        return Promise.resolve(next.value).then(
          handleNext,
          function handleErr(err) {
            return Promise.resolve(it.throw(err)).then(handleResult)
            // {done:true,value:undefined}
          }
        )
      }
    })(next)
  })
}

module.exports = run
