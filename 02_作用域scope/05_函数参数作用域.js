var a = 1
function foo(
  x,
  y = function () {
    x = 3
    console.log(x)
  }
) {
  console.log(x) // 这个访问的是参数的作用域,不是作用域提升
  var x = 2
  y()
  console.log(x)
}

foo(1)
console.log(a)
