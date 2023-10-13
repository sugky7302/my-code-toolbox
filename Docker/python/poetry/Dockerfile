# syntax=docker/dockerfile:1.3
ARG WORKDIR=/app \
# python 只能設定到 major.minor，不能設定到 patch
# 否則 /usr/loca/lib 會找不到套件
    PYTHON_VERSION=3.11 \
    PYTHON_PACKAGE=/usr/local/lib/python${PYTHON_VERSION}/site-packages

#############################################
# 編譯 Python 套件
#############################################
FROM python:${PYTHON_VERSION}-slim as base
ARG WORKDIR
# Don't buffer `stdout`:
ENV PYTHONUNBUFFERED=1
# 控制在編譯 Python 時會不會生成 .pyc 檔案
# 1 代表不生成，0 代表生成
ENV PYTHONDONTWRITEBYTECODE 1

# 下載 poetry
# 參考 https://github.com/python-poetry/poetry/issues/1178
RUN --mount=type=cache,target=/root/.cache/pip,id=py_pkg,sharing=locked \
    set -xe && \
    pip install --upgrade pip && \
    pip install poetry && \
    pip install setuptools && \
# 讓 poetry 生成的虛擬環境在專案裡
    poetry config virtualenvs.in-project true

WORKDIR ${WORKDIR}

# 複製基本的設定檔
COPY --chmod=755 pyproject.toml ./

RUN --mount=type=cache,target=/root/.cache/pypoetry,id=my_poetry,sharing=locked \
    set -xe && poetry install

#############################################
# 開發環境建置
#############################################
FROM python:${PYTHON_VERSION}
ARG WORKDIR
ARG PYTHON_VERSION
ARG PYTHON_PACKAGE

# 設定 PYTHON PATH，讓 venv 可以讀取本地模組
# 沒寫的話會出現 ModuleNotFoundError: No module named 'lib'
ENV PYTHONPATH=${WORKDIR} \
# 設定 Python 解譯器的路徑
    PATH=${WORKDIR}/.venv/bin:${PATH}

WORKDIR ${WORKDIR}

# 複製 poetry
# 一定要複製 site-packages，不然會出現 ModuleNotFoundError: No module named 'poetry'
COPY --from=base --chmod=777 /usr/local/bin/poetry* /usr/local/bin/
COPY --from=base --chmod=777 /usr/local/bin/setuptools* /usr/local/bin/
COPY --from=base --chmod=777 ${PYTHON_PACKAGE}/ ${PYTHON_PACKAGE}/
# 複製虛擬環境
COPY --from=base --chmod=777 ${WORKDIR} .

CMD ["poetry", "run", "python", "__init__.py"]