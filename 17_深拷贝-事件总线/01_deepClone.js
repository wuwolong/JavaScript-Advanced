function isObject(value) {
  const type = typeof value
  return value !== null && type === 'object'
}

function deepClone(originValue, weakMap = new WeakMap()) {
  // Symbol值
  if (typeof originValue === 'symbol') {
    return Symbol(originValue.description)
  }
  // 处理函数和基本数据类型
  if (originValue === null || typeof originValue !== 'object') {
    return originValue
  }
  // 循环引用
  if (isObject(originValue)) {
    if (weakMap.has(originValue)) {
      return weakMap.get(originValue)
    }
    weakMap.set(originValue, originValue)
  }
  // set
  if (originValue instanceof Set) {
    const set = new Set()
    originValue.forEach((value) => {
      set.add(deepClone(value, weakMap))
    })
    return set
  }
  // 处理map
  if (originValue instanceof Map) {
    const map = new Map()
    originValue.forEach((value, key, map1) => {
      map.set(deepClone(key, weakMap), deepClone(value, weakMap))
    })
    // map.set('bar', 'foo')
    return map
  }

  // 处理对象和数组
  const newObj = Array.isArray(originValue) ? [] : {}
  for (const key in originValue) {
    newObj[key] = deepClone(originValue[key], weakMap)
  }
  // symbol key
  const symbokKeys = Object.getOwnPropertySymbols(originValue)
  for (const sKey of symbokKeys) {
    newObj[sKey] = deepClone(originValue[sKey], weakMap)
  }
  return newObj
}

const s1 = Symbol('aaa')
const obj = {
  name: 'kobe',
  address: {
    city: 'HK',
  },
  foo: function () {},
  hobby: ['喝酒', { type: '赌' }],
  [s1]: s1,
  s1,
  set: new Set([1, 2, 3, 4]),
  map: new Map([
    [123, 234],
    [234, 345],
  ]),
}
obj.info = obj
obj.map.set('info', obj)

console.log(deepClone(obj))
