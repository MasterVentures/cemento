"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CementoProvider = void 0;
const TopicSignature_1 = require("./TopicSignature");
const decorators_1 = require("../decorators");
class CementoProvider {
    buildDynamicStubs() {
        if (this.abi.length > 0) {
            const contract = this;
            this.methods = {};
            this.events = {};
            this.abi.forEach(definition => {
                if (definition.type === 'function' && definition.stateMutability === 'view') {
                    this.methods = Object.assign(Object.assign({}, this.methods), { [definition.name]: (...req) => decorators_1._Read(definition.name, contract, req, {}) });
                }
                if (definition.type === 'function' && definition.stateMutability === 'nonpayable') {
                    this.methods = Object.assign(Object.assign({}, this.methods), { [definition.name]: (...req) => decorators_1._Write(definition.name, contract, req, {}) });
                }
                if (definition.type === 'event') {
                    this.events = Object.assign(Object.assign({}, this.events), { [definition.name]: () => decorators_1._GetEvent(definition.name, contract) });
                }
            });
        }
    }
    setBindContract(bindContract) {
        this.abi = bindContract.abi;
        this.bindContract = bindContract;
        this.abi.forEach(definition => {
            if (definition.type === 'event' && definition.signature) {
                const topic = new TopicSignature_1.TopicSignature(definition.signature);
                this.topics = Object.assign(Object.assign({}, this.topics), { [definition.name]: topic });
            }
        });
    }
}
exports.CementoProvider = CementoProvider;
