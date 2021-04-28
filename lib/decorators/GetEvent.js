"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEvent = exports._GetEvent = void 0;
function _GetEvent(name, contract) {
    return contract.getEvent(name);
}
exports._GetEvent = _GetEvent;
function GetEvent(options) {
    return (target, propertyKey) => {
        const getEvent = function () {
            const self = this;
            return self.getEvent(options.name || propertyKey);
        };
        Object.defineProperty(target, propertyKey, {
            value: getEvent,
            enumerable: false,
            configurable: true
        });
    };
}
exports.GetEvent = GetEvent;
