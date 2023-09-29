const target = Object(123)
const handler = {
  get(target, key, context) {
    return Reflect.get(...arguments)
  },
  set(target, key, val) {
    console.log(val)
    return Reflect.set(...arguments)
  },
}

const proxy = new Proxy(target, handler)

proxy.foo = function () {
  console.log(this === proxy)
}
proxy.foo()
console.log(proxy)
