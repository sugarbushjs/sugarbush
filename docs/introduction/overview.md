# Sugarbush

[Project Source Code](https://github.com/sugarbushjs/sugarbush)

**Sugarbush** is a performance enhancer for your react-redux application by replacing the Redux
<u>combinedReducers</u> with `switchback`. Switchback will only run the corresponding reducer that matches
the dispatched action type. Sugarbush also has accompanied components such as
`confingureAdaptiveStrore`, `adaptiveDispatch`, `adaptiveSagaDispatch` and `sbPut` (saga effect)


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

With most react–redux applications, we use the Redux combinedReducers to process any dispatch actions to update the store
state. The combinedReducers will perform a linear search (top to bottom) on all the files listed within the combinedReducers.
Any dispatch action type found within a reducer, the state is mutated and passed back to the combinedReducers. When a reducer
does not contain the dispatch action type, it must return its default or current state. For example, if the first reducer
within the combinedReducers contains the dispatch action type, the reducer will update the state. Then
the combinedReducers must continue to iterate over the remaining reducers to get their current state. This unnecessary looping
process can impact the application's performance. Also, if you dispatch an action type that does not have a corresponding reducer,
such as a **Saga** action, all the reducers are processed again with the combinedReducers.

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
})
```
> **Note**: switchback has an optional parameter, verbose (true by default), which will to output information to console window.
> This is turned off in production environment

\
According to Redux, all reduces must return state. Reducers must return state because combinedReducers creates an empty
state object and then iterates over all the reducers returning a reducer's updated or current state. On the other hand,
Switchback first creates a new state object from the current store state and only processes the reducer corresponding to
the action key.

> **Note**: All reducers need to return state. This is needed to build the state tree during initialization fo the
> application

\
**How does switchback get the key?**  The key is attached to the action, as shown here.
```js
dispatch({type: 'SET_THEME', payload: 'green', key: 'SystemState'})
```

The key represents the alias name of the reducer listed within switchback. For example, when importing the system-reducers.ts
file, the file is assigned an alias of SystemState. Then SystemState is added within the switchback list. The key for the
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

> **Note**: The store only takes one parameter of type dispatch.

\
The `configureAdaptiveStore` contains two methods, **dispatch**, and **dispatchSaga**. Please read the **Saga** section  
in this document for more information about dispatchSaga.

\
The dispatch method will create a new dispatch with a key. `Switchback` will use the key to process the
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
takes three parameters. The first parameter, dispatch, is of type Redux dispatch, the second, key, is of type string,
and the third, verbose (which is optional), of type Boolean. With the verbose parameter set to true, information
will be written out to the console window. This is true by default and will be set to false in a production environment.
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

## Saga

When dispatching Saga actions, the combinedReducers will process all the reducers. With `dispatchSaga` from `configureAdaptiveStore`
or `adaptiveSagaDispatch` this will not occur. The dispatchSaga and adaptiveSagaDispatch have one parameter, dispatch,
of type Redux dispatch. Internally, a key is assigned to the dispatch, indicating switchback to skip
the processing of reducers.


> **Note**: This is only for saga actions with no associated reducers action type.

### dispatchSaga
```js
import { adpStore } from '../components/App'

export const sagaDispatch = () => adpStore.dispatchSaga()
```

### adaptiveSagaDispatch
```js
import { store } from '../components/App/store'
import { adaptiveSagaDispatch } from 'sugarbush'

export const sagaAdpDispatch = () => adaptiveSagaDispatch({dispatch: store.dispatch, versobe: false })
```
> **Note**: verbose is optional and is true by default, but will be set to false in a production environment.

## sbPut

When using the Saga Put side effect, all the reducers are processed again while using combinedReducers. To run only the
corresponding reducer for the Saga Put effect, use the sbPut side effect from Sugarbush. This wraps the Saga Put effect
and adds the reducer’s key to the effect.

sbPut take two parameters. The first is an action type, of type string, and payload of any.

```js
import { takeEvery } from 'redux-saga/effects'
import { sbPut } from 'sugarbush'
import { SystemActionEnum } from '../actions/system-actions'

/** Using the sugarbush effect of sbPut to set the key*/
const _put = sbPut('SystemState')

export function* watchFetchSystemSettings() {
  yield takeEvery(SystemActionEnum.FETCH_SYSTEM_THEME, fetchSetSystemTheme)
}

function* fetchSetSystemTheme() {
  /** Using the sugarbush effect of sbPut */
  yield _put(SystemActionEnum.SET_SYSTEM_THEME, 'GREEN')
}
```
\
Internally the sbPut creates an action type with a key and calls the saga PUT:

```js
const _action:IAction = ({type: type, payload: payload, key: key})
yield put(_action)
```

## Examples:
* [switchback-example-classic](https://github.com/sugarbushjs/switchback-example-classic)
* [switchback-example-toolkit](https://github.com/sugarbushjs/switchback-example-toolkit)
* [switchback-example-saga](https://github.com/sugarbushjs/switchback-exp-saga)


## License

[MIT](LICENSE.md)
