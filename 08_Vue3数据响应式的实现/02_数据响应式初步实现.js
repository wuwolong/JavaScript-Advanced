const target = {
  name: 'Noah',
  age: 27,
}
const targetWeakMap = new WeakMap()
let effectActiveFn
class Depend {
  constructor() {
    this.depend = new Set()
  }
  addDep(fn) {
    this.depend.add(fn)
  }
  notify() {
    this.depend.forEach((fn) => {
      fn()
    })
  }
}

function watchEffect(depend, fn) {
  depend.addDep(fn)
}

const targetProxy = new Proxy(target, {
  get(target, key, context) {
    // 在这里收集依赖
    // 第一层weakmap的数据收集
    let map = targetWeakMap.get(target)
    if (!map) {
      targetWeakMap.set(target, new Map())
      map = targetWeakMap.get(target)
    }
    // 第二层map的数据收集
    let dep = map.get(key)
    if (!dep) {
      map.set(key, new Depend())
      dep = map.get(key)
    }
    watchEffect(dep, effectActiveFn)
    return Reflect.get(...arguments)
  },
  set(target, key, val, context) {
    let res = Reflect.set(...arguments)
    // 触发依赖
    let map = targetWeakMap.get(target)
    let dep = map.get(key)
    dep.notify()
    return res
  },
})

function effectFnName() {
  effectActiveFn = effectFnName
  console.log(targetProxy.name, '----effectFnName')
}

function effectFnAge() {
  effectActiveFn = effectFnAge
  console.log(targetProxy.age, '----effectFnAge')
}

// 这里需要手动调用一下函数 触发get
effectFnName()
effectFnAge()
targetProxy.name = 'Evan'
targetProxy.age = 38
