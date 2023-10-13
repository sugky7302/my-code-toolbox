# syntax=docker/dockerfile:1.3
ARG ALPINE_VERSION=3.17

#############################################
# 安裝 Oracle Client
#
# 不支援 arm64
#############################################
FROM alpine:${ALPINE_VERSION} as oracle_builder
RUN --mount=type=cache,target=/var/cache/apk,sharing=locked \
    apk add libaio libnsl

# 安裝 oracle client
# 如果本地的 /tmp 有檔案，cache會抓本地的，沒有才下載
RUN --mount=type=cache,target=/tmp,id=oracle_exe,sharing=locked \
    set -xe && \
    rm -rf /tmp/instantclient_21_8 && \
    wget -O /tmp/oracle_client.zip https://download.oracle.com/otn_software/linux/instantclient/218000/instantclient-basic-linux.x64-21.8.0.0.0dbru.zip && \
# 解壓縮
    unzip /tmp/oracle_client.zip -d /tmp && \
    mkdir -p /opt/oracle/lib && \
    mv /tmp/instantclient_21_8/ /opt/oracle/instantclient && \
# 複製特定檔案
    cp /usr/lib/libaio.so.1 /opt/oracle/instantclient/ && \
    cp /lib/libc.musl-x86_64.so.1 /opt/oracle/instantclient/ && \
# 做軟連接讓 libclntsh.so 能被 Python 找到
    ln -s /opt/oracle/instantclient/libclntsh.so.21.1 /opt/oracle/lib/libclntsh.so && \
    rm /tmp/oracle_client.zip