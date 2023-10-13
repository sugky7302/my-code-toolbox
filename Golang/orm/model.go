package orm

import (
	"strconv"

	"gorm.io/gorm"
)

type ORMInfo struct {
	Driver   string
	Host     string
	Port     int
	Database string
	Account  string
	Password string
}

func (o *ORMInfo) IP() string {
	return o.Host + ":" + strconv.Itoa(o.Port)
}

func Itoa(i int) {
	panic("unimplemented")
}

type Database interface {
	// Dialector 是建立一個 gorm.Open 需要的 gorm.Dialector 的工廠函數
	// 因為不同的資料庫，其 DSN 格式不同，所以需要不同的工廠函數
	Dialector() gorm.Dialector
	// dsn 是資料庫用於連線的 DSN(Data Source Name)
	// 這裡主要是用於 Dialector 要建立起 gorm.Dialector 時，需要傳入的參數
	dsn() string
}
