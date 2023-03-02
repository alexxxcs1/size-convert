export enum ESizeType {
    bit = "bit",
    B = "B",
    KB = "KB",
    MB = "MB",
    GB = "GB",
    TB = "TB"
}

export type calculateBase = 2 | 10;

type convertOptions = {
    base?: calculateBase,
    toFix?: ((value: number) => number) | boolean | number
}
type ActionsValuesApi = {
    value: number,
    prettier: ((prettierThan?: number, prettierLess?: number) => string),
    readable: () => string,
}
type CovertApis = Record<keyof typeof ESizeType, <T = Omit<convertOptions, 'base'>>(options?: T) => (ActionsValuesApi & CovertApis)> & ActionsValuesApi;

export const SizeConvertFactory = (sizeType: ESizeType, factoryOpts?: convertOptions):((value?: number) => CovertApis) => {
    const calculateBaseIndex:Record<calculateBase, number> = {
        2: 10,
        10: 3
    }
    const factoryBase: calculateBase = factoryOpts?.base || 2;
    const getBaseStack = (base: calculateBase):Array<{type: keyof typeof ESizeType, transform: number}> => {
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
            },{
                type: 'GB',
                transform: Math.pow(base, index),
            },
            {
                type: 'TB',
                transform: Math.pow(base, index),
            }
        ]
    }
    const getResultOptions = (actionOpt: convertOptions) => {
        return {
            ...(factoryOpts || {}),
            ...(actionOpt || {})
        }
    }
    const baseStack = getBaseStack(factoryBase);
    const currentIndex = baseStack.findIndex(d => d.type === sizeType);
    const createConverApi = (value: number = 1): CovertApis => {
        const getBaseFormatApi = (v: number, type: ESizeType) => {
            const readable = () => {
                return [v!.toString(), type].join('');
            }
            const less = Math.pow(factoryBase, calculateBaseIndex[factoryBase]);
            const prettier = (prettierThan: number = 1, prettierLess: number = less): string => {
                const numbers = Object.keys(ESizeType).map((d) => {
                    if(d === type) return null;
                    const instance = SizeConvertFactory(type, factoryOpts);
                    return instance(v)[d as ESizeType]();
                }).filter(T=>T !== null);
                const matchPrettier = numbers.find(d=> d!.value >= prettierThan && d!.value <= prettierLess);
                if(matchPrettier) {
                    return matchPrettier.readable();
                }else {
                    return readable();
                }
            }
            return {
                readable,
                prettier
            }
        }
        const converActions = baseStack.reduce<CovertApis>((result, data, index) => {
            const [start, end] = [index, currentIndex].sort((A,B) => A - B);
            const calculateArray = baseStack.slice(start, end + 1);
            const doConvert = (actionOpt: Omit<convertOptions, 'base'>) => {
                const opt = getResultOptions(actionOpt);
                let resultValue: number;
                if(currentIndex === index) resultValue = value;
                if(currentIndex > index) {
                    resultValue = calculateArray.reduce((r, d) => {
                        if(d.type === sizeType) return r;
                        return r * d.transform;
                    }, value);
                }else if(currentIndex < index){
                    resultValue = calculateArray.reduce((r, d) => {
                        if(d.type === sizeType) return r;
                        return r / d.transform;
                    }, value);
                }
                
                if(opt.toFix) {
                    if(typeof opt.toFix === 'function') {
                        resultValue = opt.toFix(resultValue!);
                    } else if(typeof opt.toFix === 'number') {
                        resultValue = Number(resultValue!.toFixed(opt.toFix));
                    } else if(opt.toFix === true) {
                        resultValue = Number(resultValue!.toFixed(2));
                    }
                }
                let valueNumber = resultValue!;
                const instance = SizeConvertFactory(data.type as ESizeType, opt);
                
                return {
                    ...instance(valueNumber),
                };
            }
            result[data.type] = doConvert as any;
            return result;
        }, {} as any);
        const formatApi = getBaseFormatApi(value, sizeType);
        return {
            ...converActions,
            ...formatApi,
            value: value,
        };
    }
    return createConverApi;
}

export default {
    from: (argValue: string, opts?: convertOptions) => {
        let value: number;
        const [_, _value, _type] = argValue.trim().match(/^(\d??[\.]??[\d]+)([^\d\.]+)/) || [];
        if(_value === void 0 || !_type) {
            return void 0;
        }else {
            const typeRegMap:Record<keyof typeof ESizeType | string, RegExp> = {
                bit: /^(bit|b|bits|)$/g,
                B: /^(B|Bytes|Byte|byte|bytes)$/g,
                KB: /(k|kb|kilobyte|kilobytes|kib)/gi,
                MB: /(m|mb|megabyte|megabytes|mib)/gi,
                GB: /(g|gb|gigabyte|gigabytes|gib)/gi,
                TB: /(t|tb|terabyte|terabytes|tib)/gi
            }
            value = Number(_value);
            const type = Object.keys(typeRegMap).find((k) => {
                const reg = typeRegMap[k];
                return reg.test(_type.trim())
            }) as keyof typeof ESizeType;
            if(type) {
                return SizeConvertFactory(type as any, opts)(value);
            }
            return void 0;
        }
    }
}

export const bit = SizeConvertFactory(ESizeType.bit);

export const B = SizeConvertFactory(ESizeType.B);

export const KB = SizeConvertFactory(ESizeType.KB);

export const MB = SizeConvertFactory(ESizeType.MB);

export const GB = SizeConvertFactory(ESizeType.GB);

export const TB = SizeConvertFactory(ESizeType.TB);