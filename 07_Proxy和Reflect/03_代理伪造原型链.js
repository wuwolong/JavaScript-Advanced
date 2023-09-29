/**\
 * 需求
 * get属性,target中找不到就去target中的[[prototype]]中去寻找
 * 绑定的this是target
 */

const handler = {
  get(target, key, context) {
    if (Reflect.has(target, key)) {
      return Reflect.get(...arguments)
    } else {
      return Reflect.get(target[Symbol.for('[[prototype]]')], key, context)
    }
  },
}
const target1 = new Proxy(
  {
    name: 'target - 1',
    foo() {
      console.log('foo', this.name)
    },
  },
  handler
)

const target2 = Object.assign(Object.create(target1), {
  name: 'target - 2',
  bar() {
    console.log('bar', this.name)
  },
})

// console.log(target2.__proto__ === target1)

target1[Symbol.for('[[prototype]]')] = target2

target1.bar() //通过hack[[prototype]]
target1.foo()
target2.foo() // 通过[[prototype]]
