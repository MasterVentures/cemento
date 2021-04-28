import { CementoContract } from '../core/CementoContract';
export declare function _GetEvent(name: string, contract: CementoContract): unknown;
export declare function GetEvent(options?: {
    name: string;
}): (target: any, propertyKey: string) => void;
