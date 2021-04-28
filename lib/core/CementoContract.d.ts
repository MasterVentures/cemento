import { IMethodOrEventCall, EventFilter } from '../types';
import { ProviderInstance } from './CementoModule';
export interface CementoSigner {
    payload?: any;
    requestSigning(): Promise<any>;
}
export interface CementoContract {
    address: string;
    defaultAccount: string;
    chainId: string;
    describe(): string;
    prepareSigning(methodCall: any, options: IMethodOrEventCall, args: any[]): Promise<CementoSigner>;
    getAbiMethod(name: string): object;
    getMethod<T>(name: string): T;
    callMethod<T>(name: string, args: any[]): T;
    getEvent<T>(name: string): T;
    onReady<T>(settings: T): void;
    setInstanceOptions(settings: ProviderInstance): void;
    connect(): void;
    getEvents<P, T>(name: string, eventFilter?: EventFilter<T>): Promise<P[]>;
}
