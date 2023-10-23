import { ConfigType, PluginFunc } from '..';

declare const plugin: PluginFunc;
export = plugin;

declare module 'dayjs' {
    interface Dayjs {
        calendar(referenceTime?: ConfigType, formats?: object): string;
    }
}
