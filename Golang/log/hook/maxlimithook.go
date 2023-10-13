package hook

import (
	"github.com/sirupsen/logrus"
)

// MaxLimitHook 是用來限制輸出等級的 logrus.Hook，
// 如果輸出等級高於設定的等級，就不會輸出。
// 用法非常簡單，只要在 logrus 實例中加入這個 Hook 就可以了。
type MaxLimitHook struct {
	MaxLevel logrus.Level
}

func (hook *MaxLimitHook) Fire(entry *logrus.Entry) error {
	// 因為 logrus.Level 從大到小是 Trace -> Debug -> Info ...
	// 所以這邊的符號是 <= 而不是 >=
	if entry.Level < hook.MaxLevel {
		entry.Message = ""
	}
	return nil
}

func (hook *MaxLimitHook) Levels() []logrus.Level {
	return logrus.AllLevels
}
