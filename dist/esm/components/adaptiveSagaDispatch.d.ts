import { Dispatch } from 'redux';
import { IAdpSagaDispatchOptions } from '../types/disaptchTypes';
export declare function adaptiveSagaDispatch<D extends Dispatch, V extends boolean>(options: IAdpSagaDispatchOptions<D, V>): (action: any) => void;
