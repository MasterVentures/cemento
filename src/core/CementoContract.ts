import { IMethodOrEventCall, EventFilter } from '../types';
import { ProviderInstance } from './CementoModule';


export interface CementoSigner {
    payload?: any;
    requestSigning(): Promise<any>;
}

/**
 * A Solido contract is an interface for a contract entity to use the low level methods that are called by the decorators.
 */
export interface CementoContract {
    address: string;
    defaultAccount: string;
    chainId: string;
    network: string;
    abi: object;
    name: string;
    isContractFactory?: boolean;
    connectionName: string[];

    /**
     * Describes a contract chain tag, address and owner
     */
    describe(): string;

    /**
     * Prepares signing
     * @param methodCall 
     * @param options 
     * @param args 
     */
    prepareSigning(
        methodCall: any,
        options: IMethodOrEventCall,
        args: any[]
    ): Promise<CementoSigner>;

    /**
     * Gets an ABI definition
     * @param name 
     */
    getAbiMethod(name: string): object;

    /**
     * Gets a method
     * @param name 
     */
    getMethod<T>(name: string): T;

    /**
     * Calls a method
     * @param name 
     * @param args 
     */
    callMethod<T>(name: string, args: any[]): T;

    /**
     * Gets an event
     * @param name 
     */
    getEvent<T>(name: string): T;

    /**
     * Connects contract
     */
    connect(): void;

    /**
   * get a list of events or logs
   *
   * @param name: string
   * @param filter: EventFilter<T>
   *
   * @returns Promise<P[]>
   */
    getEvents<P, T>(name: string, eventFilter?: EventFilter<T>): Promise<P[]>;
}
