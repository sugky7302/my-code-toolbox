package hook

import (
	"runtime"
	"strings"

	"github.com/sirupsen/logrus"
)

// LineHook 是專門用來記錄呼叫函數的檔案名稱與行數的 logrus.Hook，
// 這樣就可以在 logrus 的輸出中看到呼叫函數的檔案名稱與行數。
// 用法非常簡單，只要在 logrus 實例中加入這個 Hook 就可以了。
type LineHook struct{}

func (hook *LineHook) Fire(entry *logrus.Entry) error {
	file, line := getCaller()
	entry.Data["file"] = strings.Replace(file, "/go/src/app/", "", 1)
	entry.Data["line"] = line
	return nil
}

// getCaller 是為了找出實際呼叫 logrus 函數的檔案名稱與行數。
// 因為每次呼叫時，其層數都會不一樣，所以要一層一層找。
// 這裡是從第 9 層開始找是因為 Fatal 的層數比較淺，如果用 11 找會讓 32 行成立不了。
// 條件用 src/pkg/log/log.go:88 是因為所有函數都會呼叫 forEach，所以可以用這個條件來判斷。
// 而抓到這一行之後，再往上兩層就是呼叫 logrus 函數的檔案名稱與行數了。
func getCaller() (string, int) {
	for i := 9; i < 20; i++ {
		_, file, line, ok := runtime.Caller(i)
		if !ok {
			return "", 0
		}

		if strings.Contains(file, "src/pkg/log/log.go") && line == 88 {
			_, file, line, _ := runtime.Caller(i + 2)
			return file, line
		}
	}

	return "", 0
}

func (hook *LineHook) Levels() []logrus.Level {
	return logrus.AllLevels
}
