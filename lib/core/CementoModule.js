"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CementoModule = exports.ContractCollection = void 0;
const __1 = require("..");
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
class ContractCollection {
    constructor() {
        this.coll = {};
    }
    add(key, c) {
        this.coll[key] = c;
    }
    getContract(key) {
        return this.coll[key];
    }
    getDynamicContract(key) {
        return this.coll[key];
    }
    connect() {
        const contracts = {};
        Object.keys(this.coll).forEach(i => {
            const c = this.coll[i];
            c.connect();
            contracts[i] = c;
        });
        return contracts;
    }
}
exports.ContractCollection = ContractCollection;
class Empty {
}
class CementoModule {
    constructor(binderContext) {
        this.binderContext = binderContext;
    }
    rebind() {
        if (this.bindSetupOptions) {
            this.bindContracts(this.bindSetupOptions);
        }
        else {
            throw new Error('bindContracts must have been called previously');
        }
    }
    bindContracts(setupOptions) {
        const coll = [];
        if (Object.keys(this.binderContext).length >= 1) {
            const firstKey = Object.keys(this.binderContext)[0];
            let context = this.binderContext[firstKey];
            if (context.connections.length >= 1 && context.contracts.length >= 1) {
                context.connections.forEach((connection) => {
                    const contracts = context.contracts.filter((contract) => {
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
    bindContract(provider, contractDefinition, setupOptions) {
        if (!provider) {
            throw new Error(`Missing provider for ${contractDefinition.name}`);
        }
        let classFactory = Empty;
        const init = function fn() { };
        init.prototype = Object.create(classFactory.prototype);
        applyMixins(init, [{ prototype: { chainId: provider.chainId, defaultAccount: provider.defaultAccount } }, provider.provider, __1.CementoProvider]);
        const instance = new init();
        instance.setBindContract(contractDefinition);
        instance.buildDynamicStubs();
        const contract = instance;
        if (setupOptions) {
        }
        return contract;
    }
}
exports.CementoModule = CementoModule;
