[Project Source Code](https://github.com/sugarbushjs/sugarbush)

Examples:
* [switchback-example-classic](https://github.com/sugarbushjs/switchback-example-classic)
* [switchback-example-toolkit](https://github.com/sugarbushjs/switchback-example-toolkit)
* [switchback-example-saga](https://github.com/sugarbushjs/switchback-exp-saga)


### adaptiveDispatch
The `adaptiveDispatch` can be used instead of creating a `configureAdaptiveStore`. The syntax is more verbose and
takes three parameters. The first parameter, dispatch, is of type Redux dispatch and the second, key, is of type string, and the third,
verbose (which is optional), of type Boolean. With the verbose parameter set to true, then information is written out to the
console window. This is true by default but will be set to false in a production environment.

```js

import { store } from '../components/App/store'
import { adaptiveDispatch } from 'sugarbush'

export const CounterDispatch = () => adaptiveDispatch(
  { dispatch: store.dispatch,
    key: 'CounterState',
    verbose: true
  })

```

In a React page, the dispatches can be imported and used to dispatch an action.

```js
import { CounterDispatch } from '../dispatchers'
...
const Application = () => {
  const counterDispatch = CounterDispatch()
...
const handleButtonClick = (e:any) => {
  if (e === ButtonType.plus) {
    dispatchCount(CounterActions.incrementCounter())
  } else {
    dispatchCount(CounterActions.decrementCounter())
  }
}
```
