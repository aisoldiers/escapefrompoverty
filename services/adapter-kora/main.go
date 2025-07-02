package main

import (
    "fmt"
    "net/http"
)

func main() {
    fmt.Println("adapter-kora running on :8100")
    http.ListenAndServe(":8100", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("adapter-kora"))
    }))
}
