package main

import (
	"github.com/rs/cors"
	"net/http"
	"server/transport_locator"
)

func main() {
	router := transport_locator.NewRouter()
	handler := cors.AllowAll().Handler(router)
	http.ListenAndServe(":8000", handler)
}
