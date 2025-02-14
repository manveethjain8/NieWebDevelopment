package main

import (
	"fmt"
)

func main() {
	/*a := 20

	if a >= 18 {
		fmt.Println("Adult")
	} else {
		fmt.Println("Child")
	}

	if x := 10; x > 5 {
		fmt.Println("x is greater than 5")
	}

	for i := 1; i <= 5; i++ {
		fmt.Println(i)
	}

	j := 1
	for j <= 5 {
		fmt.Println(j)
		j++
	}

	number := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	for id, value := range number {
		fmt.Printf("Index: %d, Value: %d\n", id, value)
	}

	k := 1
	for {
		fmt.Println(k)
		k++
		if k > 5 {
			break
		}
	}*/

	/*
		slice := []int{1, 2, 3, 4, 5}
		fmt.Println(slice)

		fmt.Println(slice[1:4])
		fmt.Println(len(slice[1:4]))
		fmt.Println(cap(slice[1:4]))

		slice = append(slice, 6, 7, 8, 9, 10)
		fmt.Println(slice)

		fmt.Println(len(slice[1:4]))

		makeSlice := make([]int, 11, 12)
		fmt.Println(makeSlice)
	*/

	/*
		str := "Hello friendly world"

		fmt.Println(len(str))
		fmt.Println(str[0])
		fmt.Println(str[0:5])

		fmt.Println(strings.Contains(str, "Hell"))
		fmt.Println(strings.ToUpper(str))
		newStr := strings.Split(str, " ")
		fmt.Println(newStr)
		fmt.Println(newStr[0:2])
	*/

	myMap := make(map[string]int)

	myMap["apple"] = 1
	myMap["banana"] = 2
	myMap["cherry"] = 3
	myMap["grape"] = 4

	fmt.Println(myMap)

	fmt.Println(myMap["apple"])

	value, key := myMap["grape"]
	if key {
		fmt.Println(value)
	} else {
		fmt.Println("Key not found")
	}

	delete(myMap, "banana")
	fmt.Println(myMap)

	for key, value := range myMap {
		fmt.Printf("Key: %s, Value: %d\n", key, value)
	}
}
