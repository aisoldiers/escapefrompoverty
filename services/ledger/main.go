package main

import (
    "fmt"
    "net/http"
)

func main() {
    fmt.Println("ledger service running on :8300")
    http.ListenAndServe(":8300", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("ledger"))
    }))
}
