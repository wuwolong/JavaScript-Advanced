function foo() {
  console.log(message)
}
var message = 'hello global'

function bar() {
  var message = 'hello bar'
  foo()
}

bar()

/**
 *
 * scope chain是函数当前vo对象+ parentScope(定义位置决定)
 * 在进入一个函数执行上下文时,会创建一个ao对象,并将其关联到函数执行上下文vo中,
 * AO对象是包含函数参数\变量申明和函数声明的列表
 *
 *
 * 老版本
 * 每一个执行上下文会关联一个VO（Variable Object，变量对象），变量和函数声明 函数参数会被添加到这个VO对象中。
 *
 * 新版本
 * 每一个执行上下文会关联一个变量环境（Variable Environment 函数参数会被添加到这个作为环境记录添加到变量环境(VE)中对象中。
 */
