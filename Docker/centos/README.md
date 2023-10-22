# Systemd in Centos7
讓使用者可以在 Centos 7 裡面使用 systemctl 指令。使用者只要以特權模式啟動容器
```
docker run -tid --name centos_1 --privileged=true centos:latest /sbin/init
```
就能夠在容器裡面使用 `systemctl` 啟動服務了。

<img src="https://img.shields.io/static/v1?label=build&message=pass&color=brightgreen"/>
<img src="https://img.shields.io/static/v1?label=updated&message=2023/10/22&color=blue"/>

## 更新日誌
### 1.0.0 - 2023-10-22
- 從 `github:sugky7302/mockdata-generator` 複製下來。

## 測試報告
| 建置時間 | 版本 |
|-|-|
|a|a|

## 參考來源
- [如何在 Centos7 Image 啟動 Systemd](https://hub.docker.com/_/centos)
- [Docker容器出现使用systemctl问题：Failed to get D-Bus connection: Operation not permitted](https://plutoacharon.github.io/2020/02/23/Docker%E5%AE%B9%E5%99%A8%E5%87%BA%E7%8E%B0%E4%BD%BF%E7%94%A8systemctl%E9%97%AE%E9%A2%98%EF%BC%9AFailed-to-get-D-Bus-connection-Operation-not-permitted/)