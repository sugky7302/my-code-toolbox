import { Dayjs, PluginFunc } from '..';

declare const plugin: PluginFunc;
export = plugin;

declare module 'dayjs' {
    interface Dayjs {
        toArray(): number[];
    }
}
