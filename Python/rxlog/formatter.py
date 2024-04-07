"""
rxlog.formatter 提供自訂 logger 格式，並且將 payload 轉換成可讀性高的格式。

參考:
- https://gist.github.com/shambarick/51c955e55cf61a9e6e339f4c0223b938
- https://segmentfault.com/q/1010000042109567
- https://github.com/ycc140/fastapi_mongo/blob/main/part4/src/custom_logging.py
"""

from pprint import pformat


def beautify(record: dict) -> str:
    """
    自訂 logger 格式，並且將 payload 轉換成可讀性高的格式。
    要設定在 logger.add() 的 format 參數中。

    Example:
    # >>> payload = [{"users":[{"name": "Nick", "age": 87, "is_active": True}, {"name": "Alex", "age": 27, "is_active": True}], "count": 2}]
    # >>> logger.bind(payload=).debug("users payload")
    # >>> [   {   'count': 2,
    # >>>         'users': [   {'age': 87, 'is_active': True, 'name': 'Nick'},
    # >>>                      {'age': 27, 'is_active': True, 'name': 'Alex'}]}]
    """

    format_string = '<green>{time:YYYY/MM/DD HH:mm:ss.SSS}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>'

    if record['extra'].get('payload') is not None:
        record['extra']['payload'] = pformat(record['extra']['payload'], indent=4, compact=True, width=88)
        format_string += '<level>{extra[payload]}</level>'

    format_string += '{exception}\n'

    return format_string
