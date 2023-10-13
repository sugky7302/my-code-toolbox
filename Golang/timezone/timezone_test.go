package timezone

import (
	"fmt"
	"os"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestLocal(t *testing.T) {
	os.Setenv("TZ_OFFSET", "28800")
	time.Local = time.UTC
	fmt.Println(time.Local)
	fmt.Println(Local())
	assert.Equal(t, false, time.Local == Local())
}
