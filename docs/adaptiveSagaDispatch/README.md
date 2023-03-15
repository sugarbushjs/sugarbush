[Project Source Code](https://github.com/sugarbushjs/sugarbush)

Examples:
* [switchback-example-classic](https://github.com/sugarbushjs/switchback-example-classic)
* [switchback-example-toolkit](https://github.com/sugarbushjs/switchback-example-toolkit)
* [switchback-example-saga](https://github.com/sugarbushjs/switchback-exp-saga)

### adaptiveSagaDispatch
```js
import { store } from '../components/App/store'
import { adaptiveSagaDispatch } from 'sugarbush'

export const SagaAdpDispatch = () => adaptiveSagaDispatch({dispatch: store.dispatch, versobe: false })
```
> Note: verbose is optional and is true by default, but will be set to false in a production environment.

In a React page, the Saga dispatch can be imported and used to dispatch an action.

```js
import { SagaAdpDispatch } from '../dispatchers'
...
const Application = () => {
  const sagaAdpDispatch = SagaAdpDispatch()
...
useEffect(() => {
  sagaAdpDispatch(SystemActions.fetchSystemTheme())
}, [])
```

## sbPut

When using the Saga put side effect, all the reducers are processes again while using combinedReducers. To run only the
corresponding reducer for the saga put effect, use the sbPut side effect from Sugarbush. This wraps the saga put effect
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

Internally the sbPut creates an action type with a key and calls the saga PUT:

```js
const _action:IAction = ({type: type, payload: payload, key: key})
yield put(_action)
```