"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const bignumber_js_1 = require("bignumber.js");
const re = '0x[a-fA-F0-9]{40}';
const ethereumRegex = opts => {
    opts = opts || {};
    return opts.exact ? new RegExp('(?:^' + re + '$)') : new RegExp(re, 'g');
};
function validate(params, values) {
    const keys = Object.keys(params);
    for (let i = 0; i < values.length; i++) {
        const val = values[i];
        const validationType = params[keys[i]];
        if (validationType === 'address') {
            if (!ethereumRegex({ exact: true }).test(val)) {
                throw new Error(`Invalid adress type: parameter ${keys[i]}`);
            }
        }
        else if (validationType === 'bignumber') {
            if (!bignumber_js_1.BigNumber.isBigNumber(val)) {
                throw new Error(`Invalid bignumber type: parameter ${keys[i]}`);
            }
        }
        else {
            throw new Error(`Invalid string type: parameter ${keys[i]}`);
        }
    }
    return true;
}
exports.validate = validate;
