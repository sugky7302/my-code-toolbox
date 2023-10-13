package std_math

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMax(t *testing.T) {
	c := assert.New(t)
	c.Equal(1, Max(1, 0))
	c.Equal(1.2, Max(0., 1.2))
	c.Equal(float64(8), Max(float64(8), float64(7.7)))
	c.Equal(int32(15), Max(int32(15), int32(13)))
	c.Equal(int32(15), Max(int32(15), int32(13), int32(8), int32(14)))
	c.Equal(int32(15), Max([]int32{15, 13, 8, 14}...))
}

func TestMin(t *testing.T) {
	c := assert.New(t)
	c.Equal(0, Min(1, 0))
	c.Equal(0.6, Min(0.6, 1.2))
	c.Equal(float64(7.7), Min(float64(8), float64(7.7)))
	c.Equal(int32(13), Min(int32(15), int32(13)))
	c.Equal(int32(8), Min(int32(15), int32(13), int32(8), int32(14)))
	c.Equal(int32(8), Min([]int32{15, 13, 8, 14}...))
}

func TestAbs(t *testing.T) {
	assert.Equal(t, 2, Abs(-2))
	assert.Equal(t, 2, Abs(2))
	assert.Equal(t, 2.5, Abs(-2.5))
	assert.Equal(t, int32(318), Abs(int32(-318)))
	assert.Equal(t, uint64(318), Abs(uint64(318)))
	assert.Equal(t, float32(31.812), Abs(float32(-31.812)))
	assert.Equal(t, float64(31.8121234129), Abs(float64(-31.8121234129)))
}
