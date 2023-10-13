package orm

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func newPostgreSQL(o *ORMInfo) *PostgreSQL {
	return &PostgreSQL{
		o,
	}
}

type PostgreSQL struct {
	*ORMInfo
}

func (s *PostgreSQL) Dialector() gorm.Dialector {
	return postgres.Open(s.dsn())
}

func (p *PostgreSQL) dsn() string {
	return fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", p.Host, p.Port, p.Account, p.Password, p.Database)
}
