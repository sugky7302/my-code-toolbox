import { Dayjs, PluginFunc, ConfigType, OpUnitType } from '../..';

declare const plugin: PluginFunc;
export = plugin;

declare module 'dayjs/esm' {
    interface Dayjs {
        isBetween(
            a: ConfigType,
            b: ConfigType,
            c?: OpUnitType | null,
            d?: '()' | '[]' | '[)' | '(]'
        ): boolean;
    }
}
