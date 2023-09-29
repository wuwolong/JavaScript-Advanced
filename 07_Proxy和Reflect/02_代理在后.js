const greeter = {
    speak(who = 'someone') {
      console.log('hello', who)
    },
  },
  handler = {
    get(target, key, context) {
      return function () {
        context.speak(key)
      }
    },
  },
  catchall = new Proxy({}, handler)
Object.setPrototypeOf(greeter, catchall)

greeter.speak()

// 需求调用任何方法都可以调用speak方法,并发属性传进去

greeter.everyOne()
