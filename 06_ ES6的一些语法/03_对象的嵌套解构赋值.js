const obj = {
  name: 'kobe',
  info: {
    hobby: 'basketball',
  },
}

// 需求拷贝info 但不是同一个引用

// const info = { ...obj.info }
// info.hobby = 'drink'
// console.log(info, obj.info)

// 函数传入obj 修改info里面hobby的值,但是不影响obj
function foo({ info: { hobby } }) {
  hobby = 'drink'
  console.log(hobby)
}
foo(obj)
console.log(obj.info)
