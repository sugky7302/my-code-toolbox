import { EChartsOption } from 'echarts';
import { ChartMiddleware, EChart } from './echart';

export type BarChartData = {
    dimensions: string[];
    source: (string | number)[][];
};

export class BarChart extends EChart {
    options = {
        type: 'bar',
        legend: {},
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255, 255, 255, 0.6)', // 最後一個是調浮動提示的透明度
            axisPointer: {
                type: 'shadow',
                shadowStyle: {
                    color: 'rgba(0, 0, 0, 0.3)',
                },
            },
        },
        xAxis: {
            type: 'category',
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#333',
                },
            },
            splitLine: {
                lineStyle: {
                    color: '#ccc',
                },
            },
            axisLabel: {
                color: '#333',
                fontSize: '16',
            },
        },
        series: [
            {
                type: 'bar',
                stack: 'stack1',
                smooth: true,
                yAxisIndex: 0,
                barMaxWidth: 100,
                label: {
                    show: true,
                },
                emphasis: { focus: 'series' },
            },
        ],
    } as EChartsOption;

    constructor(title: string, data?: BarChartData, middlewares: ChartMiddleware[] = []) {
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
     * @param {LineCharData} data - 資料
     * @return {LineChart} - 回傳自己
     */
    override setData(data: BarChartData): BarChart {
        if (data.source.length === 0 || data.dimensions.length === 0) {
            throw new Error('沒有資料');
        }

        // 因為 dimensions 的第一個是 products，所以要從第二個開始
        return this.setOptions({
            dataset: data as BarChartData,
            series: data.dimensions.slice(1).map((d) => ({ type: 'bar' })),
        });
    }
}
