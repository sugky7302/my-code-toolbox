
import { ECharts, EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

export enum ChartEvent {
    Init = 'init', // 初始化
    Click = 'click', // 點擊
    Common = 'common', // 所有事件都能夠觸發，負責渲染中間層
}

/**
 * 事件是用來對 ECharts 的事件進行包裝，方便使用
 */
export type ChartCallback = (inst: EChart, ...args: any[]) => void;

type ChartEventWrapper = { event: ChartEvent; trigger: ChartCallback; args?: any[] };

/**
 * 中間層是用來強化 Options 的，並且提供一些常用的樣式
 * 這裡加入 event 是為了讓中間層只在指定事件時才會被觸發
 */
export interface ChartMiddleware {
    event: ChartEvent | string;
    count: number;
    trigger: (options: any) => any; // 因為 EChartsOption 常常會有錯誤，所以這裡使用 any
}

// 對函數標記成初始化時的事件，方便 pipe 的使用
export function init(cbk: ChartCallback, ...args: any[]) {
    return { event: ChartEvent.Init, trigger: cbk, args: args };
}

// 對函數標記成點擊時的事件，方便 pipe 的使用
export function click(cbk: ChartCallback, ...args: any[]) {
    return { event: ChartEvent.Click, trigger: cbk, args: args };
}

/**
 * 強化 Ngx ECharts，使其支持 Angular 的 DI
 * 加入了中間層，簡化了 ECharts 的使用方式
 * 並提供了一些常用樣式
 */
export abstract class EChart {
    abstract options: EChartsOption;
    public isLoading = false;
    protected instance: ECharts | null = null;

    // 這裡設計成事件隊列的原因是每個實例的動作都不一樣，用複寫的方式會造成子類別的程式碼複雜度過高
    private _events: Map<ChartEvent, ChartEventWrapper[]> = new Map();

    constructor(protected middlewares: ChartMiddleware[] = []) {
        this._events.set(ChartEvent.Init, []);
        this._events.set(ChartEvent.Click, []);
    }

    /**
     * 設定資料給 ECharts
     * 由於 Typescript 無法判斷資料型別，所以這裡只能使用 any
     * 但子類別必須重寫這個方法，並且指定資料型別
     * @param {T} data - 資料
     */
    setData(data: any): EChart {
        return this;
    }

    /**
     * 設定資料給 ECharts
     * 由於使用 EChartsOption 會造成很多 ?. 的問題，所以這裡使用 any
     * 每次設定資料都會觸發中間層，這樣可以讓中間層在資料變動時也能夠正常運作
     * @param {EChartsOption} options - 資料格式
     * @returns {EChartsOption} - 回傳設定後的資料格式
     */
    setOptions(options: any) {
        this.options = Object.assign({}, this.options, options);
        this.wrapMiddlewares([ChartEvent.Common]);
        return this;
    }

    addMiddlewares(middleware: ChartMiddleware | ChartMiddleware[]) {
        if (Array.isArray(middleware)) {
            this.middlewares = this.middlewares.concat(middleware);
        } else {
            this.middlewares.push(middleware);
        }
        return this;
    }

    init(instance: ECharts) {
        this.instance = instance;
        this.wrapMiddlewares([ChartEvent.Init, ChartEvent.Common]);
        this._events.get(ChartEvent.Init)?.forEach((event) => event.trigger(this, event.args));
        return this;
    }

    click(ev: any) {
        this.wrapMiddlewares([ChartEvent.Click, ChartEvent.Common]);
        this._events.get(ChartEvent.Click)?.forEach((event) => event.trigger(this, ev, event.args));
        return this;
    }

    /**
     * 執行中間層
     * filter 這裡只有過濾掉 count 為 0 的中間層是因為無限次被設定為 -1
     * @param {(ChartEvent | string)[]} events - 事件名稱
     */
    private wrapMiddlewares(events: (ChartEvent | string)[]) {
        this.middlewares.forEach((middleware) => {
            if (events.includes(middleware.event)) {
                middleware.count > 0 && middleware.count--;
                middleware.trigger(this.options);
            }
        });
        this.middlewares = this.middlewares.filter((middleware) => middleware.count !== 0);
    }

    /**
     * 把執行函數加入到隊列中
     * @param {ChartEventWrapper} events - 封裝好的事件
     * @returns {this}
     */
    public pipe(...events: ChartEventWrapper[]) {
        events.forEach((e) => {
            this._events.get(e.event)?.push(e);
        });
        return this;
    }
}

export class NoChart extends EChart {
    options = {} as EChartsOption;
}

@Component({
    selector: 'echart-plus',
    standalone: true,
    imports: [NgxEchartsModule],
    template: `<div
        echarts
        [options]="_chart.options"
        [style]="_chartStyle"
        [loading]="_chart.isLoading"
        (chartInit)="_chart.init($event)"
        (chartClick)="_chart.click($event)"
    ></div>`,
})
export class EChartComponent {
    /** 設定圖表的樣式 */
    @Input()
    set style(value: { [key: string]: string }) {
        if (value) {
            this._chartStyle = value;
        }
    }
    public _chartStyle: { [key: string]: string } = {};

    /**
     * 匯入 EChart 的子類別
     * 因為 template 沒辦法讀到 private 變數，所以這裡只能使用 public 變數。
     */
    @Input()
    set chart(value: EChart) {
        if (value) {
            this._chart = value;
        }
    }
    public _chart: EChart = new NoChart();
}
