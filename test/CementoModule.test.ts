import {CementoBindContract, CementoConnection, CementoBinder, CementoModuleConfig} from '../src/types';
import {CementoModule} from '../src/core/CementoModule';

const testContractImport: {
    VERSION: string;
    AgreementContract: {
        raw: {
            abi: Array<any>,
        },
        address: {
            [key: string]: any,
        },
    };
} = require('./TestContractImport');

class PluginTest {
    connect () {
        console.log('test');
    }
}

let cementoBindContract = {} as CementoBindContract;
let cementoConnection = {} as CementoConnection;
let cementoBinder = {} as CementoBinder;
let cementoModuleConfig = {} as CementoModuleConfig;

beforeEach(() => {
    const {AgreementContract} = testContractImport;
    const {raw, address} = AgreementContract;
    const {abi} = raw;
    //Setting contract information
    cementoBindContract = {
        name: 'Rinkeby',
        abi,
        address: address['rinkeby'],
        connectionName: ['Ethereum Testnet Rinkeby'],
    };
    //Setting connection information
    cementoConnection = {
        provider: PluginTest,
        chainId: '4',
        name: 'Ethereum Testnet Rinkeby',
    };
    //Setting Cemento binder
    cementoBinder = {
        contracts: [cementoBindContract],
        connections: [cementoConnection]
    };
    //Setting Cemento Module Config
    cementoModuleConfig = {
        'Paid': cementoBinder,
    };
});

test('should load Cemento Module instance', () => {
    const module = new CementoModule(cementoModuleConfig);
    expect(module).not.toBeNull;
});

test('should bind contract', () => {
    const module = new CementoModule(cementoModuleConfig);
    const contract = module['bindContract'](cementoConnection, cementoBindContract);
    expect(contract).not.toBeNull;
});

test('should bind contracts', () => {
    const module = new CementoModule(cementoModuleConfig);
    const contracts = module.bindContracts();
    expect(Array.isArray(contracts)).toBe(true);
});
