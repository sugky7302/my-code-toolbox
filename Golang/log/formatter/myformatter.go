package formatter

import (
	"bytes"
	"fmt"
	"strings"

	"github.com/sirupsen/logrus"
)

type MyFormatter struct{}

/**
 * Format 實作 logrus.Formatter 介面
 * entry.Level 是 logrus 允許輸出的最低等級，不是實際呼叫函數的等級，所以這裡不會用它
 * entry.Message 包含了時間、等級、訊息。這裡需要等級 & 訊息，所以要用正規表達式取出它們
 */
func (f *MyFormatter) Format(entry *logrus.Entry) ([]byte, error) {
	var b *bytes.Buffer
	if entry.Buffer != nil {
		b = entry.Buffer
	} else {
		b = &bytes.Buffer{}
	}

	if entry.Message == "" {
		b.WriteString("")
		return b.Bytes(), nil
	}

	msg := ""
	timestamp := entry.Time.Format("2006/01/02 15:04:05")
	level := strings.ToUpper(entry.Level.String())
	if entry.HasCaller() {
		msg = fmt.Sprintf("[%s] %s in %s:%d: %s",
			timestamp,
			level,
			entry.Data["file"],
			entry.Data["line"],
			entry.Message)
	} else {
		msg = fmt.Sprintf(
			"[%s] %s: %s",
			timestamp,
			level,
			entry.Message)
	}

	b.WriteString(msg)
	return b.Bytes(), nil
}
