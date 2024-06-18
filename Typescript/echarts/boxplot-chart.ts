import { EChartsOption } from 'echarts';
import { ChartMiddleware, EChart } from './echart';

export type BoxPlotChartData = {
    dimensions: string[];
    source: number[][];
}

export class BoxPlotChart extends EChart {
    options = {
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: [],
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
                show: false
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            splitArea: {
                show: true
            }
        },
        series: [
            {
                name: '',
                type: 'boxplot',
                data: [],
            },
        ]
    } as EChartsOption;

    constructor(title: string, data?: BoxPlotChartData, middlewares: ChartMiddleware[] = []) {
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
                series: [
                    {
                        name: title,
                        type: 'boxplot',
                        datasetIndex: 1
                    },
                ]
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
    override setData(data: BoxPlotChartData): BoxPlotChart {
        if (data.source.length === 0) {
            throw new Error('沒有資料');
        }

        const options = this.options as {[key: string]: any};
        options['xAxis']['data'] = data.dimensions;
        options['series'][0]['data'] = data.source;

        return this.setOptions(options);
    }
}