package std_math

import "golang.org/x/exp/constraints"

func Min[T constraints.Ordered](nums ...T) T {
	if len(nums) == 0 {
		panic("請填入數字")
	}

	minimum := nums[0]
	for _, num := range nums {
		if num < minimum {
			minimum = num
		}
	}

	return minimum
}

func Max[T constraints.Ordered](nums ...T) T {
	if len(nums) == 0 {
		panic("請填入數字")
	}

	maximum := nums[0]
	for _, num := range nums {
		if num > maximum {
			maximum = num
		}
	}

	return maximum
}

func Abs[T constraints.Float | constraints.Integer](a T) T {
	if a < 0 {
		return -a
	}

	return a
}
