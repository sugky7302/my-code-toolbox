import { EChartsOption } from 'echarts';
import { ChartMiddleware, EChart } from './echart';

// 折線圖
export interface SunburstChartData {
    name: string;
    children?: SunburstChartData[];
    value?: number;
}

export class SunburstChart extends EChart {
    options = {
        series: {
            type: 'sunburst',
            radius: [0, '90%'],
            itemStyle: {
                borderRadius: 7,
                borderWidth: 2,
            },
            levels: [
                {
                    itemStyle: {
                        color: '#edf1f7',
                        borderColor: '#d9d9d9',
                        borderWidth: 2,
                    },
                },
                {
                    r0: 60,
                    r: '60%',
                    itemStyle: {
                        borderWidth: 2,
                    },
                    label: {
                        rotate: '',
                        formatter: '{b}({c})',
                        fontSize: 14,
                    },
                },
                {
                    r0: '60%',
                    r: '90%',
                    label: {
                        formatter: '{b}({c})',
                        rotate: '',
                        fontSize: 14,
                    },
                },
            ],
        },
    } as EChartsOption;

    constructor(title: string, data?: SunburstChartData[], middlewares: ChartMiddleware[] = []) {
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
     * @param {SunburstChartData[]} data - 資料
     * @return {SunburstChart} - 回傳自己
     */
    override setData(data: SunburstChartData[]): SunburstChart {
        return this.setOptions({
            series: { ...this.options.series, data: data },
        });
    }
}

export class CenterSunburstChart extends SunburstChart {
    constructor(data: SunburstChartData[], middlewares: ChartMiddleware[] = []) {
        super('', data, middlewares);
        this.setOptions({
            title: {
                text: this.totalValue(data).toString(),
                left: 'center',
                top: 'center',
                textStyle: {
                    fontSize: 24,
                },
            },
        });
    }

    // 計算總值
    private totalValue(data: SunburstChartData[]): number {
        let total = 0;
        for (const x of data) {
            if (x.children) {
                total += this.totalValue(x.children);
            } else {
                total += x.value ?? 0;
            }
        }

        return total;
    }
}
