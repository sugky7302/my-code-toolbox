import { EChartsOption } from 'echarts';
import { ChartMiddleware, EChart } from './echart';

// 折線圖
export interface LineChartData {
    dimensions: string[];
    source: (string | number)[][];
}

export class LineChart extends EChart {
    options = {
        type: 'line',
        xAxis: {
            type: 'category',
            boundaryGap: false,
        },
        yAxis: {
            type: 'value',
        },
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
        dataset: {
            dimensions: ['products'],
            source: [],
        },
    } as EChartsOption;

    constructor(title: string, data?: LineChartData, middlewares: ChartMiddleware[] = []) {
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
    override setData(data: LineChartData): LineChart {
        if (data.source.length === 0 || data.dimensions.length === 0) {
            throw new Error('沒有資料');
        }

        // 因為 dimensions 的第一個是 products，所以要從第二個開始
        return this.setOptions({
            dataset: data as LineChartData,
            // series 會讓折線平滑(smooth)以及接續斷點(connectNulls)
            series: data.dimensions.slice(1).map((d) => ({ type: 'line', smooth: true, connectNulls: true })),
        });
    }
}
