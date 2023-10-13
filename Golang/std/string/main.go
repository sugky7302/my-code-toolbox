package std_string

import (
	std_math "app/src/pkg/std/math"
	"strings"
)

// CleanJoin 會先過濾掉字串陣列中的空白再合併成一個字串。
/*
 * param {[]string} s_arr - 字串陣列
 * param {string} sep - 分隔符
 * return {string} - 合併後的字串
 */
func CleanJoin(s_arr []string, sep string) string {
	result := ""
	var s_trim string
	for _, s := range s_arr {
		s_trim = strings.Trim(s, " ")
		if s_trim != "" {
			result += (s_trim + sep)
		}
	}

	return result[:len(result)-1]
}

// FixTo 是把字串陣列補到特定的長度。
/*
 * param {[]string} s_arr - 原本的字串陣列
 * param {int} l - 要補足的長度
 * return {[]string} - 補完的字串陣列
 */
func FixTo(s_arr []string, l int) []string {
	result := make([]string, l)
	min := std_math.Min(l, len(s_arr))

	// 把舊陣列的內容貼到新陣列
	for i := 0; i < min; i++ {
		result[i] = s_arr[i]
	}

	// 補空字串
	for i := min; i < l; i++ {
		result[i] = ""
	}

	return result
}
