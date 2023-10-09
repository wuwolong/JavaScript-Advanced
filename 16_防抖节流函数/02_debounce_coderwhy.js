function debounce(fn, wait, immediate) {
  let timer, isExecute, result
  function _debounce() {
    return new Promise((resolve, reject) => {
      if (immediate && !isExecute) {
        result = fn.apply(this, arguments)
        resolve(result)
        isExecute = true
        return
      }
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        result = fn.apply(this, arguments)
        resolve(result)
        timer = null
        isExecute = false
      }, wait)
    })
  }
  _debounce.cancle = function () {
    clearTimeout(timer)
    timer = null
  }

  return _debounce
}
