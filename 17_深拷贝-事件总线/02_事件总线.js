class EventBus {
  constructor() {
    this.bus = new Map()
  }
  static onceTag = true
  on(eventName, func, context) {
    if (this.bus.has(eventName)) {
      this.bus.get(eventName).add({ func, context })
    } else {
      this.bus.set(eventName, new Set())
      this.bus.get(eventName).add({ func, context })
    }
  }
  once(eventName, func, context) {
    const { onceTag } = this.constructor
    if (this.bus.has(eventName)) {
      this.bus.get(eventName).add({ func, context, onceTag })
    } else {
      this.bus.set(eventName, new Set())
      this.bus.get(eventName).add({ func, context, onceTag })
    }
  }
  off(eventName, func) {
    if (this.bus.has(eventName)) {
      if (!func) {
        return this.bus.delete(eventName)
      }
      const set = this.bus.get(eventName)
      try {
        set.forEach((obj) => {
          if (obj.func) {
            set.delete(obj)
            throw 'forEach break'
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  emit(eventName, ...payload) {
    if (this.bus.has(eventName)) {
      this.bus.get(eventName).forEach((obj) => {
        const { func, context, onceTag } = obj
        func.apply(context, payload)
        if (onceTag) {
          func.apply(context, payload)
          this.off(eventName, func)
        }
      })
    }
  }
}
// console.log(EventBus.onceTag)
const eventBus = new EventBus()
function foo(payload) {
  console.log(payload, this)
}
function bar() {
  console.log('bar')
}
eventBus.once('click', bar, { foo })
eventBus.on('click', foo, { foo })
eventBus.off('click', bar)
eventBus.emit('click', 'foo')
eventBus.emit('click', 'foo')
