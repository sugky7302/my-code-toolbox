"""rxlog.main 定義了 RxLog 類別，用來處理 log 訊息。"""

import logging
import re
import threading
from re import Pattern
from typing import Any
from uuid import uuid4

from loguru import logger

from .base import RxLogNamePattern, RxLogOutput
from .filter import group, pipe

# 這個鎖用來確保 logger 只被初始化一次
init_lock = threading.Lock()
# 標記 logger 是否已經初始化
logger_initialized = False


def _initialize_logger():
    """移除所有現存的 loguru handlers，並且保證線程安全。"""

    global logger_initialized
    # 使用 init_lock 確保這段程式碼在多線程中只被執行一次
    with init_lock:
        if not logger_initialized:
            # 移除所有 logger
            logger.remove()
            # 標記 logger 已經初始化
            logger_initialized = True


class RxLog(logging.Handler):
    """
    RxLog 類別提供了一個簡單的日誌記錄器，可以用來記錄程式執行過程中的訊息。
    除了可以記錄標準的 log 訊息外，還可以記錄 debug、info、warning、error 和 fatal 訊息。
    另外，還可以設定輸出方式，例如輸出到檔案或者輸出到標準輸出。
    """

    def __init__(
        self,
        patterns: RxLogNamePattern | dict[str, list[str]],
        outputs: list[RxLogOutput | dict[str, Any]],
    ):
        """初始化 log 記錄器"""

        _initialize_logger()
        super().__init__()
        self._name = f'rxlog-{uuid4()}'  # 隨機生成一個名稱，讓 loguru 可以自動輸出特定的 logger

        # 把 patterns 轉換成 RxLogNamePattern 物件
        if isinstance(patterns, dict):
            patterns = RxLogNamePattern(**patterns)

        self._register_handler(
            [re.compile(pattern) for pattern in patterns.allowed],
            [re.compile(pattern) for pattern in patterns.exclude],
        )

        self._register_outputs(outputs)

    def _register_handler(self, allowed_logger: list[Pattern], exclude_logger: list[Pattern]):
        """
        重新設定 logger 的 handler。
        重置允許的 logger，清空被排除的 logger，其餘不動。
        """
        for name in logging.root.manager.loggerDict:
            if any(pattern.match(name) for pattern in allowed_logger):
                logging.getLogger(name).handlers = [self]

            if any(pattern.match(name) for pattern in exclude_logger):
                logging.getLogger(name).handlers = []

    def _register_outputs(self, outputs: list[RxLogOutput]):
        """
        把輸出方式設定到 logger 上。
        如果是檔案輸出，則會設定檔案大小和格式。

        logger.configure 和 logger.add 兩個方法都可以設定輸出，
        但是 logger.add 可以設定檔案大小和壓縮，所以只用 logger.add 來設定檔案輸出。
        """

        for output in outputs:
            # 把 output 轉換成 RxLogOutput 物件
            if isinstance(output, dict):
                output = RxLogOutput(**output)

            # 追加名字過濾器
            output.filter.append(group(self._name))

            if isinstance(output.output, str):
                logger.add(
                    sink=output.output,
                    rotation=f'{output.size} MB',
                    enqueue=True,
                    level=output.level,
                    compression='zip',
                    filter=pipe(*output.filter),
                )
            else:
                logger.add(
                    sink=output.output,
                    level=output.level,
                    format=output.formatter,
                    filter=pipe(*output.filter),
                )

    def emit(self, record: logging.LogRecord):
        """
        logger 會自動呼叫這個方法來處理 log 訊息。
        是 loguru 的範例程式碼，可以參考 https://loguru.readthedocs.io/en/stable/overview.html#entirely-compatible-with-standard-logging

        Args:
            record (logging.LogRecord): log 訊息
        """

        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        # Find caller from where originated the logged message
        frame, depth = logging.currentframe(), 2
        while frame.f_code.co_filename == logging.__file__:
            frame = frame.f_back
            depth += 1

        # 利用 loguru 的 bind 方法把 logger 的名稱綁定到 log 訊息上，
        # 然後 loguru.handler.filter 才能正確篩選出 logger
        logger.opt(depth=depth, exception=record.exc_info).bind(name=self._name).log(level, record.getMessage())

    def debug(self, message: str) -> None:
        logger.bind(name=self._name).debug(message)

    def info(self, message: str) -> None:
        logger.bind(name=self._name).info(message)

    def warning(self, message: str) -> None:
        logger.bind(name=self._name).warning(message)

    def error(self, message: str) -> None:
        logger.bind(name=self._name).error(message)

    def fatal(self, message: str) -> None:
        logger.bind(name=self._name).critical(message)
