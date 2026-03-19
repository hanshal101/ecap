package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	key := "AKIA1234567890ABCDEF"

	for i := 0; i < 10; i++ {
		url := "https://httpbin.org/get?aws_key=" + key

		resp, err := http.Get(url)
		if err != nil {
			fmt.Println("request failed:", err)
			continue
		}

		fmt.Println("request sent:", resp.Status)
		resp.Body.Close()

		time.Sleep(2 * time.Second)
	}
}
