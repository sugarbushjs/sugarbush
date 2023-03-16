import { Dispatch } from 'redux';
import { IAdpDispatchOptions } from '../types/disaptchTypes';
export declare function adaptiveDispatch<D extends Dispatch, K extends string | undefined, V extends boolean>(options: IAdpDispatchOptions<D, K, V>): (action: any) => void;
