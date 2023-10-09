const customerData = [
  { ssn: '444-44-4444', name: 'Bill', age: 35, email: 'bill@company.com' },
  { ssn: '555-55-5555', name: 'Donna', age: 32, email: 'donna@home.org' },
]
const dbName = 'the_name'

const request = indexedDB.open(dbName, 2)

request.onerror = (event) => {
  // 错误处理
}
request.onupgradeneeded = (event) => {
  const db = event.target.result

  // 创建一个对象存储来存储我们客户的相关信息，我们将“ssn”作为键路径
  // 因为 ssn 可以保证是不重复的——或至少在启动项目的会议上我们是这样被告知的。
  const objectStore = db.createObjectStore('customers', { keyPath: 'ssn' })

  // 创建一个索引以通过姓名来搜索客户。名字可能会重复，所以我们不能使用 unique 索引。
  objectStore.createIndex('name', 'name', { unique: false })

  // 使用邮箱建立索引，我们想确保客户的邮箱不会重复，所以我们使用 unique 索引。
  objectStore.createIndex('email', 'email', { unique: true })

  // 使用事务的 oncomplete 事件确保在插入数据前对象存储已经创建完毕。
  objectStore.transaction.oncomplete = (event) => {
    // 将数据保存到新创建的对象存储中。
    const customerObjectStore = db
      .transaction('customers', 'readwrite')
      .objectStore('customers')
    customerData.forEach((customer) => {
      customerObjectStore.add(customer)
    })
  }
}
