[Project Source Code](https://github.com/sugarbushjs/sugarbush)

Examples:
* [switchback-example-classic](https://github.com/sugarbushjs/switchback-example-classic)
* [switchback-example-toolkit](https://github.com/sugarbushjs/switchback-example-toolkit)
* [switchback-example-saga](https://github.com/sugarbushjs/switchback-exp-saga)

### **Switchback**

[Source code](https://github.com/sugarbushjs/sugarbush/blob/main/src/components/switchback.ts)

With most react–redux applications, we use the redux combinedReducers to process any dispatch actions to update the store
state. The combinedReducers will perform a linear search (top to bottom) on all the files listed within the combinedReducers.
Any dispatch action type found within a reducer, the state is mutated and passed back to the combinedReducers. When a reducer
does not contain the dispatch action type, it must return its default or current state. For example, if the first reducer
within the combinedReducers contains the dispatch action type, the reducer will update the state. Then
the combinedReducers must continue to iterate over the remaining reducers to get their current state. This unnecessary looping
process can impact the application's performance. Also, if you dispatch an action type does not have a corresponding reducer,
such as a SAGA action, all the reducers are processed again with the combinedReducers.

Switchback replaces the current combinedReducers and only processes the reducer containing the associated dispatch action type.
The implementation of switchback is shown below.

```js
import { switchback } from 'surgarbush'
import SystemState from './system-reducer'
import CounterState from './counter-reducer'
import StatusState from './status-reducer'
import UserState from './user-reducer'

const reducers = switchback({
  SystemState,
  CounterState,
  StatusState,
  UserState,
}, false)
```
> Note: switchback has an optional parameter, verbose (true by default), which will output info to console window. 
> This is turned off in production env
