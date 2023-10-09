/**
 * 组合式寄生继承
 */
function inherit(superType, subType) {
  const o = Object.create(superType.prototype)
  subType.prototype = o
  subType.prototype.constructor = subType
}
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.sayName = function () {
  console.log(this.name)
}
function Student(name, age, id) {
  Person.apply(this, arguments)
  this.id = id
}
inherit(Person, Student)
const s1 = new Student('kobe', 42, 1001)
// A instanceof B 构造函数B的原型对象,是否存在A的原型链中
// console.log(s1 instanceof Person)
// A.isPrototypeOf(B) A是否存在B的原型链中
// console.log(Person.prototype.isPrototypeOf(Student.prototype))

/**
 *DOM架构继承关系如下,下面的继承上面的
 */

// EventTarget
// Node 这个不能new Node
// Document
// HTMLDocument
//
console.log(EventTarget.prototype.isPrototypeOf(Node.prototype))
console.log(new Document() instanceof EventTarget)
console.log(EventTarget.prototype.isPrototypeOf(Document.prototype))
console.log(Node.prototype.isPrototypeOf(Document.prototype))
console.log(new Document() instanceof Node)
// console.log(new HTMLDocument() instanceof Document)
console.log(Document.prototype.isPrototypeOf(HTMLDocument.prototype))
// 以上全部为true
