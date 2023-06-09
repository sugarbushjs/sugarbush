# Sugarbush
![logo-sm.png](logo%2Flogo-sm.png)

[Project Source Code](https://github.com/sugarbushjs/sugarbush)

**Sugarbush** is a performance enhancer for your react-redux application by replacing the Redux
<u>combinedReducers</u> with `switchback`. Switchback will only run the corresponding reducer that matches
the dispatched action type. Sugarbush also has accompanied components
`confingureAdaptiveStrore`, and `adaptiveDispatch`.

\
**Sugarbush Saga** includes `adaptiveSagaDispatch` and `sbPut` (saga effect). For more information go to
[sugarbush-saga](https://www.npmjs.com/package/sugarbush-saga)



## Installation
```
Minimum Requirements: React 16.8
```
```
npm install sugarbush
```
```
yarn add sugarbush
```


### **Switchback**

Switchback replaces the current combinedReducers and only processes the reducer containing the associated dispatch action type.

With most react–redux applications, we use the Redux combinedReducers to process dispatch actions to update the store
state. The combinedReducers will perform a linear search (top to bottom) on all the files listed within the combinedReducers.
Any dispatch action type found within a reducer, the state is mutated and passed back to the combinedReducers. When a reducer
does not contain the dispatch action type, it must return its default or current state. For example, if the first reducer
within the combinedReducers contains the dispatch action type, the reducer will update the state. Then
the combinedReducers must continue to iterate over the remaining reducers to get their current state. This unnecessary looping
process can impact the application's performance. Also, if you dispatch an action type that does not have a corresponding reducer,
such as a **Saga** action, all the reducers are processed again with the combinedReducers.

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
})
```
> **Note**: switchback has two optional parameters. The first `verbose` (true by default) will output information 
> to the console window. This parameter will be set to false in production environments. The second is `sagaBypass`. 
> Please read more about sagaBypass at  [sugarbush-saga](https://www.npmjs.com/package/sugarbush-saga). 

\
More setup examples of switchback with optional parameters:
```js

  //example
   const reducers = switchback({
     SystemState,
     CounterState,
     StatusState,
   }, { sagaBypass: '@@SAGABYPASS!', verbose: false})

  //example
   const reducers = switchback({
     SystemState,
     CounterState,
     StatusState,
   }, { verbose: false, sagaBypass: '@@SAGABYPASS!'})

  //example
  const reducers = switchback({
    SystemState,
    CounterState,
    StatusState,
  }, { verbose: false })

  //example
  const reducers = switchback({
    SystemState,
    CounterState,
    StatusState,
  }, { sagaBypass: '@@SAGABYPASS!'})

```


\
According to Redux, all reduces must return state. Reducers must return state because combinedReducers creates an empty
state object and then iterates over all the reducers returning a reducer's updated or current state. On the other hand,
Switchback first creates a new state object from the current store state and only processes the reducer corresponding to
the action key.

> **Note**: All reducers need to return state. This is needed to build the state tree during initialization for the
> application

\
**How does switchback get the key?**  The key is attached to the action, as shown here.
```js
dispatch({type: 'SET_THEME', payload: 'green', key: 'SystemState'})
```

The key represents the alias name of the reducer listed within switchback. For example, when importing the system-reducers.ts
file, the file is assigned an alias of SystemState. Then SystemState is added to the switchback list. The key for the
system-reducer would be SystemState.

\
**What if the dispatch action does not contain a key or the key does not represent a reducer listed in switchback?**
In this case, all reducers will be processed just like with combinedReducers.
> **Note**: The Redux useDispatch() is still effective and will run all reducers.

\
To get the dispatch actions to contain a key, use one of the following `configureAdaptiveStore` or `adaptiveDispatch` components.
Please see the following sections.


### configureAdaptiveStore
The `configureAdaptiveStore` will allow the creation of dispatch actions that contain a key. To create
the `configureAdaptiveStore` see below.

```js
import React from 'react'
import { store } from './store'
import { Provider } from 'react-redux'
import { configureAdaptiveStore } from 'sugarbush'
import Application from '../Application'

/**
 * Create the Sugarbush AdaptiveStore
 * */
export const adpStore = configureAdaptiveStore({
  dispatch: store.dispatch
})

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Application />
      </Provider>
    </div>
  )
}

export default App
```

> **Note**: The store only takes one parameter of type Redux Dispatch.

\
The `configureAdaptiveStore` contains one method called  **dispatch**

\
The configureAdaptiveStore dispatch method will allow `Switchback` to use the key to process the
corresponding reducer.

```js
import { adpStore } from '../components/App'

export const SystemDispatch = () => adpStore.dispatch('SystemState')
export const CounterDispatch = () => adpStore.dispatch('CouterState')
export const UserDispatch = () => adpStore.dispatch('UserState')
```
> **Note**: all the dispatches can be placed in one file or anywhere in the application

\
In a React page, the dispatches can be imported and used to dispatch an action.

```js
import {
  SystemDispatch,
  CounterDispatch,
} from '../dispatchers'
...
const Application = () => {
  const dispatch = useDispatch()
  const systemDispatch = SystemDispatch()
  const counterDispatch = CounterDispatch()
...
useEffect(() => {
  systemDispatch(SystemActions.fetchSystemTheme())
}, [])
```

### adaptiveDispatch
The `adaptiveDispatch` can be used instead of creating a `configureAdaptiveStore`. The syntax is more verbose and
takes three parameters. The first parameter, dispatch, is of type Redux dispatch, the second key, is of type string,
and the third, verbose (which is optional), of type Boolean. Information will be written out to the console window 
with the verbose parameter set to true. Verbose is true by default and will be set to false in a production environment.
```js

import { store } from '../components/App/store'
import { adaptiveDispatch } from 'sugarbush'

export const CounterDispatch = () => adaptiveDispatch(
  { dispatch: store.dispatch,
    key: 'CounterState',
    verbose: true
  })

```

Using the CounterDispatch in a React page is the same as listed above in the `configureAdaptiveStore` section.

\
**Sugarbush Saga** includes `adaptiveSagaDispatch` and `sbPut` (saga effect). For more information go to
[sugarbush-saga](https://www.npmjs.com/package/sugarbush-saga)

## Examples:
* [switchback-example-classic](https://github.com/sugarbushjs/switchback-example-classic)
* [switchback-example-toolkit](https://github.com/sugarbushjs/switchback-example-toolkit)
* [switchback-example-saga](https://github.com/sugarbushjs/switchback-exp-saga)


## License

[MIT](LICENSE.md)
