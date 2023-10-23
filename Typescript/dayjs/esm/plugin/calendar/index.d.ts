import { Dayjs, PluginFunc, ConfigType } from '../..';

declare const plugin: PluginFunc;
export = plugin;

declare module 'dayjs/esm' {
    interface Dayjs {
        calendar(referenceTime?: ConfigType, formats?: object): string;
    }
}
