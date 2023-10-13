/**
 * 這個 Logger 模組是基於 logrus & lumberjack 套件所實作的
 * 會開發這個模組是因為工作上需要將錯誤日誌與正常日誌分開以及將日誌輸出到檔案與控制台
 * 特別是檔案日誌，需要以日期分隔，方便查看。
 * 作者: Arvin Yang 楊鈞硯
 * 時間: 2023/05/14
 */
package log

import (
	"app/src/pkg/log/formatter"
	"app/src/pkg/log/hook"
	"os"
	"sync"

	"github.com/natefinch/lumberjack"
	"github.com/sirupsen/logrus"
)

var (
	PATH = os.Getenv("APP_LOG_PATH")
	loggers = make([]*mylogger, 0)
	once    sync.Once
	lock    = new(sync.RWMutex)
)

// Trace 提供最詳細的追蹤訊息，用於追蹤程式的執行流程，讓程式開發者可以更了解程式的執行情況。
// 特別是在程式發生錯誤時，可以追蹤到程式的執行流程，方便除錯。
func Trace(msg string, args ...any) {
	forEach(func(e *mylogger) {
		e.Trace(msg, args...)
	})
}

// Debug 使用於開發和調試階段，提供關鍵變數的值、函式的輸入和輸出等資訊。
func Debug(msg string, args ...any) {
	forEach(func(e *mylogger) {
		e.Debug(msg, args...)
	})
}

// Info 是提示性訊息，使用於輸出重要的系統狀態、事件或操作訊息。
// 主要提供關鍵的狀態供快速判斷系統狀態
func Info(msg string, args ...any) {
	forEach(func(e *mylogger) {
		e.Info(msg, args...)
	})
}

// Warning 使用於警示程式可能存在的問題，但不影響程式運行。
// 出現時可以提供分析的資訊，讓程式開發者可以進行修正。
func Warning(msg string, args ...any) {
	forEach(func(e *mylogger) {
		e.Warning(msg, args...)
	})
}

// Error 使用於程式遇到可恢復的錯誤，但無法繼續執行。
func Error(msg string, args ...any) {
	forEach(func(e *mylogger) {
		e.Error(msg, args...)
	})
}

// Fatal 使用於非常嚴重的錯誤，導致程式無法繼續執行。
func Fatal(msg string, args ...any) {
	forEach(func(e *mylogger) {
		e.Fatal(msg, args...)
	})
}

// Panic 是非常嚴重且無法恢復的錯誤，引發程式崩潰。
func Panic(msg string, args ...any) {
	forEach(func(e *mylogger) {
		e.Panic(msg, args...)
	})
}

/**
 * 回傳指定名稱的 logger
 * 如果有多個名稱相同的 logger，只會回傳第一個
 */
func Name(name string) *mylogger {
	for _, e := range getInstance() {
		if e.name == name {
			return e
		}
	}

	return nil
}

/**
 * 因為有名稱的一定會呼叫 Name(XXX)
 * 所以這裡只對沒有名稱的 logger 執行動作
 * f(e) 的行數會影響 hook/linehook 的 runtime.Caller() 的判斷條件
 */
func forEach(f func(*mylogger)) {
	for _, e := range getInstance() {
		if e.name == "" {
			f(e)
		}
	}
}

/**
 * 新建一個 toml 實例，並使用 once 保證只會執行一次
 * @return {*TomlConfig} toml 實例
 */
func getInstance() []*mylogger {
	once.Do(initLogger)
	lock.RLock()
	defer lock.RUnlock() // 這裡要使用 defer，否則會造成死鎖
	return loggers
}

/**
 * 初始化 logger
 * 這裡會使用到 once，保證只會執行一次
 *
 * !注意
 * 因為建一個新的 logrus 然後使用 io.MultiWriter 把所有 logger 綁在一起輸出
 * 會有一個很嚴重的問題，就是所有 logger 的 Level 是吃主 logrus 的 Level
 * 導致 errLogger 不會動作。
 * 所以現在把所有 logger 合成一個數組，，然後寫一個 forEach 函數讓它們能夠執行動作。
 * Arvin Yang - 2023-05-15
 */
func initLogger() {
	if err := os.MkdirAll(PATH, 0755); err != nil {
		panic("無法建立 log 資料夾: " + err.Error())
	}

	// 錯誤日誌
	errLogger := logrus.New()
	// 讓 errLogger 可以輸出錯誤的行數、函數名以及檔案名
	errLogger.SetReportCaller(true)
	errLogger.AddHook(&hook.LineHook{})
	errLogger.SetLevel(logrus.ErrorLevel)
	errLogger.Formatter = &formatter.MyFormatter{}
	errLogger.SetOutput(&lumberjack.Logger{
		Filename:   PATH + "/error.log",
		MaxSize:    10, // megabytes
		MaxBackups: 14,
		MaxAge:     1,    //days
		Compress:   true, // disabled by default
		LocalTime:  true,
	})
	AddLogger(errLogger)

	// 正常日誌
	// 寫入
	infoLogger := logrus.New()
	infoLogger.SetLevel(logrus.InfoLevel)
	infoLogger.Formatter = &formatter.MyFormatter{}
	infoLogger.SetOutput(&lumberjack.Logger{
		Filename:   PATH + "/access.log",
		MaxSize:    10, // megabytes
		MaxBackups: 7,
		MaxAge:     1,    //days
		Compress:   true, // disabled by default
		LocalTime:  true,
	})
	AddLogger(infoLogger)

	// 追蹤用日誌
	traceLogger := logrus.New()
	traceLogger.SetLevel(logrus.TraceLevel)
	traceLogger.AddHook(&hook.MaxLimitHook{MaxLevel: logrus.DebugLevel})
	traceLogger.Formatter = &formatter.MyFormatter{}
	traceLogger.SetOutput(&lumberjack.Logger{
		Filename:   PATH + "/trace.log",
		MaxSize:    10, // megabytes
		MaxBackups: 3,
		MaxAge:     1,    // days
		Compress:   true, // disabled by default
		LocalTime:  true,
	})
	AddLogger(traceLogger)

	// 控制台日誌
	stdLogger := logrus.New()
	stdLogger.SetLevel(logrus.TraceLevel)
	stdLogger.Formatter = &formatter.MyFormatter{}
	stdLogger.SetOutput(os.Stdout)
	AddLogger(stdLogger)
}

// 把它存進陣列裡面
func AddLogger(l *logrus.Logger, arg ...any) {
	lock.Lock()
	defer lock.Unlock()

	name := ""
	if len(arg) > 0 {
		name = arg[0].(string)

		// 同一個名稱的 logger 只會存一個
		for _, e := range loggers {
			if e.name == name {
				return
			}
		}
	}

	loggers = append(loggers, &mylogger{
		logger: l,
		name:   name,
	})
}
