package transport_locator

import (
	"log"
	"net/http"
)

type Controller struct {
	Repository Repository
}

func (c *Controller) UpdateLocation(w http.ResponseWriter, r *http.Request) {
	log.Println("Update Location function")
	return
}
