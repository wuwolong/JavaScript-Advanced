function* foo() {
  a++
  yield
  b = b * a
  a = (yield b) + 3
}
/**
 * 问题一生成器foo执行完需要调用几次next => yield次数 + 1
 * 需要调用3次next
 * 问题二 iterate.next().value 对应的是哪一个 yield 值,一一对应
 * 问题三 iterate.next(argument)中传入的参数argument对应的是哪一个 (yield 值)的计算值,2 => 1 3=>2是错位的
 */
function* bar() {
  b--
  yield
  a = (yield 8) + b
  b = a * (yield 2)
}

function step(generate) {
  let last
  let itetate = generate()
  return function () {
    // 这个意思就是
    /**
     * 把第n次next.value作为第n+1次next(argument)的argument,同样也就是第n次(yield 值)得计算值
     * 也就是把第n次yield a中的a,最为第n次(yield a)的计算值
     */
    last = itetate.next(last).value
  }
}

const s1 = step(foo)
const s2 = step(bar)

let a = 1,
  b = 2

/**
 * 题目
 */
s1() // a++ a=>2 b=>2
s1() // b= b*a a=>2 b=>4
s2() // b-- a=>2 b=>3
s2() // a = (yield 8) + b  a=>2 b=>3
s2() //  a = (yield 8) + b a=>11 b=>3
s2() // a=>11 b=>22
s1() // a=>7 b=>22
console.log(a, b)
// 第n+1次yield xx的计算值,你要去找第n次yield xxx中的xxx
