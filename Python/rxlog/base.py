"""rxlog.base 模組定義 RxLog 所有的資料結構。"""

import logging
from collections.abc import Callable
from enum import IntEnum
from io import TextIOWrapper

from pydantic import BaseModel, validator


class RxLogLevel(IntEnum):
    DEBUG = logging.DEBUG
    INFO = logging.INFO
    WARNING = logging.WARNING
    ERROR = logging.ERROR
    CRITICAL = logging.CRITICAL


class RxLogOutput(BaseModel):
    # 輸出的方式，例如 sys.stdout, sys.stderr 或是檔案路徑
    output: TextIOWrapper | str
    level: RxLogLevel = RxLogLevel.INFO
    # 檔案大小，預設 10 MB
    size: int = 10
    # 自訂 logger 格式，只能是 str 或是 function
    formatter: Callable[[dict], str] | str = '{time} {level} {message}'
    # 過濾器，用來過濾 log 訊息
    filter: list[Callable[[dict], bool]] = []

    class Config:
        # 允許你的模型接受任意類型
        # 但它意味著我需要在使用這些字段時自己處理類型檢查和驗證
        arbitrary_types_allowed = True

    @validator('output', pre=True, always=True)
    def check_output(cls, v):
        """
        顯式檢查輸出是否為 TextIOWrapper 或 str 類型
        不然會拋出 Input should be an instance of 'TextIOWrapper' or 'str'
        """
        if isinstance(v, TextIOWrapper) or isinstance(v, str):
            return v
        raise ValueError('output must be either TextIO or str')


class RxLogNamePattern(BaseModel):
    """
    logger 的名稱樣式，也是用來清除 logging 原生 logger 的標示符
    可以先到 logging.root.manager.loggerDict 查看 logger 的名稱
    """

    # 允許的 logger 名稱
    allowed: list[str]
    # 排除的 logger 名稱
    exclude: list[str] = []
