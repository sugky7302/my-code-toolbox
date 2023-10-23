import { ConfigType, OpUnitType, PluginFunc } from '..';

declare const plugin: PluginFunc;
export = plugin;

declare module 'dayjs' {
    interface Dayjs {
        isSameOrAfter(date: ConfigType, unit?: OpUnitType): boolean;
    }
}
