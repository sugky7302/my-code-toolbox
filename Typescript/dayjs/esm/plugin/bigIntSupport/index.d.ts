import { Dayjs, PluginFunc } from '../..';

declare module 'dayjs/esm' {
    interface ConfigTypeMap {
        bigIntSupport: bigint;
    }
    export function unix(t: bigint): Dayjs;
}

declare const plugin: PluginFunc;
export = plugin;
