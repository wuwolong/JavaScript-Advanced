// A instanceof B B函数的原型对象,是否存在A的原型链中

function Foo() {}

const f1 = new Foo()

console.log(f1 instanceof Foo)

// 'prop' in obj 判断prop属性是否存在obj或者obj的原型链中

// A.isPrototypeOf(B) A是否存在B的原型链中

console.log(Foo.prototype.isPrototypeOf(f1))

// 用instanceof实现isPrototypeOf

function isRelated(o1, o2) {
  function F() {}
  F.prototype = o2
  return o1 instanceof F
}

const a = {}
const b = Object.create(a)

console.log(isRelated(b, a))

// 实现__proto__

Object.defineProperty(Object.prototype, '__proto__', {
  set(o) {
    Object.setPrototypeOf(this, o)
    return o
  },
  get() {
    return Object.getPrototypeOf(this)
  },
})

console.log(b.__proto__ === a)
