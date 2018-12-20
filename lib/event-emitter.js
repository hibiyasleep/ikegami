
export default class EventEmitter {
  /* Copyright (c) 2011 Jerome Etienne, http://jetienne.com - MIT License */

  constructor() {
    this._events = {}
  }

  on(event, fct) {
    this._events[event] = this._events[event] || []
    this._events[event].push(fct)
  }

  off(event, fct) {
    if(!(event in this._events)) return
    this._events[event].splice(this._events[event].indexOf(fct), 1)
  }

  emit(event/*, args...*/) {
    if(!(event in this._events)) return
    for(let e of this._events[event]) {
      e.apply(this, [].slice.call(arguments, 1))
    }
  }
}
