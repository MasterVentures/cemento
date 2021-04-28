import { CementoModuleConfig, ContractImport } from '../types';
import { CementoProvider } from '..';
import { CementoContract } from './CementoContract';
export interface ProviderInstance {
    provider: any;
    options: any;
}
export interface ProviderInstances {
    [key: string]: ProviderInstance;
}
export interface ContractProviderMapping {
    name: string;
    import: ContractImport;
    entity?: any;
    provider?: any;
    enableDynamicStubs?: boolean;
}
export interface BindModuleContracts {
    [key: string]: CementoContract & CementoProvider;
}
export interface ConnectedContracts {
    [key: string]: (CementoContract & CementoProvider);
}
export declare class ContractCollection {
    private coll;
    add(key: string, c: CementoContract & CementoProvider): void;
    getContract<T>(key: string): T & CementoContract & CementoProvider;
    getDynamicContract(key: string): CementoContract & CementoProvider;
    connect(): ConnectedContracts;
}
export declare class CementoModule {
    private binderContext;
    providers: CementoProvider[];
    bindSetupOptions: ProviderInstances;
    constructor(binderContext: CementoModuleConfig);
    rebind(): void;
    bindContracts(setupOptions?: ProviderInstances): Array<any>;
    private bindContract;
}
