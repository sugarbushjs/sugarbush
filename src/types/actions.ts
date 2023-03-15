/**
 * @template Type of string
 * @template Payload of any
 * @template Key of string
 * */
export interface IAction<T = string, P = any, K = string> {
  type: T;
  payload: P;
  key: K;
}
