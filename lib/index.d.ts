export declare enum ESizeType {
    bit = "bit",
    B = "B",
    KB = "KB",
    MB = "MB",
    GB = "GB",
    TB = "TB"
}
export type calculateBase = 2 | 10;
type convertOptions = {
    base?: calculateBase;
    toFix?: ((value: number) => number) | boolean | number;
};
type ActionsValuesApi = {
    value: number;
    prettier: ((prettierThan?: number, prettierLess?: number) => string);
    readable: () => string;
};
type CovertApis = Record<keyof typeof ESizeType, <T = Omit<convertOptions, 'base'>>(options?: T) => (ActionsValuesApi & CovertApis)> & ActionsValuesApi;
export declare const SizeConvertFactory: (sizeType: ESizeType, factoryOpts?: convertOptions) => (value?: number) => CovertApis;
declare const _default: {
    from: (argValue: string, opts?: convertOptions) => CovertApis | undefined;
};
export default _default;
export declare const bit: (value?: number) => CovertApis;
export declare const B: (value?: number) => CovertApis;
export declare const KB: (value?: number) => CovertApis;
export declare const MB: (value?: number) => CovertApis;
export declare const GB: (value?: number) => CovertApis;
export declare const TB: (value?: number) => CovertApis;
