import { Dayjs, PluginFunc } from '../..';

declare const plugin: PluginFunc;
export = plugin;

declare module 'dayjs/esm' {
    interface Dayjs {
        week(): number;

        week(value: number): Dayjs;
    }
}
