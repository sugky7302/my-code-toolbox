package timer

import (
	std_convert "app/src/pkg/std/convert"
	"app/src/pkg/str2time"
	"app/src/pkg/timezone"
	"regexp"
	"strings"
	"time"
)

// Timer 是設定檔裡面的 timer 結構。
// 這裡抽出來是要封裝成一個單獨的套件，方便其他程式使用。
// 變數名稱必須大寫，否則 toml 沒辦法寫入。
type Timer struct {
	// Start 是第一次開始的時間
	Start string `toml:"start"`
	// Duration 是執行週期
	Duration string `toml:"duration"`
}

// GetStartTime 是取得第一次開始的時間
// 例如：現在是 2020/01/01 10:00:00
// 想要在 2020/01/01 11:00:00 開始執行
// 則會回傳 1 小時
func (m *Timer) GetStartTime() time.Duration {
	// 空字串 -> 立即開始
	if m.Start == "" || strings.ToLower(m.Start) == "now" || strings.ToLower(m.Start) == "--:--:--" {
		return 0
	}

	now := time.Now()
	loc := timezone.Local()

	var startTime time.Time
	var regAuto = regexp.MustCompile(`(--|[01]\d):(--|[012345]\d):(--|[012345]\d)`)

	// 執行時間格式有五種
	// 以下按照順序解析
	// 1. 2020/01/01 11:00:30 -> 這種格式會直接解析
	if t, err := time.ParseInLocation("2006/01/02 15:04:05", m.Start, loc); err == nil {
		startTime = t
		// 2. 2020/01/01 11:00 -> 這種格式會直接解析
	} else if t, err := time.ParseInLocation("2006/01/02 15:04", m.Start, loc); err == nil {
		startTime = t
		// 3. 11:00:30 -> 這種格式會取得當天的日期，再加上時間；如果時間已經過了，則會加一天
	} else if t, err := time.ParseInLocation("15:04:05", m.Start, loc); err == nil {
		startTime = time.Date(now.Year(), now.Month(), now.Day(), t.Hour(), t.Minute(), t.Second(), 0, loc)

		if startTime.Before(now) {
			startTime = startTime.Add(time.Hour * 24)
		}
		// 4. 11:00 -> 這種格式會取得當天的日期，再加上時間；如果時間已經過了，則會加一天
	} else if t, err := time.ParseInLocation("15:04", m.Start, loc); err == nil {
		startTime = time.Date(now.Year(), now.Month(), now.Day(), t.Hour(), t.Minute(), 0, 0, loc)

		if startTime.Before(now) {
			startTime = startTime.Add(time.Hour * 24)
		}
		// 5. [--/hh]:[--/mm]:[--/ss] -> 如果該時間是--，則會替換成當前時間或者最接近的時間。
	} else if regAuto.MatchString(m.Start) {
		// 把 hh:mm:ss 的格式取出來
		// match[0] = {完整字串, hh, mm, ss}
		match := regAuto.FindAllStringSubmatch(m.Start, -1)
		// 生成一個時間陣列，用來補正時間
		x := []struct {
			s   string
			v   int
			fix bool
			max int
		}{
			{match[0][1], 0, false, 24},
			{match[0][2], 0, false, 60},
			{match[0][3], 0, false, 60},
		}
		// 這裡是用來判斷是否是隔天的時間
		isNextDay := false
		// 先設定好定值
		for i := 0; i < len(x); i++ {
			if x[i].s != "--" {
				x[i].fix = true
				x[i].v = std_convert.Str2Int(x[i].s, 0)
			}
		}
		// 從小時開始算，然後跟現在時間比較，直到少於該時間單位，再往下一個時間單位算
		for i := 0; i < len(x); i++ {
			// 如果是定值，則跳過
			if x[i].fix {
				continue
			}

			// 從 0 開始慢慢加，直到與現在時間相差小於該時間單位
			// 一開始先假設 isNextDay 是 true，確認有找到時間才會更新成 false
			isNextDay = true
			for j := 0; j < x[i].max; j++ {
				x[i].v = j
				// 找出最接近且較大的時間
				if time.Date(now.Year(), now.Month(), now.Day(), x[0].v, x[1].v, x[2].v, 0, loc).After(now) {
					isNextDay = false
					break
				}
			}

			if isNextDay {
				// 既然超過了，就代表是隔天的時間，那原本的值就要歸零
				x[i].v = 0
				// 小時的話，要加一天，讓它變成明天的時間
				x[0].v += 24
				break
			}
		}

		startTime = time.Date(now.Year(), now.Month(), now.Day(), x[0].v, x[1].v, x[2].v, 0, loc)
	} else {
		panic("settings.toml 的 timer.start 格式錯誤")
	}

	return startTime.Sub(now)
}

// GetDuration 是取得每次執行的時間間隔
// 單位有 年(y)、月(M)、日(d)、時(h)、分(m)、秒(s)
// 這裡不用 time.ParseDuration 的原因是因為 time.ParseDuration 只能解析到小時
func (m *Timer) GetDuration() time.Duration {
	if t := str2time.Str2Time(m.Duration); t > 0 {
		return t
	} else {
		panic("settings.toml 的 timer.duration 格式錯誤")
	}
}
