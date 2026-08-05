package main

import (
	"fmt" // used for printing
	"net/http" // Go's built-in web server library.
)

func home(w http.ResponseWriter, r *http.Request) { // handler, w = ResponseWriter, r = request
	fmt.Println("Welcome to Anonymous Msg Backend")
}

func main() {
	http.HandleFunc("/", home)

	fmt.Println("Server running on http://localhost:8080")

	http.ListenAndServe(":8080", nil)


}