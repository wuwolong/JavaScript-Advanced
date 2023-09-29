// http://jsonplaceholder.typicode.com/photos //这里有n条数据
const res = []
const App = document.querySelector('#app')

function response(data) {
  const len = data.length
  const chunk = data.splice(0, Math.min(100, len))
  for (let i = 0; i < chunk.length; i++) {
    let li = document.createElement('li')
    li.innerText = chunk[i].title
    App.appendChild(li)
  }
  res.push(...chunk)
  // console.log(res)
  if (data.length > 0) {
    setTimeout(function () {
      response(data)
    }, 0)
  }
}
fetch('http://jsonplaceholder.typicode.com/photos').then((res) => {
  res.json().then(response)
})
