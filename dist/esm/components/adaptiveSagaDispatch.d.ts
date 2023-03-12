import { Dispatch } from 'redux';
import { IAdpSagaDispatchOptions } from '../types/disaptchTypes';
export declare function adaptiveSagaDispatch<D extends Dispatch>(options: IAdpSagaDispatchOptions<D>): (action: any) => void;
