import { EChartsOption } from 'echarts';
import { ChartMiddleware, EChart } from './echart';

export type CandleStickChartData = {
    dimension: string;
    value: [number, number, number,number];  // [開盤價, 收盤價, 最低價, 最高價]
}

export class CandleStickChart extends EChart {
    options = {
        xAxis: {
            data: [],
          },
          yAxis: {},
          series: [
            {
              type: 'candlestick',
              data: []
            }
          ]
    } as EChartsOption;

    constructor(title: string, data?: CandleStickChartData[], middlewares: ChartMiddleware[] = []) {
        super(middlewares);
        if (title !== '') {
            this.setOptions({
                title: {
                    text: title,
                    textStyle: {
                        fontSize: 22,
                    },
                    left: 'center',
                },
            });
        }

        if (data) {
            this.setData(data);
        }
    }

    /**
     * 這裡加上 Array.isArray 是因為沒有這樣設定的話，底下的 data.map 會報錯
     * @param {CandleStickCharData[]} data - 資料
     * @return {CandleStickChart} - 回傳自己
     */
    override setData(data: CandleStickChartData[]): CandleStickChart {
        const options = this.options as {[key:string]: any};

        options['xAxis']['data'] = data.map((d) => d.dimension);
        options['series'][0]['data'] = data.map((d) => d.value);
        this.setOptions(options);
        return this;
    }
}