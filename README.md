# 我的常用程式碼工具箱
這個專案是收集平時工作、個人開發、第三方的程式碼，方便未來開發時，找不到程式或者找很久的窘境。

<div style="background: #f7f8f9; border-radius: 10px; padding: 10px; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">
    <h4 style="margin:0">目前提供下列語言的工具箱：</h4>
    <p style="font-size:0.9rem; margin: 0 0 8px 0">括弧是數量</p>
    <img src="https://img.shields.io/static/v1?label=Python&message=2&color==brightgreen"/>
    <img src="https://img.shields.io/static/v1?label=Golang&message=7&color==brightgreen"/>
    <img src="https://img.shields.io/static/v1?label=Docker&message=4&color==brightgreen"/>
    <img src="https://img.shields.io/static/v1?label=Typescript&message=5&color==brightgreen"/>
    <p style="margin: 30px 0 0 0;">最後更新於 <strong>2023/11/24 11:51</strong></p>
</div>
<br>

## 工具箱收納規範
由於程式碼具有低時效、快更新的特性，因此每一個工具箱都必須撰寫 **README.md** 簡介裡頭提供哪些工具、這些工具的功能是什麼。以下提供 **README.md** 的範例：

```markdown
# {程式語言 | Python} 工具箱
需要重點說明 或者 計劃要更新的事情

<div style="background: #f7f8f9; border-radius: 10px; padding: 10px; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">
</div>

## 總覽
### {分類1}
- {工具名稱}: {工具簡介}
- {工具名稱}: {工具簡介}
```

不僅如此，工具裡面也要撰寫 **README.md**。不同於工具箱，工具主要介紹功能、來源、更新日誌以及測試報告，並使用徽章(Badge)和標籤(tag)保證程式碼一定能夠「開箱即用」。底下同樣提供範例：

```markdown
# {工具名稱}
簡介...

<img src="https://img.shields.io/static/v1?label=build&message=pass&color=brightgreen"/>
<img src="https://img.shields.io/static/v1?label=updated&message=2023/10/14&color=blue"/>

## 前置條件
列出需要安裝的第三方套件

## 更新日誌
### 1.0.0 - 2023-10-14

## 測試報告
請使用該語言提供的測試工具，對每一個函數做單元測試，並把測試報告以各種形式貼在這裡！

## 參考來源
- 如果這個程式是第三方複製來的，應該會有來源
- 如果是自己寫的，請附註是參考哪些網頁

```

## 工具箱程式碼規範
為了提供優質、標準、開箱即用的模組，請制定各程式語言的寫作風格並且讓程式碼遵循此規範。不僅如此，請新增 `src/` 和 `tests/` 資料夾，前者放置原始碼，後者提供完整的單元測試(Unit Test)、基準測試(Benchmark)、完整性測試(Workflow)。除此之外，程式碼盡量寫成該程式語言推薦的第三方模組的形式，讓他人可以直接使用該程式語言的套件管理器直接下載、安裝。


