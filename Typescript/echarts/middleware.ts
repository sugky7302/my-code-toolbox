import { ChartEvent, ChartMiddleware } from './echart';

// beautifyTooltip 會美化懸浮提示框，提供一個統一的樣式，並支援各類數字的顯示。
export function beautifyTooltip(
    precision = 0, // 數字要顯示到小數點後幾位
    isPercent = false, // 提供百分比數字的顯示
    unit = '' // 單位
): ChartMiddleware {
    unit = unit !== '' ? ' ' + unit : '';
    return {
        event: ChartEvent.Common,
        count: -1,
        trigger: (options: any) => {
            if (!options?.tooltip) options.tooltip = {};
            options.tooltip.formatter = (params: any) => {
                const titleStyle: { [key: string]: string } = {
                    'margin-bottom': '5px',
                    padding: '0 12px',
                    height: '24px',
                    'line-height': '24px',
                    background: 'pink',
                    'border-radius': '3px',
                };
                const title =
                    `<div style='${dictToStr(titleStyle)}'>` +
                    `<p style="color: black; text-align: center">${params[0].axisValue}</p>` +
                    '</div>';

                params.sort(
                    (a: any, b: any) => b.data[b.componentIndex + 1] - a.data[a.componentIndex + 1]
                );

                const contentStyle = dictToStr({
                    display: 'flex',
                    'align-items': 'center',
                    'justify-content': 'space-between',
                    'margin-bottom': '3px',
                });
                // 資料的儲存格式長這樣
                //   data = [
                //     [X軸第1格,數據1的第1個值,數據2的第1個值,數據3的第1個值,...],
                //     [X軸第2格,數據1的第2個值,數據2的第2個值,數據3的第2個值,...],
                //     [X軸第3格,數據1的第3個值,數據2的第2個值,數據3的第2個值,...],
                //     ...
                //   ]
                // 依據資料列的名稱(seriesName)找到它是數據幾，然後去比對它有沒有在忽略條件裡。
                // 如果都通過的話，就會進行渲染
                let col: number,
                    value: string,
                    content = '';
                for (let row = 0; row < params.length; row++) {
                    col = params[row].dimensionNames.indexOf(params[row].seriesName);

                    // 因為每個 series 給的 data 都是一樣的，
                    // 所以這邊才用 params[0] 判斷有沒有東西
                    if (!params[0].data || !params[row].data[col]) continue;

                    if (isPercent) {
                        value = (params[0].data[col] * 100).toFixed(precision) + '%' + unit;
                    } else {
                        value = params[0].data[col].toFixed(precision) + unit;
                    }

                    content +=
                        `<div style='${contentStyle}'>` +
                        `<div style="text-align: left">${params[row].marker}${params[row].seriesName}</div>` +
                        `<div style="font-weight:900; margin-left: 15px; text-align: right;">${value}</div>` +
                        '</div>';
                }

                return title + content;
            };
        },
    };
}

// dictToStr 會把對象依據 key-value 轉成字串
function dictToStr(dict: object, inner = ':', split = ';', sep = ' '): string {
    return Object.entries(dict)
        .map(([key, value]) => `${key}${inner}${value}${split}`)
        .join(sep);
}

// minValue 是提供一個限制 Y 軸最小值的中間層。
// 因為這是取 min，所以 absolute 要給比較大的值
export function minValue(absolute: number = 999999, relative: number = 0): ChartMiddleware {
    return {
        event: ChartEvent.Common,
        count: -1,
        trigger: (options: any): any => {
            options.yAxis.min = (v: any) => {
                const minValue = Math.min(absolute, v.min - relative);
                if (minValue !== 0) return minValue;
                else return null;
            };
            return options;
        },
    };
}

// maxValue 是提供一個限制 Y 軸最大值的中間層。
export function maxValue(absolute: number = 0, relative: number = 0): ChartMiddleware {
    return {
        event: ChartEvent.Common,
        count: -1,
        trigger: (options: any): any => {
            options.yAxis.max = (v: any) => {
                const maxValue = Math.max(absolute, v.max + relative);
                if (maxValue > 0) return maxValue;
                else return null;
            };
            return options;
        },
    };
}

// markLine 是提供一個在圖表上畫線的中間層。
export function markLine(line: { [key: string]: any }): ChartMiddleware {
    return {
        event: ChartEvent.Common,
        count: -1,
        trigger: (options: any): any => {
            if (!options?.series) options.series = [];
            for (const e of options.series) {
                e.markLine = line;
            }

            return options;
        },
    };
}
