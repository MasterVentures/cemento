
import { CementoConnection, CementoBindContract, CementoModuleConfig, ContractImport, CementoProviderType } from '../types';
import { CementoProvider } from '..';
import { CementoContract } from './CementoContract';

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

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
/**
 * Contract collection stores the contracts
 */
export class ContractCollection {
    private coll: BindModuleContracts = {};

    add(key: string, c: CementoContract & CementoProvider) {
        this.coll[key] = c;
    }
    getContract<T>(key: string): T & CementoContract & CementoProvider {
        return (this.coll[key] as any) as T &
        CementoContract &
        CementoProvider;
    }
    getDynamicContract(key: string): CementoContract & CementoProvider {
        return this.coll[key];
    }

    /**
     * Connects contracts previously configured in bindContracts
     */
    connect(): ConnectedContracts {
        const contracts = {};
        Object.keys(this.coll).forEach(i => {
            const c = (this.coll[i] as CementoContract);
            c.connect();
            contracts[i] = c;
        })
        return contracts;
    }
}

class Empty { }

/**
 * A Cemento Module binds a contract entity to Cemento Decorators using mixins
 */
export class CementoModule {
    providers: CementoProvider[];
    bindSetupOptions: ProviderInstances;

    constructor(private binderContext: CementoModuleConfig) {
    }

    /**
     * Rebind
     */
    rebind() {
        if (this.bindSetupOptions) {
            this.bindContracts(this.bindSetupOptions);
        } else {
            throw new Error('bindContracts must have been called previously');
        }
    }

    /**
     * Bind contracts
     * @param setupOptions provider setup options
     */
    bindContracts(setupOptions?: ProviderInstances): Array<any> {
        const coll: Array<any> = [];

        // if one contract mapping exists
        // and multiple providers
        // use short module syntax
        if (Object.keys(this.binderContext).length >= 1) {
            // Get First Binder
            const firstKey = Object.keys(this.binderContext)[0];
            let context = this.binderContext[firstKey];
            if (context.connections.length >= 1 && context.contracts.length >= 1) {
                context.connections.forEach((connection: CementoConnection) => {
                    const contracts = context.contracts.filter((contract: CementoBindContract) => {
                        return contract.connectionName.includes(connection.name);
                    });

                    contracts.forEach((contract) => {
                        coll.push(this.bindContract(connection, contract, setupOptions));
                    });
                });
            }
        }

        this.bindSetupOptions = setupOptions;
        return coll;
    }


    /**
     * Binds and configures a contract
     * @param provider Plugin provider type
     * @param c Contract mapping
     * @param collection Contract collection
     * @param generateName If true, generates a name
     * @param setupOptions Provider instance config
     */
    private bindContract(provider: CementoConnection, contractDefinition: CementoBindContract, setupOptions?: ProviderInstances) {
        if (!provider) {
            throw new Error(`Missing provider for ${contractDefinition.name}`);
        }

        // Creates temp fn to clone prototype
        let classFactory = Empty;

        const init: any = function fn() { }
        init.prototype = Object.create(classFactory.prototype);

        // Apply provider and CementoProvider Plugin to entity type
        applyMixins(init, [
            {
                prototype: { 
                    ...provider,
                    ...contractDefinition,
                }
            }, 
            provider.provider, 
            CementoProvider
        ]);
        const instance = new init();
        instance.setBindContract(contractDefinition);
        instance.buildDynamicStubs();

        const contract = instance as CementoContract & CementoProvider;

        return contract;
    }
}
