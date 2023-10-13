// orm/log.go 是利用 pkg/log 來實現 gorm 的 logger。
package orm

import (
	"app/src/pkg/log"
	"app/src/pkg/log/formatter"
	"app/src/pkg/log/hook"
	"context"
	"fmt"
	"sync"
	"time"

	"github.com/natefinch/lumberjack"
	"github.com/sirupsen/logrus"
	gorm_log "gorm.io/gorm/logger"
	gorm_util "gorm.io/gorm/utils"
)

func NewORMLogger() gorm_log.Interface {
	return &ORMLogger{
		logger: getInstance(),
	}
}

type ORMLogger struct {
	logger *logrus.Logger
}

func (m *ORMLogger) LogMode(lv gorm_log.LogLevel) gorm_log.Interface {
	return m
}

func (m *ORMLogger) Trace(ctx context.Context, begin time.Time, fc func() (sql string, rowsAffected int64), err error) {
	format := "%s 花費 %.3fms，搜尋到 %v 筆紀錄。code: %s\n"
	elapsed := time.Since(begin)
	sql, rows := fc()

	var s string
	if rows == -1 {
		s = fmt.Sprintf(format, gorm_util.FileWithLineNum(), float64(elapsed.Nanoseconds())/1e6, "-", sql)
	} else {
		s = fmt.Sprintf(format, gorm_util.FileWithLineNum(), float64(elapsed.Nanoseconds())/1e6, rows, sql)
	}

	// 如果有錯誤就補上錯誤訊息
	if err != nil {
		s += fmt.Sprintf("發生了錯誤，錯誤碼為 %s\n", err.Error())
		log.Error(s)
	}

	m.logger.Trace(s)
}

func (m *ORMLogger) Info(ctx context.Context, msg string, args ...interface{}) {
	// msg 裡面含有 \n，所以不用再加一個 \n
	m.logger.Infof(msg, args...)
}

func (m *ORMLogger) Warn(ctx context.Context, msg string, args ...interface{}) {
	// msg 裡面含有 \n，所以不用再加一個 \n
	m.logger.Warnf(msg, args...)
}

func (m *ORMLogger) Error(ctx context.Context, msg string, args ...interface{}) {
	// msg 裡面含有 \n，所以不用再加一個 \n
	m.logger.Errorf(msg, args...)
}

var (
	logger *logrus.Logger
	once   sync.Once
	lock   = new(sync.RWMutex)
)

func getInstance() *logrus.Logger {
	once.Do(initLogger)
	lock.RLock()
	defer lock.RUnlock() // 這裡要使用 defer，否則會造成死鎖
	return logger
}

func initLogger() {
	// 錯誤日誌
	logger = logrus.New()
	// 讓 logger 可以輸出錯誤的行數、函數名以及檔案名
	logger.SetReportCaller(true)
	logger.AddHook(&hook.LineHook{})
	logger.SetLevel(logrus.TraceLevel)
	logger.Formatter = &formatter.MyFormatter{}
	logger.SetOutput(&lumberjack.Logger{
		Filename:   log.PATH + "/sql.log",
		MaxSize:    10, // megabytes
		MaxBackups: 14,
		MaxAge:     1,    //days
		Compress:   true, // disabled by default
		LocalTime:  true,
	})
}
