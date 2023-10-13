package timezone

import (
	"os"
	"strconv"
	"time"
)

// Local 會先比對 time.Local 是否為 UTC，若是則會從環境變數中取得時區資訊，並設定為 time.Local。
func Local() *time.Location {
	if time.Local.String() == time.UTC.String() {
		offset, _ := strconv.Atoi(os.Getenv("TZ_OFFSET"))
		time.Local = time.FixedZone(os.Getenv("TZ"), offset)
	}
	return time.Local
}
