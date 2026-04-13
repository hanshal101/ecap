package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

func main() {
	payload, _ := json.Marshal(map[string]string{
		"aws_key": "AKIA1234567890ABCDEF",
	})

	for i := 0; i < 10; i++ {
		resp, err := http.Post(
			"https://httpbin.org/post",
			"application/json",
			bytes.NewReader(payload),
		)
		if err != nil {
			fmt.Println("request failed:", err)
			continue
		}
		body, _ := io.ReadAll(resp.Body)
		resp.Body.Close()
		fmt.Println("request sent:", resp.Status)
		fmt.Println(string(body))
		time.Sleep(2 * time.Second)
	}
}
