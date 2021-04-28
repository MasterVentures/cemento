"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Write = exports._Write = void 0;
const Utils_1 = require("./Utils");
function _Write(name, contract, args, options = {}) {
    return {
        request: (config) => __awaiter(this, void 0, void 0, function* () {
            if (!config)
                throw new Error('Missing tx config');
            if (options.validations) {
                Utils_1.validate(options.validations, args);
            }
            const func = contract.getMethod(options.name || name);
            const signer = yield contract.prepareSigning(func, Object.assign({}, options, config), args);
            return signer.requestSigning();
        }),
        call: (config = {}) => __awaiter(this, void 0, void 0, function* () {
            if (options.validations) {
                Utils_1.validate(options.validations, args);
            }
            const func = contract.getMethod(options.name || name);
            const signer = yield contract.prepareSigning(func, Object.assign({}, options, config), args);
            return signer.requestSigning();
        })
    };
}
exports._Write = _Write;
function Write(options = {}) {
    return (target, propertyKey) => {
        const write = function (...args) {
            return _Write(propertyKey, this, args, options);
        };
        Object.defineProperty(target, propertyKey, {
            value: write,
            enumerable: false,
            configurable: true
        });
    };
}
exports.Write = Write;
