import { Dayjs, PluginFunc, ConfigType, OpUnitType } from '../..';

declare const plugin: PluginFunc;
export = plugin;

declare module 'dayjs/esm' {
    interface Dayjs {
        isSameOrAfter(date: ConfigType, unit?: OpUnitType): boolean;
    }
}
