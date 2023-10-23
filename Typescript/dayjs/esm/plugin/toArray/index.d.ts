import { Dayjs, PluginFunc } from '../..';

declare const plugin: PluginFunc;
export = plugin;

declare module 'dayjs/esm' {
    interface Dayjs {
        toArray(): number[];
    }
}
