import { IMethodOrEventCall } from '../types';
import { CementoContract } from '../core/CementoContract';
export declare function _Read(name: string, contract: CementoContract, args: any[], options?: IMethodOrEventCall): unknown;
export declare function Read(options?: IMethodOrEventCall): (target: any, propertyKey: string) => void;
