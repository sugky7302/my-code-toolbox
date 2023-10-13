package orm

import (
	"app/src/pkg/log"
	"errors"

	"gorm.io/gorm"
)

var (
	// driver_pool 統一管理不同的資料庫驅動程式。設計目的是減少與資料庫的連接數。
	driver_pool = map[string]*gorm.DB{}
	// ErrorNoRows 是沒有資料的錯誤。
	ErrorNoRows = gorm.ErrRecordNotFound
	// ErrorInvalid 是語句無效的錯誤。
	ErrorInvalid = gorm.ErrInvalidTransaction
	// ErrorNoParameter 是沒有參數的錯誤。
	ErrorNoParameter = errors.New("沒有參數")
	// ErrorFailConnect 是無法連線到資料庫的錯誤。
	ErrorFailConnect = errors.New("無法連線到資料庫")
)

// 工廠函數，建構不同的 Database 實例
func MakeORM(o *ORMInfo) *gorm.DB {
	if v, ok := driver_pool[o.IP()]; ok {
		return v
	}

	conn, err := selectDriver(o)

	if err != nil {
		log.Error("GORM have no driver: %v", err)
		return nil
	}

	db, err := gorm.Open(conn.Dialector(), &gorm.Config{
		Logger: NewORMLogger(),
	})

	if err != nil {
		log.Error("GORM couldn't connect to database: %v", err)
		db = nil
	}

	driver_pool[o.IP()] = db

	return db
}

func selectDriver(o *ORMInfo) (Database, error) {
	var (
		conn Database
		err  error
	)

	switch o.Driver {
	case "sqlserver":
		conn = newSQLServer(o)
	case "postgresql":
		conn = newPostgreSQL(o)
	default:
		err = errors.New("This ORM driver is not supported")
	}

	return conn, err
}

// * 目前用單例模式處理，所以不一定需要這個函數
// Release 是釋放與資料庫的連接。
// 因為 GORM 的連接方式是實現 database/sql，所以有些要手動釋放。
// 不然資料庫連接會卡住，特別是 PostgreSQL 會顯示 too many clients already 的錯誤。
func Release(db *gorm.DB) {
	if sqlDB, err := db.DB(); err == nil {
		sqlDB.Close()
	} else {
		log.Error("GORM couldn't release database: %v", err)
	}
}
