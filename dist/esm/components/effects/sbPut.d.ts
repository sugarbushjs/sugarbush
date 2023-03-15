import { IAction } from '../../types/actions';
export declare function sbPut<K extends string>(key: K): (type: string, payload: any) => Generator<import("redux-saga/effects").PutEffect<IAction<string, any, string>>, void, unknown>;
