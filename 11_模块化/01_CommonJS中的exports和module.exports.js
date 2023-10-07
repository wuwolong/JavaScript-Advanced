/**
 *
 * CommonJS的导出方式
 * 1.exports.xxx = xx
 * 2.module.exports = {}
 * 3.二者的关系.node中实现module.exports对exports的引用,也就是二者指向同一个对象,但是exports = {}不能导出,node只实现了module.exports的导出,只是将module.exports指向的对象,赋值个exports
 */

function sum() {
  return [].reduce.call(arguments, (pre, cur) => pre + cur, 0)
}
function sub() {
  return [].reduce.call(arguments, (pre, cur) => pre - cur)
}
module.exports = { sum }
const aaa = module.exports
aaa.sub = sub
// exports.sum = sum
// module.exports = { sum }
// module.exports.sum = sum
