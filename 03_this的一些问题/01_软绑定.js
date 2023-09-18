// 需求 硬绑定非常硬,不能通过隐式绑定或者显示绑定来修改this,搞个软绑定来实现这个功能既能修改this又能被修改
/**
 * 功能拆解
 * 返回值肯定是一个函数
 * this被修改而且有默认this
 * 返回值调用实际调用的是原来的函数 foo
 *
 */

Function.prototype.softBind = function (obj) {
  const fn = this
  var bind = function () {
    const curried = [...arguments]
    const thisObj =
      !this || this === globalThis || Object.keys(this).length === 0
        ? obj
        : this
    fn.apply(thisObj, this)
  }
  return bind
}
function foo() {
  console.log('name:', this.name)
}
var obj = { name: 'obj' },
  obj2 = { name: 'obj2' },
  obj3 = { name: 'obj3' }

var fooObj = foo.softBind(obj)
fooObj() //obj
obj2.foo = foo.softBind(obj)
obj2.foo() // obj2

fooObj.call(obj3) // obj3

setTimeout(obj2.foo, 10) // obj 应用了软绑定
