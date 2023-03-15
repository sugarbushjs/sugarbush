[Project Source Code](https://github.com/sugarbushjs/sugarbush)

Examples:
* [switchback-example-classic](https://github.com/sugarbushjs/switchback-example-classic)
* [switchback-example-toolkit](https://github.com/sugarbushjs/switchback-example-toolkit)
* [switchback-example-saga](https://github.com/sugarbushjs/switchback-exp-saga)


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

> Note: The store only takes one parameter of type dispatch.

The `configureAdaptiveStore` contains two methods, **dispatch**, and **dispatchSaga**. 

The dispatch method will create a new dispatch with a key. `Switchback` will use the key to process the
corresponding reducer.

```js
import { adpStore } from '../components/App'

export const SystemDispatch = () => adpStore.dispatch('SystemState')
export const CounterDispatch = () => adpStore.dispatch('CouterState')
export const UserDispatch = () => adpStore.dispatch('UserState')
```
> Note: all the dispatches can be placed in one file or anywhere in the application

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

### dispatchSaga
```js
import { adpStore } from '../components/App'

export const sagaDispatch = () => adpStore.dispatchSaga()
```
