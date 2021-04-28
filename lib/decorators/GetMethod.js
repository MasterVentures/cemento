"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMethod = void 0;
function GetMethod(options) {
    return (target, propertyKey) => {
        const getMethod = function () {
            const self = this;
            return self.getMethod(options.name || propertyKey);
        };
        Object.defineProperty(target, propertyKey, {
            value: getMethod,
            enumerable: false,
            configurable: true
        });
    };
}
exports.GetMethod = GetMethod;
