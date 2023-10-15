# syntax=docker/dockerfile:1.3
ARG ALPINE_VERSION=3.17

#############################################
# 把環境變數寫入 settings.yml
#############################################
FROM alpine:${ALPINE_VERSION} AS envsubst
# 因為 ARG 在構建階段等同於 ENV，所以 envsubst 可以寫入檔案裡。
# 這裡是要加載替換字符，這裡宣告的 ARG 變數必須與 docker-compose.yml/service/.../build/args 一致。
ARG TARGET_FILE={要替換的檔案} \
    OUTPUT_FILE={替換好的檔案} \
    a \
    b \
    c

# 因為要替換的檔案只會在構建的時候用到，容器裡面用不到，
# 所以我們用 --mount=type=bind 來掛載。
RUN --mount=type=cache,target=/var/cache/apk,id=apk \
    --mount=type=bind,source=${TARGET_FILE},target=${TARGET_FILE} \
    set -xe && \
    # 安裝 gettext，讓 envsubst 可以使用
    apk add gettext && \
    # 替換環境變數
    envsubst '${a}${b}${c}' < ${TARGET_FILE} > ${OUTPUT_FILE}