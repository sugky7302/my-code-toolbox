import { Dayjs, PluginFunc } from '../..';

declare const plugin: PluginFunc;
export = plugin;

declare module 'dayjs/esm' {
    export function max(dayjs: Dayjs[]): Dayjs;
    export function max(...dayjs: Dayjs[]): Dayjs;
    export function min(dayjs: Dayjs[]): Dayjs;
    export function min(...dayjs: Dayjs[]): Dayjs;
}
