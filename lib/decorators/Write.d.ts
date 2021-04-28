import { IMethodOrEventCall, IMethodConfig } from '../types';
import { CementoContract } from '../core/CementoContract';
export declare function _Write(name: string, contract: CementoContract, args: any[], options?: IMethodOrEventCall): {
    request: (config: IMethodConfig) => Promise<any>;
    call: (config?: IMethodConfig) => Promise<any>;
};
export declare function Write(options?: IMethodOrEventCall): (target: any, propertyKey: string) => void;
