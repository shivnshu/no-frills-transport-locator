package main

import (
	"github.com/gorilla/handlers"
	"log"
	"net/http"
	"server/transport_locator"
)

func main() {
	port := "8000"
	router := transport_locator.NewRouter()

	allowedOrigins := handlers.AllowedOrigins([]string{"*"})
	allowedMethods := handlers.AllowedMethods([]string{"GET", "POST", "DELETE", "PUT"})

	log.Fatal(http.ListenAndServe(":"+port, handlers.CORS(allowedOrigins, allowedMethods)(router)))
}
