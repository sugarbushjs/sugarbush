import { Dispatch } from 'redux';
import { IAdpDispatchOptions } from "../types/disaptchTypes";
export declare function adaptiveDispatch<D extends Dispatch, K extends string | undefined, W extends boolean>(options: IAdpDispatchOptions<D, K, W>): (action: any) => void;
