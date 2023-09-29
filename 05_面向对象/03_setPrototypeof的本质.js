function Foo() {}

function Bar() {}

// 这个直接修改现有的Bar.prototype 它还有constructor
Object.setPrototypeOf(Bar.prototype, Foo.prototype)

console.log(Bar.prototype.__proto__ === Foo.prototype) //true
console.log(
  Object.getOwnPropertyNames(Bar.prototype),
  Bar.prototype.hasOwnProperty('__proto__'),
  Bar.prototype.constructor
)

// 这个是直接抛弃默认的Bar.prototype 他没有了自己的constructor
Bar.prototype = Object.create(Foo.prototype) // Bar.protoype指向一个对象,这个对象的__proto__指向Foo.prototype
console.log(Bar.prototype.__proto__ === Foo.prototype)
console.log(
  Object.getOwnPropertyNames(Bar.prototype),
  Bar.prototype.hasOwnProperty('__proto__'),
  Bar.prototype.constructor
)
