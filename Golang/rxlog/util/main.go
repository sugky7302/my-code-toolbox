package rxlog_util

import (
	"cmp"
	"fmt"
	"slices"
	"strings"

	"github.com/sirupsen/logrus"
)

func Fields2Str(fields logrus.Fields, exclude []string) string {
	arr := make([]string, 0)
	for k, v := range fields {
		if !slices.Contains(exclude, k) {
			arr = append(arr, fmt.Sprintf("%v=%v", k, v))
		}
	}
	if len(arr) == 0 {
		return ""
	}

	// 按照 key 的字母順序排序
	slices.SortFunc(arr, func(a, b string) int {
		return cmp.Compare(strings.ToLower(a), strings.ToLower(b))
	})

	return " " + strings.Join(arr, " ")
}
