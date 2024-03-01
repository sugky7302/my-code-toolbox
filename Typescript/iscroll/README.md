# iSCroll
世界上最簡單好用的滾動條 JavaScript 庫。

<img src="https://img.shields.io/static/v1?label=build&message=pass&color=brightgreen"/>
<img src="https://img.shields.io/static/v1?label=updated&message=2023/11/23&color=blue"/>

- iscroll.js: 這個版本是常規應用的腳本。 它包含大多數常用的功能，有很高的性能和很小的體積。
- iscroll-lite.js: 精簡版本。 它不支援快速跳躍，滾動條，滑鼠滾輪，快捷鍵綁定。 但如果你所需要的是滾動（特別是在移動平臺） iScroll 精簡版 是又小又快的解決方案。
- iscroll-probe.js: 探查當前滾動位置是一個要求很高的任務，這就是為什麼我決定建立一個專門的版本。 如果你需要知道滾動位置在任何給定的時間，這是iScroll給你的。 （我正在做更多的測試，這可能最終在常規iscroll.js腳本，請留意）。
- iscroll-zoom.js: 在標準滾動功能上增加縮放功能。
- iscroll-infinite.js: 可以做無限緩存的滾動。 處理很長的清單的元素為行動裝置並非易事。 iScroll infinite版本使用緩存機制，允許你滾動一個潛在的無限數量的元素。

## 更新日誌
### 1.0.0 - 2023-11-23
- 複製自 u-llama2。

## 測試報告
請使用該語言提供的測試工具，對每一個函數做單元測試，並把測試報告以各種形式貼在這裡！

## 參考來源
- [iScroll 官網](https://iscrolljs.com/who-will-use-iscroll/)
- [iScroll Gitbook](https://iiunknown.gitbooks.io/iscroll-5-api-cn/content/init.html)