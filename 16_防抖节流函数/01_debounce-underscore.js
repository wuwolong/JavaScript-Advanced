function debounce(fn, wait, immediate = false) {
  let timer, previous, context, args, isExecute, result
  function later() {
    return new Promise((resolve, reject) => {
      let passed = Date.now() - previous
      if (passed < wait) {
        setTimeout(() => {
          later().then((res) => resolve(res))
        }, wait - passed)
      } else {
        result = fn.apply(context, args)
        // console.log(result)
        resolve(result)
        timer = null
        isExecute = false
      }
    })
  }
  function _debounce() {
    return new Promise((resolve, reject) => {
      previous = Date.now()
      context = this
      args = [...arguments]
      if (!timer) {
        timer = setTimeout(() => {
          later().then((res) => {
            // console.log(res)
            resolve(res)
          })
        }, wait)
        if (immediate && !isExecute) {
          result = fn.apply(this, args)
          isExecute = true
          // clearTimeout(timer)
          // timer = null
          return result
          resolve(result)
        }
      }
    })
  }
  _debounce.cancle = function () {
    clearTimeout(timer)
    timer = null
  }
  return _debounce
}
