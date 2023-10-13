package orm

import (
	"strconv"

	"gorm.io/driver/sqlserver"
	"gorm.io/gorm"
)

type SQLServer struct {
	*ORMInfo
}

func newSQLServer(o *ORMInfo) *SQLServer {
	return &SQLServer{
		o,
	}
}

func (s *SQLServer) Dialector() gorm.Dialector {
	return sqlserver.Open(s.dsn())
}

func (s *SQLServer) dsn() string {
	return "sqlserver://" + s.Account + ":" + s.Password + "@" + s.Host + ":" + strconv.Itoa(s.Port) + "?database=" + s.Database
}
