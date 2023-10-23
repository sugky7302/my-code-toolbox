import { EChartsOption } from 'echarts';
import { ChartMiddleware, EChart } from './echart';

export interface PieChartData {
    name: string;
    value: number;
}

export class PieChart extends EChart {
    options = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}：{c} ({d}%)',
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true },
            },
        },
        series: {
            type: 'pie',
            radius: [70, '75%'], // 內圈半徑, 外圈半徑
            center: ['50%', '50%'], // 中心點
            roseType: 'area',
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
            },
            label: {
                formatter: '{a|IP}{abg|}\n{hr|}\n   {b|{b}：}{@次數}次  {per|{d}%}  ',
                backgroundColor: '#F6F8FC',
                borderColor: '#8C8D8E',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                    a: {
                        color: '#6E7079',
                        lineHeight: 22,
                        fontSize: 14,
                        align: 'center',
                    },
                    hr: {
                        borderColor: '#8C8D8E',
                        width: '100%',
                        borderWidth: 1,
                        height: 0,
                    },
                    b: {
                        color: '#4C5058',
                        fontSize: 16,
                        fontWeight: 'bold',
                        lineHeight: 33,
                    },
                    per: {
                        color: '#fff',
                        backgroundColor: '#4C5058',
                        padding: [3, 4],
                        borderRadius: 4,
                    },
                },
            },
            labelLine: {
                show: false,
            },
        },
    } as EChartsOption;

    constructor(title = '', data?: PieChartData[], middlewares: ChartMiddleware[] = []) {
        super(middlewares);
        this.setOptions({
            title: {
                text: title,
                left: 'center',
                textStyle: {
                    fontSize: 22,
                },
            },
        });

        if (data) {
            this.setData(data);
        }
    }

    override setData(data: PieChartData[]): PieChart {
        return this.setOptions({
            series: { ...this.options.series, data: data },
        });
    }
}

export class CenterPieChart extends PieChart {
    constructor(data?: PieChartData[], middlewares: ChartMiddleware[] = []) {
        super('', data ?? [], middlewares);
        this.setOptions({
            title: {
                text: data?.reduce((sum, cur) => sum + cur.value, 0).toString() ?? '0',
                left: 'center',
                top: 'center',
                textStyle: {
                    fontSize: 24,
                },
            },
        });
    }
}
