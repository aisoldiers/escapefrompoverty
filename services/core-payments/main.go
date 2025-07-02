package main

import (
    "fmt"
    "net/http"
)

func main() {
    go func() {
        fmt.Println("core-payments gRPC server running on :9090")
        http.ListenAndServe(":9090", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            w.Write([]byte("gRPC placeholder"))
        }))
    }()

    fmt.Println("core-payments REST server running on :8080")
    http.ListenAndServe(":8080", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("core-payments"))
    }))
}
