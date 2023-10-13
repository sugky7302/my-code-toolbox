package std_stack

func New[T any]() *Stack[T] {
	return &Stack[T]{
		data: make([]T, 0),
	}
}

type Stack[T any] struct {
	data []T
}

func (s *Stack[T]) Push(val T) {
	s.data = append(s.data, val)
}

func (s *Stack[T]) Pop() (T, bool) {
	v, exist := s.Top()

	if exist {
		s.data = s.data[:len(s.data)-1]
	}

	return v, exist
}

func (s *Stack[T]) Top() (T, bool) {
	if s.Empty() {
		// 這裡要回傳 T 的 zero value，但 nil 不能使用，
		// 因此使用 new(T) 來取得 T 的 zero value。
		return *new(T), false
	}

	return s.data[len(s.data)-1], true
}

func (s *Stack[T]) Empty() bool {
	return len(s.data) == 0
}

func (s *Stack[T]) Get(i int) T {
	if i < 0 || i >= len(s.data) {
		return *new(T)
	}
	return s.data[i]
}

func (s *Stack[T]) Length() int {
	return len(s.data)
}
