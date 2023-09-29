const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'
function executorFnWithCatchError(
  executorFn,
  value = undefined,
  resolve,
  reject
) {
  try {
    const res = executorFn(value)
    res && resolve(res)
  } catch (error) {
    reject(error)
  }
}
class Promise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.onResolveFns = []
    this.onRejectFns = []
    const resolve = (value = undefined) => {
      queueMicrotask(() => {
        if (this.status === PROMISE_STATUS_PENDING) {
          this.value = value
          this.status = PROMISE_STATUS_FULFILLED
          // console.log('resolve', value, this === p)
          this.onResolveFns.forEach((onResolve) => {
            onResolve && onResolve(value)
          })
        }
      })
    }
    const reject = (reason) => {
      queueMicrotask(() => {
        if (this.status === PROMISE_STATUS_PENDING) {
          this.value = reason
          this.status = PROMISE_STATUS_REJECTED
          this.onRejectFns.forEach((onReject) => {
            onReject && onReject(reason)
          })
        }
      })
    }
    executor(resolve, reject)
  }
  then(onResolve, onReject) {
    onReject =
      onReject ??
      (() => {
        throw this.value
      })
    onResolve =
      onResolve ??
      (() => {
        return this.value
      })
    // 需求调用两个then时里面的都会执行
    // 需求解决异步调用then,回调函数不执行的问题
    /**
     * 原因 resolve已经执行了,但是then还没有被调用数组中拿不到函数
     * 需求解决代码执行顺序的问题
     * 需求解决链式调用的问题
     */
    return new Promise((resolve, reject) => {
      if (this.status === PROMISE_STATUS_FULFILLED) {
        executorFnWithCatchError(onResolve, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_REJECTED) {
        executorFnWithCatchError(onReject, this.value, resolve, reject)
      }
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onResolveFns.push(() => {
          executorFnWithCatchError(onResolve, this.value, resolve, reject)
        })
        this.onRejectFns.push(() => {
          executorFnWithCatchError(onReject, this.value, resolve, reject)
        })
      }
    })
  }
  catch(onReject) {
    return this.then(undefined, onReject)
  }
  finally(onFinally) {
    return this.then(onFinally, onFinally)
  }
  static resolve(res) {
    return new Promise((resolve, reject) => {
      resolve(res)
    })
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
  static all(prs) {
    return new Promise((resolve, reject) => {
      const values = []
      prs.forEach((pr) => {
        pr.then(
          (res) => {
            values.push(res)
            if (values.length === prs.length) resolve(values)
          },
          (err) => {
            reject(err)
            throw 'rejected'
          }
        )
      })
    })
  }
  static allSettled(prs) {
    return new Promise((resolve, reject) => {
      const values = []
      prs.forEach((pr) => {
        pr.then(
          (res) => {
            values.push({ status: PROMISE_STATUS_FULFILLED, value: res })
            if (values.length === prs.length) resolve(values)
          },
          (err) => {
            values.push({ status: PROMISE_STATUS_REJECTED, value: err })
            if (values.length === prs.length) resolve(values)
          }
        )
      })
    })
  }
  static race(prs) {
    return new Promise((resolve, reject) => {
      prs.forEach((pr) => {
        pr.then(
          (res) => {
            resolve(res)
            throw 'race'
          },
          (err) => {
            reject(err)
            throw 'race'
          }
        )
      })
    })
  }
  static any(prs) {
    return new Promise((resolve, reject) => {
      const values = []
      prs.forEach((pr) => {
        pr.then(
          (res) => {
            resolve(res)
            throw 'race'
          },
          (err) => {
            values.push(err)
            if (values.length === prs.length) reject(new AggregateError(values))
          }
        )
      })
    })
  }
}
Promise.any([Promise.reject(111), Promise.reject(222), Promise.reject(333)])
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
