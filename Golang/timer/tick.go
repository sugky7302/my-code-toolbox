package timer

import (
	"app/src/pkg/log"
	"time"
)

func NewTick(name string, t *Timer, fn func()) *Tick {
	now := time.Now()
	start := now.Add(t.GetStartTime())
	log.Info("%s 將於 %s 開始，每 %s 執行一次。", name, start.Format("2006/01/02 15:04:05"), t.GetDuration().String())
	return &Tick{
		begin:   now,
		t:       t,
		next:    start,
		execute: fn,
	}
}

// Tick 提供一個計時器循環動作的封裝。
type Tick struct {
	begin   time.Time
	t       *Timer
	next    time.Time
	execute func()
}

func (m *Tick) Run() {
	now := time.Now()
	if now.After(m.next) {
		m.execute()
		m.next = now.Add(m.t.GetDuration())
	}
}
