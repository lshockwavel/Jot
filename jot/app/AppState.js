import { Jot } from './models/Jot.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  /** @type {Jot} */
  jots = [
    new Jot({ title: "color 1", color: 'red', body: 'This is a red jot', createdAt: new Date('2023-10-01') }),
    new Jot({ title: "color 2", color: 'blue', body: 'This is a blue jot', createdAt: new Date('2023-10-02') }),
    new Jot({ title: "color 3", color: 'green', body: 'This is a green jot', createdAt: new Date('2023-10-03') }),
  ]

  /** @type {Jot} */
  activeJot = null
}

export const AppState = createObservableProxy(new ObservableAppState())