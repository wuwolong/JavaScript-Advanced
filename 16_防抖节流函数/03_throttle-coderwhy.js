function throttle(func, interval) {
  let previous = 0,
    timer = null
  function _throttle() {
    let remainTime = interval - (new Date().getTime() - previous)
    if (remainTime <= 0) {
      if (timer) clearTimeout(timer)
      func.apply(this, arguments)
      previous = new Date().getTime()
    } else {
      // console.log(remainTime)
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, arguments)
        timer = null
        previous = new Date().getTime()
      }, remainTime)
    }
  }

  return _throttle
}
