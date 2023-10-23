# Docker 工具箱
本工具箱提供工作上常用的幾個 Dockerfile，使用者可透過多階段構建把它們融合起來。

## 總覽
### 工具
- envsubst: 使用者可以把環境變數寫入指定的檔案裡。最常使用在 docker-compose 載入不同的 .env 來設定依據建置環境而不同的值。
- oracle-client: 提供 Python/cx_Oracle 所需的 Oracle 客戶端，讓使用者可以操作資料庫。
- systemd-in-centos7: 讓使用者可以在 Centos 7 裡面使用 systemctl 指令。

### Python
- python/poetry: 提供 poetry 套件管理工具的安裝流程。
