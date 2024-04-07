"""
rxlog 提供了一個簡單的日誌記錄器，可以用來記錄程式執行過程中的訊息。
來自於自己的 Golang rxlog 套件，這裡是 Python 版本。

這是另一種方式來解決模組之間的循環引用問題，但是 Python 不會給予提示，所以請小心使用。
"""

import importlib
from typing import Any

# 這個字典對應了模組名稱和模組路徑
# 名稱和路徑一定要跟檔案裡的相同，否則會找不到模組
_module_lookup = {
    'RxLog': 'rxlog.main',
    'RxLogOutput': 'rxlog.base',
    'RxLogLevel': 'rxlog.base',
    'RxLogNamePattern': 'rxlog.base',
    'beautify': 'rxlog.formatter',
    'max_level': 'rxlog.filters',
    'min_level': 'rxlog.filters',
}


# _getattr__ 會動態載入模組，解決了模組之間的循環引用問題
def __getattr__(name: str) -> Any:
    if name in _module_lookup:
        module = importlib.import_module(_module_lookup[name])
        return getattr(module, name)
    raise AttributeError(f'module {__name__} has no attribute {name}')


__all__ = list(_module_lookup.keys())
