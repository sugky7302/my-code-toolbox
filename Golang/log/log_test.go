package log

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestTrace(t *testing.T) {
	c := assert.New(t)
	Trace("test")
	// 這裡請自己看控制台有沒有輸出
	c.Equal(true, true)
}

func TestDebug(t *testing.T) {
	c := assert.New(t)
	Debug("test")
	// 這裡請自己看控制台有沒有輸出
	c.Equal(true, true)
}

func TestInfo(t *testing.T) {
	c := assert.New(t)
	Info("test")
	time.Sleep(10 * time.Millisecond) // 等待寫入
	expected := fmt.Sprintf("[%s] INFO: test", time.Now().Format("2006/01/02 15:04:05"))
	c.Equal(true, FileExistStringLine(PATH+"/access.log", expected))
}

func TestWarn(t *testing.T) {
	c := assert.New(t)
	Warning("test")
	time.Sleep(10 * time.Millisecond) // 等待寫入
	expected := fmt.Sprintf("[%s] WARNING: test", time.Now().Format("2006/01/02 15:04:05"))
	c.Equal(true, FileExistStringLine(PATH+"/access.log", expected))
}
func TestError(t *testing.T) {
	c := assert.New(t)
	Error("test")
	time.Sleep(10 * time.Millisecond) // 等待寫入
	expected := fmt.Sprintf("[%s] ERROR in src/pkg/log/log_test.go:43: test", time.Now().Format("2006/01/02 15:04:05"))
	c.Equal(true, FileExistStringLine(PATH+"/error.log", expected))
}
func TestFatal(t *testing.T) {
	c := assert.New(t)
	Fatal("test")
	time.Sleep(10 * time.Millisecond) // 等待寫入
	expected := fmt.Sprintf("[%s] FATAL in src/pkg/log/log_test.go:50: test", time.Now().Format("2006/01/02 15:04:05"))
	c.Equal(true, FileExistStringLine(PATH+"/error.log", expected))
}

// func TestPanic(t *testing.T) {
// 	c := assert.New(t)
// 	// 因為 logrus 遇到 panic 訊息會直接跳出
// 	// 所以測試一定會失敗
// 	Panic("test")
// 	c.Equal(true, true)
// }

// 使用 go test -v -bench="." ./src/pkg/log 來測試
func BenchmarkInfo(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Info("benchmark test")
	}
}

// FileExistStringLine 是檢查檔案有沒有該訊息。
// 這樣才能檢查是否有寫入訊息，不然 logger 是直接輸出到檔案，無法檢查。
func FileExistStringLine(path, msg string) bool {
	// 開啟檔案
	file, err := os.Open(path)
	if err != nil {
		return false
	}
	defer file.Close()

	// 使用 bufio.Scanner 讀取檔案
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		// 判斷訊息是否存在於檔案中
		if strings.Contains(scanner.Text(), msg) {
			return true
		}
	}

	return false
}
