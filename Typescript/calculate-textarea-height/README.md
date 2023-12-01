# Calculating Textarea Height
計算 textarea 的文字行數、高度，以此決定要不要調整 textarea 的高度。在 Chrome 上使用請務必小心，因為在 textarea 沒有資料的情況下，它的 scrollingHeight 會比其他瀏覽器少 2px，可能是中、英文字高度不同，導致計算 rows = 1.10xxx，接著套上 Math.Ceil(rows) 就會進位成 2。

<img src="https://img.shields.io/static/v1?label=build&message=pass&color=brightgreen"/>
<img src="https://img.shields.io/static/v1?label=updated&message=2023/12/01&color=blue"/>

## 更新日誌
### 1.0.0 - 2023-11-28
- first commit

## 測試報告
請使用該語言提供的測試工具，對每一個函數做單元測試，並把測試報告以各種形式貼在這裡！

## 參考來源
- [文字區塊(textarea)的自動增大術(auto-grow)(自動增高)](https://wun0012003.pixnet.net/blog/post/49509982)。
- [如何使用JavaScript/jQuery創建自動調整大小的textarea](https://cht.geek-docs.com/jquery/jquery-tutorials/how-to-create-auto-resize-textarea-using-javascript-jquery.html)。
- [textarea 高度自适应（扒element-plus源码）](https://juejin.cn/post/7120014348319195166?from=search-suggest)。
- [尝试获取textarea行数](https://juejin.cn/post/7258337246024613943)。