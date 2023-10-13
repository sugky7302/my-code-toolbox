package orm

import (
	"errors"
	"testing"

	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func TestNewSQLServer(t *testing.T) {
	NewSQLServerTest(assert.New(t))
}

func BenchmarkNewSQLServer(b *testing.B) {
	for i := 0; i < b.N; i++ {
		NewSQLServerTest(assert.New(b))
	}
}

func NewSQLServerTest(c *assert.Assertions) {
	db := MakeORM(&ORMInfo{
		Driver:   "sqlserver",
		Host:     "20.187.127.117",
		Port:     1433,
		Database: "SmartPhoneApp",
		Account:  "sa",
		Password: "UMCCIMabc123!",
	})

	user := []struct {
		SerialNo   string `gorm:"column:SerialNo; type:char(20); primary_key:true"`
		UploadUser string `gorm:"column:UploadUser; type:char(10)"`
	}{}
	result := db.Debug().Table("CameraGrabUploadHist").Select("SerialNo", "UploadUser").Find(&user)
	c.Equal(result.Error, nil)                                      // returns error or nil
	c.Equal(int64(32), result.RowsAffected)                         // 返回找到的记录数
	c.Equal(false, errors.Is(result.Error, gorm.ErrRecordNotFound)) // 检查 ErrRecordNotFound 错误
}

func TestNewPostgreSQL(t *testing.T) {
	NewPostgreSQLTest(assert.New(t))
}

func BenchmarkNewPostgreSQL(b *testing.B) {
	for i := 0; i < b.N; i++ {
		NewPostgreSQLTest(assert.New(b))
	}
}

func NewPostgreSQLTest(c *assert.Assertions) {
	db := MakeORM(&ORMInfo{
		Driver:   "postgresql",
		Host:     "172.28.0.5",
		Port:     5432,
		Database: "camera",
		Account:  "postgres",
		Password: "admin",
	})

	user := []struct {
		Uploader   string `gorm:"column:uploader; type:varchar(8)"`
		Uploadfile string `gorm:"column:uploadfile; type:varchar"`
	}{}
	result := db.Debug().Table("upload_history").Select("uploader", "uploadfile").Find(&user)
	c.Equal(result.Error, nil)                                      // returns error or nil
	c.Equal(int64(7), result.RowsAffected)                          // 返回找到的记录数
	c.Equal(false, errors.Is(result.Error, gorm.ErrRecordNotFound)) // 检查 ErrRecordNotFound 错误
}
