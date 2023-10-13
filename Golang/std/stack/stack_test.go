package std_stack

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestStackSimple(t *testing.T) {
	s := New[int]()

	size := 20
	for i := 0; i < size; i++ {
		s.Push(i)
	}
	assert.Equal(t, size, s.Length())

	c := size
	for !s.Empty() {
		if _, exist := s.Top(); exist {
			assert.Equal(t, c-1, s.Get(c-1))
		}
		c--
		s.Pop()
	}

	assert.Equal(t, 0, s.Length())
}
