from .model import ORM
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

class PostgreSQL(ORM):
    @property
    def dsn(self) -> str:
        '''
        雖然抽象屬性已經有定義 @property 了，
        但是實現 dsn 的時候，記得上面要補 @property，不然會報錯。
        '''
        try:
            import psycopg2
            return f"postgresql://{self.conn.account}:{self.conn.password}@{self.conn.host}/{self.conn.database}" 
        except ImportError:
            raise ImportError("未偵測到 psycopg2 或者 psycopg2-binary 模組，這會導致無法連線 Oracle 資料庫。推薦安裝  psycopg2-binary 2.9.7+")
    
    def connect(self) -> Session:
        self.engine = create_engine(self.dsn)
        return sessionmaker(bind=self.engine)()