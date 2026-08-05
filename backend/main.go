package main

import (
	"fmt" // used for printing
	"net/http" // Go's built-in web server library.
	"log"
	"encoding/json"
)

type Response struct {
	Message string `json:"message"`
}

func home(w http.ResponseWriter, r *http.Request) { // handler, w = ResponseWriter, r = request
	w.Header().Set("Content-Type", "application/json")

	response := Response{
		Message: "API Is Running",
	}

	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/", home)

	fmt.Println("Server running on http://localhost:3000")

	log.Fatal(http.ListenAndServe(":3000", nil))


}