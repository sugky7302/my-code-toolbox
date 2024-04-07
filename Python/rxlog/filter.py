"""rxlog.filter 模組定義 RxLog 的過濾器。"""

from .base import RxLogLevel


def pipe(*args: callable) -> callable:
    """
    pipe 用來串接多個 filter
    """

    def _pipe(record: dict) -> bool:
        for arg in args:
            if not arg(record):
                return False
        return True

    return _pipe


def group(name: str = 'default') -> callable:
    """
    group 用來分組日誌
    """
    return lambda record: record['extra'].get('name') == name


def max_level(level: RxLogLevel = RxLogLevel.INFO) -> callable:
    """
    max_level 限制日誌最高等級
    """
    return lambda record: record['level'].no <= level


def min_level(level: RxLogLevel = RxLogLevel.INFO) -> callable:
    """
    min_level 限制日誌最低等級
    """
    return lambda record: record['level'].no >= level
