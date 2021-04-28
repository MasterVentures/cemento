import { CementoBindContract, CementoProviderType } from '../types';
import { TopicSignature } from './TopicSignature';
export declare abstract class CementoProvider {
    topics: {
        [key: string]: TopicSignature;
    };
    methods: {
        [key: string]: any;
    };
    events: {
        [key: string]: any;
    };
    protected abi: any[];
    protected bindContract: CementoBindContract;
    protected providerType: CementoProviderType;
    abstract getProviderType(): CementoProviderType;
    protected buildDynamicStubs(): void;
    protected setBindContract(bindContract: CementoBindContract): void;
}
