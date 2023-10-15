# envsubst
讓使用者在建置 Docker 容器時，可以把檔案的文字替換為指定的環境變數。

<img src="https://img.shields.io/static/v1?label=build&message=pass&color=brightgreen"/>
<img src="https://img.shields.io/static/v1?label=updated&message=2023/10/15&color=blue"/>

## 前置條件
- alpine: 目前測試 3.17 版一定可行。
- apk/gettext: envsubst 在 alpine 的套件。

## 更新日誌
### 1.1.0 - 2023-10-15
#### Changed:
- 把「要替換的檔案」和「替換好的檔案」獨立成變數，於同一個地方修改。

### 1.0.0 - 2023-10-14
- 從 `github:sugky7302/mockdata-generator` 複製下來。

## 測試報告
| 建置時間 | 版本 |
|-|-|
|a|a|

## 參考來源
從缺