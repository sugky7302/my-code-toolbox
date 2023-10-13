package log

import (
	"github.com/sirupsen/logrus"
)

// 自訂一個具有唯一名字的 logrus.Logger
// logger.xxf 一定要加 \n，不然測試不會過
type mylogger struct {
	// logrus 實例
	logger *logrus.Logger
	// 唯一 ID
	name string
}

func (m *mylogger) Trace(msg string, args ...any) {
	m.logger.Tracef(msg+"\n", args...)
}

func (m *mylogger) Debug(msg string, args ...any) {
	m.logger.Debugf(msg+"\n", args...)
}

func (m *mylogger) Info(msg string, args ...any) {
	m.logger.Infof(msg+"\n", args...)
}

func (m *mylogger) Warning(msg string, args ...any) {
	m.logger.Warnf(msg+"\n", args...)
}

func (m *mylogger) Error(msg string, args ...any) {
	m.logger.Errorf(msg+"\n", args...)
}

func (m *mylogger) Fatal(msg string, args ...any) {
	m.logger.Logf(logrus.FatalLevel, msg+"\n", args...)
}

func (m *mylogger) Panic(msg string, args ...any) {
	m.logger.Panicf(msg+"\n", args...)
}
