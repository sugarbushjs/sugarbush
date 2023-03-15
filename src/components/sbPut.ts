import { put } from 'redux-saga/effects';
import { IAction } from '../types/actions';

export function sbPut<K extends string>(key: K) {
  return function* (type: string, payload: any) {
    const _action: IAction = { type: type, payload: payload, key: key }
    yield put(_action)
  };
}
