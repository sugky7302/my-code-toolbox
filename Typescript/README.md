# Typescript 工具箱

## 總覽
### 圖表
- echarts: Ngx Echarts 的二次封裝，且特別支援 Angular 組件。

### HTML 強化
- iscroll: 最受歡迎的高性能滾動條庫，能適應所有裝置，而且各大廠商如 Apple、Microsoft 都在使用。

### 日期&時間
- dayjs: 非常精簡且快速的 **Javascript** 工具庫，提供非常豐富的函數操作日期和時間，能夠完全取代原生的 Date 物件。可在 **Typescript** 正常運作。

### 擴充
- loadsh: 針對 **Javascript** 內建的數組、對象、函數、字串、數學等提供高效能且簡易的組件庫。可在 **Typescript** 正常運作。
- download-something: 提供如何把網頁內容下載為指定格式的函數。

## FAQ
1. JavaScript 要如何在 Typescript 使用？
答: 請先在 `tsconfig.json` 添加 `"allowJS": true`，看情況加入 `"checkJs": false,`。此外，需要在 `tsconfig.json` 或者 `tsconfig.app.json` 添加
```
{
    ...
    "include": [
        // *.js 所在的位置
        ...
    ]
}
```
