import { Dayjs, PluginFunc } from '..';

declare module 'dayjs' {
    interface ConfigTypeMap {
        arraySupport: [number?, number?, number?, number?, number?, number?, number?];
    }
}

declare const plugin: PluginFunc;
export = plugin;
