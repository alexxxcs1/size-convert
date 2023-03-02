"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TB = exports.GB = exports.MB = exports.KB = exports.B = exports.bit = exports.SizeConvertFactory = exports.ESizeType = void 0;
var ESizeType;
(function (ESizeType) {
    ESizeType["bit"] = "bit";
    ESizeType["B"] = "B";
    ESizeType["KB"] = "KB";
    ESizeType["MB"] = "MB";
    ESizeType["GB"] = "GB";
    ESizeType["TB"] = "TB";
})(ESizeType = exports.ESizeType || (exports.ESizeType = {}));
const SizeConvertFactory = (sizeType, factoryOpts) => {
    const calculateBaseIndex = {
        2: 10,
        10: 3
    };
    const factoryBase = (factoryOpts === null || factoryOpts === void 0 ? void 0 : factoryOpts.base) || 2;
    const getBaseStack = (base) => {
        const index = calculateBaseIndex[base];
        return [
            {
                type: 'bit',
                transform: 8,
            },
            {
                type: 'B',
                transform: Math.pow(base, index),
            },
            {
                type: 'KB',
                transform: Math.pow(base, index),
            },
            {
                type: 'MB',
                transform: Math.pow(base, index),
            }, {
                type: 'GB',
                transform: Math.pow(base, index),
            },
            {
                type: 'TB',
                transform: Math.pow(base, index),
            }
        ];
    };
    const getResultOptions = (actionOpt) => {
        return Object.assign(Object.assign({}, (factoryOpts || {})), (actionOpt || {}));
    };
    const baseStack = getBaseStack(factoryBase);
    const currentIndex = baseStack.findIndex(d => d.type === sizeType);
    const createConverApi = (value = 1) => {
        const getBaseFormatApi = (v, type) => {
            const readable = () => {
                return [v.toString(), type].join('');
            };
            const less = Math.pow(factoryBase, calculateBaseIndex[factoryBase]);
            const prettier = (prettierThan = 1, prettierLess = less) => {
                const numbers = Object.keys(ESizeType).map((d) => {
                    if (d === type)
                        return null;
                    const instance = (0, exports.SizeConvertFactory)(type, factoryOpts);
                    return instance(v)[d]();
                }).filter(T => T !== null);
                const matchPrettier = numbers.find(d => d.value >= prettierThan && d.value <= prettierLess);
                if (matchPrettier) {
                    return matchPrettier.readable();
                }
                else {
                    return readable();
                }
            };
            return {
                readable,
                prettier
            };
        };
        const converActions = baseStack.reduce((result, data, index) => {
            const [start, end] = [index, currentIndex].sort((A, B) => A - B);
            const calculateArray = baseStack.slice(start, end + 1);
            const doConvert = (actionOpt) => {
                const opt = getResultOptions(actionOpt);
                let resultValue;
                if (currentIndex === index)
                    resultValue = value;
                if (currentIndex > index) {
                    resultValue = calculateArray.reduce((r, d) => {
                        if (d.type === sizeType)
                            return r;
                        return r * d.transform;
                    }, value);
                }
                else if (currentIndex < index) {
                    resultValue = calculateArray.reduce((r, d) => {
                        if (d.type === sizeType)
                            return r;
                        return r / d.transform;
                    }, value);
                }
                if (opt.toFix) {
                    if (typeof opt.toFix === 'function') {
                        resultValue = opt.toFix(resultValue);
                    }
                    else if (typeof opt.toFix === 'number') {
                        resultValue = Number(resultValue.toFixed(opt.toFix));
                    }
                    else if (opt.toFix === true) {
                        resultValue = Number(resultValue.toFixed(2));
                    }
                }
                let valueNumber = resultValue;
                const instance = (0, exports.SizeConvertFactory)(data.type, opt);
                return Object.assign({}, instance(valueNumber));
            };
            result[data.type] = doConvert;
            return result;
        }, {});
        const formatApi = getBaseFormatApi(value, sizeType);
        return Object.assign(Object.assign(Object.assign({}, converActions), formatApi), { value: value });
    };
    return createConverApi;
};
exports.SizeConvertFactory = SizeConvertFactory;
exports.default = {
    from: (argValue, opts) => {
        let value;
        const [_, _value, _type] = argValue.trim().match(/^(\d??[\.]??[\d]+)([^\d\.]+)/) || [];
        if (_value === void 0 || !_type) {
            return void 0;
        }
        else {
            const typeRegMap = {
                bit: /^(bit|b|bits|)$/g,
                B: /^(B|Bytes|Byte|byte|bytes)$/g,
                KB: /(k|kb|kilobyte|kilobytes|kib)/gi,
                MB: /(m|mb|megabyte|megabytes|mib)/gi,
                GB: /(g|gb|gigabyte|gigabytes|gib)/gi,
                TB: /(t|tb|terabyte|terabytes|tib)/gi
            };
            value = Number(_value);
            const type = Object.keys(typeRegMap).find((k) => {
                const reg = typeRegMap[k];
                return reg.test(_type.trim());
            });
            if (type) {
                return (0, exports.SizeConvertFactory)(type, opts)(value);
            }
            return void 0;
        }
    }
};
exports.bit = (0, exports.SizeConvertFactory)(ESizeType.bit);
exports.B = (0, exports.SizeConvertFactory)(ESizeType.B);
exports.KB = (0, exports.SizeConvertFactory)(ESizeType.KB);
exports.MB = (0, exports.SizeConvertFactory)(ESizeType.MB);
exports.GB = (0, exports.SizeConvertFactory)(ESizeType.GB);
exports.TB = (0, exports.SizeConvertFactory)(ESizeType.TB);
