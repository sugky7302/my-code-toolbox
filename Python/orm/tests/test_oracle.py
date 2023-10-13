from orm.src import make_orm
from orm.src.model import ORMInfo

orm_info = ORMInfo(
    driver="oracle",
    host="localhost",
    port=1521,
    database="XEPDB1",
    account="system",
    password="0000"
)

def test_make_orm():
    with make_orm(orm_info) as db:
        print(db)
