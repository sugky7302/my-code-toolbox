package timer

import (
	"testing"
	"time"
)

func TestGetStartTime(t *testing.T) {
	tb := []struct {
		Value  string
		Expect time.Time
	}{
		{"--:--:--", time.Now()},
		{"--:25:--", time.Date(2023, time.October, 6, 19, 25, 0, 0, time.Local)},
		{"18:--:--", time.Date(2023, time.October, 6, 18, 30, 0, 0, time.Local)},
	}

	for _, x := range tb {
		timer := Timer{Start: x.Value}
		real := time.Now().Add(timer.GetStartTime())
		if real.Format("2006/01/02 15:04:05") != x.Expect.Format("2006/01/02 15:04:05") {
			t.Errorf(
				"GetStartTime() = %s, want %s, the difference is %s.",
				real.Format("2006/01/02 15:04:05"),
				x.Expect.Format("2006/01/02 15:04:05"),
				real.Sub(x.Expect),
			)
		}
	}
}
